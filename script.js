document.addEventListener('DOMContentLoaded', () => {
  // تمرير سلس
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

  // تأثير ظهور البطاقات
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

  // ===== القائمة المنسدلة للوثيقة =====
  const toggleBtn = document.getElementById('credentialToggle');
  const dropdown = document.getElementById('credentialDropdown');

  if (toggleBtn && dropdown) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('show');
    });

    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', (e) => {
      if (!toggleBtn.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove('show');
      }
    });
  }
});