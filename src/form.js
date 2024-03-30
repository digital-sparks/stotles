window.Webflow ||= [];
window.Webflow.push(() => {
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
    $(form).validate({
      submitHandler: function (form) {
        const raw_cookie = Cookies.get('stotles_utm');
        const stotles_cookie = raw_cookie ? JSON.parse(raw_cookie) : undefined;
        if (stotles_cookie) {
          const firstPage = stotles_cookie.url ? `<${stotles_cookie.url}|Link>` : 'Unknown';
          form.querySelector('input[name=referrer]').val = stotles_cookie.referrer
            ? stotles_cookie.referrer
            : 'Unknown';
          form.querySelector('input[name=first_stotles_page]').val = firstPage;
          form.querySelector('input[name=utm_params]').val = stotles_cookie.utmParams
            ? Object.entries(stotles_cookie.utmParams)
                .map(([k, v]) => `${k}: ${v}`)
                .join(', ')
            : 'Unknown';
          form.querySelector('input[name=utm_source]').val = stotles_cookie.utmParams
            ? stotles_cookie.utmParams['source']
            : undefined;
          form.querySelector('input[name=utm_medium]').val = stotles_cookie.utmParams
            ? stotles_cookie.utmParams['medium']
            : undefined;
          form.querySelector('input[name=utm_campaign]').val = stotles_cookie.utmParams
            ? stotles_cookie.utmParams['campaign']
            : undefined;
          form.querySelector('input[name=utm_content]').val = stotles_cookie.utmParams
            ? stotles_cookie.utmParams['content']
            : undefined;
          form.querySelector('input[name=utm_term]').val = stotles_cookie.utmParams
            ? stotles_cookie.utmParams['term']
            : 'undefined';
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
          regex: /^\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i,
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
        // public_sector_experience: '',
        // contracts: '',
        // buyer_qai_pass: ''
      },
    });
  });
});
