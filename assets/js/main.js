/* i-Phoenix — interactions & motion. No dependencies. */
(function () {
  "use strict";

  var doc = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /* ---------- Decorative vectors ----------
     Sections with [data-deco="hero|wave|corner-tr|corner-tl|corner-br|corner-bl"]
     get an animated SVG layer behind their content. Groups with .px and
     data-depth drift with scroll (and with the cursor in the hero). */
  var MINT = "#5fd1a5", GREEN = "#023a33";
  var SPLINE = 'calcMode="spline" keyTimes="0;.33;.66;1" keySplines=".45 0 .55 1;.45 0 .55 1;.45 0 .55 1"';

  function morph(fill, a, b, c, dur) {
    return '<path fill="' + fill + '" d="' + a + '"><animate attributeName="d" dur="' + dur + 's" repeatCount="indefinite" ' +
      SPLINE + ' values="' + a + ";" + b + ";" + c + ";" + a + '"/></path>';
  }
  function plus(x, y, cls, color, op) {
    return '<g transform="translate(' + x + " " + y + ')"><path class="' + cls + '" d="M-9 0H9M0 -9V9" stroke="' + color + '" stroke-opacity="' + op + '" stroke-width="2.4" stroke-linecap="round"/></g>';
  }
  function ring(x, y, r, cls, color, op) {
    return '<g transform="translate(' + x + " " + y + ')"><circle class="' + cls + '" r="' + r + '" fill="none" stroke="' + color + '" stroke-opacity="' + op + '" stroke-width="2"/></g>';
  }
  function tri(x, y, cls, color, op) {
    return '<g transform="translate(' + x + " " + y + ')"><path class="' + cls + '" d="M0 -12L11 8H-11Z" fill="none" stroke="' + color + '" stroke-opacity="' + op + '" stroke-width="2" stroke-linejoin="round"/></g>';
  }
  function square(x, y, cls, color, op) {
    return '<g transform="translate(' + x + " " + y + ')"><rect class="' + cls + '" x="-8" y="-8" width="16" height="16" rx="3" fill="none" stroke="' + color + '" stroke-opacity="' + op + '" stroke-width="2"/></g>';
  }

  var DECO = {
    hero: function (id) {
      return '<svg viewBox="0 0 1440 820" preserveAspectRatio="xMidYMid slice">' +
        '<defs>' +
          '<radialGradient id="' + id + 'g1" cx=".5" cy=".45" r=".6"><stop offset="0" stop-color="' + MINT + '" stop-opacity=".55"/><stop offset="1" stop-color="' + MINT + '" stop-opacity="0"/></radialGradient>' +
          '<radialGradient id="' + id + 'g2" cx=".5" cy=".5" r=".6"><stop offset="0" stop-color="' + MINT + '" stop-opacity=".28"/><stop offset="1" stop-color="' + MINT + '" stop-opacity="0"/></radialGradient>' +
          '<pattern id="' + id + 'dots" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.6" fill="' + GREEN + '" fill-opacity=".16"/></pattern>' +
          '<linearGradient id="' + id + 'fade" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>' +
          '<mask id="' + id + 'm"><rect width="1440" height="820" fill="url(#' + id + 'fade)"/></mask>' +
        '</defs>' +
        '<g class="px" data-depth="50">' + morph("url(#" + id + "g1)",
          "M1130 40C1290 40 1420 150 1410 300C1400 450 1280 560 1130 550C980 540 860 440 870 290C880 140 970 40 1130 40Z",
          "M1150 60C1320 30 1440 180 1400 320C1360 460 1250 580 1100 540C950 500 850 400 880 260C910 120 980 90 1150 60Z",
          "M1120 20C1270 50 1400 120 1420 270C1440 420 1310 520 1170 560C1030 600 900 460 890 320C880 180 970 -10 1120 20Z", 16) + '</g>' +
        '<g class="px" data-depth="30">' + morph("url(#" + id + "g2)",
          "M150 520C270 520 360 600 350 710C340 820 250 900 140 890C30 880 -60 800 -50 690C-40 580 30 520 150 520Z",
          "M170 540C300 510 380 620 360 730C340 840 230 890 120 870C10 850 -70 780 -40 670C-10 560 40 570 170 540Z",
          "M130 500C250 530 350 580 370 690C390 800 280 880 160 900C40 920 -50 820 -60 710C-70 600 10 470 130 500Z", 19) + '</g>' +
        '<g class="px" data-depth="-25"><rect x="36" y="70" width="290" height="200" fill="url(#' + id + 'dots)"/></g>' +
        '<g class="px" data-depth="-40"><rect x="1080" y="620" width="260" height="160" fill="url(#' + id + 'dots)"/></g>' +
        '<g class="px" data-depth="35">' +
          '<g class="d-spin" style="transform-origin:1240px 600px"><circle cx="1240" cy="600" r="150" fill="none" stroke="' + GREEN + '" stroke-opacity=".12" stroke-width="1.5" stroke-dasharray="4 9"/></g>' +
          '<g class="d-spin-rev" style="transform-origin:1240px 600px"><circle cx="1240" cy="600" r="230" fill="none" stroke="' + MINT + '" stroke-opacity=".6" stroke-width="2" stroke-dasharray="1 12" stroke-linecap="round"/></g>' +
          '<circle cx="1240" cy="600" r="310" fill="none" stroke="' + GREEN + '" stroke-opacity=".06"/>' +
          '<g class="d-orbit" style="transform-origin:1240px 600px"><circle cx="1240" cy="370" r="6" fill="' + MINT + '"/></g>' +
        '</g>' +
        '<g mask="url(#' + id + 'm)">' +
          '<path d="M-20 640C200 560 420 720 720 640S1180 560 1460 650" fill="none" stroke="' + MINT + '" stroke-opacity=".55" stroke-width="1.6"/>' +
          '<path class="d-flow" d="M-20 690C260 620 460 770 760 690S1220 610 1460 710" fill="none" stroke="' + GREEN + '" stroke-opacity=".18" stroke-width="1.4"/>' +
          '<path class="d-flow-slow" d="M-20 740C300 680 520 820 820 740S1260 670 1460 770" fill="none" stroke="' + MINT + '" stroke-opacity=".7" stroke-width="2" stroke-linecap="round"/>' +
          '<path class="d-comet" pathLength="1" d="M-20 640C200 560 420 720 720 640S1180 560 1460 650" fill="none" stroke="' + MINT + '" stroke-width="3" stroke-linecap="round"/>' +
          '<path class="d-comet-2" pathLength="1" d="M-20 690C260 620 460 770 760 690S1220 610 1460 710" fill="none" stroke="' + GREEN + '" stroke-opacity=".5" stroke-width="2.4" stroke-linecap="round"/>' +
        '</g>' +
        '<g class="px" data-depth="80">' +
          plus(170, 470, "d-float", GREEN, ".3") + plus(760, 90, "d-float-2", MINT, ".9") + plus(1380, 140, "d-float-3", GREEN, ".25") +
          ring(640, 760, 9, "d-float-2", MINT, ".9") + ring(980, 120, 6, "d-float", GREEN, ".3") +
          tri(1010, 740, "d-tilt", GREEN, ".3") + tri(90, 330, "d-float-3", MINT, ".9") +
          square(1400, 420, "d-float", MINT, ".9") + square(560, 40, "d-tilt", GREEN, ".22") +
          '<circle class="d-twinkle" cx="880" cy="250" r="3" fill="' + MINT + '"/>' +
          '<circle class="d-twinkle" style="animation-delay:1s" cx="300" cy="620" r="3" fill="' + MINT + '"/>' +
          '<circle class="d-twinkle" style="animation-delay:2s" cx="1330" cy="300" r="2.5" fill="' + GREEN + '"/>' +
        '</g>' +
      '</svg>';
    },

    corner: function (id) {
      return '<svg viewBox="0 0 560 560">' +
        '<defs><pattern id="' + id + 'dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.5" fill="' + GREEN + '" fill-opacity=".16"/></pattern></defs>' +
        '<g class="px" data-depth="40">' + morph(MINT,
          "M280 120C380 120 450 190 445 285C440 380 370 445 275 440C180 435 115 370 120 275C125 180 180 120 280 120Z",
          "M290 130C400 110 460 210 440 300C420 390 350 460 260 430C170 400 110 350 125 260C140 170 180 150 290 130Z",
          "M270 110C370 130 440 170 450 270C460 370 390 440 290 450C190 460 120 380 115 290C110 200 170 90 270 110Z", 14)
          .replace('<path ', '<path fill-opacity=".16" ') + '</g>' +
        '<g class="px" data-depth="-20"><rect x="40" y="320" width="200" height="180" fill="url(#' + id + 'dots)"/></g>' +
        '<g class="px" data-depth="20">' +
          '<g class="d-spin" style="transform-origin:280px 280px"><circle cx="280" cy="280" r="160" fill="none" stroke="' + GREEN + '" stroke-opacity=".14" stroke-width="1.5" stroke-dasharray="4 9"/></g>' +
          '<g class="d-spin-rev" style="transform-origin:280px 280px"><circle cx="280" cy="280" r="220" fill="none" stroke="' + MINT + '" stroke-opacity=".7" stroke-width="2" stroke-dasharray="1 12" stroke-linecap="round"/></g>' +
          '<circle cx="280" cy="280" r="270" fill="none" stroke="' + GREEN + '" stroke-opacity=".07"/>' +
          '<g class="d-orbit" style="transform-origin:280px 280px"><circle cx="280" cy="60" r="6" fill="' + MINT + '"/></g>' +
        '</g>' +
        '<g class="px" data-depth="60">' +
          plus(110, 140, "d-float", GREEN, ".3") + ring(450, 420, 8, "d-float-2", MINT, ".9") +
          tri(430, 120, "d-tilt", GREEN, ".28") + square(150, 470, "d-float-3", MINT, ".9") +
        '</g>' +
      '</svg>';
    },

    wave: function (id) {
      return '<svg viewBox="0 0 1440 320" preserveAspectRatio="xMidYMax slice">' +
        '<defs><linearGradient id="' + id + 'fade" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>' +
        '<mask id="' + id + 'm"><rect width="1440" height="320" fill="url(#' + id + 'fade)"/></mask></defs>' +
        '<g mask="url(#' + id + 'm)">' +
          '<path d="M-20 200C240 120 480 280 720 200S1200 120 1460 210" fill="none" stroke="' + MINT + '" stroke-opacity=".5" stroke-width="1.6"/>' +
          '<path class="d-flow" d="M-20 245C260 180 500 320 780 245S1240 170 1460 260" fill="none" stroke="' + GREEN + '" stroke-opacity=".15" stroke-width="1.4"/>' +
          '<path class="d-flow-slow" d="M-20 290C300 230 540 360 840 290S1280 220 1460 310" fill="none" stroke="' + MINT + '" stroke-opacity=".6" stroke-width="2" stroke-linecap="round"/>' +
          '<path class="d-comet" pathLength="1" d="M-20 200C240 120 480 280 720 200S1200 120 1460 210" fill="none" stroke="' + MINT + '" stroke-width="3" stroke-linecap="round"/>' +
        '</g>' +
        '<g class="px" data-depth="40">' + plus(120, 90, "d-float", GREEN, ".28") + ring(1320, 80, 8, "d-float-2", MINT, ".9") + tri(700, 60, "d-tilt", GREEN, ".25") + '</g>' +
      '</svg>';
    }
  };

  var decoN = 0;
  $$("[data-deco]").forEach(function (section) {
    var kind = section.getAttribute("data-deco");
    var pos = "";
    if (kind.indexOf("corner-") === 0) { pos = kind.slice(7); kind = "corner"; }
    if (!DECO[kind]) return;
    var layer = document.createElement("div");
    layer.className = "deco deco-" + kind + (pos ? " deco-" + pos : "");
    layer.setAttribute("aria-hidden", "true");
    layer.innerHTML = DECO[kind]("deco" + (++decoN) + "-");
    section.insertBefore(layer, section.firstChild);
  });

  var pointer = { x: 0, y: 0 };
  var decoLayers = reduceMotion ? [] : $$(".deco").map(function (layer) {
    return {
      section: layer.parentNode,
      isHero: layer.classList.contains("deco-hero"),
      groups: $$(".px", layer).map(function (g) { return { el: g, depth: parseFloat(g.getAttribute("data-depth")) || 0 }; })
    };
  });
  function updateDeco() {
    var vh = window.innerHeight;
    decoLayers.forEach(function (d) {
      var r = d.section.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      var p = (r.top + r.height / 2 - vh / 2) / vh; // ~ -1 … 1 while on screen
      d.groups.forEach(function (g) {
        var x = d.isHero ? pointer.x * g.depth * 0.6 : 0;
        var y = p * g.depth + (d.isHero ? pointer.y * g.depth * 0.6 : 0);
        g.el.style.transform = "translate(" + x.toFixed(1) + "px," + y.toFixed(1) + "px)";
      });
    });
  }

  /* ---------- Header: scroll state + progress bar ---------- */
  var header = $(".site-header");
  var progress = $(".scroll-progress");
  var ticking = false;
  function onScroll() {
    var max = doc.scrollHeight - window.innerHeight;
    var p = max > 0 ? window.scrollY / max : 0;
    if (progress) progress.style.setProperty("--progress", p.toFixed(4));
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 12);
    updateDeco();
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var toggle = $(".menu-toggle");
  var nav = $("#site-nav");
  if (toggle && nav) {
    var setOpen = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
    };
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    $$("a", nav).forEach(function (a) { a.addEventListener("click", function () { setOpen(false); }); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setOpen(false); });
  }

  /* ---------- Stagger: .reveal children of [data-stagger] get increasing delays ---------- */
  $$("[data-stagger]").forEach(function (group) {
    var step = parseFloat(group.getAttribute("data-stagger")) || 0.08;
    $$(".reveal", group).forEach(function (el, i) {
      el.style.setProperty("--d", (i * step).toFixed(2) + "s");
    });
  });

  /* ---------- Count-up numbers ---------- */
  function countUp(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    if (isNaN(target)) return;
    if (reduceMotion) { el.textContent = target; return; }
    var start = parseFloat(el.getAttribute("data-from")) || 0;
    var dur = 1600;
    var t0 = null;
    function frame(t) {
      if (t0 === null) t0 = t;
      var k = Math.min((t - t0) / dur, 1);
      var eased = 1 - Math.pow(1 - k, 4);
      el.textContent = Math.round(start + (target - start) * eased);
      if (k < 1) window.requestAnimationFrame(frame);
    }
    window.requestAnimationFrame(frame);
  }

  /* ---------- Reveal on scroll ---------- */
  var revealables = $$(".reveal, .steps-wrap");
  function reveal(el) {
    el.classList.add("is-in");
    if (el.classList.contains("reveal")) {
      var done = function (e) {
        if (e.target !== el) return;
        el.classList.add("revealed");
        el.removeEventListener("transitionend", done);
      };
      el.addEventListener("transitionend", done);
    }
    $$("[data-count]", el).forEach(countUp);
  }
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { reveal(entry.target); io.unobserve(entry.target); }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    revealables.forEach(function (el) { io.observe(el); });
  } else {
    revealables.forEach(reveal);
  }

  /* ---------- Active nav link ---------- */
  var navLinks = $$(".nav-links a[href^='#']");
  if ("IntersectionObserver" in window && navLinks.length) {
    var byId = {};
    navLinks.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) { a.classList.remove("is-active"); });
        var link = byId[entry.target.id];
        if (link) link.classList.add("is-active");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(byId).concat("top").forEach(function (id) {
      var section = document.getElementById(id);
      if (section) spy.observe(section);
    });
  }

  /* ---------- Typing code window ---------- */
  var code = $(".code-body[data-type]");
  if (code && !reduceMotion) {
    // Flatten the final markup into [{cls, text}] runs, then type it back in.
    var runs = [];
    Array.prototype.forEach.call(code.childNodes, function (node) {
      if (node.nodeType === 3) runs.push({ cls: "", text: node.textContent });
      else if (node.nodeType === 1) runs.push({ cls: node.className, text: node.textContent });
    });
    code.textContent = "";
    var caret = document.createElement("span");
    caret.className = "caret";
    caret.setAttribute("aria-hidden", "true");
    code.appendChild(caret);

    var r = 0, c = 0, current = null;
    var typeNext = function () {
      if (r >= runs.length) return;
      var run = runs[r];
      if (!current) {
        current = run.cls ? document.createElement("span") : document.createTextNode("");
        if (run.cls) current.className = run.cls;
        code.insertBefore(current, caret);
      }
      var ch = run.text.charAt(c);
      if (run.cls) current.textContent += ch; else current.data += ch;
      c++;
      if (c >= run.text.length) { r++; c = 0; current = null; }
      window.setTimeout(typeNext, ch === "\n" ? 140 : 18 + Math.random() * 30);
    };
    window.setTimeout(typeNext, 700);
  }

  /* ---------- Pointer effects (desktop only) ---------- */
  if (finePointer && !reduceMotion) {
    // Spotlight that follows the cursor
    $$(".spot").forEach(function (el) {
      el.addEventListener("pointermove", function (e) {
        var b = el.getBoundingClientRect();
        el.style.setProperty("--mx", (e.clientX - b.left) + "px");
        el.style.setProperty("--my", (e.clientY - b.top) + "px");
      });
    });

    // 3D tilt
    $$("[data-tilt]").forEach(function (el) {
      var max = parseFloat(el.getAttribute("data-tilt")) || 6;
      el.addEventListener("pointermove", function (e) {
        var b = el.getBoundingClientRect();
        var x = (e.clientX - b.left) / b.width - 0.5;
        var y = (e.clientY - b.top) / b.height - 0.5;
        el.style.transition = "transform .1s linear, box-shadow .4s ease";
        el.style.transform = "perspective(900px) rotateX(" + (-y * max).toFixed(2) + "deg) rotateY(" + (x * max).toFixed(2) + "deg) translateY(-4px)";
      });
      el.addEventListener("pointerleave", function () {
        el.style.transition = "transform .7s cubic-bezier(.16,1,.3,1), box-shadow .4s ease";
        el.style.transform = "";
      });
    });

    // Magnetic buttons
    $$(".magnetic").forEach(function (el) {
      el.addEventListener("pointermove", function (e) {
        var b = el.getBoundingClientRect();
        var x = e.clientX - b.left - b.width / 2;
        var y = e.clientY - b.top - b.height / 2;
        el.style.transform = "translate(" + (x * 0.2).toFixed(1) + "px," + (y * 0.3).toFixed(1) + "px)";
      });
      el.addEventListener("pointerleave", function () { el.style.transform = ""; });
    });

    // Hero vectors follow the cursor a little (layered by data-depth)
    var hero = $(".hero");
    if (hero) {
      hero.addEventListener("pointermove", function (e) {
        pointer.x = e.clientX / window.innerWidth - 0.5;
        pointer.y = e.clientY / window.innerHeight - 0.5;
        updateDeco();
      });
      hero.addEventListener("pointerleave", function () { pointer.x = 0; pointer.y = 0; updateDeco(); });
    }
  }

  /* ---------- Contact form → pre-filled email ---------- */
  var form = $("#contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var en = doc.lang === "en";
      var data = new FormData(form);
      var get = function (k) { return (data.get(k) || "").toString().trim(); };
      var fields = en
        ? [["Name", "name"], ["Email", "email"], ["Phone", "phone"], ["Need", "type"], ["Budget", "budget"]]
        : [["Họ tên", "name"], ["Email", "email"], ["Điện thoại / Zalo", "phone"], ["Nhu cầu", "type"], ["Ngân sách", "budget"]];
      var lines = fields
        .filter(function (f) { return get(f[1]); })
        .map(function (f) { return f[0] + ": " + get(f[1]); });
      var body = lines.join("\n") + "\n\n" + get("message");
      var subject = (en ? "New project: " : "Dự án mới: ") + get("type") + " — " + get("name");
      window.location.href = "mailto:" + form.getAttribute("data-mailto") +
        "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      var status = $(".form-status", form);
      if (status) status.classList.add("is-visible");
    });
  }

  /* ---------- Announcement bar: cycle messages, pause on hover ---------- */
  var rotator = $("[data-rotate]");
  if (rotator && !reduceMotion) {
    var notes = $$("li", rotator);
    var noteIdx = 0, paused = false;
    rotator.addEventListener("pointerenter", function () { paused = true; });
    rotator.addEventListener("pointerleave", function () { paused = false; });
    if (notes.length > 1) {
      window.setInterval(function () {
        if (paused || document.hidden) return;
        notes[noteIdx].classList.remove("is-active");
        noteIdx = (noteIdx + 1) % notes.length;
        notes[noteIdx].classList.add("is-active");
      }, 4800);
    }
  }

  /* ---------- Year ---------- */
  $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
