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
     "cats": ["sweet"], "tag": "The classic, perfected."},
    {"id": "mango-passionfruit", "name": "Mango Passionfruit", "lux": "Solstice", "price": 11.99,
     "cats": ["sweet"], "tag": "Sunshine with a passport."},
    {"id": "spicy-sriracha", "name": "Spicy Sriracha", "lux": "Ember", "price": 12.99,
     "cats": ["savory"], "tag": "It looks like candy. Pause. It is sriracha."},
    {"id": "garlic-soy", "name": "Garlic Soy", "lux": "Umami Bomb", "price": 12.99,
     "cats": ["savory", "umami"], "tag": "Dumpling night, upgraded."},
    {"id": "sea-salt-caramel", "name": "Sea Salt Caramel", "lux": "Tide", "price": 12.99,
     "cats": ["sweet", "salty"], "tag": "The salt makes the sweet louder."},
    {"id": "dill-pickle-brine", "name": "Dill Pickle Brine", "lux": "Brine", "price": 12.99,
     "cats": ["salty", "savory"], "tag": "The deli, distilled."},
    {"id": "white-miso", "name": "White Miso", "lux": "Cloud", "price": 13.99,
     "cats": ["umami"], "tag": "Gentle. Fermented. Wise."},
    {"id": "shiitake-soy", "name": "Shiitake Soy", "lux": "Forest", "price": 13.99,
     "cats": ["umami", "savory"], "tag": "The forest floor, in a bead."},
    {"id": "double-take", "name": "The Double Take", "lux": "Collection", "price": 79.99,
     "cats": ["sets"], "tag": "All eight. One box. Zero regrets."},
    {"id": "lab-set", "name": "The Lab Set", "lux": "Atelier", "price": 49.99,
     "cats": ["sets"], "tag": "For the flavor scientist."},
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
for _mount, _dir in (("/css", "css"), ("/js", "js"), ("/images", "images")):
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
