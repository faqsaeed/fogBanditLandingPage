const form = document.getElementById('assessment-form');
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const lines = [
    'Jewellery Store Security Assessment',
    '',
    `Name: ${data.get('firstName') || ''} ${data.get('lastName') || ''}`.trim(),
    `Company: ${data.get('company') || ''}`,
    `Email: ${data.get('email') || ''}`,
    `Phone: ${data.get('phone') || ''}`,
    '',
    'Requirements:',
    data.get('requirements') || 'Not provided'
  ];
  const subject = encodeURIComponent(`Jewellery Store Security Assessment - ${data.get('company') || 'Enquiry'}`);
  const body = encodeURIComponent(lines.join('\n'));
  window.location.href = `mailto:security@banditanz.com?subject=${subject}&body=${body}`;
});

const mobileCta = document.querySelector('.mobile-cta');
const assessment = document.getElementById('assessment');
const hero = document.querySelector('.hero');
if (mobileCta && assessment && hero && 'IntersectionObserver' in window) {
  let heroVisible = true;
  let assessmentVisible = false;
  const syncCta = () => mobileCta.classList.toggle('hidden', heroVisible || assessmentVisible);

  const heroObserver = new IntersectionObserver(([entry]) => {
    heroVisible = entry.isIntersecting;
    syncCta();
  }, { threshold: 0.08 });

  const assessmentObserver = new IntersectionObserver(([entry]) => {
    assessmentVisible = entry.isIntersecting;
    syncCta();
  }, { threshold: 0.12 });

  heroObserver.observe(hero);
  assessmentObserver.observe(assessment);
  syncCta();
}
