// jpcodelab/journal — Client-side search
// Loads search index from /search.json, uses lunr.js for fuzzy search

let searchIndex = null;
let searchData = [];

async function loadSearchIndex() {
  if (searchIndex) return;
  try {
    const res = await fetch('/journal/search.json');
    searchData = await res.json();
    searchIndex = lunr(function () {
      this.ref('url');
      this.field('title', { boost: 10 });
      this.field('subtitle', { boost: 5 });
      this.field('content');
      this.field('category', { boost: 3 });
      searchData.forEach(doc => this.add(doc));
    });
  } catch (e) {
    console.warn('Search index not available:', e);
  }
}

// Lazy-load lunr.js
function ensureLunr(cb) {
  if (window.lunr) { cb(); return; }
  const s = document.createElement('script');
  s.src = 'https://cdnjs.cloudflare.com/ajax/libs/lunr.js/2.3.9/lunr.min.js';
  s.onload = cb;
  document.head.appendChild(s);
}

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('searchInput');
  const results = document.getElementById('searchResults');
  if (!input) return;

  input.addEventListener('input', async () => {
    const q = input.value.trim();
    if (q.length < 2) { results.innerHTML = ''; return; }

    await new Promise(resolve => ensureLunr(resolve));
    await loadSearchIndex();

    if (!searchIndex) {
      results.innerHTML = '<div class="search-result"><span class="search-result__title">Search unavailable</span></div>';
      return;
    }

    let hits = [];
    try { hits = searchIndex.search(q + '*'); } catch {}
    if (!hits.length) try { hits = searchIndex.search(q); } catch {}

    if (!hits.length) {
      results.innerHTML = '<div class="search-result"><span class="search-result__title" style="color:var(--ink-muted)">No results found</span></div>';
      return;
    }

    results.innerHTML = hits.slice(0, 8).map(hit => {
      const doc = searchData.find(d => d.url === hit.ref);
      if (!doc) return '';
      return `
        <a href="${doc.url}" class="search-result" style="display:flex;flex-direction:column;gap:0.25rem">
          <div style="display:flex;align-items:center;gap:0.75rem">
            <span class="badge badge--${doc.category}">${doc.category}</span>
            <span class="search-result__title">${doc.title}</span>
          </div>
          ${doc.subtitle ? `<span class="search-result__excerpt">${doc.subtitle}</span>` : ''}
        </a>`;
    }).join('');
  });
});
