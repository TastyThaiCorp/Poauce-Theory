"""Poauce Theory API — lean FastAPI service for Railway.

Endpoints:
  GET  /             service status
  GET  /api/health   health check
  GET  /api/products public product catalog (10 slots)
  POST /api/contact  wholesale / contact form intake
"""
import os
import uuid
from datetime import datetime, timezone

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, EmailStr, Field

app = FastAPI(title="Poauce Theory API", version="1.0.0")

# GitHub Pages origin + local dev. Add the custom domain here when purchased.
ALLOWED_ORIGINS = [
    "https://tastythaicorp.github.io",
    "https://poaucetheory.com",
    "https://www.poaucetheory.com",
    "http://localhost:8000",
    "http://127.0.0.1:8000",
    "http://localhost:5500",
    "http://127.0.0.1:5500",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Accept"],
)

PRODUCTS = [
    {"id": "brown-sugar", "name": "Brown Sugar", "lux": "Noir", "price": 11.99,
     "cats": ['sweet'], "tag": "The classic, perfected.", "img": "images/product-01.webp"},
    {"id": "mango-passionfruit", "name": "Mango Passionfruit", "lux": "Solstice", "price": 11.99,
     "cats": ['sweet'], "tag": "Sunshine with a passport.", "img": "images/product-02.webp"},
    {"id": "sea-salt-caramel", "name": "Sea Salt Caramel", "lux": "Tide", "price": 11.99,
     "cats": ['sweet'], "tag": "The salt makes the sweet louder.", "img": "images/product-03.webp"},
    {"id": "thai-tea", "name": "Thai Tea", "lux": "Cha Yen", "price": 11.99,
     "cats": ['sweet'], "tag": "The orange icon, spherified.", "img": "images/product-04.webp"},
    {"id": "lychee-rose", "name": "Lychee Rose", "lux": "Fleur", "price": 11.99,
     "cats": ['sweet'], "tag": "Floral, fragrant, dangerous.", "img": "images/product-05.webp"},
    {"id": "spicy-sriracha", "name": "Spicy Sriracha", "lux": "Ember", "price": 12.99,
     "cats": ['savory'], "tag": "It looks like candy. Pause. It is sriracha.", "img": "images/product-06.webp"},
    {"id": "garlic-soy", "name": "Garlic Soy", "lux": "Umami Bomb", "price": 12.99,
     "cats": ['savory'], "tag": "Dumpling night, upgraded.", "img": "images/product-07.webp"},
    {"id": "tom-yum", "name": "Tom Yum", "lux": "Bangkok", "price": 12.99,
     "cats": ['savory'], "tag": "The whole soup, one pop.", "img": "images/product-08.webp"},
    {"id": "black-pepper", "name": "Black Pepper", "lux": "Cracked", "price": 12.99,
     "cats": ['savory'], "tag": "Steak's new best friend.", "img": "images/product-09.webp"},
    {"id": "red-curry", "name": "Red Curry", "lux": "Kaeng", "price": 12.99,
     "cats": ['savory'], "tag": "Coconut-rich depth.", "img": "images/product-10.webp"},
    {"id": "dill-pickle-brine", "name": "Dill Pickle Brine", "lux": "Brine", "price": 12.99,
     "cats": ['salty'], "tag": "The deli, distilled.", "img": "images/product-11.webp"},
    {"id": "umeboshi-plum", "name": "Umeboshi Plum", "lux": "Ume", "price": 12.99,
     "cats": ['salty'], "tag": "A pucker that means business.", "img": "images/product-12.webp"},
    {"id": "flaky-sea-salt", "name": "Flaky Sea Salt", "lux": "Flake", "price": 12.99,
     "cats": ['salty'], "tag": "Finishing salt, reimagined.", "img": "images/product-13.webp"},
    {"id": "salted-egg-yolk", "name": "Salted Egg Yolk", "lux": "Yolk", "price": 12.99,
     "cats": ['salty'], "tag": "The mooncake center, as a bead.", "img": "images/product-14.webp"},
    {"id": "green-olive", "name": "Green Olive", "lux": "Martini", "price": 12.99,
     "cats": ['salty'], "tag": "The martini's new garnish.", "img": "images/product-15.webp"},
    {"id": "white-miso", "name": "White Miso", "lux": "Cloud", "price": 13.99,
     "cats": ['umami'], "tag": "Gentle. Fermented. Wise.", "img": "images/product-16.webp"},
    {"id": "shiitake-soy", "name": "Shiitake Soy", "lux": "Forest", "price": 13.99,
     "cats": ['umami'], "tag": "The forest floor, in a bead.", "img": "images/product-17.webp"},
    {"id": "kombu-dashi", "name": "Kombu Dashi", "lux": "Dashi", "price": 13.99,
     "cats": ['umami'], "tag": "The quiet backbone.", "img": "images/product-18.webp"},
    {"id": "porcini", "name": "Porcini", "lux": "Bois", "price": 13.99,
     "cats": ['umami'], "tag": "Risotto's new best friend.", "img": "images/product-19.webp"},
    {"id": "black-garlic", "name": "Black Garlic", "lux": "Midnight", "price": 13.99,
     "cats": ['umami'], "tag": "Umami's dark side.", "img": "images/product-20.webp"},
    {"id": "sweet-collection", "name": "The Sweet Collection", "lux": "Cinq", "price": 49.99,
     "cats": ['sets'], "tag": "All five sweet, one box.", "img": "images/product-21.webp"},
    {"id": "savory-collection", "name": "The Savory Collection", "lux": "Cinq", "price": 49.99,
     "cats": ['sets'], "tag": "All five savory, one box.", "img": "images/product-22.webp"},
    {"id": "salty-collection", "name": "The Salty Collection", "lux": "Cinq", "price": 49.99,
     "cats": ['sets'], "tag": "All five salty, one box.", "img": "images/product-23.webp"},
    {"id": "umami-collection", "name": "The Umami Collection", "lux": "Cinq", "price": 49.99,
     "cats": ['sets'], "tag": "All five umami, one box.", "img": "images/product-24.webp"},
]


