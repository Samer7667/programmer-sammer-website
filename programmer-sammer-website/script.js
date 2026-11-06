document.addEventListener('DOMContentLoaded',()=>{
  const menuButton=document.getElementById('menuToggle');
  const nav=document.getElementById('mainNav');
  if(menuButton&&nav){
    menuButton.addEventListener('click',()=>{
      const isOpen=nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded',String(isOpen));
      menuButton.setAttribute('aria-label',isOpen?'إغلاق القائمة':'فتح القائمة');
    });
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
      nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','فتح القائمة');
    }));
    document.addEventListener('click',e=>{
      if(!nav.contains(e.target)&&!menuButton.contains(e.target)&&nav.classList.contains('open')){
        nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');
      }
    });
  }
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}
  }),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
  const form=document.getElementById('contactForm');
  if(form){form.addEventListener('submit',e=>{
    e.preventDefault();
    const data=new FormData(form);
    const name=String(data.get('name')||'').trim();
    const phone=String(data.get('phone')||'').trim();
    const need=String(data.get('need')||'').trim();
    const message=String(data.get('message')||'').trim();
    if(!name||!phone||!need){alert('يرجى تعبئة الاسم ووسيلة التواصل ونوع الاحتياج.');return;}
    const text=[
      'السلام عليكم، أرغب في التواصل مع PROGRAMMER SAMMER.',
      'الاسم / المنشأة: '+name,
      'وسيلة التواصل: '+phone,
      'نوع الاحتياج: '+need,
      message?'التفاصيل: '+message:''
    ].filter(Boolean).join('\n');
    const url='https://wa.me/966576124840?text='+encodeURIComponent(text);
    window.open(url,'_blank','noopener,noreferrer');
  });}
  const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();
});
