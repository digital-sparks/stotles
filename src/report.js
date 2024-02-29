window.Webflow ||= [];
window.Webflow.push(() => {
  /*-------------------------------------------------------*/
  /* SHARE FUNCTIONALTIY                                   */
  /*-------------------------------------------------------*/

  const title = document.title,
    description = document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
    url = document.URL;

  document
    .querySelector('[data-share="twitter"]')
    .setAttribute(
      'href',
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}: ${encodeURIComponent(
        url
      )}`
    );
  document
    .querySelector('[data-share="email"]')
    .setAttribute(
      'href',
      `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`
    );
  document
    .querySelector('[data-share="linkedin"]')
    .setAttribute(
      'href',
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    );

  document.querySelector('[data-share="url"]').addEventListener('click', function (e) {
    e.preventDefault();
    let clipboardInput = document.createElement('input');
    document.body.appendChild(clipboardInput);
    clipboardInput.value = document.URL;
    clipboardInput.select();
    document.execCommand('copy');
    document.body.removeChild(clipboardInput);
  });

  /*-------------------------------------------------------*/
  /* SHARE FUNCTIONALTIY                                   */
  /*-------------------------------------------------------*/

  /*-------------------------------------------------------*/
  /* NUMBER ANIMATION                                      */
  /*-------------------------------------------------------*/

  let baseEasings = {};
  ['Quad', 'Cubic', 'Quart', 'Quint', 'Expo'].forEach((name, i) => {
    baseEasings[name] = function (p) {
      return Math.pow(p, i + 2);
    };
  });

  //   document.querySelectorAll('.stat_heading').forEach((el, index) => {
  //     let numberFloat = parseFloat(el.textContent.replace(/[^0-9]/gi, ''));
  //     const numberString = el.textContent.replace(/\d+/g, '');
  //     let fired = false;
  //     const duration = 2000 + index * 200;

  //     el.textContent = '0';

  //     window.addEventListener('load resize scroll', function () {
  //       if (isInViewport(el) && !fired) {
  //         animateNumber(el, numberFloat, numberString, duration);
  //         fired = true;
  //       }
  //     });
  //   });

  //   function isInViewport(el) {
  //     let rect = el.getBoundingClientRect();
  //     return (
  //       rect.top >= 0 &&
  //       rect.left >= 0 &&
  //       rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
  //       rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  //     );
  //   }

  //   function animateNumber(element, numberFloat, numberString, duration) {
  //     $({ someValue: 0 }).animate(
  //       { someValue: numberFloat },
  //       {
  //         duration: duration,
  //         easing: baseEasings['quad'],
  //         step: function () {
  //           $(element).text(
  //             Math.round(this.someValue)
  //               .toString()
  //               .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,') + numberString
  //           );
  //         },
  //         complete: function () {
  //           $(element).text(
  //             Math.round(this.someValue)
  //               .toString()
  //               .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,') + numberString
  //           );
  //         },
  //       }
  //     );
  //   }

  /*-------------------------------------------------------*/
  /* NUMBER ANIMATION                                      */
  /*-------------------------------------------------------*/

  /*-------------------------------------------------------*/
  /* DECODE URL PARAMS                                     */
  /*-------------------------------------------------------*/
  const getUrlParameter = function getUrlParameter(sParam) {
    let sPageURL = window.location.search.substring(1),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;
    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');
      if (sParameterName[0] === sParam) {
        return typeof sParameterName[1] === undefined
          ? true
          : decodeURIComponent(sParameterName[1]);
      }
    }
    return '';
  };
  /*-------------------------------------------------------*/
  /* DECODE URL PARAMS                                     */
  /*-------------------------------------------------------*/

  // SHOW / HIDE GATED FORM
  let showGatedForm = false;
  const gatedForm = document.querySelector('#gated-form');
  const gatedFormSection = gatedForm.closest('.sign-up_component');

  if (window.localStorage.getItem('seenPopup') === 'true' || getUrlParameter('popup') === 'false') {
    gatedFormSection.style.display = 'none';
  } else {
    showGatedForm = true;
    gatedFormSection.style.display = 'block';
  }
  // SHOW / HIDE GATED FORM

  // ON GATED FORM SUBMIT
  gatedForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const form = this,
      action = form.getAttribute('action');

    let data = {},
      formData = new FormData(form);
    formData.forEach(function (value, key) {
      data[key] = value;
    });

    data.campaign_description = document.title;
    const raw_cookie = Cookies.get('stotles_utm');
    const stotles_cookie = raw_cookie ? JSON.parse(raw_cookie) : undefined;
    if (stotles_cookie) {
      const firstPage = stotles_cookie.url ? `<${stotles_cookie.url}|Link>` : 'Unknown';
      data.referrer = stotles_cookie.referrer ? stotles_cookie.referrer : 'Unknown';
      data.first_stotles_page = firstPage;
      data.utm_params = stotles_cookie.utmParams
        ? Object.entries(stotles_cookie.utmParams)
            .map(([k, v]) => `${k}: ${v}`)
            .join(', ')
        : 'Unknown';
      data.utm_source = stotles_cookie.utmParams ? stotles_cookie.utmParams['source'] : undefined;
      data.utm_medium = stotles_cookie.utmParams ? stotles_cookie.utmParams['medium'] : undefined;
      data.utm_campaign = stotles_cookie.utmParams
        ? stotles_cookie.utmParams['campaign']
        : undefined;
      data.utm_content = stotles_cookie.utmParams ? stotles_cookie.utmParams['content'] : undefined;
      data.utm_term = stotles_cookie.utmParams ? stotles_cookie.utmParams['term'] : undefined;
    }

    var xhr = new XMLHttpRequest();
    xhr.open('POST', action, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.onload = function () {
      if (xhr.status === 200) {
        gatedFormSection.style.display = 'none';
        window.localStorage.setItem('seenPopup', 'true');
        document.querySelector('.rich-text-wrap').style.maxHeight = 'none';
        window.lintrk('track', { conversion_id: 15511809 });
        window.dataLayer.push({
          event: 'download_report',
          report_event_label: data.campaign_description,
        });
      }
    };
    xhr.onerror = function () {
      console.log('Error:', xhr.statusText);
    };
    xhr.send(JSON.stringify(data));
  });
  // ON GATED FORM SUBMIT

  // PLACE GATED FORM

  // Select the container and the div
  const container = document.querySelector('.section_report-content');
  const formGate = document.querySelector('.sign-up_component');
  const indexContainer = document.querySelector('.reports_index-wrap');
  const content = container.querySelector('.rich-text-wrap');
  const textNodes = getTextNodesIn(content);

  // Go through each text node until we find the word '[GATE]'
  for (let i = 0; i < textNodes.length; i++) {
    if (textNodes[i].nodeValue.includes('[GATE]')) {
      console.log('Word "[GATE]" found!');

      let spanElement = document.createElement('span');
      spanElement.textContent = '';
      // spanElement.classList.add('hide');

      replaceWordWithSpan(textNodes[i], '[GATE] ', spanElement);

      if (showGatedForm) {
        recalculateHeight(spanElement);
        let resizeTimeout;
        window.addEventListener('resize', () => {
          clearTimeout(resizeTimeout);
          resizeTimeout = setTimeout(function () {
            recalculateHeight(spanElement);
          }, 50);
        });
      }

      break;
    }
  }

  function recalculateHeight(element) {
    const formGateHeight = formGate.clientHeight;
    const indexContainerHeight = indexContainer.clientHeight;
    const containerPadding =
      parseInt(
        window
          .getComputedStyle(container.querySelector('.padding-global'))
          .getPropertyValue('padding-top')
      ) +
      parseInt(
        window
          .getComputedStyle(container.querySelector('.padding-global'))
          .getPropertyValue('padding-bottom')
      );

    // Calculate the Y offset of the text node from the top of the container
    let range = document.createRange();
    range.selectNode(element);
    let rect = range.getBoundingClientRect();

    let offset = rect.top - container.getBoundingClientRect().top + 32;

    const windowWidth = $(window).innerWidth() || document.documentElement.clientWidth;

    if (windowWidth > 991) {
      content.style.maxHeight = offset + formGateHeight - containerPadding / 2 + 'px';
    } else {
      content.style.maxHeight =
        offset + formGateHeight - indexContainerHeight - containerPadding + 'px';
    }

    // Find the 'form-gate' element and set its top value to the offset

    formGate.style.position = 'absolute';
    formGate.style.top = offset + 'px';
  }

  // Helper function to get all text nodes in an element
  function getTextNodesIn(node) {
    var textNodes = [];
    if (node.nodeType == Node.TEXT_NODE) {
      textNodes.push(node);
    } else {
      var children = node.childNodes;
      for (var i = 0; i < children.length; i++) {
        textNodes = textNodes.concat(getTextNodesIn(children[i]));
      }
    }
    return textNodes;
  }

  function replaceWordWithSpan(textNode, word, spanElement) {
    let parent = textNode.parentNode;
    let text = textNode.nodeValue;

    // Split the text node at the word boundaries
    let index = text.indexOf(word);
    if (index === -1) return;

    let before = document.createTextNode(text.slice(0, index));
    let after = document.createTextNode(text.slice(index + word.length));

    // Insert the new nodes before the old one
    parent.insertBefore(before, textNode);
    parent.insertBefore(spanElement, textNode);
    parent.insertBefore(after, textNode);

    // Remove the old text node
    parent.removeChild(textNode);
  }
});
