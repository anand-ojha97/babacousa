# Babco Foods website

Full React 19 + React Router + Vite + Tailwind CSS project, including images,
videos and local fonts. The gallery uses the latest image-only masonry layout.

## Local setup

1. Install Node.js 24 LTS, version 24.15.0 or newer within the 24.x line.
2. Extract the ZIP and open the `babco-website` folder in VS Code.
3. Open a terminal in that folder and run:

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite, normally `http://localhost:5173`.
On Windows, use `npm.cmd ci` and `npm.cmd run dev` if PowerShell blocks `npm.ps1`.
You do not need an `.env` file for local setup.

## Files to edit

| File or folder | Purpose |
| --- | --- |
| `src/data/gallery.js` | Add, replace, remove or reorder gallery images. |
| `src/data/brands.js` | Home-page brand names, categories, posters and optional videos. |
| `src/data/homeBanners.js` | Home banner images and slide settings. |
| `src/data/richImages.js` | Photos for the five animated Rich headlines. |
| `src/data/brandDirectory.js` | Separate Brands page: inhouse banners and partner brands. |
| `src/data/people.js` | Profile text and image paths. |
| `src/data/navigation.js` | Menu links, footer links and search content. |
| `src/data/contact.js` | Office addresses, telephone numbers, contact email and map image paths. |
| `src/pages/` | Page components, including page-specific paragraphs. |
| `src/components/` | Shared header, footer, sliders, media and other reusable components. |
| `src/routes/routeConfig.js` | Page routes, titles and descriptions. |
| `public/images/`, `public/products/`, `public/videos/` | Editable media files. |
| `public/fonts/` | Existing design fonts and their notices. |

`src/main.jsx` starts React. `src/App.jsx` defines the routes.
`src/layouts/SiteLayout.jsx` shares the header and footer between pages.
React Router changes pages without reloading the whole website.

## Add or update gallery images

Only edit `src/data/gallery.js`; no changes to the page component are needed.

1. Copy your image to `public/images/gallery/`.
2. Add an object to the `galleryPhotos` array:

```js
{
  src: "/images/gallery/my-new-image.webp",
  alt: "A short description of the photo",
  width: 1080,
  height: 1350,
  brand: "anand",
},
```

Use the actual pixel dimensions of your image. Landscape and portrait images
keep their original proportions. `alt` is for accessibility, not a visible caption.
Use `brand: "ullasam"` for Ullasam images. Keep the Anand entries before the
Ullasam entries. The array order controls the gallery order.

Replace an image by updating its `src`, `alt`, `width` and `height`, or remove
its object to remove it from the gallery. Filenames are case-sensitive on hosting.

The layout shows four columns on desktop, two on tablet and one on mobile.
`Gallery.jsx` measures image heights and fills the staggered grid; `gallery.css`
controls spacing and breakpoints. No gallery library, captions or separate
thumbnail files are required.

## Update home-page brands and categories

Edit the `brandCatalog` array in `src/data/brands.js`.
Each brand has a `name` and a `categories` array.

To add a category, copy its image to `public/products/`, then add an object
inside that brand's `categories` array:

```js
{
  id: "anand-new-category",
  label: "New Category",
  poster: "/products/my-new-category.webp",
},
```

Every category must have a unique `id`, a `label` and a `poster` image.
To show a video in the centre, add a video file to `public/videos/` and add:

```js
video: "/videos/my-new-category.mp4",
```

`video` is optional. Without it, the centre shows the poster image.
Videos also fall back to their poster if playback fails.
The existing categories retain the shared preview clip from the approved
website; replace their `poster` and `video` paths to supply category-specific media.

Category names and side labels update automatically. There is no SVG label
generation command and no fixed category count. Array order sets category order.

To add a home-page brand, append a new object to `brandCatalog`:

```js
{
  name: "New Brand",
  categories: [
    {
      id: "new-brand-first-category",
      label: "First Category",
      poster: "/products/new-brand-category.webp",
    },
  ],
},
```

Brand tabs, the brand links in the header menu and search entries follow this
list automatically. One category works with its navigation arrows disabled; an empty category
list shows "Categories coming soon."

Append new brands after the existing ones to preserve links such as
`/?brand=2#brands`. Reordering the existing brands also requires updating the
numeric `index` values in `brandDirectory.js`. The separate Brands page and
external footer websites are edited in their own data files.

`BrandShowcase.jsx` manages the selected category and remembers each brand's
position. `CategorySlide.jsx` renders each carousel item. `ProductMedia.jsx`
handles category labels, poster images and video playback. Arrows, swipes and
keyboard navigation select categories; only the centre video plays.

## Home banner and other sliders

`HomeBanner.jsx` reads `src/data/homeBanners.js`. It handles slide selection,
autoplay, keyboard and touch controls, and pauses when appropriate.
`RichScenes.jsx` reads `richScenes.json` and `richImages.js` for its headlines
and corresponding photos. Media paths begin with `/` because they refer to
files inside `public/`, not to the `src/` folder.

## Check and build

```bash
npm test
npm run build
npm run preview
```

Tests check routes, assets, navigation and interactions, including adding brands
and categories. The production files are generated in `dist/`.
The ZIP excludes `node_modules/` and `dist/`; the commands above recreate them.

For hosting at a domain or subdomain root, upload the **contents of `dist/`**.
After changing source files or images, run `npm run build` again and replace the
deployed build, including `assets/` and the media folders. Copying `src/` to a
static web host does not update the built website.

The host must serve `index.html` for page routes such as `/gallery/` and
`/our-people/`. `public/_redirects` supplies that fallback on compatible hosts.
For Apache, use the following `.htaccess` in the deployed root if your host
supports `mod_rewrite` and allows these rules:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

For Nginx, the equivalent route fallback is `try_files $uri $uri/ /index.html;`.
This project uses domain-root URLs; deployment inside a subfolder requires
coordinating asset paths, Vite's base and the router basename.

The contact form prepares an email draft; it does not send email from a server.
The default CAPTCHA uses the existing public test key. Production CAPTCHA
verification and automatic email delivery require your own backend.

## Upload the source to GitHub

Create an empty GitHub repository, then run these commands inside the project:

```bash
git init
git add .
git commit -m "Add Babco Foods website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Replace the repository URL with your own. `.gitignore` excludes dependencies,
build output and local environment files. Future updates use `git add .`,
`git commit -m "Describe your change"` and `git push`.
GitHub stores the source; your web host must still build and deploy it.

Contact-page previews are configured in `src/data/contact.js`. The New Jersey
headquarters uses an `image` object with `src`, `alt`, `width` and `height`. The
other locations use local `mapImage` previews from `public/images/contact-maps/`.
The `map` URL controls the full interactive map below each location's details.
