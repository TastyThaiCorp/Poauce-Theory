// ============================================================
// POAUCE FABRICATOR ("The Lab") - parametric concept model
// Multi-layer cold-oil spherification machine. Units: mm.
// ------------------------------------------------------------
// HOW TO USE (free):
//   1. Install OpenSCAD (openscad.org) - free, Windows/Mac/Linux
//   2. Open this file, press F6 to render
//   3. File > Export > Export as STL  -> send to a 3D printer
//   4. Change the parameters below to resize the machine
// STATUS: concept geometry for prototyping. Not manufacturing
// drawings. Validate seals, food-contact materials, and the
// iris mechanism on a physical prototype before production.
// ============================================================

$fn = 64;

// ---------------- parameters ----------------
footprint   = 600;   // overall width/depth
post_size   = 40;    // corner post section
base_h      = 20;    // base plate thickness

// Layer 5: used-oil reclaim tank
tank_w = 520; tank_d = 520; tank_h = 160;
tank_z = base_h;                       // 20

// Layer 4: iris aperture plate
plate_t = 30;
plate_z = tank_z + tank_h;             // 180

// Layer 3: cold oil bath
bath_h = 360;
bath_z = plate_z + plate_t;            // 210
bath_r_out = 240; bath_r_in = 210;

// Layer 2: drip array
nozzle_plate_z = bath_z + bath_h + 50; // 620
nozzle_plate_t = 20;

// Layer 1: sauce reservoirs
res_z = nozzle_plate_z + 80;           // 700
chamber_r = 88; chamber_h = 260;

frame_h = 1180;

// ================= MODULES =================

// ----- structural frame -----
module frame() {
    color([0.25, 0.25, 0.28]) {
        // base plate
        translate([-footprint/2, -footprint/2, 0])
            cube([footprint, footprint, base_h]);
        // 4 corner posts
        for (x = [-280, 280], y = [-280, 280])
            translate([x - post_size/2, y - post_size/2, base_h])
                cube([post_size, post_size, frame_h - base_h]);
        // top plate
        translate([-footprint/2, -footprint/2, frame_h])
            cube([footprint, footprint, base_h]);
    }
}

// ----- Layer 5: used-oil hold + reclaim tank -----
module reclaim_tank() {
    // tank body
    color([0.70, 0.72, 0.75])
        translate([-tank_w/2, -tank_d/2, tank_z])
            cube([tank_w, tank_d, tank_h]);
    // lid rim
    color([0.40, 0.42, 0.45])
        translate([-tank_w/2, -tank_d/2, tank_z + tank_h])
            cube([tank_w, tank_d, 20]);
    // filter cartridge hint (front)
    color([0.30, 0.30, 0.33])
        translate([-40, -tank_d/2 - 30, tank_z + 40])
            cube([80, 30, 80]);
    // return-to-chiller port (rear)
    color([0.30, 0.30, 0.33])
        translate([180, tank_d/2 - 10, tank_z + 90])
            rotate([0, 90, 0]) cylinder(d = 36, h = 50);
}

// ----- Layer 4: iris aperture plate -----
// Each drain port has an iris diaphragm (camera-aperture style):
// HOLD = closed, DRAIN = open, RINSE = open + spray bar.
module iris_plate() {
    // plate
    color([0.35, 0.37, 0.40])
        translate([-270, -270, plate_z])
            cube([540, 540, plate_t]);
    // 6 x 6 aperture ports
    for (ix = [0:5], iy = [0:5]) {
        x = -225 + ix * 90;
        y = -225 + iy * 90;
        // iris housing ring (gold)
        color([0.85, 0.65, 0.20])
            translate([x, y, plate_z]) cylinder(d = 44, h = plate_t + 4);
        // bore (dark)
        color([0.08, 0.08, 0.10])
            translate([x, y, plate_z - 1]) cylinder(d = 28, h = plate_t + 6);
        // iris blade hints
        for (b = [0:2])
            translate([x, y, plate_z + plate_t + 4])
                rotate([0, 0, b * 60 + 15])
                    translate([6, -3, 0])
                        color([0.95, 0.75, 0.30]) cube([18, 6, 4]);
    }
    // rinse spray bar
    color([0.55, 0.58, 0.62])
        translate([-250, 0, plate_z + plate_t + 14])
            rotate([0, 90, 0]) cylinder(d = 16, h = 500);
}

