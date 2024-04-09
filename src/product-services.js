import { gsap } from 'gsap';

window.Webflow ||= [];
window.Webflow.push(() => {
  let tabLinkHeight = [];
  let totalTabLinkHeight = 0;
  let tabHeight = document.querySelector('.tabs-menu').clientHeight;
  let tabSpacing = 0;
  let activeTab = 0;
  let mm = gsap.matchMedia();

  let resizeTimeout;

  window.addEventListener('resize', function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
      calcHeights();
    }, 75);
  });
  calcHeights();

  document.querySelectorAll('a.tabs-link').forEach((link, i) => {
    tabLinkHeight.push(link.clientHeight);
    totalTabLinkHeight = totalTabLinkHeight + link.clientHeight;

    link.addEventListener('click', () => {
      activeTab = i;
      if (!link.classList.contains('w--current')) {
        mm.add('(min-width: 767px)', () => {
          gsap.to(document.querySelectorAll(`.tag-icon`), {
            y:
              tabLinkHeight[i] / 2 +
              tabLinkHeight.slice(0, i).reduce((a, b) => a + b, 0) +
              tabSpacing * i,
            rotateZ: -90 * i,
            duration: 0.3,
            ease: 'power1.out',
          });

          if (link.classList.contains('is-alternate')) {
            gsap.to('a.tabs-link', { color: '#2d3b54', duration: 0.3, ease: 'power1.out' });
          } else {
            gsap.to('a.tabs-link', { color: '#fff', duration: 0.3, ease: 'power1.out' });
          }
        });

        gsap.to(document.querySelectorAll(`.tab_background-item:not(:nth-child(${i}))`), {
          autoAlpha: 0,
          duration: 0.3,
          ease: 'power1.out',
        });

        gsap.to(document.querySelectorAll('.tab_background-item')[i], {
          autoAlpha: 1,
          duration: 0.3,
          ease: 'power1.out',
        });
      }
    });
  });

  function calcHeights() {
    mm.add('(min-width: 767px)', () => {
      tabLinkHeight.length = 0;
      totalTabLinkHeight = 0;
      document.querySelectorAll('a.tabs-link').forEach((link, i) => {
        tabLinkHeight.push(link.clientHeight);
        totalTabLinkHeight = totalTabLinkHeight + link.clientHeight;
      });

      tabSpacing =
        (tabHeight - totalTabLinkHeight) / (document.querySelectorAll('a.tabs-link').length - 1);

      gsap.set(document.querySelectorAll(`.tag-icon`), {
        y:
          tabLinkHeight[activeTab] / 2 +
          tabLinkHeight.slice(0, activeTab).reduce((a, b) => a + b, 0) +
          tabSpacing * activeTab,
      });
    });
  }
});
