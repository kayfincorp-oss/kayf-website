---
title: "How Kayf Works Under the Hood"
date: "2025-02-01"
excerpt: "A quick look at the technical approach behind Kayf — no background processes, no servers, just a clever tab manager."
---

# How Kayf Works Under the Hood

Kayf is intentionally simple. Here's the short version of how it works.

## The core mechanism

When you send a prompt in a supported AI interface, Kayf detects the network request (or the DOM state change that indicates a response is loading) and immediately switches your active tab to your configured break tab.

It then polls for the response to complete. When it detects the AI has finished streaming, it switches you back.

## No background processes

Kayf only runs inside active Chrome windows. Close the window and it's completely dormant. There's no service worker running in the background, no persistent connection to any server.

## Tab state preservation

When Kayf switches you away, it stores your scroll position. When it switches you back, it restores it. For video sites, it also sends a pause event when you leave and a play event when you return — so your Netflix episode doesn't run while you're looking at code.

## Privacy

There's genuinely nothing to collect. Kayf never reads your prompts or responses. It only watches for load state changes in the tab. Nothing leaves your browser.
