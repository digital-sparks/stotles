window.Webflow ||= [];
window.Webflow.push(() => {
  const leadIdKey = 'lead_id';
  // Check if lead_id exists in localStorage
  let leadId = localStorage.getItem(leadIdKey);

  if (!leadId) {
    // Generate a new GUID
    leadId = generateGUID();
    // Save the lead_id to localStorage
    localStorage.setItem(leadIdKey, leadId);
  }

  // Function to generate a GUID
  function generateGUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  window.dataLayer = window.dataLayer || [];

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

  $.validator.addMethod('regex', function (value, element, regexp) {
    if (regexp && regexp.constructor != RegExp) {
      regexp = new RegExp(regexp);
    } else if (regexp.global) regexp.lastIndex = 0;
    return this.optional(element) || regexp.test(value);
  });

  $.validator.setDefaults({
    ignore: [],
  });

  document.querySelectorAll('form').forEach((form, i) => {
    const formId = form.getAttribute('id'),
      formName = form.getAttribute('data-name'),
      formEvent = form.getAttribute('data-track-name');

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
    form.querySelectorAll('input, select, textarea').forEach((input) => {
      input.addEventListener(
        'input',
        () => {
          sendInputInteractionEvent(formEvent, formName, formId, input.name);
        },
        { once: true }
      );
    });

    $(form).validate({
      submitHandler: function (form) {
        const raw_cookie = Cookies.get('stotles_utm');
        const stotles_cookie = raw_cookie ? JSON.parse(raw_cookie) : undefined;
        if (stotles_cookie) {
          const firstPage = stotles_cookie.url ? `<${stotles_cookie.url}|Link>` : 'Unknown';
          form.querySelector('input[name=referrer]').value = stotles_cookie.referrer
            ? stotles_cookie.referrer
            : 'Unknown';
          form.querySelector('input[name=first_stotles_page]').value = firstPage;
          form.querySelector('input[name=utm_params]').value = stotles_cookie.utmParams
            ? Object.entries(stotles_cookie.utmParams)
                .map(([k, v]) => `${k}: ${v}`)
                .join(', ')
            : 'Unknown';
          form.querySelector('input[name=utm_source]').value = stotles_cookie.utmParams
            ? stotles_cookie.utmParams['source']
            : undefined;
          form.querySelector('input[name=utm_medium]').value = stotles_cookie.utmParams
            ? stotles_cookie.utmParams['medium']
            : undefined;
          form.querySelector('input[name=utm_campaign]').value = stotles_cookie.utmParams
            ? stotles_cookie.utmParams['campaign']
            : undefined;
          form.querySelector('input[name=utm_content]').value = stotles_cookie.utmParams
            ? stotles_cookie.utmParams['content']
            : undefined;
          form.querySelector('input[name=utm_term]').value = stotles_cookie.utmParams
            ? stotles_cookie.utmParams['term']
            : 'undefined';
        }

        // form is submitted successfully
        window.dataLayer.push({
          event: `${formEvent}_submitted`,
          form_name: formName,
          form_id: formId,
          form_url: getUrlWithoutQueryParams(),
          lead_id: leadId,
        });

        // Hide popup form is present
        if (document.querySelector('#report-popup-form')) {
          document.querySelector('#report-popup-form').style.display = 'none';
          const pagePath = new URL(document.URL).pathname + '-popup';
          window.localStorage.setItem(pagePath, 'true');
        }

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
          // regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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
});
