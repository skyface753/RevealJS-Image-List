# Media List for Reveal.js

A simple plugin for Reveal.js that allows you to add images and videos with captions and sources to your presentation. The plugin will automatically create a list of medias at the end of the presentation. All you need to do is add the images to your slides and the plugin will take care of the rest.

## Installation

### 1. Copy the `mediaList/mediaList.js` and `mediaList/mediaList.css` files to the `plugin/mediaList/mediaList` folder of your reveal.js presentation.

```bash
mkdir -p <path-to-revealjs>/plugin/mediaList/
cp mediaList/mediaList.css <path-to-revealjs>/plugin/mediaList/
cp mediaList/mediaList.js <path-to-revealjs>/plugin/mediaList/
```

### 2. Add the source files to the presentation and initialize the plugin.

In the HEAD

```html
<head>
  ...
  <link rel="stylesheet" href="dist/reveal.css" />
  <link rel="stylesheet" href="dist/theme/black.css" />
  <!-- START: The plugin -->
  <link rel="stylesheet" href="plugin/mediaList/mediaList.css" />
  <!-- END: The plugin -->
  ...
</head>
```

At the end of the BODY (before the `Reveal.initialize` call)

1. Add the script for the plugin (`mediaList.js`).
2. Add the plugin to the list of plugins (`RevealMediaList`).
3. Add the configuration for the plugin (`mediaIllustrations`).

```html
<body>
  ...
  <script src="dist/reveal.js"></script>
  <script src="plugin/mediaList/mediaList.js"></script>
  <script>
    Reveal.initialize({
      hash: true,
      // Learn about plugins: https://revealjs.com/plugins/
      plugins: [RevealMarkdown, RevealHighlight, RevealNotes, RevealMediaList],
      mediaIllustrations: {
        title: 'List of Medias', // Change the title of the final slide
        fontSizeList: '1rem', // Change the font size for the list
        fontSizeCaption: '0.8rem', // Change the font size for the caption
        captionColor: '#555', // Change the color of the caption under the image
        imageCaptionName: 'Image', // Change the name of the image caption
        videoCaptionName: 'Video', // Change the name of the video caption
      },
    });
  </script>
</body>
```

### 3. Add your first image to the presentation.

Now you can add as many images and videos as you want to your presentation. The plugin will automatically create a list of medias at the end of the presentation.

#### Add an image with a source

```html
<img
  src="path/to/image.jpg"
  data-text="Caption for the image"
  data-source="www.example.com"
/>
```

#### Image without a source

```html
<img src="path/to/image.jpg" data-text="Image is tagged as (own source)" />
```

#### Duplicate images

Use `data-id` to mark images as duplicates. The plugin will on the one hand only show the image once in the list of medias and on the other hand use the same image id for the caption of the image.

```html
<img
  src="path/to/image.jpg"
  data-text="Caption for the image"
  data-source="www.example.com"
  data-id="duplicate"
/>
<img
  src="path/to/image.jpg"
  data-text="Caption for the image"
  data-source="www.example.com"
  data-id="duplicate"
/>
```

#### Add a video

```html
<video data-text="Big Buck Bunny" data-source="https://example.com">
  <source
    data-src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    type="video/mp4"
  />
  Your browser does not support the video tag.
</video>
```

## Demo

Go to the [demo page](https://skyface753.github.io/RevealJS-Media-List/).

### Local

Clone the repository, switch to the `demo` folder and run the Reveal.js server.

```bash
git clone https://github.com/skyface753/RevealJS-Media-List.git
cd RevealJS-Media-List/demo
npm install
npm start
```

Open your browser and go to `http://localhost:8000`.
