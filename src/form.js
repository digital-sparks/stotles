window.Webflow ||= [];
window.Webflow.push(() => {
  window.dataLayer = window.dataLayer || [];

  // Check if lead_id exists in localStorage
  const leadIdKey = 'lead_id';
  let leadId = localStorage.getItem(leadIdKey) || generateGUID();
  localStorage.setItem(leadIdKey, leadId);

  // Function to generate a GUID
  function generateGUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  // Function to return clean url
  function getUrlWithoutQueryParams() {
    const url = new URL(window.location.href);
    return `${url.origin}${url.pathname}${url.hash}`;
  }

  // Function to send form start event
  function sendFormStartEvent(formEvent, formName, formId) {
    window.dataLayer.push({
      event: `${formEvent}_start`,
      form_name: formName,
      form_id: formId,
      form_url: getUrlWithoutQueryParams(),
    });
  }

  // Function to send input interaction event
  function sendInputInteractionEvent(formEvent, formName, formId, inputName) {
    window.dataLayer.push({
      event: `${formEvent}_interaction`,
      form_name: formName,
      form_id: formId,
      form_url: getUrlWithoutQueryParams(),
      field_name: inputName,
    });
  }

  function sendFormSubmittedEvent(formEvent, formName, formId) {
    window.dataLayer.push({
      event: `${formEvent}_submitted`,
      form_name: formName,
      form_id: formId,
      form_url: getUrlWithoutQueryParams(),
      lead_id: leadId,
    });
  }

  function handleFormVisibility() {
    // Hide popup form if present
    if (document.querySelector('#report-popup-form')) {
      document.querySelector('#report-popup-form').style.display = 'none';
      const pagePath = new URL(document.URL).pathname + '-popup';
      window.localStorage.setItem(pagePath, 'true');
    }

    // Hide report page overlay
    if (document.querySelector('#gated-form')) {
      const gatedForm = document.querySelector('#gated-form');
      const gatedFormSection = gatedForm.closest('.sign-up_component');
      gatedFormSection.style.display = 'none';
      const pagePath = new URL(document.URL).pathname + '-popup';
      window.localStorage.setItem(pagePath, 'true');
      document.querySelector('.rich-text-wrap').style.maxHeight = 'none';
    }
  }

  function handleFileDownload() {
    if (window.downloadUrl) {
      const url = window.downloadUrl.toLowerCase();
      const downloadExtensions = [
        '.pdf',
        '.doc',
        '.docx',
        '.xls',
        '.xlsx',
        '.ppt',
        '.pptx',
        '.zip',
        '.rar',
      ];
      const isDownloadable = downloadExtensions.some((ext) => url.endsWith(ext));

      if (isDownloadable) {
        let link = document.createElement('a');
        link.href = window.downloadUrl;
        link.download = window.downloadName;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        window.open(window.downloadUrl, '_blank');
      }
    }
  }

  function setupFormTracking(form, formEvent, formName, formId) {
    // Track form start interaction
    let formStarted = false;
    form.addEventListener(
      'input',
      () => {
        if (!formStarted) {
          formStarted = true;
          sendFormStartEvent(formEvent, formName, formId);
        }
      },
      { once: true }
    );

    // Track input interactions
    form.querySelectorAll('input, textarea').forEach((input) => {
      input.addEventListener(
        'input',
        () => {
          sendInputInteractionEvent(formEvent, formName, formId, input.name);
        },
        { once: true }
      );
    });

    form.querySelectorAll('select').forEach((input) => {
      input.addEventListener(
        'input',
        () => {
          sendInputInteractionEvent(formEvent, formName, formId, input.name);
        },
        { once: false }
      );
    });
  }

  function getStotlesCookieData() {
    const raw_cookie = Cookies.get('stotles_utm');
    // console.log(JSON.parse(raw_cookie));
    return raw_cookie ? JSON.parse(raw_cookie) : undefined;
  }

  function handleFormSubmit(form, formEvent, formName, formId, isHubSpotForm = false) {
    const stotles_cookie = getStotlesCookieData();

    if (stotles_cookie && !isHubSpotForm) {
      const firstPage = stotles_cookie.url ? `<${stotles_cookie.url}|Link>` : 'Unknown';
      const utmParams = stotles_cookie.utmParams || {};

      form.querySelector('input[name=referrer]').value = stotles_cookie.referrer || 'Unknown';
      form.querySelector('input[name=first_stotles_page]').value = firstPage;
      form.querySelector('input[name=utm_params]').value = Object.entries(utmParams)
        .map(([k, v]) => `${k}: ${v}`)
        .join(', ');
      form.querySelector('input[name=utm_source]').value = utmParams['source'];
      form.querySelector('input[name=utm_medium]').value = utmParams['medium'];
      form.querySelector('input[name=utm_campaign]').value = utmParams['campaign'];
      form.querySelector('input[name=utm_content]').value = utmParams['content'];
      form.querySelector('input[name=utm_term]').value = utmParams['term'];
    }

    sendFormSubmittedEvent(formEvent, formName, formId);
    handleFormVisibility();
    handleFileDownload();
  }

  $.validator.addMethod('regex', function (value, element, regexp) {
    if (regexp && regexp.constructor != RegExp) {
      regexp = new RegExp(regexp);
    } else if (regexp.global) regexp.lastIndex = 0;
    return this.optional(element) || regexp.test(value);
  });

  $.validator.setDefaults({
    ignore: [],
  });

  // Setup for standard Webflow forms
  document.querySelectorAll('form:not(.hs-form)').forEach((form) => {
    const formId = form.getAttribute('id');
    const formName = form.getAttribute('data-name');
    const formEvent = form.getAttribute('data-track-name');

    setupFormTracking(form, formEvent, formName, formId);

    // jQuery validation setup
    $(form).validate({
      submitHandler: function (form) {
        handleFormSubmit(form, formEvent, formName, formId);
        return true;
      },
      errorClass: 'is-error',
      validClass: 'is-success',
      errorPlacement: function (error, element) {
        if (element.attr('type') == 'checkbox' || element.attr('type') == 'radio') {
          error.appendTo(element.closest('.form_field-wrapper'));
        } else if (element[0].nodeName === 'SELECT') {
          error.appendTo(element.closest('[fs-selectcustom-element="dropdown"]'));
        } else if (element.parent().hasClass('newsletter_input')) {
          error.appendTo(element.parent().parent());
        } else {
          error.insertAfter(element);
        }
      },
      highlight: function (element, errorClass, validClass) {
        if (element.getAttribute('type') == 'checkbox' || element.getAttribute('type') == 'radio') {
          $(element).prev().addClass(errorClass).removeClass(validClass);
        } else if (element.nodeName === 'SELECT') {
          $(element)
            .closest('[fs-selectcustom-element="dropdown"]')
            .addClass(errorClass)
            .removeClass(validClass);
        } else {
          $(element).addClass(errorClass).removeClass(validClass);
        }
      },
      unhighlight: function (element, errorClass, validClass) {
        if (element.getAttribute('type') == 'checkbox' || element.getAttribute('type') == 'radio') {
          $(element).prev().removeClass(errorClass).addClass(validClass);
        } else if (element.nodeName === 'SELECT') {
          $(element)
            .closest('[fs-selectcustom-element="dropdown"]')
            .removeClass(errorClass)
            .addClass(validClass);
        } else {
          $(element).removeClass(errorClass).addClass(validClass);
        }
      },
      rules: {
        email: {
          email: true,
        },
      },
      messages: {
        name: 'Name is required',
        fname: 'First name is required',
        lname: 'Last name is required',
        message: 'Message is required',
        email: 'Email address is required',
        phone: 'Phone is required',
        company: 'Company is required',
        jobtitle: 'Job title is required',
        industry: 'Industry is required',
        privacy: 'Please agree to our privacy policy',
        // problem: '',
        public_sector_experience: 'Please select your experience',
        // contracts: '',
        // buyer_qai_pass: ''
      },
    });
  });

  (window.hsFormsOnReady = window.hsFormsOnReady || []).push(() => {
    console.log('hubspot forms ready to load');

    document.querySelectorAll('[hubspot-form-id][color-mode]').forEach((form, i) => {
      const formId = form.getAttribute('hubspot-form-id'),
        colorMode = form.getAttribute('color-mode') || 'light',
        formEvent = form.getAttribute('hubspot-form-track-name');

      console.log(formId, colorMode, formEvent);
      console.log(form.parentElement);

      if (!formId) return; // if no form ID is present, break the iteration.

      form.setAttribute('hubspot-form-index', i);

      hbspt.forms.create({
        region: 'na1',
        portalId: '5746318',
        formId: formId,
        css: '',
        cssRequired: '',
        target: `[hubspot-form-id][hubspot-form-index="${i}"]`,
        cssClass: colorMode === 'dark' ? 'is-dark' : '',
        submitButtonClass: `button width-full ${colorMode === 'dark' ? 'is-white' : ''}`,
        onFormReady: (hubspotForm) => {
          setupFormTracking(hubspotForm[0], formEvent, formEvent, formId);

          document
            .querySelectorAll(`[hubspot-form-id="${formId}"][hubspot-submit-action="show"]`)
            .forEach((el) => {
              el.style.display = 'none';
            });

          const stotles_cookie = getStotlesCookieData();

          if (stotles_cookie) {
            const firstPage = stotles_cookie.url ? `<${stotles_cookie.url}|Link>` : 'Unknown';
            const utmParams = stotles_cookie.utmParams || {};

            const referrerInput = hubspotForm[0].querySelector('input[name=stotles_referrer_url]');
            if (referrerInput) {
              referrerInput.value = stotles_cookie.referrer || 'Unknown';
            }

            const firstVisitInput = hubspotForm[0].querySelector('input[name=stotles_first_visit]');
            if (firstVisitInput) {
              firstVisitInput.value = firstPage || '';
            }

            const utmSourceInput = hubspotForm[0].querySelector('input[name=stotles_utm_source]');
            if (utmSourceInput) {
              utmSourceInput.value = utmParams['source'] || '';
            }

            const utmMediumInput = hubspotForm[0].querySelector('input[name=stotles_utm_medium]');
            if (utmMediumInput) {
              utmMediumInput.value = utmParams['medium'] || '';
            }

            const utmCampaignInput = hubspotForm[0].querySelector(
              'input[name=stotles_utm_campaign]'
            );
            if (utmCampaignInput) {
              utmCampaignInput.value = utmParams['campaign'] || '';
            }

            const utmContentInput = hubspotForm[0].querySelector('input[name=stotles_utm_content]');
            if (utmContentInput) {
              utmContentInput.value = utmParams['content'] || '';
            }

            const utmTermInput = hubspotForm[0].querySelector('input[name=stotles_utm_term]');
            if (utmTermInput) {
              utmTermInput.value = utmParams['term'] || '';
            }
          }
        },
        onFormSubmitted: (hubspotForm) => {
          handleFormSubmit(hubspotForm[0], formEvent, formId, formId, true);

          hubspotForm[0].style.display = 'none';

          document
            .querySelectorAll(`[hubspot-form-id="${formId}"][hubspot-submit-action="hide"]`)
            .forEach((el) => {
              el.style.display = 'none';
            });

          document
            .querySelectorAll(`[hubspot-form-id="${formId}"][hubspot-submit-action="show"]`)
            .forEach((el) => {
              el.style.display = 'block';
            });
        },
      });
    });
  });
});