// ----- Layer 3: cold oil bath -----
module oil_bath() {
    // cooling jacket (transparent)
    color([0.50, 0.75, 0.90, 0.25])
        translate([0, 0, bath_z]) cylinder(r = bath_r_out, h = bath_h);
    // oil volume (transparent)
    color([0.65, 0.80, 0.85, 0.35])
        translate([0, 0, bath_z + 10]) cylinder(r = bath_r_in, h = bath_h - 30);
    // chiller coil hint (3 rings)
    for (i = [0:2])
        color([0.60, 0.65, 0.70])
            translate([0, 0, bath_z + 70 + i * 90])
                rotate_extrude() translate([225, 0, 0]) circle(d = 18);
    // lid ring
    color([0.35, 0.37, 0.40])
        translate([0, 0, bath_z + bath_h]) cylinder(r = 245, h = 20);
    // chiller in/out ports
    color([0.30, 0.30, 0.33]) {
        translate([bath_r_out, 0, bath_z + 90])
            rotate([0, 90, 0]) cylinder(d = 36, h = 50);
        translate([-bath_r_out - 50, 0, bath_z + 290])
            rotate([0, 90, 0]) cylinder(d = 36, h = 50);
    }
}

// ----- Layer 2: precision drip array (72 tips) -----
module drip_array() {
    // nozzle plate
    color([0.35, 0.37, 0.40])
        translate([-240, -240, nozzle_plate_z])
            cube([480, 480, nozzle_plate_t]);
    // 6 flavor groups x 12 tips each
    for (g = [0:5]) {
        gx = -187.5 + g * 75;
        // group manifold hint
        color([0.50, 0.52, 0.55])
            translate([gx - 36, -36, nozzle_plate_z + nozzle_plate_t])
                cube([72, 72, 24]);
        for (ix = [0:3], iy = [0:2]) {
            x = gx - 27 + ix * 18;
            y = -18 + iy * 18;
            // tip: fine cone pointing down
            color([0.80, 0.80, 0.82])
                translate([x, y, nozzle_plate_z - 30])
                    cylinder(d1 = 2, d2 = 6, h = 30);
        }
    }
}

// ----- Layer 1: sauce reservoir deck (6 chambers) -----
module reservoirs() {
    for (gx = [0:2], gy = [0:1]) {
        x = -170 + gx * 170;
        y = -145 + gy * 290;
        // heated jacket (transparent amber)
        color([0.90, 0.60, 0.30, 0.22])
            translate([x, y, res_z]) cylinder(r = 100, h = 280);
        // sauce chamber
        color([0.75, 0.45, 0.20, 0.45])
            translate([x, y, res_z + 10]) cylinder(r = chamber_r, h = chamber_h);
        // lid
        color([0.35, 0.37, 0.40])
            translate([x, y, res_z + 280]) cylinder(r = 100, h = 18);
        // stirrer shaft + paddle
        color([0.50, 0.52, 0.55]) {
            translate([x, y, res_z + 20]) cylinder(d = 12, h = 270);
            translate([x - 30, y - 5, res_z + 30]) cube([60, 10, 10]);
        }
        // feed tube down toward drip array
        color([0.60, 0.62, 0.65])
            translate([x, y, nozzle_plate_z + nozzle_plate_t])
                cylinder(d = 16, h = res_z - nozzle_plate_z - nozzle_plate_t);
    }
}

// ----- control panel -----
module control_panel() {
    color([0.20, 0.22, 0.25])
        translate([150, -310, 880]) cube([180, 30, 240]);
    // screen
    color([0.05, 0.35, 0.30])
        translate([160, -308, 900]) cube([160, 4, 200]);
}

// ================= ASSEMBLY =================
frame();
reclaim_tank();
iris_plate();
oil_bath();
drip_array();
reservoirs();
control_panel();
