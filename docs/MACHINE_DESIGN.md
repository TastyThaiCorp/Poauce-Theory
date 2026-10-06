# The Poauce Fabricator ("The Lab")
*Multi-layer cold-oil spherification device. Concept engineering, 2026-10-05.*
*All figures are engineering estimates for prototyping, not manufactured specs.*

## Concept in one line

A countertop machine that turns six heated flavor reservoirs into finished Poauce beads in one continuous run: drip, chill-set, drain, rinse, harvest. Six flavors, 10-20 servings each, in about 10-15 minutes.

## The five layers (top to bottom)

### Layer 1 - Sauce Reservoir Deck (the "pantry")
- 6 jacketed stainless chambers, 1 L each, one per flavor.
- Each chamber held at 50-60 C with a slow stirrer so the agar mix never pre-sets.
- Why 50-60 C: agar must be boiled to activate, then dispensed at 50-55 C. Below ~40 C it starts gelling in the lines. Sources: molecularrecipes.com cold-oil spherification guides (1.5% agar, dispense at 50-55 C).
- Quick-connect fittings so a chamber can be swapped or refilled mid-service.

### Layer 2 - Precision Drip Array (the "rain")
- One food-grade peristaltic pump per chamber (no contact between pump and sauce, easy cleaning) feeding a nozzle plate.
- 12 tips per flavor x 6 flavors = 72 tips. Tip gauges 14-18 (interchangeable plates).
- Drip rate 0.5-2.0 drops/sec per tip, set per flavor on the touchscreen.
- Drop height ~8-10 cm above the oil: high enough to form spheres, low enough to avoid "baby" satellite droplets.

### Layer 3 - Cold Oil Bath (the "deep chill")
- 12 L jacketed vessel, food-grade grapeseed or sunflower oil (neutral, stays liquid near freezing; never coconut or olive oil, they solidify).
- Recirculating chiller holds oil at 2-5 C. Tall column (30 cm) so beads set before they reach the plate below.
- Why this matters: droplets must cool below ~35 C and fully set before touching a surface, or they deform. Set time in the bath: 60-120 s depending on agar % and oil temp.

### Layer 4 - Iris Aperture Plate (the "gate")
- The signature mechanism. Each drain port carries an iris diaphragm (camera-aperture style), servo-actuated, with three states:
  - HOLD (closed): beads accumulate above the mesh for inspection or batch holding.
  - DRAIN (open): oil falls through to Layer 5; beads stay on the 2 mm mesh.
  - RINSE (open + spray bar): cold-water spray bar rinses oil off the beads, 10-15 s.
- This single plate replaces the hand-sieving step of manual spherification.

### Layer 5 - Used Oil Hold + Reclaim (the "loop")
- Collection tank under the plate: 50-micron filtration, then an oil-water separator (rinse water is denser and drops out).
- Filtered oil is pumped back through the chiller into Layer 3. "Fast cooling" comes from a plate chiller in the return loop, not from freezing a static bath.
- Oil is a consumable with a service life: polish with the filter loop each run, full oil change per shift or when flavor carryover is detected.

## Throughput math (estimates)

- Bead: 8 mm diameter -> ~0.27 mL -> ~0.27 g. One 30 g serving ~= 110 beads.
- One flavor lane: 12 tips x 1 drop/sec = 720 beads/min ~= 6.5 servings/min.
- 20 servings of one flavor ~= 3 minutes of dripping. All six flavors run in parallel.
- Full run (6 flavors x 20 servings = 13,200 beads) ~= 3 min dripping + ~2 min set residence + rinse/harvest ~= **10-15 minutes per full run**.
- Compare: hand caviar tools do ~300 pearls/min; small commercial machines 2,000+ pearls/hour; industrial lines 50-200 kg/hour. The Fabricator sits between catering tool and factory line: a flavor-lab scale machine.

## Agar consistency spec (the "strong gel" target)

- Working range 1.2-1.5% agar by weight for a firm pop (1.5% is the molecularrecipes.com sriracha-pearl reference; 0.25% makes delicate pearls).
- Activate: full boil 1-2 min with constant whisking (agar only hydrates above ~85 C).
- Dispense: 50-55 C. Too hot and droplets do not set before hitting the plate; too cool and the mix gels in the tips.
- Set: oil at 2-5 C. Colder than ~0 C risks rubbery texture; warmer than ~10 C risks deformed beads.
- Rinse: cold water, once or twice, immediately after drain. Do not leave beads sitting in oil.

## Controls, materials, cleaning

- Touchscreen with per-flavor profiles: agar %, dispense temp, drip rate, servings target. One-tap "run," "rinse," "clean."
- Food-contact materials: SS316, food-grade silicone tubing, PTFE nozzle plates.
- Cleaning cycle: hot-water flush through pumps and tips (agar re-melts above ~85 C, so the system self-clears), oil drain + filter, spray-bar sanitize.
- Footprint estimate: ~60 x 60 x 120 cm countertop tower. Power ~2 kW (heaters + recirculating chiller).
- Prototype cost estimate: $3,000-8,000 in parts (pumps, chiller, servos, fabrication). Reference: small commercial boba machines run $435-7,000; full industrial lines $8,000-47,000.

## What this is not (yet)

This is a concept design grounded in published spherification parameters and commercial machine benchmarks. It is not a manufactured product, not UL/NSF certified, and the iris-plate mechanism needs a working prototype to validate seal reliability with viscous agar mixes. Recommended next step: build Layer 3 + one lane of Layers 1-2 as a single-flavor benchtop prototype before committing to the six-lane tower.
