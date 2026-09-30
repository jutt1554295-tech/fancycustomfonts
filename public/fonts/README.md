# Licensed font assets

This starter includes six Latin WOFF2 fonts from the Google Fonts repository under the SIL Open Font License 1.1: Dancing Script, Sacramento, Allura, Parisienne, Alex Brush and Marck Script. Their original OFL license texts are stored alongside the assets as `*-OFL.txt`, and each catalog entry links to its upstream license source.

Only add self-hosted font files when their license explicitly permits web embedding and redistribution. Prefer WOFF2. The catalog in `data/fontCatalog.ts` records each expected path, such as `/fonts/bubblegum-sans.woff2`. After adding a properly licensed file and its required license notice, set that catalog entry's `available` property to `true`.

The real-font browser emits an `@font-face` rule only for available fonts near the viewport. Other entries use their declared fallback stack and do not request missing files.
