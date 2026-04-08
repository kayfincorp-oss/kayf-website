# Kayf Website

The marketing site for [Kayf](https://chromewebstore.google.com/detail/kayf/npeikeenbibceplhpjponnolapbogjbn) — a Chrome extension that automatically switches you to a break activity while ChatGPT, Claude, Gemini, or DeepSeek processes your prompt.

Built with Next.js 14 App Router.

---

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deployment (Vercel)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) and click **Add New Project**
3. Import your GitHub repository
4. Leave all settings at their defaults — Vercel auto-detects Next.js
5. Click **Deploy**

Every subsequent push to `main` triggers an automatic redeploy.

---

## Publishing a Blog Post

Create a new `.md` file inside the `posts/` directory. File name becomes the URL slug.

**Example:** `posts/my-new-post.md`

```markdown
---
title: "Your Post Title"
date: "2025-MM-DD"
excerpt: "One sentence summary shown in previews and meta descriptions."
---

Your content here in standard Markdown.

## Subheading

Paragraphs, **bold**, *italic*, `inline code`, and fenced code blocks all work.

```python
def example():
    return "Hello"
```
```

Then commit and push to GitHub — Vercel deploys automatically within ~30 seconds.

Posts are sorted by `date` descending on the blog index. The three most recent appear on the homepage.

---

## Project Structure

```
kayf-website/
├── app/              # Next.js App Router pages
│   ├── layout.tsx    # Root layout with fonts + metadata
│   ├── page.tsx      # Homepage
│   ├── globals.css   # Design system: colors, typography, utilities
│   └── blog/         # Blog index + post pages
├── components/       # All UI components (co-located with CSS modules)
├── lib/posts.ts      # Blog post reading/parsing utilities
├── posts/            # Markdown blog posts
└── public/           # Static assets
```

---

## Design System

The site uses a warm dark aesthetic. Core colors live in `app/globals.css` as CSS custom properties.

| Variable | Value | Use |
|---|---|---|
| `--color-bg` | `#0d0b08` | Page background |
| `--color-amber` | `#f09820` | Brand accent, links |
| `--color-coral` | `#e8552a` | CTA buttons |
| `--color-text` | `#f0e8d6` | Body text |

Fonts: **Fraunces** (headings), **Outfit** (body), **JetBrains Mono** (accents/code).
