const RevealMediaList = {
  id: 'media-list',
  init: function (deck) {
    let config = deck.getConfig().mediaIllustrations || {};
    config.title = config.title || 'List of Medias';
    config.fontSizeList = config.fontSizeList || '1rem';
    config.fontSizeCaption = config.fontSizeCaption || '0.8rem';
    config.captionColor = config.captionColor || '#555';
    config.imageCaptionName = config.imageCaptionName || 'Image';
    config.videoCaptionName = config.videoCaptionName || 'Video';

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

    let mediaIllustrations = [];
    let assignedNumbers = { image: new Map(), video: new Map() };
    let counters = { image: 1, video: 1 };

    function isPrintMode() {
      return (
        window.location.search.includes('print-pdf') ||
        document.documentElement.classList.contains('print-pdf')
      );
    }

    function collectMediaIllustrations() {
      mediaIllustrations = [];
      assignedNumbers.image.clear();
      assignedNumbers.video.clear();
      counters.image = 1;
      counters.video = 1;

      const containerSelector = '.slides';
      const elements = document.querySelectorAll(
        `${containerSelector} img[data-source], ${containerSelector} img[data-text], ${containerSelector} video[data-text]`
      );

      elements.forEach((element) => {
        let type =
          element.tagName.toLowerCase() === 'video' ? 'video' : 'image';
        let mediaId =
          element.getAttribute('data-id') ||
          element.getAttribute('src') ||
          element.querySelector('source')?.getAttribute('data-src');
        let number;

        if (assignedNumbers[type].has(mediaId)) {
          number = assignedNumbers[type].get(mediaId);
        } else {
          number = counters[type]++;
          assignedNumbers[type].set(mediaId, number);
        }

        let source = element.getAttribute('data-source');
        let text = element.getAttribute('data-text');

        mediaIllustrations.push({
          number,
          type,
          src:
            element.getAttribute('src') ||
            element.querySelector('source')?.getAttribute('data-src'),
          source,
          text,
        });

        if (text) {
          if (
            !element.nextElementSibling ||
            !element.nextElementSibling.classList.contains('media-caption')
          ) {
            let caption = document.createElement('div');
            caption.className = 'media-caption';
            // caption.innerHTML = `<span class="caption-number">${
            // type.charAt(0).toUpperCase() + type.slice(1)
            // } ${number}:</span> ${text}`;
            caption.innerHTML = `<span class="caption-number">${getCaptionName(
              type
            )} ${number}:</span> ${text}`;
            element.insertAdjacentElement('afterend', caption);
          }
        }
      });
    }

    const getCaptionName = (type) => {
      return type.toLowerCase() === 'video'
        ? config.videoCaptionName
        : config.imageCaptionName;
    };

    function addIllustrationsSlide() {
      if (mediaIllustrations.length === 0) return;

      const itemsPerSlide = 15; // Adjust based on layout and font size
      let uniqueIllustrations = [];
      let seenIds = new Set();

      // Filter out duplicates based on media ID
      mediaIllustrations.forEach((item) => {
        if (!seenIds.has(item.src)) {
          seenIds.add(item.src);
          uniqueIllustrations.push(item);
        }
      });

      let totalSlides = Math.ceil(uniqueIllustrations.length / itemsPerSlide);

      for (let i = 0; i < totalSlides; i++) {
        let start = i * itemsPerSlide;
        let end = start + itemsPerSlide;
        let items = uniqueIllustrations.slice(start, end);

        let listHtml = isPrintMode()
          ? `<div class="pdf-page"><h2>${config.title} (${
              i + 1
            }/${totalSlides})</h2><ul class="illustrations-list">`
          : `<section><h2>${config.title} (${
              i + 1
            }/${totalSlides})</h2><ul class="illustrations-list">`;

        items.forEach((item) => {
          let listItem = `<li>${getCaptionName(item.type)} ${item.number}: `;
          if (item.text) listItem += `${item.text} `;
          listItem += item.source
            ? `(<a href="${item.source}" target="_blank">${item.source}</a>)`
            : `(Own work)`;
          listItem += `</li>`;
          listHtml += listItem;
        });

        listHtml += isPrintMode() ? '</ul></div>' : '</ul></section>';

        if (isPrintMode()) {
          setTimeout(() => {
            const slideNumber = deck.getSlides().length + 1;
            let a =
              '<div class="pdf-page media-illustrations-pdf-page"><div class="slide-background future" data-loaded="true"><div class="slide-background-content"></div></div><section data-markdown="" data-markdown-parsed="true" hidden="" aria-hidden="true" class="present" style="display: block; left: 19px; top: 45.5px; width: 960px;">';
            a += listHtml;
            a +=
              '</section><div class="slide-number slide-number-pdf">' +
              slideNumber +
              '</div></div>';
            document
              .querySelector('.slides')
              .insertAdjacentHTML('beforeend', a);
          }, 1000);
        } else {
          document
            .querySelector('.slides')
            .insertAdjacentHTML('beforeend', listHtml);
        }
      }
    }

    deck.on('ready', function () {
      collectMediaIllustrations();
      addIllustrationsSlide();
    });
  },
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = RevealMediaList;
} else {
  window.RevealMediaList = RevealMediaList;
}

// const slideNumber = deck.getSlides().length + 1;
//             let a =
//               '<div class="pdf-page media-illustrations-pdf-page"><div class="slide-background future" data-loaded="true"><div class="slide-background-content"></div></div><section data-markdown="" data-markdown-parsed="true" hidden="" aria-hidden="true" class="present" style="display: block; left: 19px; top: 45.5px; width: 960px;">';
//             a += listHtml;
//             a +=
//               '</section><div class="slide-number slide-number-pdf">' +
//               slideNumber +
//               '</div></div>';
//             document
//               .querySelector('.slides')
//               .insertAdjacentHTML('beforeend', a);
