(function () {
  var ICONS = {
    bag: '<path d="M6 7h12l1 13H5L6 7z"/><path d="M9 7a3 3 0 016 0"/>',
    code: '<path d="M8 8l-4 4 4 4M16 8l4 4-4 4M14 5l-4 14"/>',
    speed: '<path d="M13 3L5 14h6l-1 7 8-11h-6l1-7z"/>',
    app: '<rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><path d="M16.5 13v7M13 16.5h7"/>',
    move: '<path d="M4 12h14M13 7l5 5-5 5"/>',
    tools: '<path d="M14.5 6.5a4 4 0 00-5 5L4 17l3 3 5.5-5.5a4 4 0 005-5l-2.5 2.5-2-2 2.5-2.5z"/>'
  };
  function $(id) { return document.getElementById(id); }
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function txt(id, v) { var e = $(id); if (e) e.textContent = v || ''; }
  function fill(id, items, build) { var box = $(id); (items || []).forEach(function (i) { box.appendChild(build(i)); }); }

  fetch('data/home.json').then(function (r) { return r.json(); }).then(function (d) {
    var h = d.hero || {}, a = d.about || {}, cs = d.case_study || {}, c = d.contact || {};
    document.title = (d.site_name || 'Landing Page') + ' | Shopify Store Development';
    txt('site_name', d.site_name);
    txt('hero_title', h.title); txt('hero_text', h.text);
    txt('hero_btn', h.button_text); txt('hero_link', h.secondary_text);
    $('hero_btn').href = '#contact';
    if (h.image) {      var img = el('img');      img.src = /^https?:/.test(h.image) ? h.image : 'images/' + h.image.replace(/^\/+/, '').replace(/^images\//, '');      img.alt = h.title || '';      $('hero_visual').replaceChildren(img);    }

    fill('stats', d.stats, function (s) { var x = el('div', 'stat'); x.append(el('b', '', s.value), el('span', '', s.label)); return x; });

    txt('about_title', a.title); txt('about_text', a.text);
    fill('about_points', a.points, function (p) { return el('li', '', p); });

    txt('services_title', d.services_title);
    fill('services', d.services, function (s) {
      var x = el('div', 'card'), i = el('div', 'ico');
      i.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[s.icon] || ICONS.bag) + '</svg>';
      x.append(i, el('h3', '', s.title), el('p', '', s.description)); return x;
    });

    txt('testimonials_title', d.testimonials_title);
    fill('testimonials', d.testimonials, function (t) {
      var x = el('div', 'card quote'); x.append(el('p', '', '\u201C' + t.quote + '\u201D'), el('b', '', t.name), el('span', '', t.role)); return x;
    });

    txt('cs_title', cs.title); txt('cs_client', cs.client); txt('cs_challenge', cs.challenge); txt('cs_solution', cs.solution);
    fill('cs_results', cs.results, function (r) { var x = el('div', 'res'); x.append(el('b', '', r.value), el('span', '', r.label)); return x; });

    txt('why_title', d.why_title);
    fill('why', d.why, function (w) { var x = el('div', 'card'); x.append(el('h3', '', w.title), el('p', '', w.description)); return x; });

    txt('contact_title', c.title); txt('contact_text', c.text); txt('contact_btn', c.button_text);
    var sel = $('service_select');
    (d.services || []).forEach(function (s) { var o = el('option', '', s.title); o.value = s.title; sel.appendChild(o); });
    sel.appendChild(el('option', '', 'Other'));
    txt('footer_text', d.footer_text);

    $('wa_form').addEventListener('submit', function (e) {
      e.preventDefault();
      var f = e.target;
      var msg = 'Hello ' + (d.site_name || '') + ',\n' +
        'Name: ' + f.name.value + '\n' +
        (f.email.value ? 'Email: ' + f.email.value + '\n' : '') +
        'Service: ' + f.service.value + '\n' +
        'Message: ' + f.message.value;
      window.open('https://wa.me/' + String(d.whatsapp_number).replace(/\D/g, '') + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
    });
  }).catch(function () { txt('hero_title', 'Content could not be loaded. Open this site from a web server, not as a local file.'); });
})();
