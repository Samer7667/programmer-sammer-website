document.addEventListener('DOMContentLoaded', () => {
  // ===== تمرير سلس للروابط الداخلية =====
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  if (toggleBtn && overlay) {
    // فتح النافذة
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    // إغلاق النافذة عند النقر على الخلفية
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // إغلاق النافذة عند الضغط على Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('active')) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
});