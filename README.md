# Image Illustrations for Reveal.js

A simple plugin for Reveal.js that allows you to add images with captions and sources to your presentation. The plugin will automatically create a list of figures at the end of the presentation. All you need to do is add the images to your slides and the plugin will take care of the rest.

## Installation

### 1. Copy the `imageillustrations.js` and `imageillustrations.css` files to the `plugin` folder of your reveal.js presentation.

```bash
mkdir -p <path-to-revealjs>/plugin/imageillustrations
cp imageillustrations.js <path-to-revealjs>/plugin/imageillustrations/
cp imageillustrations.css <path-to-revealjs>/plugin/imageillustrations/
```

### 2. Add the source files to the presentation and initialize the plugin.

In the HEAD

```html
<head>
  ...
  <link rel="stylesheet" href="dist/reveal.css" />
  <link rel="stylesheet" href="dist/theme/black.css" />
  <!-- The plugin -->
  <link
    rel="stylesheet"
    href="plugin/imageillustrations/imageillustrations.css"
  />
  <!-- End of the plugin -->
  ...
</head>
```

At the end of the BODY (before the `Reveal.initialize` call)

```html
<body>
  ...
  <script src="dist/reveal.js"></script>
  <!-- The plugin -->
  <script src="plugin/imageillustrations/imageillustrations.js"></script>
  <!-- Reveal.js initialization -->
  <script>
    Reveal.initialize({
      hash: true,
      // Learn about plugins: https://revealjs.com/plugins/
      plugins: [
        RevealMarkdown,
        RevealHighlight,
        RevealNotes,
        RevealImageIllustrations,
      ],
      imageIllustrations: {
        title: 'Other title', // Change the title of the final slide
        fontSizeList: '1rem', // Change the font size for the list
        fontSizeCaption: '0.8rem', // Change the font size for the caption
      },
    });
  </script>
</body>
```

### 3. Add your first image to the presentation.

```html
<img
  src="path/to/image.jpg"
  data-text="Caption for the image"
  data-source="www.example.com"
/>
```

Now you can add as many images as you want to your presentation. The plugin will automatically create a list of figures at the end of the presentation.

## Demo

### Local

Clone the repository, switch to the `demo` folder and run the Reveal.js server.

```bash
git clone https://github.com/skyface753/ReveaJS-lImageIllustrations.git
cd ReveaJS-lImageIllustrations/demo
npm install
npm start
```

Open your browser and go to `http://localhost:8000`.

### GitHub Pages

Coming soon...
