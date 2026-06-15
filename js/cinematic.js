/* ============================================================================
   FoxWing Productions — Cinematic interactions (vanilla, no dependencies)
   ========================================================================== */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from((c || document).querySelectorAll(s));

  /* ---------- Navbar scroll state ---------- */
  const nav = $(".nav");
  if (nav) {
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Mobile menu ---------- */
  const toggle = $(".nav__toggle");
  if (toggle) {
    const sync = () => toggle.setAttribute("aria-expanded", document.body.classList.contains("menu-open") ? "true" : "false");
    const close = () => { document.body.classList.remove("menu-open"); sync(); };
    toggle.addEventListener("click", () => { document.body.classList.toggle("menu-open"); sync(); });
    $$(".nav__overlay a").forEach((a) => a.addEventListener("click", close));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
  }

  /* ---------- Active nav link via scrollspy ---------- */
  const navLinks = $$(".nav__link[data-section]");
  const sections = navLinks
    .map((l) => document.getElementById(l.dataset.section))
    .filter(Boolean);
  if (sections.length) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          navLinks.forEach((l) => l.classList.toggle("active", l.dataset.section === e.target.id));
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    sections.forEach((s) => spy.observe(s));
  }

  /* ---------- Scroll reveal ---------- */
  const reveals = $$(".reveal");
  if (reveals.length) {
    if (reduceMotion) {
      reveals.forEach((el) => el.classList.add("in"));
    } else {
      const ro = new IntersectionObserver((entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); }
        });
      }, { rootMargin: "0px 0px -10% 0px", threshold: 0.12 });
      reveals.forEach((el) => ro.observe(el));
    }
  }

  /* ---------- Animated stat counters ---------- */
  const counters = $$("[data-count]");
  if (counters.length) {
    const animate = (el) => {
      const target = parseFloat(el.dataset.count);
      const pad = el.dataset.pad === "true";
      const dur = 1700;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        let val = Math.round(target * eased);
        el.textContent = pad && val < 10 ? "0" + val : String(val);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const co = new IntersectionObserver((entries, obs) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          if (reduceMotion) {
            const t = parseFloat(e.target.dataset.count);
            e.target.textContent = e.target.dataset.pad === "true" && t < 10 ? "0" + t : String(t);
          } else {
            animate(e.target);
          }
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach((el) => co.observe(el));
  }

  /* ---------- Hero crossfade montage ---------- */
  const slides = $$(".hero__slide");
  if (slides.length > 1 && !reduceMotion) {
    let i = 0;
    setInterval(() => {
      slides[i].classList.remove("is-active");
      i = (i + 1) % slides.length;
      slides[i].classList.add("is-active");
    }, 5500);
  }

  /* ---------- Hero parallax ---------- */
  const heroBg = $(".hero__bg");
  if (heroBg && !reduceMotion) {
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY;
          if (y < window.innerHeight) heroBg.style.transform = `translateY(${y * 0.28}px)`;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ---------- Project carousels (projects page) ---------- */
  $$(".project__slides").forEach((wrap) => {
    const slidesEl = $$(".project__slide", wrap);
    const dots = $$(".project__dots button", wrap.closest(".project__media"));
    if (slidesEl.length < 2) return;
    let idx = 0, timer;
    const go = (n) => {
      slidesEl[idx].classList.remove("is-active");
      if (dots[idx]) dots[idx].classList.remove("active");
      idx = (n + slidesEl.length) % slidesEl.length;
      slidesEl[idx].classList.add("is-active");
      if (dots[idx]) dots[idx].classList.add("active");
    };
    const start = () => { if (!reduceMotion) timer = setInterval(() => go(idx + 1), 4200); };
    const stop = () => clearInterval(timer);
    dots.forEach((d, n) => d.addEventListener("click", () => { stop(); go(n); start(); }));
    const media = wrap.closest(".project__media");
    if (media) { media.addEventListener("mouseenter", stop); media.addEventListener("mouseleave", start); }
    start();
  });

  /* ---------- Project filtering (projects page) ---------- */
  const filters = $$(".filter");
  const projects = $$(".project");
  if (filters.length && projects.length) {
    filters.forEach((btn) => {
      btn.addEventListener("click", () => {
        filters.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const f = btn.dataset.filter;
        projects.forEach((p) => {
          const tags = (p.dataset.genres || "").toLowerCase();
          const match = f === "all" || tags.includes(f.toLowerCase());
          p.classList.toggle("is-hidden", !match);
        });
      });
    });
  }

  /* ---------- Gallery lightbox ---------- */
  const lbItems = $$("[data-lightbox]");
  const lb = $("#lightbox");
  if (lbItems.length && lb) {
    const imgEl = $(".lightbox__img", lb);
    const sources = lbItems.map((a) => a.getAttribute("href") || a.dataset.full);
    let cur = 0;
    const open = (n) => { cur = n; imgEl.src = sources[cur]; lb.classList.add("open"); document.body.style.overflow = "hidden"; };
    const close = () => { lb.classList.remove("open"); document.body.style.overflow = ""; };
    const move = (d) => { cur = (cur + d + sources.length) % sources.length; imgEl.src = sources[cur]; };
    lbItems.forEach((a, n) => a.addEventListener("click", (e) => { e.preventDefault(); open(n); }));
    $(".lightbox__close", lb).addEventListener("click", close);
    $(".lightbox__nav.prev", lb).addEventListener("click", () => move(-1));
    $(".lightbox__nav.next", lb).addEventListener("click", () => move(1));
    lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
    document.addEventListener("keydown", (e) => {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    });
  }

  /* ---------- Footer year ---------- */
  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
})();
