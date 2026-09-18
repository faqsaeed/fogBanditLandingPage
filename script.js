// Add the official Fog Bandit ANZ Calendly event URL here once supplied.
// One change updates every "Book a call" CTA and the embedded booking popup.
const CALENDLY_URL = '';

// Mobile stability pass.
// Keep layout sizing in one place and avoid replacing brand assets at runtime,
// which previously caused header layout shift and disturbed the hero viewport math.
const mobileStyles = document.createElement('style');
mobileStyles.textContent = `
  html,body{max-width:100%;overflow-x:hidden}

  @media (max-width:740px){
    :root{
      --mobile-banner-h:40px;
      --mobile-header-h:58px;
    }

    .top-banner{
      height:var(--mobile-banner-h)!important;
      min-height:var(--mobile-banner-h)!important;
      padding:0 12px!important;
      display:flex!important;
      align-items:center!important;
      justify-content:center!important;
      overflow:hidden;
    }
    .top-banner p{display:none!important}
    .top-banner a{
      font-size:10px!important;
      line-height:1.15!important;
      white-space:nowrap;
    }

    .site-header{
      height:var(--mobile-header-h)!important;
      min-height:var(--mobile-header-h)!important;
      padding:0 15px!important;
      align-items:center!important;
      overflow:hidden;
    }
    .site-header .brand{
      height:100%;
      display:flex;
      align-items:center;
    }
    .site-header .brand-logo-img{
      width:auto!important;
      height:34px!important;
      max-width:150px!important;
      object-fit:contain;
      flex:0 0 auto;
    }

    .hero{
      min-height:0!important;
      height:calc(100vh - var(--mobile-banner-h) - var(--mobile-header-h))!important;
      height:calc(100svh - var(--mobile-banner-h) - var(--mobile-header-h))!important;
      overflow:hidden!important;
    }
    .hero-inner{
      min-height:0!important;
      height:100%!important;
      display:flex!important;
      align-items:flex-end!important;
    }
    .hero-copy{
      width:100%!important;
      max-width:none!important;
      max-height:100%;
      padding:18px 0 max(16px,env(safe-area-inset-bottom))!important;
      display:flex;
      flex-direction:column;
      justify-content:flex-end;
    }
    .hero-media{
      background-position:67% center!important;
      transform:scale(1.01)!important;
    }
    .hero-shade{
      background:
        linear-gradient(0deg,rgba(5,5,5,.98) 0%,rgba(5,5,5,.91) 54%,rgba(5,5,5,.38) 100%)!important;
    }
    .eyebrow{
      font-size:8px!important;
      line-height:1.2!important;
      gap:7px!important;
      letter-spacing:.15em!important;
    }
    .eyebrow span{width:18px!important}
    .hero h1{
      font-size:clamp(36px,min(11.3vw,5.75svh),52px)!important;
      line-height:.94!important;
      margin-top:10px!important;
      letter-spacing:-.052em!important;
    }
    .hero-lede{
      max-width:96%!important;
      margin-top:11px!important;
      font-size:clamp(12px,1.52svh,14px)!important;
      line-height:1.42!important;
    }
    .hero-actions{
      display:flex!important;
      flex-direction:column!important;
      align-items:stretch!important;
      gap:8px!important;
      margin-top:13px!important;
    }
    .hero-actions .btn{
      width:100%!important;
      min-height:42px!important;
      padding:0 14px!important;
      font-size:10px!important;
      line-height:1.15!important;
      white-space:nowrap;
    }
    .hero-watch{
      width:100%!important;
      text-align:center!important;
      font-size:10px!important;
      line-height:1.2!important;
      padding:1px 0!important;
    }
    .hero-proof{
      display:grid!important;
      grid-template-columns:repeat(3,minmax(0,1fr))!important;
      gap:8px!important;
      margin-top:12px!important;
      padding-top:10px!important;
      border-top:1px solid rgba(255,255,255,.13)!important;
    }
    .hero-proof div,
    .hero-proof div:nth-child(3){
      grid-column:auto!important;
      min-width:0!important;
      padding:0!important;
      border:0!important;
      gap:3px!important;
    }
    .hero-proof strong{
      font-size:11px!important;
      line-height:1.15!important;
      white-space:nowrap;
    }
    .hero-proof span{
      font-size:7px!important;
      line-height:1.2!important;
      overflow-wrap:anywhere;
    }

    /* Keep the real ANZ logo stable in the footer too. */
    .footer-brand .brand-logo-img{
      width:auto!important;
      height:38px!important;
      max-width:160px!important;
    }

    /* Clean mobile section transitions. */
    .day-night{padding-bottom:28px!important}
    .proof{padding-top:38px!important}
    .mode-grid{margin-bottom:0!important}
    .proof-grid{gap:22px!important}

    /* Sticky CTA: always show the action container, respect iPhone safe area. */
    body{padding-bottom:calc(80px + env(safe-area-inset-bottom))!important}
    .sticky-inner{
      min-height:80px!important;
      padding:9px 11px max(9px,env(safe-area-inset-bottom))!important;
    }
    .sticky-inner>.sticky-copy{display:none!important}
    .sticky-inner>.sticky-actions{
      display:grid!important;
      width:100%!important;
      grid-template-columns:.72fr 1.28fr!important;
      gap:8px!important;
      align-items:stretch!important;
    }
    .sticky-actions .sticky-call,
    .sticky-actions .sticky-assessment-btn{
      min-width:0!important;
      min-height:52px!important;
    }
    .sticky-actions .sticky-call{
      display:flex!important;
      align-items:center!important;
      justify-content:center!important;
      padding:0 8px!important;
      font-size:10px!important;
      white-space:nowrap;
    }
    .sticky-actions .sticky-assessment-btn{
      width:100%!important;
      padding:0 9px!important;
      font-size:9px!important;
      line-height:1.15!important;
      white-space:nowrap;
    }
  }

  @media (max-width:740px) and (max-height:780px){
    :root{
      --mobile-banner-h:36px;
      --mobile-header-h:54px;
    }
    .site-header .brand-logo-img{height:31px!important;max-width:138px!important}
    .hero-copy{padding-top:10px!important;padding-bottom:10px!important}
    .hero h1{font-size:clamp(34px,min(10.8vw,5.55svh),46px)!important}
    .hero-lede{font-size:12px!important;line-height:1.36!important;margin-top:9px!important}
    .hero-actions{margin-top:10px!important;gap:7px!important}
    .hero-actions .btn{min-height:39px!important}
    .hero-proof{margin-top:9px!important;padding-top:8px!important}
  }

  @media (max-width:740px) and (max-height:690px){
    .hero-watch{display:none!important}
    .hero-proof span{display:none!important}
    .hero-proof{margin-top:8px!important;padding-top:7px!important}
  }

  @media (max-width:360px){
    .site-header .brand-logo-img{height:30px!important;max-width:132px!important}
    .hero h1{font-size:35px!important}
    .hero-lede{max-width:100%!important}
    .hero-actions .btn{font-size:9px!important}
    .hero-proof strong{font-size:10px!important}
  }
`;
document.head.appendChild(mobileStyles);

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
  new IntersectionObserver(([entry]) => {
    heroVisible = entry.isIntersecting;
    syncSticky();
  }, { threshold: 0.08 }).observe(hero);
  new IntersectionObserver(([entry]) => {
    assessmentVisible = entry.isIntersecting;
    syncSticky();
  }, { threshold: 0.1 }).observe(assessment);
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
      .calendly-modal{width:100%;max-height:94svh;border-radius:14px}
      .calendly-modal-head{padding:18px 52px 15px 18px;align-items:flex-start;flex-direction:column;gap:4px}
      .calendly-modal-head h2{font-size:22px}
      .calendly-modal-head>span{display:none}
      .calendly-frame-wrap{height:76svh}
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
popup?.addEventListener('click', (event) => {
  if (event.target === popup) closePopup();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closePopup();
});

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
  if (event.clientY <= 0 && !event.relatedTarget) {
    openCalendlyPopup({ automatic: true });
  }
});
