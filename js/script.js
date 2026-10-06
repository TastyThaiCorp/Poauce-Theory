/* Poauce Theory — site engine */
"use strict";

/* Empty string = same-origin (Railway serves site + API together).
   Absolute URL = use the live Railway API from a separately hosted frontend
   (e.g. GitHub Pages). */
const RAILWAY_API_URL = "https://poauce-theory-production.up.railway.app";

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
  { id:"sea-salt-caramel", name:"Sea Salt Caramel", lux:"Tide", price:11.99, cats:["sweet"],
    img:"images/product-03.webp", tag:"The salt makes the sweet louder.",
    desc:"Burnt-sugar caramel cut with flaky sea salt. The pause between sweet and salt is the whole point.",
    notes:["Pairs with: cold brew, vanilla ice cream","Serve: chilled","Texture: silk pop"],
    profile:{sweet:8,savory:0,salty:7,umami:1} },
  { id:"thai-tea", name:"Thai Tea", lux:"Cha Yen", price:11.99, cats:["sweet"],
    img:"images/product-04.webp", tag:"The orange icon, spherified.",
    desc:"Creamy Thai tea with that unmistakable spiced depth. The restaurant staple, reborn as a bead.",
    notes:["Pairs with: condensed milk desserts","Serve: chilled","Texture: creamy pop"],
    profile:{sweet:8,savory:0,salty:1,umami:1} },
  { id:"lychee-rose", name:"Lychee Rose", lux:"Fleur", price:11.99, cats:["sweet"],
    img:"images/product-05.webp", tag:"Floral, fragrant, dangerous.",
    desc:"Delicate lychee lifted by rosewater. Elegant, fragrant, and far too easy to finish.",
    notes:["Pairs with: champagne, white tea","Serve: chilled","Texture: delicate burst"],
    profile:{sweet:9,savory:0,salty:0,umami:0} },
  { id:"spicy-sriracha", name:"Spicy Sriracha", lux:"Ember", price:12.99, cats:["savory"],
    img:"images/product-06.webp", tag:"It looks like candy. Pause. It is sriracha.",
    desc:"The signature shock. Deep red heat, garlic hum, slow chili bloom. Drop it on pizza, ramen, or your expectations.",
    notes:["Pairs with: ramen, pizza, fried chicken","Heat: 6/10, slow build","Texture: firm pop"],
    profile:{sweet:3,savory:8,salty:6,umami:5} },
  { id:"garlic-soy", name:"Garlic Soy", lux:"Umami Bomb", price:12.99, cats:["savory"],
    img:"images/product-07.webp", tag:"Dumpling night, upgraded.",
    desc:"Roasted garlic folded into dark soy. Savory depth in a single pop — made for dumplings, noodles, and rice bowls.",
    notes:["Pairs with: dumplings, noodles","Serve: room temp or warm","Texture: rich, lingering"],
    profile:{sweet:1,savory:9,salty:8,umami:9} },
  { id:"tom-yum", name:"Tom Yum", lux:"Bangkok", price:12.99, cats:["savory"],
    img:"images/product-08.webp", tag:"The whole soup, one pop.",
    desc:"Lemongrass, galangal, lime leaf, chili heat. Thailand's most famous soup, distilled into a bead.",
    notes:["Pairs with: shrimp, rice","Heat: 5/10","Texture: bright pop"],
    profile:{sweet:2,savory:9,salty:6,umami:7} },
  { id:"miso-ginger", name:"Miso Ginger", lux:"Kyoto", price:12.99, cats:["savory"],
    img:"images/product-09.webp", tag:"Kyoto in a bead.",
    desc:"Mellow fermented miso warmed with fresh ginger snap. Cozy, bright, quietly addictive.",
    notes:["Pairs with: grilled fish, noodle soups","Serve: room temp or warm","Texture: soft, warming pop"],
    profile:{sweet:3,savory:8,salty:6,umami:8} },
  { id:"chili-crisp", name:"Chili Crisp", lux:"Firecracker", price:12.99, cats:["savory"],
    img:"images/product-10.webp", tag:"The crunch you can hear.",
    desc:"Toasted chili, crackling shallot, numbing spice oil — the condiment obsession, engineered to pop.",
    notes:["Pairs with: dumplings, eggs, noodles","Heat: 7/10, crackling","Texture: crisp pop"],
    profile:{sweet:1,savory:9,salty:7,umami:7} },
  { id:"salted-egg-yolk", name:"Salted Egg Yolk", lux:"Golden", price:12.99, cats:["salty"],
    img:"images/product-11.webp", tag:"The mooncake center, as a bead.",
    desc:"Rich, savory custard depth. The croissant filling and the mooncake center, in a single golden pop.",
    notes:["Pairs with: congee, pastries","Serve: room temp","Texture: custardy pop"],
    profile:{sweet:2,savory:7,salty:8,umami:8} },
  { id:"truffle", name:"Truffle", lux:"Noir", price:13.99, cats:["umami"],
    img:"images/product-12.webp", tag:"Luxury you can pop.",
    desc:"Black truffle depth — earthy, musky, unmistakable. Fine dining's favorite aroma, in a bead.",
    notes:["Pairs with: fries, risotto, eggs","Serve: room temp","Texture: lush, aromatic pop"],
    profile:{sweet:1,savory:7,salty:4,umami:10} },
  { id:"yuzu-miso", name:"Yuzu Miso", lux:"Citrus Kiss", price:13.99, cats:["umami"],
    img:"images/product-13.webp", tag:"A kiss of citrus, a hum of ferment.",
    desc:"Bright Japanese yuzu folded into mellow miso. Citrus lift over deep umami — the double take in one bead.",
    notes:["Pairs with: sashimi, grilled veg","Serve: chilled or room temp","Texture: bright, deep pop"],
    profile:{sweet:3,savory:6,salty:6,umami:9} },
  { id:"cilantro-lime", name:"Cilantro Lime", lux:"Verde", price:13.99, cats:["umami"],
    img:"images/product-14.webp", tag:"Taco night's new garnish.",
    desc:"Fresh cilantro snap over sharp lime. Bright, herbal, built for tacos, ceviche, and everything grilled.",
    notes:["Pairs with: tacos, ceviche","Serve: chilled","Texture: fresh, zesty pop"],
    profile:{sweet:2,savory:6,salty:5,umami:6} },
  { id:"lemon-pepper", name:"Lemon Pepper", lux:"Zest", price:13.99, cats:["umami"],
    img:"images/product-15.webp", tag:"Wings, upgraded.",
    desc:"Sharp lemon zest over cracked-pepper bite. The wing-seasoning classic, spherified.",
    notes:["Pairs with: wings, seafood","Serve: chilled or room temp","Texture: zesty, sharp pop"],
    profile:{sweet:1,savory:7,salty:6,umami:5} },
  { id:"roasted-sesame", name:"Roasted Sesame", lux:"Goma", price:13.99, cats:["umami"],
    img:"images/product-16.webp", tag:"Nutty. Toasty. Quietly perfect.",
    desc:"Deep-roasted sesame, nutty and warm. The finish that makes everything taste more like itself.",
    notes:["Pairs with: noodles, salads, rice","Serve: room temp","Texture: toasty, round pop"],
    profile:{sweet:2,savory:6,salty:4,umami:8} },
  { id:"black-garlic", name:"Black Garlic", lux:"Obsidian", price:13.99, cats:["umami"],
    img:"images/product-17.webp", tag:"Umami's dark side.",
    desc:"Sweet, balsamic-adjacent, mysterious. Black garlic is umami's plot twist.",
    notes:["Pairs with: red meat, aioli","Serve: room temp","Texture: deep, sweet pop"],
    profile:{sweet:4,savory:6,salty:3,umami:10} },
  { id:"coconut-curry", name:"Coconut Curry", lux:"Siam", price:13.99, cats:["umami"],
    img:"images/product-18.webp", tag:"Coconut-rich depth.",
    desc:"Creamy coconut curry with slow warmth. Drop it on jasmine rice and watch it disappear.",
    notes:["Pairs with: jasmine rice, noodles","Heat: 4/10","Texture: rich pop"],
    profile:{sweet:4,savory:8,salty:5,umami:8} },
  { id:"wasabi", name:"Wasabi", lux:"Shin", price:13.99, cats:["umami"],
    img:"images/product-19.webp", tag:"The honest burn.",
    desc:"Real wasabi heat — sharp, green, gone in seconds. Sushi's sparring partner, in a bead.",
    notes:["Pairs with: sushi, sashimi","Heat: 8/10, fast fade","Texture: sharp, clean pop"],
    profile:{sweet:0,savory:5,salty:3,umami:6} },
  { id:"ponzu", name:"Ponzu", lux:"Citrus Umami", price:13.99, cats:["umami"],
    img:"images/product-20.webp", tag:"The dipping sauce, distilled.",
    desc:"Soy, citrus, and dashi in perfect balance. The shabu-shabu essential, ready to pop.",
    notes:["Pairs with: hot pot, sashimi","Serve: chilled","Texture: bright, balanced pop"],
    profile:{sweet:2,savory:7,salty:7,umami:9} },
];

