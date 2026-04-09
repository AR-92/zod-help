# Zod Help Center

Help Center for the Zod AI agent platform. Provides guides, FAQs, and troubleshooting information.

**URL:** [help.zodagent.com](https://help.zodagent.com)

## Development

```bash
# Install dependencies
bun install

# Start dev server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview
```

## Deployment

This site is automatically deployed to GitHub Pages from the `main` branch.

## Structure

- `src/content/docs/` - Help articles in MDX format
- `src/components/` - Astro components
- `src/layouts/` - Page layouts
- `src/pages/` - Route definitions
- `public/` - Static assets (CNAME, favicon, etc.)
- `docs/` - Build output (deployed to GitHub Pages)
