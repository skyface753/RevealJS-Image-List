# Image Lists for Reveal.js

A simple plugin for Reveal.js that allows you to add images with captions and sources to your presentation. The plugin will automatically create a list of figures at the end of the presentation. All you need to do is add the images to your slides and the plugin will take care of the rest.

## Installation

### 1. Copy the `imagelists.js` and `imagelists.css` files to the `plugin` folder of your reveal.js presentation.

```bash
mkdir -p <path-to-revealjs>/plugin/imagelists
cp imagelists.js <path-to-revealjs>/plugin/imagelists/
cp imagelists.css <path-to-revealjs>/plugin/imagelists/
```

### 2. Add the source files to the presentation and initialize the plugin.

In the HEAD

```html
<head>
  ...
  <link rel="stylesheet" href="dist/reveal.css" />
  <link rel="stylesheet" href="dist/theme/black.css" />
  <!-- The plugin -->
  <link rel="stylesheet" href="plugin/imagelists/imagelists.css" />
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
  <script src="plugin/imagelists/imagelists.js"></script>
  <!-- Reveal.js initialization -->
  <script>
    Reveal.initialize({
      hash: true,
      // Learn about plugins: https://revealjs.com/plugins/
      plugins: [RevealMarkdown, RevealHighlight, RevealNotes, RevealImageList],
      imageList: {
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

Go to the [demo page](https://skyface753.github.io/RevealJS-Image-List/).

### Local

Clone the repository, switch to the `demo` folder and run the Reveal.js server.

```bash
git clone https://github.com/skyface753/RevealJS-Image-List.git
cd RevealJS-Image-List/demo
npm install
npm start
```

Open your browser and go to `http://localhost:8000`.
