window.addEventListener('vlReady', setViralLoops);

document.querySelector('#email-form').addEventListener('submit', () => {
  var targetNode = document.querySelector('div[data-vl-container="sharing-stage"]');
  console.log('form submitted');
  var observerOptions = {
    attributes: true,
    attributeFilter: ['style'],
  };

  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      var displayStyle = window.getComputedStyle(targetNode).display;

      if (displayStyle === 'block') {
        console.log('form state changed');
        setViralLoops();
      }
    });
  });

  observer.observe(targetNode, observerOptions);
});

async function setViralLoops() {
  let campaign;

  while (!campaign) {
    try {
      campaign = await ViralLoops.getCampaign();
      if (!campaign) {
        console.log('Waiting for campaign...');
        await new Promise((resolve) => setTimeout(resolve, 200)); // waits for 100ms before next attempt
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  console.log(campaign);

  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    if (key.includes('vl_refCode_')) {
      const url = 'https://www.stotles.com/bid-module-waitlist';

      const referralCode = campaign.userData
        ? campaign.userData.referralCode
        : localStorage.getItem(key);

      const rank = await campaign.getRank({ referralCode: referralCode });

      document.querySelectorAll('[data-name=rank]').forEach((el) => {
        el.textContent = `#${rank.rank}`;
      });

      // url share link
      document.querySelector('[data-name=url]').textContent =
        `${url}?referralCode=${referralCode}&refSource=copy`;

      // facebook share link
      document
        .querySelector('[data-name=facebook]')
        .setAttribute(
          'href',
          `https://www.facebook.com/share_channel/?link=${encodeURIComponent(
            url + '?referralCode=' + referralCode + '&refSource=facebook'
          )}&app_id=966242223397117&source_surface=external_reshare&display&hashtag`
        );

      // whatsapp share link
      document
        .querySelector('[data-name=whatsapp]')
        .setAttribute(
          'href',
          `https://api.whatsapp.com/send?text=${encodeURIComponent(
            "Please help me unlock special rewards by joining me on Stotles' Operating System Waitlist " +
              url +
              '?referralCode=' +
              referralCode +
              '&refSource=whatsapp'
          )}`
        );

      // twitter share link
      document
        .querySelector('[data-name=twitter]')
        .setAttribute(
          'href',
          `https://twitter.com/intent/post?url=${encodeURIComponent(
            url + '?referralCode=' + referralCode + '&refSource=twitter'
          )}&text=${encodeURIComponent(
            'I just joined the Stotles Waitlist for AI-driven public sector tools. Help me unlock special rewards by joining too!'
          )}&via=Stotles_Central`
        );

      // linkedin share link
      document
        .querySelector('[data-name=linkedin]')
        .setAttribute(
          'href',
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            url + '?referralCode=' + referralCode + '&refSource=linkedin'
          )}`
        );

      // mail share link
      document
        .querySelector('[data-name=email]')
        .setAttribute(
          'href',
          `mailto:?subject=${encodeURIComponent(
            'Help me unlock AI powered public sector tools 🔓'
          )}&body=${encodeURIComponent(
            "Hi there,\n\nI just joined Stotles' new waitlist for their AI-driven public sector operating system and I think you should too!\nThe more people I refer, the more chances I have to unlock special rewards.\n\nClick my link to check it out: " +
              url +
              '?referralCode=' +
              referralCode +
              '&refSource=email\n\nThanks,'
          )}`
        );

      // copy url function
      document.querySelector('[data-name=copy-url]').addEventListener('click', function (e) {
        e.preventDefault();
        let clipboardInput = document.createElement('input');
        document.body.appendChild(clipboardInput);
        clipboardInput.value = `${url}?referralCode=${referralCode}&refSource=copy`;
        clipboardInput.select();
        document.execCommand('copy');
        document.body.removeChild(clipboardInput);
      });
    }
  }
}
