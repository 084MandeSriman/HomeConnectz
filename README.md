# HomeConnectz website (React + Vite)

## Run
1. Install Node.js 18+ from https://nodejs.org
2. In this folder: `npm install`
3. `npm run dev` then open http://localhost:5173
4. Production build: `npm run build` (output in `dist/`), preview with `npm run preview`

## Where to edit
- `src/data/siteData.js` : phone, email, address, hero slides, tab names, services
- `src/data/projects.js` : ALL projects (3 per tab) with full detail: essentials, master plan, gallery, floor plans, specifications, amenities, locality, location, FAQs
- `src/index.css` : colours (top `:root`), fonts, all responsive rules
- `src/components/` : Navbar/Footer (Layout), HeroSlider, Cards, Art (schematic plans), Icon, Loader
- `src/pages/` : Home, Projects, ProjectDetail, Services, Contact
- `public/images/` : project images. Add floor plans as `public/images/floorplans/east-1.jpg`, `east-2`, `east-p`, `west-1`, `west-2`

## Images
- Project and service photos load from Unsplash (needs internet). If one fails, services fall back to the illustrations in `public/images/services/` and project cards show a soft gradient.
- To use your own photo, put it in `public/images/` and set `img: '/images/your-file.jpg'` in `src/data/siteData.js`.
- Projects marked "Added projects (sample content)" in `siteData.js` are placeholders: replace names, details, RERA numbers and prices with your real projects.

## Project pages (new)
- Each project page has: Essentials, Master plan, Photo gallery, Floor plans, Specifications, Amenities, The locality, Location (Google map), How we work, Get the e-brochure, FAQ, Developer.
- Only **Srivari Meadows** holds real developer facts. All other projects (Ortus, Aurelia Skyline, Verdant Courtyard Villas, Lakeside Residences, Palm Grove Plots, Orchid Enclave, Maple Court, Sunrise Greens) are **SAMPLE content** (`sample: true`). Replace names, specs, distances, RERA numbers and photos before going live.
- Master plans / floor plans for sample projects are labelled schematic drawings. To use real ones: set `masterPlan.image` and `unit.img` in `projects.js` (put files in `public/images/`).
- Map pin comes from `location.mapQuery`; use the exact project name/address for a precise pin.
- "How we work" steps are shared: edit `howWeWork` in `projects.js`.
