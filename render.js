// Fills the page with the text from content.js. You shouldn't need to edit this.
(function () {
  const $ = (id) => document.getElementById(id);
  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };

  document.title = SITE.name;
  $("nav-name").textContent = SITE.name;
  $("name").textContent = SITE.name;
  $("tagline").textContent = SITE.tagline;
  SITE.tags.forEach((t) => $("tags").append(el("li", null, t)));

  SITE.about.forEach((p) => $("about-text").append(el("p", null, p)));
  SITE.highlights.forEach((h) => {
    const card = el("div", "highlight");
    card.append(el("strong", null, h.value), el("span", null, h.label));
    $("highlights").append(card);
  });

  SITE.experience.forEach((job) => {
    const item = el("article", "item");
    const head = el("div", "item-head");
    head.append(el("h3", null, job.role), el("span", "when", job.when));
    item.append(head, el("p", "org", [job.org, job.where].filter(Boolean).join(" · ")), el("p", null, job.summary));
    $("experience-list").append(item);
  });

  SITE.leadership.forEach((l) => {
    const card = el("article", "card");
    card.append(el("span", "when", l.when), el("h3", null, l.role), el("p", "org", l.org), el("p", null, l.summary));
    $("leadership-list").append(card);
  });

  SITE.skills.forEach((s) => $("skills").append(el("li", null, s)));
  SITE.interests.forEach((s) => $("interests").append(el("li", null, s)));

  $("contact-blurb").textContent = SITE.contact.blurb;
  $("email-link").textContent = SITE.contact.email;
  $("email-link").href = "mailto:" + SITE.contact.email;
  $("linkedin-link").href = SITE.contact.linkedin;
  $("footer").textContent = SITE.footer;
})();
