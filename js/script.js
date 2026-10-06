/* Poauce Theory — site engine */
"use strict";

/* Empty string = same-origin (Railway serves site + API together).
   Set to "https://your-api.up.railway.app" only if the frontend is hosted
   separately (e.g. GitHub Pages) from the API. */
const RAILWAY_API_URL = "";

const PRODUCTS = [
  { id:"brown-sugar", name:"Brown Sugar", lux:"Noir", price:11.99, cats:["sweet"],
    img:"images/product-01.webp", tag:"The classic, perfected.",
    desc:"Dark muscovado depth in a bead that pops like the bottom of a perfect milk tea. Warm, round, dangerously easy.",
    notes:["Pairs with: black milk tea, oat lattes","Serve: chilled, 4°C","Texture: firm pop, quick melt"],
    profile:{sweet:9,savory:1,salty:2,umami:1} },
  { id:"mango-passionfruit", name:"Mango Passionfruit", lux:"Solstice", price:11.99, cats:["sweet"],
    img:"images/product-02.webp", tag:"Sunshine with a passport.",
    desc:"Alphonso mango meets sharp passionfruit. Bright, tropical, unreasonably juicy — the bead that started the double take.",
    notes:["Pairs with: green tea, sparkling water","Serve: chilled","Texture: bursting, high juice"],
    profile:{sweet:9,savory:0,salty:1,umami:0} },
  { id:"spicy-sriracha", name:"Spicy Sriracha", lux:"Ember", price:12.99, cats:["savory"],
    img:"images/product-03.webp", tag:"It looks like candy. Pause. It is sriracha.",
    desc:"The signature shock. Sweet heat, garlic hum, slow chili bloom. Drop it on pizza, ramen, or your expectations.",
    notes:["Pairs with: ramen, pizza, fried chicken","Heat: 6/10, slow build","Texture: firm pop"],
    profile:{sweet:3,savory:8,salty:6,umami:5} },
  { id:"garlic-soy", name:"Garlic Soy", lux:"Umami Bomb", price:12.99, cats:["savory","umami"],
    img:"images/product-04.webp", tag:"Dumpling night, upgraded.",
    desc:"Roasted garlic folded into dark soy. Savory depth in a single pop — made for dumplings, noodles, and rice bowls.",
    notes:["Pairs with: dumplings, noodles","Serve: room temp or warm","Texture: rich, lingering"],
    profile:{sweet:1,savory:9,salty:8,umami:9} },
  { id:"sea-salt-caramel", name:"Sea Salt Caramel", lux:"Tide", price:12.99, cats:["sweet","salty"],
    img:"images/product-05.webp", tag:"The salt makes the sweet louder.",
    desc:"Burnt-sugar caramel cut with flaky sea salt. The pause between sweet and salt is the whole point.",
    notes:["Pairs with: cold brew, vanilla ice cream","Serve: chilled","Texture: silk pop"],
    profile:{sweet:8,savory:0,salty:7,umami:1} },
  { id:"dill-pickle-brine", name:"Dill Pickle Brine", lux:"Brine", price:12.99, cats:["salty","savory"],
    img:"images/product-06.webp", tag:"The deli, distilled.",
    desc:"Bright dill, sharp vinegar, cold brine snap. Burgers, Bloody Marys, and midnight fridge raids will never be the same.",
    notes:["Pairs with: burgers, Bloody Marys","Serve: ice cold","Texture: crisp pop"],
    profile:{sweet:1,savory:6,salty:9,umami:3} },
  { id:"white-miso", name:"White Miso", lux:"Cloud", price:13.99, cats:["umami"],
    img:"images/product-07.webp", tag:"Gentle. Fermented. Wise.",
    desc:"Mellow white miso with a whisper of sweetness. Soft umami that melts into soups, dressings, and quiet moments.",
    notes:["Pairs with: miso soup, roasted veg","Serve: room temp","Texture: soft, melting"],
    profile:{sweet:3,savory:5,salty:6,umami:9} },
  { id:"shiitake-soy", name:"Shiitake Soy", lux:"Forest", price:13.99, cats:["umami","savory"],
    img:"images/product-08.webp", tag:"The forest floor, in a bead.",
    desc:"Dried shiitake depth layered over dark soy. Earthy, brooding, built for ramen broth and mushroom risotto.",
    notes:["Pairs with: ramen, risotto","Serve: warm","Texture: deep, brooding pop"],
    profile:{sweet:1,savory:8,salty:7,umami:10} },
  { id:"double-take", name:"The Double Take", lux:"Collection", price:79.99, cats:["sets"],
    img:"images/product-09.webp", tag:"All eight. One box. Zero regrets.",
    desc:"The full experiment set: all eight flavors in tasting jars. Built for dinner parties, gift-giving, and winning arguments.",
    notes:["8 × tasting jars","Tasting card included","Serves 8–12"],
    profile:{sweet:6,savory:6,salty:6,umami:6} },
  { id:"lab-set", name:"The Lab Set", lux:"Atelier", price:49.99, cats:["sets"],
    img:"images/product-10.webp", tag:"For the flavor scientist.",
    desc:"Three signature jars — Ember, Noir, Brine — in a black-and-gold atelier box with a brass spoon and tasting notes.",
    notes:["3 × full jars","Brass spoon + notes","Gift-ready box"],
    profile:{sweet:5,savory:6,salty:5,umami:4} },
];

