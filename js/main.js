(function () {
  var P = document.body.dataset.page;
  var NAV = [['index.html', 'Home', 'home'], ['services.html', 'Our Services', 'services'], ['case-study.html', 'Case Study', 'case'], ['about.html', 'About Us', 'about'], ['contact.html', 'Contact Us', 'contact']];
  var FILES = { home: 'home', services: 'services', case: 'case-study', about: 'about', contact: 'contact' };
  var ICONS = {
    design: '<rect x="3" y="4" width="18" height="14" rx="2"/><path d="M3 9h18M8 21h8M12 18v3"/>',
    code: '<path d="M8 8l-4 4 4 4M16 8l4 4-4 4M14 5l-4 14"/>',
    plug: '<path d="M9 3v5M15 3v5M6 8h12v3a6 6 0 01-12 0V8zM12 17v4"/>',
    cart: '<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M3 4h3l2.5 11h10L21 8H7"/>',
    speed: '<path d="M13 3L5 14h6l-1 7 8-11h-6l1-7z"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/><path d="M9 12l2 2 4-4"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    pin: '<path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>'
  };
  var HERO_SVG = '<svg viewBox="0 0 480 360" role="img" aria-label="WordPress dashboard and website preview"><rect x="10" y="20" width="440" height="300" rx="14" fill="#fff" stroke="#dcdcde" stroke-width="2"/><path d="M10 34a14 14 0 0114-14h96v300H24a14 14 0 01-14-14V34z" fill="#1d2327"/><rect x="26" y="44" width="70" height="8" rx="4" fill="#72aee6"/><rect x="26" y="70" width="60" height="8" rx="4" fill="#50575e"/><rect x="26" y="92" width="66" height="8" rx="4" fill="#50575e"/><rect x="26" y="114" width="52" height="8" rx="4" fill="#50575e"/><rect x="26" y="136" width="62" height="8" rx="4" fill="#50575e"/><rect x="134" y="44" width="150" height="16" rx="8" fill="#1d2327"/><rect x="134" y="70" width="110" height="9" rx="4" fill="#dcdcde"/><rect x="134" y="92" width="92" height="30" rx="8" fill="#2271b1"/><rect x="312" y="40" width="124" height="96" rx="10" fill="#f0f6fc"/><path d="M326 122l28-36 22 26 16-14 30 24z" fill="#72aee6"/><circle cx="410" cy="62" r="8" fill="#2271b1"/><rect x="134" y="160" width="96" height="134" rx="10" fill="#f6f7f7" stroke="#e2e4e7"/><rect x="144" y="172" width="76" height="50" rx="6" fill="#dbeafe"/><rect x="144" y="234" width="56" height="8" rx="4" fill="#1d2327"/><rect x="144" y="250" width="72" height="6" rx="3" fill="#c3c4c7"/><rect x="144" y="264" width="40" height="18" rx="6" fill="#2271b1"/><rect x="244" y="160" width="96" height="134" rx="10" fill="#f6f7f7" stroke="#e2e4e7"/><rect x="254" y="172" width="76" height="50" rx="6" fill="#bfdbfe"/><rect x="254" y="234" width="56" height="8" rx="4" fill="#1d2327"/><rect x="254" y="250" width="72" height="6" rx="3" fill="#c3c4c7"/><rect x="254" y="264" width="40" height="18" rx="6" fill="#2271b1"/><rect x="354" y="160" width="82" height="134" rx="10" fill="#1d2327"/><circle cx="395" cy="200" r="24" fill="#2271b1"/><path d="M382 200l8 12 5-8 5 8 8-12" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/><rect x="368" y="240" width="54" height="7" rx="3" fill="#72aee6"/><rect x="374" y="256" width="42" height="7" rx="3" fill="#50575e"/></svg>';

  function $(id) { return document.getElementById(id); }
  function el(t, c, x) { var e = document.createElement(t); if (c) e.className = c; if (x != null) e.textContent = x; return e; }
  function kids(p, arr) { arr.forEach(function (k) { if (k) p.appendChild(k); }); return p; }
  function ico(n) { var d = el('div', 'ico'); d.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[n] || ICONS.code) + '</svg>'; return d; }
  function img(src, alt) {
    if (!src) return null;
    var i = el('img'); i.alt = alt || ''; i.loading = 'lazy';
    i.src = /^(https?:|data:)/.test(src) ? src : 'images/' + String(src).replace(/^\/+/, '').replace(/^images\//, '');
    return i;
  }
  function get(f) { return fetch('data/' + f + '.json').then(function (r) { return r.json(); }); }
  function sec(cls, title) { var s = el('section', 'sec ' + (cls || '')), w = el('div', 'wrap'); s.appendChild(w); if (title) w.appendChild(el('h2', '', title)); return { s: s, w: w }; }
  function link(text, href, cls) { var a = el('a', cls || 'btn', text); a.href = href; return a; }

  function phead(d) { var s = el('section', 'phead'), w = el('div', 'wrap'); kids(w, [el('h1', '', d.page_title), el('p', 'lead', d.intro)]); s.appendChild(w); return s; }
  function cards(items, cls) {
    var g = el('div', 'grid ' + (cls || 'g3'));
    (items || []).forEach(function (i) {
      var c = el('div', 'card');
      if (i.icon) c.appendChild(ico(i.icon));
      kids(c, [el('h3', '', i.title), el('p', '', i.description)]);
      if (i.points && i.points.length) { var u = el('ul', 'ticks'); i.points.forEach(function (p) { u.appendChild(el('li', '', p)); }); c.appendChild(u); }
      g.appendChild(c);
    });
    return g;
  }
  function stats(items) {
    var s = el('section', 'stats'), w = el('div', 'wrap');
    (items || []).forEach(function (i) { var x = el('div', 'stat'); kids(x, [el('b', '', i.value), el('span', '', i.label)]); w.appendChild(x); });
    s.appendChild(w); return s;
  }
  function steps(items) {
    var g = el('div', 'grid g4');
    (items || []).forEach(function (i, n) { var c = el('div', 'card step'); kids(c, [el('div', 'num', String(n + 1)), el('h3', '', i.title), el('p', '', i.description)]); g.appendChild(c); });
    return g;
  }
  function quotes(items) {
    var g = el('div', 'grid g2');
    (items || []).forEach(function (t) { var c = el('div', 'card quote'); kids(c, [el('p', '', '\u201C' + t.quote + '\u201D'), el('b', '', t.name), el('span', '', t.role)]); g.appendChild(c); });
    return g;
  }
  function cta(c) {
    var s = el('section', 'sec cta'), w = el('div', 'wrap');
    kids(w, [el('h2', '', c.title), el('p', '', c.text), link(c.button_text, 'contact.html', 'btn light')]);
    s.appendChild(w); return s;
  }

  var builders = {
    home: function (d) {
      var hero = el('section', 'hero'), w = el('div', 'wrap hero-in'), l = el('div'), h = d.hero || {};
      var a = el('div', 'actions'); kids(a, [link(h.button_text, 'contact.html'), link(h.secondary_text, 'case-study.html', 'btn ghost')]);
      kids(l, [el('h1', '', h.title), el('p', 'lead', h.text), a]);
      var v = el('div', 'visual'), im = img(h.image, h.title); if (im) v.appendChild(im); else v.innerHTML = HERO_SVG;
      kids(w, [l, v]); hero.appendChild(w);
      var sv = sec('', d.services_title); sv.w.appendChild(cards(d.highlights));
      var m = el('div', 'more'); m.appendChild(link(d.services_link_text, 'services.html', 'btn ghost')); sv.w.appendChild(m);
      var pr = sec('soft', d.process_title); pr.w.appendChild(steps(d.process));
      var ts = sec('', d.testimonials_title); ts.w.appendChild(quotes(d.testimonials));
      return [hero, stats(d.stats), sv.s, pr.s, ts.s, cta(d.cta)];
    },
    services: function (d) { var s = sec(''); s.w.appendChild(cards(d.services)); return [phead(d), s.s, cta(d.cta)]; },
    case: function (d) {
      var s = sec('soft');
      (d.cases || []).forEach(function (c) {
        var box = el('article', 'case'), l = el('div'), r = el('div', 'results');
        kids(l, [el('p', 'tag', c.client), el('h2', '', c.title), el('h3', '', 'The challenge'), el('p', '', c.challenge), el('h3', '', 'What we did'), el('p', '', c.solution), img(c.image, c.title)]);
        (c.results || []).forEach(function (x) { var y = el('div', 'res'); kids(y, [el('b', '', x.value), el('span', '', x.label)]); r.appendChild(y); });
        kids(box, [l, r]); s.w.appendChild(box);
      });
      return [phead(d), s.s, cta(d.cta)];
    },
    about: function (d) {
      var st = sec(''), g = el('div', 'story'), t = el('div'); t.appendChild(el('h2', '', d.story_title));
      String(d.story || '').split(/\n\s*\n/).forEach(function (p) { t.appendChild(el('p', '', p)); });
      g.appendChild(t); var im = img(d.image, d.story_title); if (im) g.appendChild(im); else g.style.gridTemplateColumns = '1fr';
      st.w.appendChild(g);
      var vs = sec('soft', d.values_title); vs.w.appendChild(cards(d.values, 'g4'));
      return [phead(d), st.s, stats(d.stats), vs.s, cta(d.cta)];
    }
  };

  function contactPage(d, site, services) {
    var s = sec(''), g = el('div', 'contact'), info = el('div', 'info');
    info.appendChild(el('h2', '', d.info_title));
    [['phone', 'Phone / WhatsApp', site.phone_display, 'https://wa.me/' + WA], ['mail', 'Email', site.email, 'mailto:' + site.email], ['clock', 'Working hours', site.hours], ['pin', 'Location', site.address]].forEach(function (x) {
      var c = el('div', 'card'), b = el('div'), v;
      if (x[3]) { v = el('a', '', x[2]); v.href = x[3]; } else v = el('span', '', x[2]);
      kids(b, [el('b', '', x[1]), v]); kids(c, [ico(x[0]), b]); info.appendChild(c);
    });
    var f = el('form', 'form'); f.innerHTML = '<h2></h2><label>Your name<input name="name" required autocomplete="name"></label><label>Email<input name="email" type="email" autocomplete="email"></label><label>What do you need?<select name="service"></select></label><label>Message<textarea name="message" rows="4" required></textarea></label><button class="btn wa" type="submit"></button>';
    f.querySelector('h2').textContent = d.form_title; f.querySelector('button').textContent = d.button_text;
    var sel = f.querySelector('select');
    (services || []).forEach(function (x) { var o = el('option', '', x.title); o.value = x.title; sel.appendChild(o); });
    sel.appendChild(el('option', '', 'Other'));
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var m = 'Hello ' + site.site_name + ',\nName: ' + f.name.value + '\n' + (f.email.value ? 'Email: ' + f.email.value + '\n' : '') + 'Service: ' + f.service.value + '\nMessage: ' + f.message.value;
      window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent(m), '_blank', 'noopener');
    });
    kids(g, [info, f]); s.w.appendChild(g);
    return [phead(d), s.s];
  }

  var WA = '';
  function frame(site) {
    var nav = $('nav'), w = el('div', 'wrap nav-in'), b = el('a', 'brand'); b.href = 'index.html';
    kids(b, [el('span', 'logo', 'WP'), el('span', '', site.site_name)]);
    var ul = el('nav', 'links'); ul.id = 'links';
    NAV.forEach(function (n) { var a = link(n[1], n[0], n[2] === P ? 'on' : ''); if (n[2] === P) a.setAttribute('aria-current', 'page'); ul.appendChild(a); });
    var bt = el('button', 'burger'); bt.setAttribute('aria-label', 'Menu'); bt.setAttribute('aria-controls', 'links'); bt.innerHTML = '<span></span>';
    bt.onclick = function () { ul.classList.toggle('open'); };
    kids(w, [b, ul, link('Get a quote', 'contact.html', 'btn sm'), bt]); nav.appendChild(w);

    var ft = $('foot'), fw = el('div', 'wrap foot-in'), c1 = el('div'), c2 = el('div'), c3 = el('div');
    var fb = el('a', 'brand'); fb.href = 'index.html'; kids(fb, [el('span', 'logo', 'WP'), el('span', '', site.site_name)]);
    kids(c1, [fb, el('p', '', site.tagline)]);
    c2.appendChild(el('h3', '', 'Pages')); NAV.forEach(function (n) { c2.appendChild(link(n[1], n[0], '')); });
    c3.appendChild(el('h3', '', 'Contact'));
    var wl = link(site.phone_display, 'https://wa.me/' + WA, ''), ml = link(site.email, 'mailto:' + site.email, '');
    kids(c3, [wl, ml, el('p', '', site.hours)]);
    kids(fw, [c1, c2, c3]);
    var bb = el('div', 'foot-b'), bw = el('div', 'wrap', site.footer_text); bb.appendChild(bw);
    kids(ft, [fw, bb]);

    var fab = el('a', 'fab'); fab.href = 'https://wa.me/' + WA; fab.target = '_blank'; fab.rel = 'noopener'; fab.setAttribute('aria-label', 'Chat on WhatsApp');
    fab.innerHTML = '<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm5.2 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8 0-1.3.7-2 1-2.2.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6-.3.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.8-.1 1.4z"/></svg>';
    document.body.appendChild(fab);
  }

  get('site').then(function (site) {
    WA = String(site.whatsapp_number || '').replace(/\D/g, '');
    frame(site);
    var app = $('app');
    return get(FILES[P]).then(function (d) {
      document.title = d.page_title + ' | ' + site.site_name;
      app.textContent = '';
      if (P === 'contact') return get('services').then(function (sv) { return contactPage(d, site, sv.services); }).then(function (secs) { kids(app, secs); });
      kids(app, builders[P](d));
    });
  }).catch(function () { $('app').textContent = 'Content could not be loaded. Please open this site from a web server (GitHub Pages, Netlify, etc.), not as a local file.'; });
})();
