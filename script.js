// Add the official Fog Bandit ANZ Calendly event URL here once supplied.
// One change updates every "Book a call" CTA and the embedded booking popup.
const CALENDLY_URL = '';

// Mobile hero viewport fit.
// Reference: iPhone 14 Pro Max portrait, 430 x 932 CSS px.
// Small viewport units keep the complete hero inside Safari's visible viewport,
// then typography and spacing compress progressively on shorter phones.
const mobileHeroStyles = document.createElement('style');
mobileHeroStyles.textContent = `
  @media (max-width:740px){
    .top-banner{min-height:40px;padding:6px 10px}
    .site-header{height:58px;padding:0 15px}
    .hero{
      min-height:0!important;
      height:calc(100vh - 98px);
      height:calc(100svh - 98px);
      max-height:none;
    }
    .hero-inner{
      min-height:0!important;
      height:100%;
      align-items:flex-end;
    }
    .hero-copy{
      width:100%;
      padding-top:clamp(16px,2.7svh,26px);
      padding-bottom:max(16px,env(safe-area-inset-bottom));
    }
    .eyebrow{font-size:clamp(8px,1.15svh,9px);gap:8px}
    .eyebrow span{width:20px}
    h1{
      font-size:clamp(38px,min(12.2vw,6.25svh),56px);
      line-height:.94;
      margin-top:clamp(10px,1.35svh,15px);
    }
    .hero-lede{
      max-width:95%;
      font-size:clamp(12px,1.62svh,14px);
      line-height:1.45;
      margin-top:clamp(11px,1.5svh,16px);
    }
    .hero-actions{
      margin-top:clamp(13px,1.8svh,18px);
      gap:clamp(8px,1.1svh,11px);
    }
    .hero-actions .btn{
      min-height:clamp(42px,5svh,47px);
      padding:0 16px;
      font-size:10px;
    }
    .hero-actions .text-link{font-size:10px;line-height:1.2}
    .hero-proof{
      grid-template-columns:repeat(3,minmax(0,1fr))!important;
      gap:8px!important;
      margin-top:clamp(13px,1.8svh,19px);
      padding-top:clamp(10px,1.4svh,14px);
    }
    .hero-proof div,.hero-proof div:nth-child(3){
      grid-column:auto;
      border:0;
      padding:0;
      min-width:0;
    }
    .hero-proof strong{
      font-size:clamp(10px,1.45svh,12px);
      white-space:nowrap;
    }
    .hero-proof span{
      font-size:clamp(7px,.95svh,8px);
      line-height:1.25;
    }
    .hero-media{background-position:66% center}

    /* Mobile section transition cleanup. Prevents stacked section padding
       from creating a large white/black dead zone between cards and proof. */
    .day-night{padding-bottom:24px!important}
    .proof{padding-top:34px!important}
    .mode-grid{margin-bottom:0!important}
    .proof-grid{gap:20px!important}
  }

  @media (max-width:740px) and (max-height:760px){
    .top-banner{min-height:36px}
    .site-header{height:54px}
    .hero{
      height:calc(100vh - 90px);
      height:calc(100svh - 90px);
    }
    h1{font-size:clamp(36px,min(11.5vw,6.1svh),48px)}
    .hero-lede{font-size:12px;line-height:1.38}
    .hero-actions .btn{min-height:40px}
    .hero-proof{margin-top:10px;padding-top:9px}
  }

  @media (max-width:740px) and (max-height:680px){
    .hero-watch{display:none}
    .hero-proof span{display:none}
    .hero-copy{padding-top:10px;padding-bottom:10px}
  }
`;
document.head.appendChild(mobileHeroStyles);

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

// Official Fog Bandit ANZ branding supplied by the client.
const BRAND_LOGO = 'assets/logo-fog-bandit-anz-lockup.png';
const BRAND_FAVICON = 'assets/favicon.png';
const BRAND_OG = 'assets/og-image.png';

document.querySelectorAll('a.brand').forEach((brand) => {
  brand.innerHTML = `<img src="${BRAND_LOGO}" alt="Fog Bandit ANZ" class="official-brand-logo">`;
});

const brandStyles = document.createElement('style');
brandStyles.textContent = `
  .official-brand-logo{display:block;width:180px;height:auto;max-width:100%}
  .site-header .official-brand-logo{width:176px}
  .footer .official-brand-logo{width:164px}
  @media(max-width:740px){
    .site-header .official-brand-logo{width:142px}
    .footer .official-brand-logo{width:150px}
  }
`;
document.head.appendChild(brandStyles);

let faviconLink = document.querySelector('link[rel="icon"]');
if (!faviconLink) {
  faviconLink = document.createElement('link');
  faviconLink.rel = 'icon';
  document.head.appendChild(faviconLink);
}
faviconLink.type = 'image/png';
faviconLink.href = BRAND_FAVICON;

const setMeta = (property, content) => {
  let meta = document.head.querySelector(`meta[property="${property}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('property', property);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
};
setMeta('og:image', BRAND_OG);
setMeta('og:title', 'Fog Bandit for Jewellers | Active Security Fog');
setMeta('og:description', 'Active security fog for jewellery stores across Australia and New Zealand.');