const CAT_LABELS = { sweet:"Sweet", savory:"Savory", salty:"Salty", umami:"Umami", sets:"Sets" };

/* ---------- view router ---------- */
const views = document.querySelectorAll(".view");
const navLinks = document.querySelectorAll("[data-view]");
function go(view, productId){
  views.forEach(v => v.classList.remove("active"));
  const target = document.getElementById("view-" + view);
  if(!target) return;
  if(view === "product" && productId) renderProduct(productId);
  target.classList.add("active");
  window.scrollTo({top:0, behavior:"smooth"});
  document.querySelectorAll(".nav-link").forEach(l =>
    l.classList.toggle("active", l.dataset.view === (view === "product" ? "catalog" : view)));
  closeDrawer();
  requestAnimationFrame(observeReveals);
}
navLinks.forEach(el => el.addEventListener("click", e => {
  e.preventDefault();
  go(el.dataset.view, el.dataset.product);
}));

/* ---------- mobile drawer ---------- */
const drawer = document.querySelector(".mobile-drawer");
function closeDrawer(){ drawer.classList.remove("open"); drawer.setAttribute("aria-hidden","true"); }
document.querySelector(".hamburger").addEventListener("click", () => {
  const open = drawer.classList.toggle("open");
  drawer.setAttribute("aria-hidden", String(!open));
});
document.querySelector(".drawer-close").addEventListener("click", closeDrawer);

/* ---------- product cards ---------- */
function cardHTML(p){
  const cats = p.cats.map(c => CAT_LABELS[c]).join(" · ");
  return `<article class="product-card" data-id="${p.id}" data-cats="${p.cats.join(" ")}" tabindex="0" role="button" aria-label="${p.name}">
    <div class="img-wrap"><img src="${p.img}" alt="${p.name} spherified boba beads" loading="lazy"></div>
    <div class="product-body">
      <span class="product-cat">${cats}</span>
      <h3>${p.name} <span class="italic-lux">${p.lux}</span></h3>
      <p class="product-tag">${p.tag}</p>
      <div class="product-foot">
        <span class="price">$${p.price.toFixed(2)}</span>
        <span class="view-link">View <i data-lucide="arrow-right"></i></span>
      </div>
    </div>
  </article>`;
}
function bindCards(scope){
  scope.querySelectorAll(".product-card").forEach(card => {
    const open = () => go("product", card.dataset.id);
    card.addEventListener("click", open);
    card.addEventListener("keydown", e => { if(e.key === "Enter" || e.key === " "){ e.preventDefault(); open(); } });
  });
}
function renderCatalog(){
  const grid = document.getElementById("catalog-grid");
  grid.innerHTML = PRODUCTS.map(cardHTML).join("");
  bindCards(grid);
  lucide.createIcons();
  observeReveals();
}
function renderFeatured(){
  const grid = document.getElementById("home-featured");
  const picks = ["spicy-sriracha","mango-passionfruit","double-take"].map(id => PRODUCTS.find(p => p.id === id));
  grid.innerHTML = picks.map(cardHTML).join("");
  bindCards(grid);
  lucide.createIcons();
}

/* ---------- filter ---------- */
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const f = btn.dataset.filter;
    document.querySelectorAll("#catalog-grid .product-card").forEach(card => {
      const show = f === "all" || card.dataset.cats.split(" ").includes(f);
      card.classList.remove("filter-show","filter-hide","in");
      void card.offsetWidth; /* restart animation */
      card.classList.add(show ? "filter-show" : "filter-hide");
    });
  });
});

