/**
 * Reveal.js Plugin: Image Illustrations List with Captions
 * Automatically inserts captions below images that have a data-text attribute,
 * and adds a final slide listing all illustrations with their numbers, captions, and sources.
 *
 * Configuration options (passed via Reveal configuration under "imageIllustrations"):
 *   title:    Title of the final slide (default: "List of Illustrations")
 *   fontSize: Font size for the list items (default: "1rem")
 */
const RevealImageIllustrations = {
  id: 'image-illustrations',
  init: function (deck) {
    // Get configuration options from Reveal config (or set defaults)
    let config = deck.getConfig().imageIllustrations || {};
    config.title = config.title || 'List of Illustrations';
    config.fontSizeList = config.fontSizeList || '1rem';
    config.fontSizeCaption = config.fontSizeCaption || '0.8rem';
    config.captionColor = config.captionColor || '#555';

    // Set a CSS variable for the font size (used by the external CSS)
    document.documentElement.style.setProperty(
      '--illustrations-font-size-list',
      config.fontSizeList
    );
    document.documentElement.style.setProperty(
      '--illustrations-font-size-caption',
      config.fontSizeCaption
    );
    document.documentElement.style.setProperty(
      '--illustrations-caption-color',
      config.captionColor
    );

    let imageIllustrations = [];

    function collectImageIllustrations() {
      imageIllustrations = [];
      // Select all images that have either data-source or data-text attributes
      const images = document.querySelectorAll(
        '.slides img[data-source], .slides img[data-text]'
      );
      images.forEach((img, index) => {
        let number = index + 1;
        let source = img.getAttribute('data-source');
        let text = img.getAttribute('data-text');

        // Store illustration info for the final list slide
        imageIllustrations.push({
          number: number,
          src: img.getAttribute('src'),
          source: source,
          text: text,
        });

        // If a data-text attribute is provided, insert a caption below the image
        if (text) {
          // Avoid adding a duplicate caption if one already exists
          if (
            !img.nextElementSibling ||
            !img.nextElementSibling.classList.contains('image-caption')
          ) {
            let caption = document.createElement('div');
            caption.className = 'image-caption';
            caption.innerHTML = `<span class="caption-number">Figure ${number}:</span> ${text}`;
            img.insertAdjacentElement('afterend', caption);
          }
        }
      });
    }

    function addIllustrationsSlide() {
      if (imageIllustrations.length === 0) return;

      let listHtml = `<section><h2>${config.title}</h2><ul class="illustrations-list">`;
      imageIllustrations.forEach((item) => {
        let listItem = `<li>Figure ${item.number}: `;
        if (item.text) {
          listItem += `${item.text} `;
        }
        if (item.source) {
          listItem += `(<a href="${item.source}" target="_blank">${item.source}</a>)`;
        } else {
          listItem += `(Own work)`;
        }
        listItem += `</li>`;
        listHtml += listItem;
      });
      listHtml += '</ul></section>';

      document
        .querySelector('.slides')
        .insertAdjacentHTML('beforeend', listHtml);
    }

    deck.on('ready', function () {
      collectImageIllustrations();
      addIllustrationsSlide();
    });
  },
};

// Export the plugin for module systems or attach it to the window object
if (typeof module !== 'undefined' && module.exports) {
  module.exports = RevealImageIllustrations;
} else {
  window.RevealImageIllustrations = RevealImageIllustrations;
}
