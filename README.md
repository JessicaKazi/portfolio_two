# KAZI/FORM — Creative Portfolio (Stage 2)

A React + Vite single-page portfolio for graphic design and web development.

## Requirements
- Node.js 20.19+ or 22.12+
- npm

## Run locally
```bash
npm install
npm run dev
```
Open the local URL printed by Vite, usually `http://localhost:5173`.

## Production build
```bash
npm run build
npm run preview
```

## Stage 2 additions
- Four live-switchable colour palettes: Rose Editorial, Sage Studio, Cobalt Digital and Monochrome.
- Refined editorial art direction, typography, paper grain and layered visual details.
- More consistent colour tokens for sections, cards and decorative elements.
- Updated navigation with an accessible palette control.
- Responsive palette menu for mobile.

## First customisations
1. Change `BRAND` in `src/App.jsx` when your final studio name is chosen.
2. Update the contact email and social links in `src/App.jsx`.
3. Edit project information in `src/data/projects.js`.
4. Replace the CSS concept artwork with your actual project screenshots and mockups.
5. Adjust the palette definitions in `src/styles.css` to create your own colours.

## Notes
- Project artwork is CSS placeholder artwork, not a representation of finished project screenshots.
- The palette picker changes the live theme; the selection resets to Rose Editorial on page reload in this starter.
- This stage does not persist theme selection between visits.
- Review all project descriptions and contact details before publishing.
