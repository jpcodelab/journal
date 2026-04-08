---
layout: post
title: "The library bot and the shadow it cast"
subtitle: "A personal experiment in building with AI — and what it reveals about enterprise Shadow AI"
date: 2026-04-08
category: reflection
---

I wanted a book.

Not just any book — one of the titles everyone seems to be reading right now about AI, the kind that gets recommended in three different newsletters on the same day. Before buying, I do what I always do: check the digital library. Portugal and Spain both run regional eBiblio systems — free ebooks, no late fees, a surprisingly good catalogue.

The problem is availability. Popular titles have queues. Sometimes the queue is so long that the system stops accepting new reservations entirely — the book shows as unavailable, and your only option is to check back periodically and hope a slot opens up before you forget about it.

So I started thinking about automating that.

## The old way

Two years ago, I would have approached this as a research project. What language makes sense? What are the right libraries? How long would it take to learn enough to actually build something? I would have gone through architecture diagrams, forum threads, and beginner tutorials, and I would have ended up, weeks later, with no tool, no new skills, and probably a different book I had forgotten I wanted.

That is not incompetence. That is an honest accounting of what building software costs when you start from zero.

## What changed

Last month I described what I wanted to an LLM and started iterating.

The result — which I have been calling `ebiblio-watcher` — is a Python script that authenticates against the eBiblio platform, parses the availability state of a watch list of books, and automatically reserves or borrows a copy when one becomes available. It runs every two hours via GitHub Actions. When a reservation lands, a Telegram bot sends me a message with the date the book will be ready.

I did not write this script in any meaningful sense. I described what I wanted, reviewed what came back, asked for changes, tested, and iterated. The LLM handled the CSRF token extraction, the session management, the HTML parsing logic. I handled the requirements.

The whole thing took an afternoon.

## The uncomfortable observation

Here is what stopped me when I finished setting it up.

I had just connected an automated agent to a public platform, given it credentials, and set it to make decisions and take actions on my behalf — without involving any governance layer, any approval process, any visibility beyond my own GitHub account. For a library bot, that is fine. The worst case is a mistimed reservation.

But the mechanism is identical to what an employee might build to automate something inside an enterprise — pulling data from an internal API, processing it with an LLM, sending results somewhere, acting on them. The only differences are the sensitivity of the data and the consequences of a wrong decision.

If I could do this in an afternoon, without any real technical background, the barrier to building similar automations against business systems is not technical. It is cultural. And in most organisations, that cultural barrier is remarkably low.

## Shadow AI is not a new phenomenon — it is an accelerated one

Shadow IT has existed for decades. Employees install tools that solve their problems when the approved stack does not. This is rational behaviour. It is not malicious.

What is different now is the capability surface. Shadow IT moved and stored data. Shadow AI processes it, interprets it, generates new content from it, and takes autonomous action based on it. The governance stakes are categorically higher. A spreadsheet synced to a personal Dropbox is a data leakage risk. An LLM agent connected to HR data, trained on employee records, and empowered to draft communications is something else entirely.

The people building these things quietly are not bad actors. They are, by definition, your most capable employees — the ones who do not wait for IT to solve their problems. They are optimising their workflows with tools that work.

The problem is not that they are doing it. The problem is that no one knows.

## The first step is not governance. It is honesty.

There are real solutions to Shadow AI — discovery tooling that monitors network traffic and financial transactions for new AI services, risk-tiered policies that apply different rules depending on data sensitivity and role, AI governance boards that provide structured pathways for approval without burying teams in process. The EU AI Act is beginning to make some of this mandatory.

But before any of that works, you need people to surface what they are doing.

Not as confession. Not as surveillance. As a starting condition for any honest conversation about adoption and risk.

Right now, in most organisations, employees are hiding their AI use as a defence mechanism. They know the reflex reaction is to ban it, and bans are worse than the problem — they drive usage underground where it is harder to detect, harder to govern, and impossible to learn from.

The library bot was harmless. It is also a precise model of how Shadow AI enters an enterprise. Someone has a problem. The approved tools do not solve it, or the approval process is too slow. They build something with whatever is available. It works. They never mention it.

Somewhere in your organisation, that is happening right now.

What would it take for people to talk about it openly?
