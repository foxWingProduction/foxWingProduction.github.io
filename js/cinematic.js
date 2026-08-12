/* ============================================================================
   FoxWing Productions - Cinematic interactions (vanilla, no dependencies)

   Motion budget: everything scroll-linked runs through a single rAF loop, and
   every effect is disabled wholesale under prefers-reduced-motion.
   ========================================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer  = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  function clamp(v, a, b) { return Math.min(Math.max(v, a), b); }

  /* ==========================================================================
     Preloader - released on window load, with a hard cap so a slow asset can
     never hold the page hostage.
     ======================================================================== */
  (function preloader() {
    var el = $(".preloader");
    if (!el) { document.body.classList.add("loaded"); return; }
    var done = false;
    var release = function () {
      if (done) return;
      done = true;
      document.body.classList.add("loaded");
      window.setTimeout(function () { el.remove(); }, 900);
    };
    // With a background reel, hold the curtain until the player reports it is
    // playing, so the page is revealed with the video already running rather
    // than on a black frame. The cap guarantees it never hangs.
    if (document.querySelector("[data-vimeo-id]") && !reduceMotion) {
      document.addEventListener("foxwing:reel-ready", release);
      window.setTimeout(release, 3200);
    } else {
      window.addEventListener("load", function () { window.setTimeout(release, reduceMotion ? 0 : 550); });
      window.setTimeout(release, 2600);
    }
  })();

  /* ==========================================================================
     Custom cursor - a green ring that swells over links and turns into a
     labelled disc over media.
     ======================================================================== */
  (function cursor() {
    if (!finePointer || reduceMotion) return;
    var ring = $(".cursor");
    var dot  = $(".cursor-dot");
    if (!ring || !dot) return;

    var label = $("span", ring);
    var tx = window.innerWidth / 2, ty = window.innerHeight / 2;
    var rx = tx, ry = ty;

    document.addEventListener("mousemove", function (e) {
      tx = e.clientX; ty = e.clientY;
      dot.style.transform = "translate(" + tx + "px," + ty + "px)";
      document.body.classList.add("cursor-ready");
    }, { passive: true });

    (function follow() {
      rx += (tx - rx) * 0.16;
      ry += (ty - ry) * 0.16;
      ring.style.transform = "translate(" + rx + "px," + ry + "px)";
      requestAnimationFrame(follow);
    })();

    var hoverSel = 'a, button, .filter, [role="button"], input, textarea';
    var mediaSel = "[data-cursor]";
    document.addEventListener("mouseover", function (e) {
      var media = e.target.closest(mediaSel);
      if (media) {
        if (label) label.textContent = media.dataset.cursor || "View";
        document.body.classList.add("cursor-media");
        document.body.classList.remove("cursor-hover");
        return;
      }
      document.body.classList.remove("cursor-media");
      document.body.classList.toggle("cursor-hover", !!e.target.closest(hoverSel));
    });
    document.addEventListener("mouseleave", function () {
      document.body.classList.remove("cursor-ready");
    });
  })();

  /* ==========================================================================
     Navigation - condensed on scroll, hidden when scrolling down past the fold.
     ======================================================================== */
  var nav = $(".nav");
  var lastY = window.scrollY;

  /* Mobile menu */
  (function menu() {
    var toggle = $(".nav__toggle");
    if (!toggle) return;
    var sync = function () {
      var open = document.body.classList.contains("menu-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      document.body.classList.toggle("is-locked", open);
    };
    var close = function () { document.body.classList.remove("menu-open"); sync(); };
    toggle.addEventListener("click", function () { document.body.classList.toggle("menu-open"); sync(); });
    $$(".nav__overlay a").forEach(function (a) { a.addEventListener("click", close); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
  })();

  /* Scrollspy */
  (function scrollspy() {
    var links = $$(".nav__link[data-section]");
    var sections = links.map(function (l) { return document.getElementById(l.dataset.section); }).filter(Boolean);
    if (!sections.length) return;
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (l) { l.classList.toggle("active", l.dataset.section === e.target.id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    sections.forEach(function (s) { spy.observe(s); });
  })();

  /* ==========================================================================
     Scroll reveal + word-by-word title reveal
     ======================================================================== */
  (function splitText() {
    if (reduceMotion) return;
    $$("[data-split]").forEach(function (el) {
      var walk = function (node) {
        Array.prototype.slice.call(node.childNodes).forEach(function (child) {
          if (child.nodeType === 3) {
            var frag = document.createDocumentFragment();
            child.textContent.split(/(\s+)/).forEach(function (chunk) {
              if (!chunk) return;
              if (/^\s+$/.test(chunk)) { frag.appendChild(document.createTextNode(chunk)); return; }
              var wrap = document.createElement("span");
              wrap.className = "split-w";
              var word = document.createElement("span");
              word.className = "split-word";
              word.textContent = chunk;
              wrap.appendChild(word);
              frag.appendChild(wrap);
            });
            node.replaceChild(frag, child);
          } else if (child.nodeType === 1 && !child.classList.contains("split-w")) {
            walk(child);
          }
        });
      };
      walk(el);
      el.classList.add("split");
      $$(".split-word", el).forEach(function (w, i) {
        w.style.transitionDelay = (i * 0.045).toFixed(3) + "s";
      });
    });
  })();

  (function reveal() {
    var els = $$(".reveal, .reveal-clip, .split");
    if (!els.length) return;
    if (reduceMotion) { els.forEach(function (el) { el.classList.add("in"); }); return; }
    var ro = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        obs.unobserve(e.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.1 });
    els.forEach(function (el) { ro.observe(el); });
  })();

  /* ==========================================================================
     Animated counters
     ======================================================================== */
  (function counters() {
    var els = $$("[data-count]");
    if (!els.length) return;
    var run = function (el) {
      var target = parseFloat(el.dataset.count);
      var pad = el.dataset.pad === "true";
      var dur = 1900;
      var start = performance.now();
      var step = function (now) {
        var p = Math.min((now - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 4);
        var val = Math.round(target * eased);
        el.textContent = pad && val < 10 ? "0" + val : String(val);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    var co = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        if (reduceMotion) {
          var t = parseFloat(e.target.dataset.count);
          e.target.textContent = e.target.dataset.pad === "true" && t < 10 ? "0" + t : String(t);
        } else {
          run(e.target);
        }
        obs.unobserve(e.target);
      });
    }, { threshold: 0.5 });
    els.forEach(function (el) { co.observe(el); });
  })();

  /* ==========================================================================
     Hero showreel - silent Vimeo background loop behind the wordmark.
     Vimeo's `background=1` strips every player control, so the frame needs no
     oversizing to hide chrome and can sit at native scale, staying sharp.
     ======================================================================== */
  (function showreel() {
    var hero = $("[data-vimeo-id]");
    if (!hero) return;
    var frame = $(".hero__frame", hero);
    var id = hero.dataset.vimeoId;
    if (!frame || !id) return;

    var params = [
      "background=1",   // no controls, no title, autoplay, muted, looping
      "autoplay=1",
      "loop=1",
      "muted=1",
      "autopause=0",
      // Pinned so adaptive streaming cannot drop the hero to a soft
      // rendition. Raise to 2k/4k if the master upload has them.
      "quality=" + (hero.dataset.vimeoQuality || "1080p"),
      "dnt=1"           // ask Vimeo not to track viewers
    ].join("&");

    /* The iframe is only revealed once the player reports it is actually
       playing. If Vimeo refuses to start - geo/domain restriction, blocked
       third-party frames, a privacy extension - its error card never becomes
       visible: the poster frame simply stays where it is. */
    var revealed = false;
    var reveal = function () {
      if (revealed) return;
      revealed = true;
      hero.classList.add("video-ready");
      document.dispatchEvent(new Event("foxwing:reel-ready"));
    };

    window.addEventListener("message", function (e) {
      if (!/^https?:\/\/player\.vimeo\.com/.test(e.origin)) return;
      if (!frame.contentWindow || e.source !== frame.contentWindow) return;
      var data = e.data;
      if (typeof data === "string") {
        try { data = JSON.parse(data); } catch (err) { return; }
      }
      if (!data) return;
      if (data.event === "ready") {
        // Subscribe to playback so we learn when frames are really on screen.
        ["play", "playing", "timeupdate"].forEach(function (name) {
          frame.contentWindow.postMessage(
            JSON.stringify({ method: "addEventListener", value: name }), "*"
          );
        });
      } else if (data.event === "play" || data.event === "playing" ||
                 (data.event === "timeupdate" && data.data && data.data.seconds > 0)) {
        reveal();
      }
    });

    // #t=<seconds>s sets where the reel begins on first play
    var startAt = parseInt(hero.dataset.vimeoStart || "0", 10) || 0;
    /* Cover the stage by measurement rather than viewport maths: the stage
       wraps the hero and the stats, whose height varies with wrapping, so
       any svh-based guess leaves bars on some screens. */
    var stage = $(".hero__stage", hero);
    var fitStage = function () {
      if (!stage) return;
      var r = stage.getBoundingClientRect();
      if (!r.width || !r.height) return;
      var ar = 16 / 9;
      var w = r.width, h = r.height;
      if (w / h < ar) { w = h * ar; } else { h = w / ar; }
      frame.style.width = Math.ceil(w) + "px";
      frame.style.height = Math.ceil(h) + "px";
    };
    fitStage();
    window.addEventListener("resize", fitStage, { passive: true });
    window.addEventListener("orientationchange", fitStage);
    // Stats can reflow after fonts land, changing the stage height.
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitStage);
    window.addEventListener("load", fitStage);
    if (window.ResizeObserver) new ResizeObserver(fitStage).observe(stage);

    frame.src = "https://player.vimeo.com/video/" + id + "?" + params +
                (startAt ? "#t=" + startAt + "s" : "");
  })();


  /* ==========================================================================
     Services roadmap - an ARIA tablist over the production pipeline, plus a
     muted background clip that is only revealed once the section is in view.
     ======================================================================== */
  (function roadmap() {
    var section = $(".roadmap-section");
    if (!section) return;

    var steps  = $$(".step", section);
    var phases = $$(".phase", section);
    var fill   = $(".roadmap__fill", section);
    var prev   = $("[data-road-prev]", section);
    var next   = $("[data-road-next]", section);
    if (!steps.length || steps.length !== phases.length) return;

    var current = 0;

    var go = function (n, focus) {
      n = clamp(n, 0, steps.length - 1);
      current = n;

      steps.forEach(function (s, i) {
        var on = i === n;
        s.classList.toggle("is-active", on);
        s.classList.toggle("is-done", i < n);
        s.setAttribute("aria-selected", on ? "true" : "false");
        s.tabIndex = on ? 0 : -1;
        if (on && focus) s.focus();
      });

      phases.forEach(function (p, i) {
        var on = i === n;
        p.hidden = !on;
        p.classList.toggle("is-active", on);
        p.classList.remove("is-entering");
        if (on && !reduceMotion) {
          // reflow so the entry animation replays on every change
          void p.offsetWidth;
          p.classList.add("is-entering");
        }
      });

      if (fill) {
        fill.style.height = steps.length > 1
          ? (n / (steps.length - 1) * 100) + "%"
          : "100%";
      }
      if (prev) prev.disabled = n === 0;
      if (next) next.disabled = n === steps.length - 1;
    };

    var panelsEl = $(".roadmap__panels", section);
    steps.forEach(function (s, i) {
      s.addEventListener("click", function () {
        go(i);
        // Stacked layout puts the panel below the rail, so bring it into view
        // rather than leaving the tap looking like it did nothing.
        if (panelsEl && window.matchMedia("(max-width: 1100px)").matches) {
          panelsEl.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" });
        }
      });
    });

    /* Roving-tabindex keyboard support, per the ARIA tabs pattern */
    $(".roadmap__steps", section).addEventListener("keydown", function (e) {
      var map = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
      if (map[e.key]) {
        e.preventDefault();
        go((current + map[e.key] + steps.length) % steps.length, true);
      } else if (e.key === "Home") {
        e.preventDefault(); go(0, true);
      } else if (e.key === "End") {
        e.preventDefault(); go(steps.length - 1, true);
      }
    });

    if (prev) prev.addEventListener("click", function () { go(current - 1); });
    if (next) next.addEventListener("click", function () { go(current + 1); });

    go(0);

    mountBgVideo(section, ".roadmap__frame");
  })();

  /* ==========================================================================
     Muted background clips for full-width sections. Loaded only when the
     section nears the viewport, so visitors who never scroll there pay
     nothing for them.
     ======================================================================== */
  function mountBgVideo(section, frameSelector) {
    if (!section) return;
    var frame = $(frameSelector, section);
    var id = section.dataset.videoId;
    if (!frame || !id) return;
    // Skipped on small screens: YouTube keeps its own centred touch controls
    // visible there, and a decorative background loop is not worth the data.
    if (!window.matchMedia("(min-width: 861px)").matches || reduceMotion) return;

    var io = new IntersectionObserver(function (entries, obs) {
      if (!entries[0].isIntersecting) return;
      obs.disconnect();
      var start = section.dataset.videoStart || "0";
      frame.src = "https://www.youtube-nocookie.com/embed/" + id +
        "?autoplay=1&mute=1&controls=0&loop=1&playlist=" + id +
        "&start=" + start +
        "&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0&cc_load_policy=0";
      // Held back until the player is past its own start-up overlay.
      frame.addEventListener("load", function () {
        window.setTimeout(function () { section.classList.add("video-ready"); }, 2200);
      });
    }, { rootMargin: "300px 0px" });
    io.observe(section);
  }

  mountBgVideo($(".contact-section"), ".contact__frame");

  /* ==========================================================================
     Scroll-linked work: progress bar, nav state, parallax.
     One listener, one rAF, all readers batched.
     ======================================================================== */
  (function scrollEngine() {
    var bar = $(".scroll-progress");
    var parallaxEls = $$("[data-parallax]").map(function (el) {
      return { el: el, speed: parseFloat(el.dataset.parallax) || 0.2 };
    });
    var ticking = false;

    var update = function () {
      var y = window.scrollY;
      var vh = window.innerHeight;

      if (bar) {
        var max = document.documentElement.scrollHeight - vh;
        bar.style.transform = "scaleX(" + (max > 0 ? clamp(y / max, 0, 1) : 0) + ")";
      }

      if (nav) {
        nav.classList.toggle("scrolled", y > 24);
        nav.classList.toggle("hidden", y > vh * 0.9 && y > lastY + 4 && !document.body.classList.contains("menu-open"));
      }
      lastY = y;

      if (!reduceMotion) {
        parallaxEls.forEach(function (p) {
          var rect = p.el.getBoundingClientRect();
          if (rect.bottom < -200 || rect.top > vh + 200) return;
          var offset = (rect.top + rect.height / 2 - vh / 2) * p.speed;
          p.el.style.transform = "translate3d(0," + offset.toFixed(2) + "px,0)";
        });

      }
      ticking = false;
    };

    var onScroll = function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
  })();

  /* ==========================================================================
     Film cards - hover cycles the project's stills into a moving preview.
     Drop a `data-preview` (mp4/webm) on a card to use real footage instead.
     ======================================================================== */
  (function filmPreviews() {
    $$(".film").forEach(function (card) {
      var media = $(".film__media", card);
      if (!media) return;

      /* Optional real video preview */
      var src = card.dataset.preview;
      if (src && !reduceMotion) {
        var vid = document.createElement("video");
        vid.className = "film__video";
        vid.muted = true; vid.loop = true; vid.playsInline = true; vid.preload = "none";
        vid.setAttribute("muted", ""); vid.setAttribute("playsinline", "");
        media.appendChild(vid);
        card.addEventListener("mouseenter", function () {
          if (!vid.src) vid.src = src;
          var p = vid.play();
          if (p && p.then) p.then(function () { vid.classList.add("ready"); }).catch(function () {});
        });
        card.addEventListener("mouseleave", function () {
          vid.classList.remove("ready");
          vid.pause();
        });
        return;
      }

      /* Still-sequence preview */
      var shots = $$(".film__img", card);
      var dots = $$(".film__dots i", card);
      if (shots.length < 2 || reduceMotion) return;
      var i = 0, timer = null;

      var show = function (n) {
        shots[i].classList.remove("is-active");
        if (dots[i]) dots[i].classList.remove("on");
        i = n % shots.length;
        shots[i].classList.add("is-active");
        if (dots[i]) dots[i].classList.add("on");
      };

      card.addEventListener("mouseenter", function () {
        window.clearInterval(timer);
        timer = window.setInterval(function () { show(i + 1); }, 1100);
      });
      card.addEventListener("mouseleave", function () {
        window.clearInterval(timer);
        show(0);
      });
    });
  })();

  /* ==========================================================================
     Magnetic buttons - the CTA leans toward the cursor.
     ======================================================================== */
  (function magnetic() {
    if (!finePointer || reduceMotion) return;
    $$("[data-magnetic]").forEach(function (el) {
      var strength = parseFloat(el.dataset.magnetic) || 0.28;
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        var dx = (e.clientX - (r.left + r.width / 2)) * strength;
        var dy = (e.clientY - (r.top + r.height / 2)) * strength;
        el.style.transform = "translate(" + dx.toFixed(1) + "px," + dy.toFixed(1) + "px)";
      });
      el.addEventListener("mouseleave", function () { el.style.transform = ""; });
    });
  })();

  /* ==========================================================================
     Project carousels (projects page)
     ======================================================================== */
  $$(".project__slides").forEach(function (wrap) {
    var slidesEl = $$(".project__slide", wrap);
    var media = wrap.closest(".project__media");
    var dots = media ? $$(".project__dots button", media) : [];
    if (slidesEl.length < 2) return;
    var idx = 0, timer;
    var go = function (n) {
      slidesEl[idx].classList.remove("is-active");
      if (dots[idx]) dots[idx].classList.remove("active");
      idx = (n + slidesEl.length) % slidesEl.length;
      slidesEl[idx].classList.add("is-active");
      if (dots[idx]) dots[idx].classList.add("active");
    };
    var start = function () { if (!reduceMotion) timer = window.setInterval(function () { go(idx + 1); }, 4600); };
    var stop = function () { window.clearInterval(timer); };
    dots.forEach(function (d, n) { d.addEventListener("click", function () { stop(); go(n); start(); }); });
    if (media) { media.addEventListener("mouseenter", stop); media.addEventListener("mouseleave", start); }
    start();
  });

  /* ==========================================================================
     Project filtering (projects page)
     ======================================================================== */
  (function filters() {
    var btns = $$(".filter");
    var projects = $$(".project");
    if (!btns.length || !projects.length) return;
    btns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        btns.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        var f = (btn.dataset.filter || "").toLowerCase();
        projects.forEach(function (p) {
          var tags = (p.dataset.genres || "").toLowerCase();
          p.classList.toggle("is-hidden", !(f === "all" || tags.indexOf(f) > -1));
        });
      });
    });
  })();

  /* ==========================================================================
     Gallery lightbox
     ======================================================================== */
  (function lightbox() {
    var items = $$("[data-lightbox]");
    var lb = $("#lightbox");
    if (!items.length || !lb) return;
    var imgEl = $(".lightbox__img", lb);
    var sources = items.map(function (a) { return a.getAttribute("href") || a.dataset.full; });
    var cur = 0;
    var open = function (n) {
      cur = n; imgEl.src = sources[cur];
      lb.classList.add("open");
      lb.setAttribute("aria-hidden", "false");
      document.body.classList.add("is-locked");
    };
    var close = function () {
      lb.classList.remove("open");
      lb.setAttribute("aria-hidden", "true");
      document.body.classList.remove("is-locked");
    };
    var move = function (d) { cur = (cur + d + sources.length) % sources.length; imgEl.src = sources[cur]; };
    items.forEach(function (a, n) { a.addEventListener("click", function (e) { e.preventDefault(); open(n); }); });
    $(".lightbox__close", lb).addEventListener("click", close);
    $(".lightbox__nav.prev", lb).addEventListener("click", function () { move(-1); });
    $(".lightbox__nav.next", lb).addEventListener("click", function () { move(1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    });
  })();

  /* ---------- Footer year ---------- */
  $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
