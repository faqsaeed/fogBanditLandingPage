// Add the official Fog Bandit ANZ Calendly event URL here once supplied.
// One change updates every "Book a call" CTA and the embedded booking popup.
const CALENDLY_URL = '';

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
let popupShown = sessionStorage.getItem('fogbanditCalendlyPopup') === '1';

if (popup) {
  popup.setAttribute('aria-labelledby', 'calendly-popup-title');
  popup.innerHTML = `
    <div class="popup-card calendly-modal" role="document">
      <button class="popup-close" type="button" aria-label="Close booking calendar">×</button>
      <div class="calendly-modal-head">
        <div>
          <div class="section-kicker">BOOK A 15-MIN CALL</div>
          <h2 id="calendly-popup-title">Choose a time that works for you.</h2>
        </div>
        <span>Fog Bandit jewellery security</span>
      </div>
      <div class="calendly-frame-wrap">
        <iframe class="calendly-frame" title="Book a Fog Bandit consultation" loading="lazy" allow="payment"></iframe>
      </div>
    </div>`;

  const modalStyles = document.createElement('style');
  modalStyles.textContent = `
    .calendly-modal{width:min(940px,calc(100vw - 36px));padding:0;overflow:hidden;background:#f7f6f3;border-radius:18px}
    .calendly-modal .popup-close{z-index:2;top:14px;right:16px;background:#111;color:#fff;border-radius:50%;font-size:21px;line-height:1}
    .calendly-modal-head{padding:24px 62px 20px 26px;background:#fff;border-bottom:1px solid #e5e1da;display:flex;align-items:end;justify-content:space-between;gap:24px}
    .calendly-modal-head h2{font-size:28px;line-height:1.05;margin:8px 0 0}
    .calendly-modal-head>span{font-size:10px;color:#777;white-space:nowrap;padding-bottom:3px}
    .calendly-frame-wrap{height:min(680px,78vh);background:#fff}
    .calendly-frame{width:100%;height:100%;border:0;display:block;background:#fff}
    @media(max-width:740px){
      .popup-backdrop{padding:8px}
      .calendly-modal{width:100%;max-height:94vh;border-radius:14px}
      .calendly-modal-head{padding:18px 52px 15px 18px;align-items:flex-start;flex-direction:column;gap:4px}
      .calendly-modal-head h2{font-size:22px}
      .calendly-modal-head>span{display:none}
      .calendly-frame-wrap{height:76vh}
      .calendly-modal .popup-close{top:10px;right:10px}
    }
  `;
  document.head.appendChild(modalStyles);
}

const popupClose = popup?.querySelector('.popup-close');
const calendlyFrame = popup?.querySelector('.calendly-frame');

const closePopup = () => {
  if (!popup) return;
  popup.classList.remove('open');
  popup.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

const openCalendlyPopup = ({ automatic = false } = {}) => {
  if (!popup || !CALENDLY_URL) {
    if (!automatic) {
      document.getElementById('assessment')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    return;
  }

  if (automatic) {
    if (popupShown) return;
    popupShown = true;
    sessionStorage.setItem('fogbanditCalendlyPopup', '1');
  }

  if (calendlyFrame && !calendlyFrame.src) {
    const separator = CALENDLY_URL.includes('?') ? '&' : '?';
    calendlyFrame.src = `${CALENDLY_URL}${separator}hide_gdpr_banner=1&background_color=ffffff&text_color=111111&primary_color=d41414`;
  }

  popup.classList.add('open');
  popup.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

popupClose?.addEventListener('click', closePopup);
popup?.addEventListener('click', (event) => { if (event.target === popup) closePopup(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closePopup(); });

document.querySelectorAll('[data-calendly]').forEach((link) => {
  link.removeAttribute('target');
  link.removeAttribute('rel');
  link.addEventListener('click', (event) => {
    event.preventDefault();
    openCalendlyPopup();
  });
});

let scrollTriggered = false;
window.addEventListener('scroll', () => {
  if (!CALENDLY_URL || popupShown || scrollTriggered) return;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  if (maxScroll <= 0) return;
  const depth = window.scrollY / maxScroll;
  const threshold = window.matchMedia('(max-width: 740px)').matches ? 0.66 : 0.56;
  if (depth >= threshold) {
    scrollTriggered = true;
    openCalendlyPopup({ automatic: true });
  }
}, { passive: true });

document.addEventListener('mouseout', (event) => {
  if (!CALENDLY_URL || window.matchMedia('(max-width: 740px)').matches || popupShown) return;
  if (event.clientY <= 0 && !event.relatedTarget) openCalendlyPopup({ automatic: true });
});