class ContactIn(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    type: str = Field(default="Curious human", max_length=60)
    message: str = Field(min_length=1, max_length=5000)
    timestamp: str | None = None


@app.get("/api/health")
def health():
    return {"status": "ok",
            "time": datetime.now(timezone.utc).isoformat(),
            "commit": os.getenv("RAILWAY_GIT_COMMIT_SHA", "local")}


@app.get("/api/products")
def products():
    return {"count": len(PRODUCTS), "products": PRODUCTS}


@app.post("/api/contact")
def contact(data: ContactIn):
    try:
        ref = "PT-" + uuid.uuid4().hex[:8].upper()
        # Intake only for now: structured log the platform can ship later.
        print(f"[contact {ref}] {data.name} <{data.email}> [{data.type}]: "
              f"{data.message[:160]}")
        return {
            "status": "received",
            "reference": ref,
            "message": "Message received by the Poauce Theory lab.",
        }
    except Exception as exc:  # never leak internals
        raise HTTPException(status_code=500, detail="Intake failed.") from exc


# Serve the static marketing site from the same container (single Railway
# service: frontend + API, one domain, no extra cost). The site lives at the
# repo root (index.html, css/, js/, images/). API routes above take precedence.
ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
for _mount, _dir in (("/css", "css"), ("/js", "js"), ("/images", "images"),
                     ("/renders", "renders")):
    _full = os.path.join(ROOT_DIR, _dir)
    if os.path.isdir(_full):
        app.mount(_mount, StaticFiles(directory=_full), name=_dir)


@app.get("/", include_in_schema=False)
def home():
    index = os.path.join(ROOT_DIR, "index.html")
    if os.path.isfile(index):
        return FileResponse(index)
    return {"service": "poauce-theory-api", "status": "ok"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", "8080")))