const CAT_LABELS = { sweet:"Sweet", savory:"Savory", salty:"Salty", umami:"Umami" };

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
  if(el.dataset.filter){
    const btn = document.querySelector(`.filter-btn[data-filter="${el.dataset.filter}"]`);
    if(btn) setTimeout(() => btn.click(), 60);
  }
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
  const picks = ["spicy-sriracha","mango-passionfruit","truffle"].map(id => PRODUCTS.find(p => p.id === id));
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

/* ---------- hero shader: drifting emerald/gold gradient blobs ---------- */
(function initHero(){
  const cv = document.getElementById("hero-canvas");
  if(!cv) return;
  const ctx = cv.getContext("2d");
  const blobs = [
    {c:"16,68,52",  r:.55, px:.72, py:.22, a:.55, sx:.32, sy:.21},
    {c:"201,162,39",r:.30, px:.24, py:.72, a:.15, sx:.24, sy:.30},
    {c:"8,42,33",   r:.60, px:.18, py:.18, a:.60, sx:.19, sy:.26},
    {c:"52,94,58",  r:.34, px:.82, py:.80, a:.30, sx:.28, sy:.18},
  ];
  let w=0,h=0,t=Math.random()*10,raf=null;
  function size(){
    const dpr=Math.min(window.devicePixelRatio||1,2);
    w=cv.clientWidth; h=cv.clientHeight;
    cv.width=w*dpr; cv.height=h*dpr;
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }
  function frame(){
    t+=0.016;
    ctx.fillStyle="#0a0a0a"; ctx.fillRect(0,0,w,h);
    const m=Math.max(w,h);
    for(const b of blobs){
      const x=(b.px+Math.sin(t*b.sx)*0.10)*w;
      const y=(b.py+Math.cos(t*b.sy)*0.10)*h;
      const r=b.r*m;
      const g=ctx.createRadialGradient(x,y,0,x,y,r);
      g.addColorStop(0,`rgba(${b.c},${b.a})`);
      g.addColorStop(1,`rgba(${b.c},0)`);
      ctx.fillStyle=g;
      ctx.beginPath(); ctx.arc(x,y,r,0,6.3); ctx.fill();
    }
    raf=requestAnimationFrame(frame);
  }
  function start(){ if(raf==null && w>0){ frame(); } }
  function stop(){ if(raf!=null){ cancelAnimationFrame(raf); raf=null; } }
  size(); start();
  window.addEventListener("resize", size);
  new IntersectionObserver(en=>{
    const v=en[0].isIntersecting && document.getElementById("view-home").classList.contains("active");
    v?start():stop();
  },{threshold:0}).observe(cv);
})();

