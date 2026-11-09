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
  $("name").textContent = SITE.name;
  $("tagline").textContent = SITE.tagline;
  $("location").textContent = SITE.location;

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
})();
