(() => {
  'use strict';

  const WHATSAPP_NUMBER = '966576124840';

  document.documentElement.classList.add('js-ready');

  // Mobile navigation
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  function closeMenu() {
    if (!menuToggle || !navLinks) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'فتح القائمة');
    navLinks.classList.remove('open');
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'فتح القائمة' : 'إغلاق القائمة');
      navLinks.classList.toggle('open', !isOpen);
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
  }

  // Reveal sections as they enter the viewport. Keep content visible when unsupported.
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  // Preselect contact type when a service/product CTA is used.
  const serviceSelect = document.getElementById('contactType');
  document.querySelectorAll('[data-service]').forEach((link) => {
    link.addEventListener('click', () => {
      if (!serviceSelect) return;
      const map = {
        balghni: 'الاهتمام بمنتج بلّغني',
        custom: 'تطوير نظام مخصص',
        website: 'تصميم وتطوير موقع إلكتروني'
      };
      serviceSelect.value = map[link.dataset.service] || '';
    });
  });

  // Contact form: no backend and no data storage. Build a WhatsApp draft for user review.
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!contactForm.reportValidity()) return;

      const formData = new FormData(contactForm);
      const name = String(formData.get('name') || '').trim();
      const company = String(formData.get('company') || '').trim();
      const type = String(formData.get('type') || '').trim();
      const need = String(formData.get('need') || '').trim();

      const lines = [
        'السلام عليكم، أرغب في التواصل مع PROGRAMMER SAMMER.',
        '',
        `الاسم: ${name}`,
        company ? `المنشأة: ${company}` : null,
        `نوع الطلب: ${type}`,
        `الاحتياج: ${need}`
      ].filter(Boolean);

      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
      const openedWindow = window.open(whatsappUrl, '_blank');
      if (openedWindow) {
        openedWindow.opener = null;
      } else {
        window.location.href = whatsappUrl;
      }
      if (formMessage) {
        formMessage.textContent = 'تم تجهيز رسالتك. راجع التفاصيل في واتساب قبل الضغط على إرسال.';
      }
    });
  }

  // Current year in the footer.
  const yearElement = document.getElementById('currentYear');
  if (yearElement) yearElement.textContent = String(new Date().getFullYear());
})();
