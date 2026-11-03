# Editable website data

Start with the root `README.md` for setup and examples of adding gallery images, brands and categories. Each `.js` file exports ordinary JavaScript arrays or objects. `richScenes.json` is JSON, so use double quotes and no trailing commas.

Change text and image paths while leaving IDs stable. Add image files inside `public/` and use browser paths beginning with `/`. Save, inspect the page in Vite, then run `npm test` and `npm run build`.

Some page paragraphs and hero image paths remain in their page `.jsx` file; find them by searching for their visible text in VS Code. The map's SVG geometry is not a routine content file.

The Rich section maps each word to its own four photos in `richImages.js`. The order matches the four layout slots in `richScenes.json`. Keep the uploaded filenames, or update `src` together with the file. `objectPosition` sets the crop focus.

Gallery photos are in `gallery.js` as objects with `src`, `alt`, `width`, `height` and `brand`. Keep original source dimensions. The image-only masonry gallery mixes full landscape and portrait photos, in four columns on desktop, two on tablet and one on mobile. Landscape food and product photos reuse existing website assets; the 40 uploaded portrait posts remain in `public/images/gallery/`. Keep Anand images first, followed by Ullasam. No visible titles or descriptions appear below the images.
