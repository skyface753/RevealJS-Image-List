const RevealImageList = {
  id: 'image-list',
  init: function (deck) {
    let config = deck.getConfig().imageList || {};
    config.title = config.title || 'List of Illustrations';
    config.fontSizeList = config.fontSizeList || '1rem';
    config.fontSizeCaption = config.fontSizeCaption || '0.8rem';
    config.captionColor = config.captionColor || '#555';

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

    let imageList = [];
    function isPrintMode() {
      return (
        window.location.search.includes('print-pdf') ||
        // Reveal.isPrintingPDF() ||
        document.documentElement.classList.contains('print-pdf')
      );
    }

    function collectImageIllustrations() {
      imageList = [];
      // isPrintMode = document.querySelector('.pdf-page') !== null;
      console.log('isPrintMode', isPrintMode());
      const containerSelector = '.slides';
      const images = document.querySelectorAll(
        `${containerSelector} img[data-source], ${containerSelector} img[data-text]`
      );
      console.log('images', images);

      images.forEach((img, index) => {
        let number = index + 1;
        let source = img.getAttribute('data-source');
        let text = img.getAttribute('data-text');

        imageList.push({
          number,
          src: img.getAttribute('src'),
          source,
          text,
        });

        if (text) {
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
      if (imageList.length === 0) return;
      console.log('addIllustrationsSlide');

      let listHtml = '';
      console.log('isPrintMode2', isPrintMode());
      if (isPrintMode()) {
        listHtml = `<div class="pdf-page"><h2>${config.title}</h2><ul class="illustrations-list">`;
      } else {
        listHtml = `<section><h2>${config.title}</h2><ul class="illustrations-list">`;
      }
      imageList.forEach((item) => {
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
      // listHtml += '</ul></div>';
      if (isPrintMode()) {
        listHtml += '</ul></div>';
      } else {
        listHtml += '</ul></section>';
      }

      if (isPrintMode()) {
        // Add the listHTML to the end of the slides, after one second
        setTimeout(() => {
          let a =
            '<div class="pdf-page" style="height: 727px;"><div class="slide-background future" data-loaded="true" style="display: block;"><div class="slide-background-content"></div></div><section data-markdown="" data-markdown-parsed="true" hidden="" aria-hidden="true" class="present" style="display: block; left: 19px; top: 45.5px; width: 960px;">';
          a += listHtml;
          a += '</section></div>';

          document.querySelector('.slides').insertAdjacentHTML('beforeend', a);
        }, 1000);
      } else {
        document
          .querySelector('.slides')
          .insertAdjacentHTML('beforeend', listHtml);
      }
    }

    deck.on('ready', function () {
      collectImageIllustrations();
      addIllustrationsSlide();
    });
  },
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = RevealImageList;
} else {
  window.RevealImageList = RevealImageList;
}