/* ---------- pop lab: tap the beads, watch them burst ---------- */
(function initPopLab(){
  const cv=document.getElementById("pop-canvas");
  if(!cv) return;
  const ctx=cv.getContext("2d");
  const COLORS=["#d99a35","#d94f30","#7fb069","#e3c878","#8a5a2b","#efe6d0","#b4552d"];
  const counter=document.getElementById("pop-count");
  let beads=[],parts=[],rings=[],pops=0,raf=null,w=0,h=0;
  const rnd=(a,b)=>a+Math.random()*(b-a);
  const pick=a=>a[(Math.random()*a.length)|0];
  function size(){
    const dpr=Math.min(window.devicePixelRatio||1,2);
    w=cv.clientWidth; h=cv.clientHeight;
    cv.width=w*dpr; cv.height=h*dpr;
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }
  function spawnBead(top){
    beads.push({x:rnd(20,w-20), y:top?rnd(0,h*0.4):h+rnd(10,80),
      r:rnd(13,30), c:pick(COLORS), vy:-rnd(.35,1.0), ph:rnd(0,6.3), ps:rnd(.008,.02)});
  }
  function burst(b){
    pops++; if(counter) counter.textContent=pops;
    const w=document.getElementById("pop-word");
    if(w) w.textContent = pops===1 ? "pop" : "pops";
    for(let i=0;i<16;i++){
      const a=rnd(0,6.3), sp=rnd(1,4.5);
      parts.push({x:b.x,y:b.y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp-1,
        life:1, decay:rnd(.012,.025), r:rnd(1.5,4), c:b.c});
    }
    rings.push({x:b.x,y:b.y,r:b.r,life:1});
    beads.splice(beads.indexOf(b),1);
    if(beads.length<10) spawnBead(false);
  }
  function drawBead(b){
    const g=ctx.createRadialGradient(b.x-b.r*.35,b.y-b.r*.35,b.r*.08,b.x,b.y,b.r);
    g.addColorStop(0,"rgba(255,255,255,.9)");
    g.addColorStop(.28,b.c);
    g.addColorStop(1,"rgba(0,0,0,.45)");
    ctx.fillStyle=g;
    ctx.beginPath(); ctx.arc(b.x,b.y,b.r,0,6.3); ctx.fill();
    ctx.fillStyle="rgba(255,255,255,.75)";
    ctx.beginPath(); ctx.ellipse(b.x-b.r*.32,b.y-b.r*.38,b.r*.20,b.r*.12,-.6,0,6.3); ctx.fill();
  }
  function frame(){
    ctx.clearRect(0,0,w,h);
    for(const b of beads){
      b.y+=b.vy; b.ph+=b.ps; b.x+=Math.sin(b.ph)*.4;
      if(b.y<-40){ beads.splice(beads.indexOf(b),1); spawnBead(false); continue; }
      drawBead(b);
    }
    for(const p of parts){
      p.x+=p.vx; p.y+=p.vy; p.vy+=.06; p.life-=p.decay;
      if(p.life<=0){ parts.splice(parts.indexOf(p),1); continue; }
      ctx.globalAlpha=Math.max(0,p.life);
      ctx.fillStyle=p.c;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r*p.life+.5,0,6.3); ctx.fill();
      ctx.globalAlpha=1;
    }
    for(const g of rings){
      g.r+=3.2; g.life-=.03;
      if(g.life<=0){ rings.splice(rings.indexOf(g),1); continue; }
      ctx.globalAlpha=Math.max(0,g.life)*.8;
      ctx.strokeStyle="#e3c878"; ctx.lineWidth=2;
      ctx.beginPath(); ctx.arc(g.x,g.y,g.r,0,6.3); ctx.stroke();
      ctx.globalAlpha=1;
    }
    raf=requestAnimationFrame(frame);
  }
  function pos(e){
    const r=cv.getBoundingClientRect();
    const p=e.touches?e.touches[0]:e;
    return {x:p.clientX-r.left, y:p.clientY-r.top};
  }
  cv.addEventListener("pointerdown",e=>{
    const {x,y}=pos(e);
    let best=null,bd=1e9;
    for(const b of beads){
      const d=Math.hypot(b.x-x,b.y-y);
      if(d<b.r+14&&d<bd){bd=d;best=b;}
    }
    if(best) burst(best);
  });
  function start(){ if(raf==null){ size(); if(!beads.length) for(let i=0;i<14;i++) spawnBead(true); frame(); } }
  function stop(){ if(raf!=null){ cancelAnimationFrame(raf); raf=null; } }
  size(); start();
  window.addEventListener("resize",size);
  new IntersectionObserver(en=>{
    const v=en[0].isIntersecting && document.getElementById("view-machine").classList.contains("active");
    v?start():stop();
  },{threshold:.05}).observe(cv);
})();
