I have a Vite + React + Tailwind + TypeScript project.

This is my folder structure:

```text
.
├── src
│   ├── pages
│   │   └── App.tsx
│   ├── public
│   │   ├── fonts
│   │   │   └── exodus-sans.woff2
│   │   └── images
│   │       └── icon.png
│   ├── styles
│   │   └── index.css
│   └── main.tsx
├── eslint.config.js
├── .gitignore
├── index.html
├── package.json
├── pnpm-lock.yaml
├── .prettierrc.json
├── prompt.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── vite-env.d.ts
```

This is my `index.html` file:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/images/icon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>.</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

This is my `vite.config.js`:

```js
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  publicDir: './src/public',
  base: './',
});
```

My problem is that my `icon.png` seems to not be recognized in dev mode. When I launch my dev server on my browser (localhost) I don't see the icon in the tab. Where do the problem come from and how to fix it eventually?
