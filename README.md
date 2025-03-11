# Media List for Reveal.js

A simple plugin for Reveal.js that allows you to add images and videos with captions and sources to your presentation. The plugin will automatically create a list of medias at the end of the presentation. All you need to do is add the images to your slides and the plugin will take care of the rest.

## Installation

To install the plugin, the `mediaList.js` and `mediaList.css` files need to be added to the presentation. The plugin can be installed via NPM, JSDelivr CDN, or manually.

### NPM (Recommended)

#### 1. Install the plugin.

```bash
npm install revealjs-media-list
```

#### 2. Add the source files to the presentation and initialize the plugin.

In the HEAD

```html
<head>
  ...
  <link rel="stylesheet" href="dist/reveal.css" />
  <link rel="stylesheet" href="dist/theme/black.css" />
  <!-- START: The plugin -->
  <link
    rel="stylesheet"
    href="node_modules/revealjs-media-list/mediaList/mediaList.css"
  />
  <script src="node_modules/revealjs-media-list/mediaList/mediaList.js"></script>
  <!-- END: The plugin -->
  ...
</head>
```

> Note: Add the plugin to the list of plugins and configure it as described in the [Usage](#usage) section.

### JSDelivr CND (Easiest)

#### 1. Add the source files to the presentation and initialize the plugin.

In the HEAD

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/revealjs-media-list@latest/mediaList/mediaList.css"
/>
<script src="https://cdn.jsdelivr.net/npm/revealjs-media-list@latest/mediaList/mediaList.js"></script>
```

> Note: Add the plugin to the list of plugins and configure it as described in the [Usage](#usage) section.

### Manual

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
  <link rel="stylesheet" href="plugin/mediaList/mediaList.css" />
  <script src="plugin/mediaList/mediaList.js"></script>
  ...
</head>
```

> Note: Add the plugin to the list of plugins and configure it as described in the [Usage](#usage) section.

## Usage

After installing the plugin, you need to add the plugin to the list of plugins and configure it.

1. Add the plugin to the list of plugins (`RevealMediaList`).
2. Add the configuration for the plugin (`mediaIllustrations`).

### 1. Add the plugin to the list of plugins

```html
<body>
  ...
  <script>
    Reveal.initialize({
      hash: true,
      // Learn about plugins: https://revealjs.com/plugins/
      plugins: [RevealMarkdown, RevealHighlight, RevealNotes, RevealMediaList],
    });
  </script>
</body>
```

### 2. Add the configuration for the plugin

```html
<body>
  ...
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