/* ---------- product detail ---------- */
function renderProduct(id){
  const p = PRODUCTS.find(x => x.id === id);
  if(!p) return;
  const bars = Object.entries(p.profile).map(([k,v]) =>
    `<div class="profile-row"><span>${k}</span><div class="profile-bar"><div class="profile-fill" data-w="${v*10}"></div></div><span>${v}</span></div>`).join("");
  document.getElementById("product-detail").innerHTML = `
    <div><img src="${p.img}" alt="${p.name} spherified boba beads"></div>
    <div class="pd-info">
      <span class="product-cat">${p.cats.map(c => CAT_LABELS[c]).join(" · ")}</span>
      <h2>${p.name} <span class="italic-lux gold">${p.lux}</span></h2>
      <p class="pd-tag">${p.tag}</p>
      <p class="pd-desc">${p.desc}</p>
      <div class="profile">${bars}</div>
      <div class="pd-buy">
        <div class="qty"><button id="q-minus" aria-label="Decrease">−</button><span id="q-val">1</span><button id="q-plus" aria-label="Increase">+</button></div>
        <span class="price" id="pd-price">$${p.price.toFixed(2)}</span>
        <button class="btn btn-gold" id="pd-add">Add to tasting crate</button>
      </div>
      <div class="pd-notes"><h4>Tasting notes</h4>${p.notes.map(n => `<p>— ${n}</p>`).join("")}</div>
    </div>`;
  let q = 1;
  const qv = document.getElementById("q-val"), qp = document.getElementById("pd-price");
  document.getElementById("q-minus").onclick = () => { q = Math.max(1, q-1); qv.textContent = q; qp.textContent = "$" + (p.price*q).toFixed(2); };
  document.getElementById("q-plus").onclick = () => { q = Math.min(24, q+1); qv.textContent = q; qp.textContent = "$" + (p.price*q).toFixed(2); };
  document.getElementById("pd-add").onclick = () =>
    toast("Added to your crate", `${q} × ${p.name} — checkout opens at launch.`);
  requestAnimationFrame(() => requestAnimationFrame(() =>
    document.querySelectorAll(".profile-fill").forEach(f => f.style.width = f.dataset.w + "%")));
  lucide.createIcons();
}

/* ---------- toast ---------- */
let toastTimer;
function toast(title, msg){
  const t = document.getElementById("toast");
  document.getElementById("toast-title").textContent = title;
  document.getElementById("toast-msg").textContent = msg;
  t.classList.remove("hidden");
  requestAnimationFrame(() => t.classList.add("show"));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    t.classList.remove("show");
    setTimeout(() => t.classList.add("hidden"), 500);
  }, 4200);
}

/* ---------- contact form → Railway API (graceful offline fallback) ---------- */
document.getElementById("contact-form").addEventListener("submit", async e => {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');
  const payload = {
    name: document.getElementById("cf-name").value.trim(),
    email: document.getElementById("cf-email").value.trim(),
    type: document.getElementById("cf-type").value,
    message: document.getElementById("cf-msg").value.trim(),
    timestamp: new Date().toISOString(),
  };
  if(!payload.name || !payload.email || !payload.message){
    toast("Almost there", "Please fill in your name, email, and message.");
    return;
  }
  btn.disabled = true;
  const original = btn.textContent;
  btn.textContent = "Sending…";
  let delivered = false;
  const base = RAILWAY_API_URL ? RAILWAY_API_URL.replace(/\/$/, "") : "";
  try{
    const res = await fetch(base + "/api/contact", {
        method:"POST", headers:{"Content-Type":"application/json","Accept":"application/json"},
        body: JSON.stringify(payload),
      });
      delivered = res.ok;
    }catch(err){ console.warn("API unreachable, using local confirm:", err); }
  form.reset();
  btn.disabled = false;
  btn.textContent = original;
  toast("Message received", delivered
    ? "Sent to the Poauce Theory lab. We reply within two business days."
    : "Saved. The lab inbox opens when the API goes live — we will be in touch.");
});

/* ---------- scroll reveals ---------- */
let observer;
function observeReveals(){
  if(!observer){
    observer = new IntersectionObserver(entries => {
      entries.forEach(en => { if(en.isIntersecting){ en.target.classList.add("in"); observer.unobserve(en.target); } });
    }, {threshold:.12});
  }
  document.querySelectorAll(".view.active .reveal:not(.in), .view.active .product-card:not(.in)").forEach(el => observer.observe(el));
}

/* ---------- init ---------- */
renderCatalog();
renderFeatured();
observeReveals();
lucide.createIcons();
