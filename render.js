// Fills the page with the text from content.js. You shouldn't need to edit this.
(function () {
  const $ = (id) => document.getElementById(id);
  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };
  const pad = (i) => String(i + 1).padStart(2, "0");

  document.title = SITE.name;
  $("brand").textContent = SITE.name;
  $("hero-label").textContent = SITE.heroLabel;
  typeName($("name"), SITE.name);
  $("tagline").textContent = SITE.tagline;
  $("location").textContent = SITE.location;
  $("photo").src = SITE.photo;
  $("photo").alt = "Portrait of " + SITE.name;

  SITE.about.forEach((p) => $("about-text").append(el("p", null, p)));
  SITE.tags.forEach((t) => $("tags").append(el("li", null, t)));

  SITE.highlights.forEach((h) => {
    const s = el("div", "stat");
    s.append(el("strong", null, h.value), el("span", null, h.label));
    $("stats").append(s);
  });

  SITE.experience.forEach((job) => {
    const row = el("article", "row");
    const meta = el("div", "row-meta");
    meta.append(el("span", "small-caps", job.when), el("span", "where", job.where));
    const body = el("div", "row-body");
    body.append(el("h3", null, job.role), el("p", "org", job.org), el("p", null, job.summary));
    row.append(meta, body);
    $("experience-list").append(row);
  });

  SITE.leadership.forEach((l, i) => {
    const col = el("article", "col");
    col.append(
      el("span", "num", pad(i)),
      el("h3", null, l.role),
      el("p", "org", l.org),
      el("p", "small-caps", l.when),
      el("p", null, l.summary)
    );
    $("leadership-list").append(col);
  });

  $("skills").textContent = SITE.skills.join("  /  ");
  $("interests").textContent = SITE.interests.join("  /  ");

  $("contact-blurb").textContent = SITE.contact.blurb;
  $("email-link").textContent = "Email";
  $("email-link").href = "mailto:" + SITE.contact.email;
  $("linkedin-link").href = SITE.contact.linkedin;
  $("footer").textContent = SITE.footer;

  // Types the name out letter by letter, then a wave rolls up the "beach",
  // washes the letters away, and pulls back out. Then it starts over.
  // Every letter is always on the page (just hidden), so nothing shifts around.
  function typeName(h1, text) {
    h1.setAttribute("aria-label", text);
    const letters = [...text].map((ch) => {
      const s = el("span", "letter", ch);
      s.setAttribute("aria-hidden", "true");
      h1.append(s);
      return s;
    });
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const hero = h1.closest(".hero");
    const wash = el("div", "wash");
    wash.setAttribute("aria-hidden", "true");
    wash.append(el("div", "crest"), el("div", "crest crest-2"));
    hero.append(wash);

    const TYPE = 140, HOLD = 2200, REST = 900;
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const render = (shown) => {
      letters.forEach((s, i) => {
        s.classList.toggle("off", i >= shown);
        s.classList.toggle("cursor", i === shown - 1);
      });
      h1.classList.toggle("empty", shown === 0);
    };

    const washAway = async () => {
      letters.forEach((s) => s.classList.remove("cursor"));
      // The water is a big sheet pinned to the top of the hero and flipped
      // so its foamy edge faces down. "reach" is how far down that edge is.
      const heroBox = hero.getBoundingClientRect();
      const nameBox = h1.getBoundingClientRect();
      const along = (x, y) => y - heroBox.top;
      const size = Math.ceil(Math.hypot(heroBox.width, heroBox.height) * 2);
      wash.style.width = wash.style.height = size + "px";
      const at = (reach) => `rotate(180deg) translate(-50%, ${-reach}px)`;
      const start = -60;
      const peak = along(nameBox.right, nameBox.bottom) + 40;
      const IN = 1900;

      const rollIn = wash.animate([{ transform: at(start) }, { transform: at(peak) }],
        { duration: IN, easing: "cubic-bezier(.33,.67,.67,1)", fill: "forwards" });
      // Each letter goes when the water reaches it.
      letters.forEach((s) => {
        const b = s.getBoundingClientRect();
        const p = (along(b.left + b.width / 2, b.top + b.height * 0.6) - start) / (peak - start);
        const t = 1 - Math.sqrt(Math.max(0, 1 - Math.min(1, p))); // undo the ease-out
        s.style.setProperty("--dx", (Math.random() * 26 + 4).toFixed(1) + "px");
        s.style.transitionDelay = Math.round(t * IN + Math.random() * 300) + "ms";
        s.classList.add("washed");
      });
      await rollIn.finished;
      await sleep(250);
      const rollOut = wash.animate([{ transform: at(peak) }, { transform: at(start) }],
        { duration: 2100, easing: "cubic-bezier(.5,0,.75,.4)", fill: "forwards" });
      await rollOut.finished;

      // Quietly reset the letters to hidden so they can be typed again.
      letters.forEach((s) => {
        s.classList.add("notrans", "off");
        s.classList.remove("washed");
        s.style.transitionDelay = "";
      });
      void h1.offsetWidth;
      letters.forEach((s) => s.classList.remove("notrans"));
    };

    (async () => {
      render(0);
      await sleep(400);
      for (;;) {
        for (let n = 1; n <= letters.length; n++) { render(n); await sleep(TYPE); }
        await sleep(HOLD);
        await washAway();
        render(0);
        await sleep(REST);
      }
    })();
  }
})();
