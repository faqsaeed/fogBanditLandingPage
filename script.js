// Add the official Fog Bandit ANZ Calendly event URL here once supplied.
// One change updates every "Book a call" CTA on the page.
const CALENDLY_URL = '';

const calendlyLinks = document.querySelectorAll('[data-calendly]');
calendlyLinks.forEach((link) => {
  if (CALENDLY_URL) {
    link.href = CALENDLY_URL;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  } else {
    link.classList.add('is-unconfigured');
    link.addEventListener('click', (event) => {
      event.preventDefault();
      document.getElementById('assessment')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
});

const form = document.getElementById('assessment-form');
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const lines = [
    'Jewellery Store Security Assessment','',
    `Name: ${data.get('firstName') || ''} ${data.get('lastName') || ''}`.trim(),
    `Company: ${data.get('company') || ''}`,
    `Email: ${data.get('email') || ''}`,
    `Phone: ${data.get('phone') || ''}`,'',
    'Main concern:', data.get('requirements') || 'Not provided'
  ];
  const subject = encodeURIComponent(`Jewellery Store Security Assessment - ${data.get('company') || 'Enquiry'}`);
  const body = encodeURIComponent(lines.join('\n'));
  window.location.href = `mailto:security@banditanz.com?subject=${subject}&body=${body}`;
});

const sticky = document.getElementById('sticky-cta');
const hero = document.querySelector('.hero');
const assessment = document.getElementById('assessment');
if (sticky && hero && assessment && 'IntersectionObserver' in window) {
  let heroVisible = true;
  let assessmentVisible = false;
  const syncSticky = () => {
    const shouldShow = !heroVisible && !assessmentVisible;
    sticky.classList.toggle('visible', shouldShow);
    sticky.setAttribute('aria-hidden', String(!shouldShow));
  };
  new IntersectionObserver(([entry]) => { heroVisible = entry.isIntersecting; syncSticky(); }, { threshold: 0.08 }).observe(hero);
  new IntersectionObserver(([entry]) => { assessmentVisible = entry.isIntersecting; syncSticky(); }, { threshold: 0.1 }).observe(assessment);
  syncSticky();
}

const popup = document.getElementById('assessment-popup');
const popupClose = popup?.querySelector('.popup-close');
const popupLater = popup?.querySelector('.popup-later');
const popupAction = popup?.querySelector('.popup-action');
let popupShown = sessionStorage.getItem('fogbanditAssessmentPopup') === '1';

const openPopup = () => {
  if (!popup || popupShown) return;
  popupShown = true;
  sessionStorage.setItem('fogbanditAssessmentPopup', '1');
  popup.classList.add('open');
  popup.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};
const closePopup = () => {
  if (!popup) return;
  popup.classList.remove('open');
  popup.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};
popupClose?.addEventListener('click', closePopup);
popupLater?.addEventListener('click', closePopup);
popupAction?.addEventListener('click', closePopup);
popup?.addEventListener('click', (event) => { if (event.target === popup) closePopup(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closePopup(); });

let scrollTriggered = false;
window.addEventListener('scroll', () => {
  if (popupShown || scrollTriggered) return;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  if (maxScroll <= 0) return;
  const depth = window.scrollY / maxScroll;
  const threshold = window.matchMedia('(max-width: 740px)').matches ? 0.66 : 0.56;
  if (depth >= threshold) {
    scrollTriggered = true;
    openPopup();
  }
}, { passive: true });

document.addEventListener('mouseout', (event) => {
  if (window.matchMedia('(max-width: 740px)').matches || popupShown) return;
  if (event.clientY <= 0 && !event.relatedTarget) openPopup();
});
