# FancyCustomFonts

A browser-based Unicode text style generator, font library, and symbol directory built with Next.js App Router, React, TypeScript, and Tailwind CSS.

## Development

```bash
npm install
npm run dev
```

Run the production checks with:

```bash
npm run lint
npm run build
```

## Site routes

- `/` - homepage and live text generator
- `/fonts` - searchable, filterable Unicode style library
- `/tools` - styling tool directory
- `/symbols` - copy-ready symbol collections
- `/gaming` - gaming name and profile styling
- `/about`, `/contact`, `/privacy`, `/terms` - site information

## Deployment configuration

Set `NEXT_PUBLIC_SITE_URL` to the canonical production origin (for example, `https://example.com`) before building. It is used by canonical metadata, Open Graph URLs, robots, and the sitemap. The default is `https://fancycustomfonts.com`.

Set `CONTACT_EMAIL` to a monitored inbox before launch to publish it on the Contact page. The page does not imply a working inbox when this value is absent.

Text transformations run in the browser. Generated styles are Unicode characters rather than installable fonts; unsupported characters are preserved, and rendering varies between apps and devices. No backend, account system, analytics, or ad network scripts are included.
