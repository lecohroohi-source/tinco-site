const courses = [
    { slug:"lecorobo", icon:"🤖", title:"لکوروبو", desc:"دوره‌ی رباتیک تینکو، در ۵ ران آموزشی پشت‌سرهم.", lvl:"مبتدی تا پیشرفته", cnt:"۵ ران" },
    { slug:"lecopy", icon:"💻", title:"لکوپای", desc:"برنامه‌نویسی پایتون، در ۴ ترم پشت‌سرهم.", lvl:"مبتدی تا متوسط", cnt:"۴ ترم" },
    { slug:"lecomas", icon:"🧮", title:"لکو مس", desc:"چرتکه و محاسبات ذهنی، از ترم بیسیک تا ترم ۱۲.", lvl:"کودکان تا نوجوانان", cnt:"۱۳ ترم" },
    { slug:"lecohightech", icon:"🎮", title:"لکو هایتک", desc:"برنامه‌نویسی اسکرچ و ساخت بازی، در ۴ ترم.", lvl:"مبتدی", cnt:"۴ ترم" },
    { slug:"lecorobo-advanced", icon:"🔧", title:"لکوروبو پیشرفته", desc:"سنسورها، موتورها و کنترل هوشمند ربات.", lvl:"پیشرفته", cnt:"۲۸ جلسه" },
    { slug:"lecoai", icon:"🌐", title:"لکوAI", desc:"آشنایی ساده و کاربردی با هوش مصنوعی، در ۲ ترم.", lvl:"متوسط", cnt:"۲ ترم" },
    { slug:"lecokids", icon:"🧸", title:"لکوکیدز", desc:"رباتیک برای کودکان ۵ تا ۷ سال، در ۴ ترم.", lvl:"۵ تا ۷ سال", cnt:"۴ ترم" },
    { slug:"lecoefun", icon:"🔤", title:"لکوایفان", desc:"آموزش زبان انگلیسی با بازی و سرگرمی، در ۸ ترم.", lvl:"زبان انگلیسی", cnt:"۸ ترم" },
    { slug:"lecoelec", icon:"🔌", title:"لکو الک", desc:"آموزش الکترونیک برای نوجوانان ۱۲ سال به بالا.", lvl:"۱۲ سال به بالا", cnt:"۴ ترم" },
    { slug:"lecomagic", icon:"✨", title:"لکو مجیک", desc:"آموزش الکترونیک به‌شکل بازی، برای زیر ۱۲ سال.", lvl:"زیر ۱۲ سال", cnt:"۲ ترم" },
    { slug:"lecosam", icon:"🧠", title:"لکو سام", desc:"تکنیک‌های محاسبات سریع، مخصوص کنکوری‌ها.", lvl:"۱۰ سال به بالا", cnt:"۴ ترم" }
  ];

  // ---- Marquee ticker ----
  const marqueeEl = document.getElementById('marqueeTrack');
  if (marqueeEl) {
    const itemsHTML = courses.map(c => `<span class="marquee-item"><span>${c.icon}</span><b>${c.title}</b></span><span class="dot-sep">•</span>`).join('');
    marqueeEl.innerHTML = itemsHTML + itemsHTML; // duplicate for seamless loop
  }

  // ---- Course grid ----
  const grid = document.getElementById('courseGrid');
  if (grid) {
    courses.forEach(c => {
      const el = document.createElement('a');
      el.className = 'card';
      el.href = `pages/${c.slug}.html`;
      el.innerHTML = `
        <div class="card-icon">${c.icon}</div>
        <h3>${c.title}</h3>
        <p>${c.desc}</p>
        <div class="card-meta"><span class="lvl">${c.lvl}</span><span class="cnt">${c.cnt}</span></div>`;
      grid.appendChild(el);
    });
  }

  // ---- Cursor spotlight glow in the hero ----
  const heroEl = document.querySelector('.hero');
  if (heroEl) {
    heroEl.addEventListener('mousemove', (e) => {
      const r = heroEl.getBoundingClientRect();
      heroEl.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
      heroEl.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
    });
  }

  // ---- Hero slider: cycles through every field so people see them all up top ----
  const sliderEl = document.getElementById('heroSlider');
  const dotsEl = document.getElementById('sliderDots');
  if (sliderEl && dotsEl) {
    courses.forEach((c, i) => {
      const slide = document.createElement('div');
      slide.className = 'slide' + (i === 0 ? ' active' : '');
      slide.innerHTML = `
        <div class="slide-icon">${c.icon}</div>
        <h3>${c.title}</h3>
        <p>${c.desc}</p>`;
      sliderEl.appendChild(slide);

      const dot = document.createElement('button');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', c.title);
      dot.addEventListener('click', () => goToSlide(i));
      dotsEl.appendChild(dot);
    });

    const slides = sliderEl.querySelectorAll('.slide');
    const dots = dotsEl.querySelectorAll('.dot');
    let current = 0;
    let timer;

    function goToSlide(index) {
      slides[current].classList.remove('active');
      dots[current].classList.remove('active');
      current = index;
      slides[current].classList.add('active');
      dots[current].classList.add('active');
      resetTimer();
    }
    function nextSlide() { goToSlide((current + 1) % slides.length); }
    function resetTimer() { clearInterval(timer); timer = setInterval(nextSlide, 2800); }
    resetTimer();
  }

  // ---- Scroll reveal: fade/slide sections in as the visitor scrolls ----
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  }
  // ---- 3D tilt effect on hover for cards (mouse position -> rotation) ----
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `translateY(-6px) perspective(600px) rotateX(${(-y * 8).toFixed(2)}deg) rotateY(${(x * 8).toFixed(2)}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

  // ---- Animated count-up for stat numbers when they scroll into view ----
  document.querySelectorAll('.stat b').forEach(el => {
    const raw = el.textContent.trim();
    const match = raw.match(/[\d۰-۹]+/);
    if (!match) return;
    const faToEn = s => s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));
    const target = parseInt(faToEn(match[0]), 10);
    const suffix = raw.slice(raw.indexOf(match[0]) + match[0].length);
    const prefix = raw.slice(0, raw.indexOf(match[0]));
    if (isNaN(target)) return;
    const io2 = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        io2.unobserve(entry.target);
        let start = null;
        const dur = 1200;
        function step(ts) {
          if (!start) start = ts;
          const p = Math.min((ts - start) / dur, 1);
          const val = Math.floor(p * target);
          entry.target.textContent = prefix + val.toLocaleString('fa-IR') + suffix;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.4 });
    io2.observe(el);
  });