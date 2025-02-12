/**
 * Reveal.js Plugin: Image Illustrations List with Captions
 * Automatically inserts captions below images that have a data-text attribute,
 * and adds a final slide listing all illustrations with their numbers, captions, and sources.
 */
(function () {
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

    let listHtml =
      '<section><h2>List of Illustrations</h2><ul style="font-size: 1rem;">';
    imageIllustrations.forEach((item) => {
      let listItem = `<li>Figure ${item.number}: `;
      if (item.text) {
        listItem += `${item.text} `;
      }
      if (item.source) {
        listItem += `(<a href="${item.source}" target="_blank">${item.source}</a>)`;
      } else {
        // Eigene Darstellung
        listItem += `(Eigene Darstellung)`;
      }
      listItem += `</li>`;
      listHtml += listItem;
    });
    listHtml += '</ul></section>';

    document.querySelector('.slides').insertAdjacentHTML('beforeend', listHtml);
  }

  Reveal.on('ready', function () {
    collectImageIllustrations();
    addIllustrationsSlide();
  });
})();
