document.addEventListener('DOMContentLoaded', () => {
  // ===== تمرير سلس للروابط الداخلية =====
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // إغلاق القائمة على الجوال
        const toggle = document.getElementById('nav-toggle');
        if (toggle && toggle.checked) {
          toggle.checked = false;
        }
      }
    });
  });

  // ===== تأثير ظهور البطاقات عند التمرير =====
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.service, .demo, .value-item, .step, .price-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // ===== النافذة المنبثقة لعرض وثيقة العمل الحر =====
  const toggleBtn = document.getElementById('credentialToggle');
  const overlay = document.getElementById('credentialOverlay');
  const closeBtn = document.getElementById('closeModal');

  if (toggleBtn && overlay && closeBtn) {
    // فتح النافذة
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // منع التمرير خلف النافذة
    });

    // إغلاق النافذة
    const closeModal = () => {
      overlay.classList.remove('active');
      document.body.style.overflow = ''; // إعادة التمرير
    };

    closeBtn.addEventListener('click', closeModal);

    // إغلاق عند النقر على الخلفية (الـ overlay نفسها)
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal();
      }
    });

    // إغلاق عند الضغط على زر Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('active')) {
        closeModal();
      }
    });
  }
});