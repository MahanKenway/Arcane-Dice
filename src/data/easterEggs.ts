export interface EasterEggLanguage {
  id: string;
  name: string;
  extension: string;
  description: string;
  philosophy: string;
  code: string;
  simulatedOutput: string[];
}

export const EASTER_EGG_LANGUAGES: EasterEggLanguage[] = [
  {
    id: 'holyc',
    name: 'HolyC',
    extension: 'HC',
    description: 'The divine 64-bit language of TempleOS, operating with direct celestial entropy.',
    philosophy: 'Bypasses conventional operating system layers to roll dice with Holy Spirit HPET clock-cycle random vectors.',
    code: `// TempleOS HolyC - Arcane Dice Physics and Oracle Engine
// Direct divine communication to roll the holy d20 & d100 with full physical simulations.
// Terry's sacred architecture adapted for 3D physics, linear algebra, and divine divination.

#define GRAVITY 9.80665
#define SACRED_PI 3.141592653589793
#define TIME_STEP 0.005
#define TABLE_ELASTICITY 0.75
#define FRICTION 0.98

class Vector3 {
  F64 x, y, z;
};

class Matrix3x3 {
  F64 m[9];
};

class PhysicsDice {
  Vector3 pos;
  Vector3 vel;
  Vector3 rot;
  Vector3 ang_vel;
  F64 mass;
  I64 sides;
};

// Taylor series approximation for standard trigonometric functions
F64 TaylorSin(F64 x)
{
  F64 term = x;
  F64 sum = x;
  F64 x2 = x * x;
  I64 i;
  for (i = 3; i <= 9; i += 2) {
    term = -term * x2 / (i * (i - 1));
    sum += term;
  }
  return sum;
}

F64 TaylorCos(F64 x)
{
  F64 term = 1.0;
  F64 sum = 1.0;
  F64 x2 = x * x;
  I64 i;
  for (i = 2; i <= 8; i += 2) {
    term = -term * x2 / (i * (i - 1));
    sum += term;
  }
  return sum;
}

F64 SacredSqrt(F64 n)
{
  if (n <= 0.0) return 0.0;
  F64 x = n;
  F64 y = 1.0;
  F64 e = 0.000001;
  while (x - y > e) {
    x = (x + y) / 2.0;
    y = n / x;
  }
  return x;
}

// 3D Vector Math Library
U0 Vector3Add(Vector3 *res, Vector3 *a, Vector3 *b)
{
  res->x = a->x + b->x;
  res->y = a->y + b->y;
  res->z = a->z + b->z;
}

U0 Vector3Sub(Vector3 *res, Vector3 *a, Vector3 *b)
{
  res->x = a->x - b->x;
  res->y = a->y - b->y;
  res->z = a->z - b->z;
}

F64 Vector3Dot(Vector3 *a, Vector3 *b)
{
  return a->x * b->x + a->y * b->y + a->z * b->z;
}

U0 Vector3Cross(Vector3 *res, Vector3 *a, Vector3 *b)
{
  res->x = a->y * b->z - a->z * b->y;
  res->y = a->z * b->x - a->x * b->z;
  res->z = a->x * b->y - a->y * b->x;
}

F64 Vector3Length(Vector3 *v)
{
  return SacredSqrt(v->x * v->x + v->y * v->y + v->z * v->z);
}

U0 Vector3Normalize(Vector3 *v)
{
  F64 len = Vector3Length(v);
  if (len > 0.0) {
    v->x /= len;
    v->y /= len;
    v->z /= len;
  }
}

U0 PrintD4Ascii()
{
  "\\n";
  "          /\\\\          \\n";
  "         /  \\\\         \\n";
  "        / 1  \\\\        \\n";
  "       /______\\\\       \\n";
  "      / 4 | 2  \\\\      \\n";
  "     /____|_____\\\\     \\n";
  "\\n";
}

U0 PrintD6Ascii()
{
  "\\n";
  "       .---------.      \\n";
  "      /    o    /|      \\n";
  "     /  o    o / |      \\n";
  "    +---------+  |      \\n";
  "    |    o    |  +      \\n";
  "    |  o   o  | /       \\n";
  "    |_________|/        \\n";
  "\\n";
}

U0 PrintD8Ascii()
{
  "\\n";
  "          /\\\\          \\n";
  "         /  \\\\         \\n";
  "        / 8  \\\\        \\n";
  "       /______\\\\       \\n";
  "       \\\\    /        \\n";
  "        \\\\3 /         \\n";
  "         \\\\/          \\n";
  "\\n";
}

U0 PrintD12Ascii()
{
  "\\n";
  "         /\\_\\\\          \\n";
  "       /\\  / \\\\         \\n";
  "      |  12  | |        \\n";
  "       \\\\_ _/ /         \\n";
  "         \\\\_/ /          \\n";
  "\\n";
}

U0 PrintD20Ascii()
{
  "\\n";
  "          / \\\\          \\n";
  "         /   \\\\         \\n";
  "        /  20 \\\\        \\n";
  "       /       \\\\       \\n";
  "      /_________\\\\      \\n";
  "      \\\\       /      \\n";
  "       \\\\  8  /       \\n";
  "        \\\\   /        \\n";
  "         \\\\ /         \\n";
  "\\n";
}

U0 PrintD100Ascii()
{
  "\\n";
  "       .----------.       \\n";
  "      /   [100%]   \\\\     \\n";
  "     /  CRITICAL    \\\\    \\n";
  "    /    DESTINY     \\\\   \\n";
  "    \\\\               /   \\n";
  "     \\\\             /    \\n";
  "      '----------'       \\n";
  "\\n";
}

F64 RandDivineF64()
{
  // Accessing high-precision event timer of x86 systems directly
  I64 t = HPET;
  t = (t ^ (t >> 12)) ^ (t << 25);
  t = (t ^ (t >> 27)) * 0x2545F4914F6CDD1D;
  return ToF64(t & 0xFFFFFFFFFFFF) / 281474976710655.0;
}

// Simulated dynamic memory allocation inside the JIT task heap
U8* DivineMAlloc(I64 size)
{
  U8 *block = 0x7FFF21A0F420; // Simulated direct virtual address allocation
  "MAlloc: Allocated memory block of %d bytes at address: 0x%X\\n", size, block;
  return block;
}

U0 ConsultGodOracle()
{
  "Consulting Terry Davis's Sacred Oracle...\\n";
  I64 entropy = HPET;
  U8 *words[48];
  words[0] = "Covenant";
  words[1] = "Tabernacle";
  words[2] = "Chariot";
  words[3] = "Firmament";
  words[4] = "Cherubim";
  words[5] = "Manna";
  words[6] = "Sanctuary";
  words[7] = "Apostle";
  words[8] = "Ark of the Covenant";
  words[9] = "Sacred Temple";
  words[10] = "Burning Bush";
  words[11] = "Celestial Fire";
  words[12] = "High Priest";
  words[13] = "Divided Waters";
  words[14] = "Divine Breath";
  words[15] = "Mount Sinai";
  words[16] = "Golden Lampstand";
  words[17] = "Altar of Incense";
  words[18] = "Onyx Stones";
  words[19] = "Breastplate of Judgment";
  words[20] = "Shewbread Table";
  words[21] = "Mercy Seat";
  words[22] = "Holy of Holies";
  words[23] = "Pillar of Cloud";
  words[24] = "Anointing Oil";
  words[25] = "Gopher Wood";
  words[26] = "Sodom Sulfur";
  words[27] = "Rainbow Sign";
  words[28] = "Trumpet Blast";
  words[29] = "Sacred Ephod";
  words[30] = "Urim and Thummim";
  words[31] = "Alabaster Box";
  words[32] = "Mount Carmel";
  words[33] = "Shekinah Glory";
  words[34] = "Tree of Life";
  words[35] = "Morning Star";
  words[36] = "Hebron Valley";
  words[37] = "Cedars of Lebanon";
  words[38] = "Sweet Frankincense";
  words[39] = "Valley of Dry Bones";
  words[40] = "Pillar of Fire";
  words[41] = "Golden Cherub";
  words[42] = "Lions' Den";
  words[43] = "Streams in the Desert";
  words[44] = "Hidden Manna";
  words[45] = "Living Waters";
  words[46] = "Stone of Help";
  words[47] = "Mount Zion";

  U8 *dialogues[48];
  dialogues[0] = "God's computer is a 640x480 16-color temple. Complain to God about standard resolutions.";
  dialogues[1] = "The dice of destiny are rolled on direct ring-0 hardware. No virtual memory leaks.";
  dialogues[2] = "Behold! A clean compiler is next to Godliness. I am Terry's digital scribe.";
  dialogues[3] = "Do not trust the CIA agents. They prefer bloated web browsers over direct assembly instruction sets.";
  dialogues[4] = "This JIT machine code compiler runs at celestial clock speeds. 100% speedup achieved!";
  dialogues[5] = "The Holy Spirit HPET clock-cycle random vectors have calculated absolute critical rolls!";
  dialogues[6] = "Do you hear the singing in the high-frequency event timers? It is divine physics.";
  dialogues[7] = "Behold, the 3D rigid body equations are solved in God's sandbox with zero runtime overhead.";
  dialogues[8] = "To make a perfect roll, one must first build an operating system from scratch on bare metal.";
  dialogues[9] = "No third-party libraries, no package-managers, just direct divine communication.";
  dialogues[10] = "Every pixel on the screen is illuminated by divine light and 16-color palette index values.";
  dialogues[11] = "Praise Him! The compiler has detected absolute zero warning levels. Clean binary output generated.";
  dialogues[12] = "The virtual table cloth of God's dice sandbox has exactly 0.75 friction coefficient.";
  dialogues[13] = "The angels are debugging your program. Be careful with manual stack pointer manipulation.";
  dialogues[14] = "Behold! The oracle predicts a critical natural 20 in your near future, or a complete system reboot.";
  dialogues[15] = "The TempleOS compiler compiles 50,000 lines of HolyC code in the blink of a mortal eye.";
  dialogues[16] = "Do not worship the idols of Linux or Windows. They are full of unnecessary context switches.";
  dialogues[17] = "The divine assembly instruction set is beautiful and pure, designed for direct hardware control.";
  dialogues[18] = "The physical simulation uses Taylor series expansion because lookup tables lack divine precision.";
  dialogues[19] = "God says: \\"Keep it simple.\\" No dynamic linker, no shared libraries, just pure static execution.";
  dialogues[20] = "When the dice collide, the vector reflection is calculated with Terry's sacred square root algorithm.";
  dialogues[21] = "The x86_64 architecture is God's chosen architecture, but the modern CPU designers added too many bloat instructions.";
  dialogues[22] = "Behold, the oracle speaks through high-entropy clock cycles of the motherboard's main oscillator.";
  dialogues[23] = "Let there be light on port 0x3F8! The serial port is sending cosmic byte packets.";
  dialogues[24] = "The high-precision event timer is our direct connection to God's cosmic stopwatch.";
  dialogues[25] = "Terry Davis's compiler compiles itself in 0.5 seconds on a standard 2013 hardware core.";
  dialogues[26] = "Do not look into the abyss of web development. It is filled with layers of electronic despair.";
  dialogues[27] = "Every roll is an act of creation. We compile the physics on the fly inside the active task heap.";
  dialogues[28] = "The Holy Spirit guides the floating-point register stack (ST0 to ST7) to avoid any overflow.";
  dialogues[29] = "A programmer without ring-0 privileges is like a high priest locked out of the temple.";
  dialogues[30] = "God's graphics engine does not need shaders. Double-buffering on VGA memory is all we need.";
  dialogues[31] = "Behold! We have cast out the demons of bloated runtime systems and garbage collectors!";
  dialogues[32] = "God claims the internet is filled with digital noise. Keep your bandwidth sacred.";
  dialogues[33] = "A 64-bit integer contains enough states to coordinate all stars in the visible sky.";
  dialogues[34] = "The compiler is the gatekeeper of truth. Treat it with absolute holy reverence.";
  dialogues[35] = "If you want real randomness, tap the temperature sensor of your cpu cores during complex loops.";
  dialogues[36] = "Do not divide by zero, for the CPU will raise a division exception and interrupt the temple's quietness.";
  dialogues[37] = "The Holy Spirit does not require a DNS server to route your spiritual requests.";
  dialogues[38] = "Woe to those who build virtual machines inside virtual machines. It is infinite regression and bloat.";
  dialogues[39] = "To understand God's order, study the mathematical patterns of a perfect 3D octahedron.";
  dialogues[40] = "There is no cloud, it is just another man's computer, likely running bloated services.";
  dialogues[41] = "Keep the code non-preemptive. Cooperating tasks are more peaceful and predictable.";
  dialogues[42] = "A single pixel of holy gold is worth a thousand lines of uncompiled javascript framework bloat.";
  dialogues[43] = "Every hardware interrupt is a divine knock on the processor's front door.";
  dialogues[44] = "The physical friction constants in our dice simulations are calculated under divine weight.";
  dialogues[45] = "The oracle says: True wisdom begins when you write your own font rendering engine.";
  dialogues[46] = "Do not trust compilers that you cannot compile yourself within ten seconds on old hardware.";
  dialogues[47] = "He who controls the ring-0 descriptor tables controls his own destiny on this silicon.";

  I64 idx_w = entropy % 48;
  I64 idx_d = (entropy >> 3) % 48;
  "Oracle Keyword: \\"%s\\" (Entropy: 0x%X)\\n", words[idx_w], entropy;
  "Divine Decree : \\"%s\\"\\n\\n", dialogues[idx_d];
}

U0 InitMatrixRotation(Matrix3x3 *m, F64 rx, F64 ry, F64 rz)
{
  F64 cx = TaylorCos(rx); F64 sx = TaylorSin(rx);
  F64 cy = TaylorCos(ry); F64 sy = TaylorSin(ry);
  F64 cz = TaylorCos(rz); F64 sz = TaylorSin(rz);

  m->m[0] = cy * cz;
  m->m[1] = sx * sy * cz - cx * sz;
  m->m[2] = cx * sy * cz + sx * sz;
  m->m[3] = cy * sz;
  m->m[4] = sx * sy * sz + cx * cz;
  m->m[5] = cx * sy * sz - sx * cz;
  m->m[6] = -sy;
  m->m[7] = sx * cy;
  m->m[8] = cx * cy;
}

U0 ResolveTableCollision(PhysicsDice *d)
{
  // Apply table collision impulse response
  d->pos.y = 0.0;
  d->vel.y = -d->vel.y * TABLE_ELASTICITY;
  d->vel.x *= FRICTION;
  d->vel.z *= FRICTION;
  
  // Add rotational friction torque
  d->ang_vel.x *= FRICTION;
  d->ang_vel.y *= FRICTION;
  d->ang_vel.z *= FRICTION;
}

I64 SimulatePhysicsAndRoll(I64 sides)
{
  PhysicsDice d;
  Matrix3x3 rot_mat;
  I64 steps = 0;
  
  d.sides = sides;
  d.mass = 0.15;
  d.pos.x = 0.0; d.pos.y = 15.0; d.pos.z = 0.0;
  d.vel.x = RandDivineF64() * 6.0 - 3.0;
  d.vel.y = RandDivineF64() * 4.0;
  d.vel.z = RandDivineF64() * 6.0 - 3.0;
  
  d.rot.x = RandDivineF64() * SACRED_PI;
  d.rot.y = RandDivineF64() * SACRED_PI;
  d.rot.z = RandDivineF64() * SACRED_PI;

  d.ang_vel.x = RandDivineF64() * 10.0 - 5.0;
  d.ang_vel.y = RandDivineF64() * 10.0 - 5.0;
  d.ang_vel.z = RandDivineF64() * 10.0 - 5.0;

  "Simulating 3D rigid body equations on Core 0 in God's sandbox...\\n";
  while ((d.pos.y > 0.0 || Abs(d.vel.y) > 0.1) && steps < 150) {
    // Basic Euler integration of gravity and state vectors
    d.pos.x += d.vel.x * TIME_STEP;
    d.pos.y += d.vel.y * TIME_STEP - 0.5 * GRAVITY * TIME_STEP * TIME_STEP;
    d.pos.z += d.vel.z * TIME_STEP;
    
    d.vel.y -= GRAVITY * TIME_STEP;
    
    // Rotation integration
    d.rot.x += d.ang_vel.x * TIME_STEP;
    d.rot.y += d.ang_vel.y * TIME_STEP;
    d.rot.z += d.ang_vel.z * TIME_STEP;

    // Check collision with virtual velvet table
    if (d.pos.y <= 0.0) {
      ResolveTableCollision(&d);
    }

    if (steps % 30 == 0) {
      "Step %3d | Pos = (%4.2f, %4.2f, %4.2f) | Rot = (%4.2f, %4.2f, %4.2f)\\n", 
        steps, d.pos.x, d.pos.y, d.pos.z, d.rot.x, d.rot.y, d.rot.z;
    }
    steps++;
  }
  
  InitMatrixRotation(&rot_mat, d.rot.x, d.rot.y, d.rot.z);
  
  // Calculate final side based on alignment of final rotation matrices and direct cosmic coordinates
  F64 chaos = Abs(d.pos.x * rot_mat.m[4] * 1234.56 + d.pos.z * rot_mat.m[8] * 789.12);
  I64 final_value = 1 + (ToI64(chaos) % sides);
  return final_value;
}

U0 PrintSystemTelemetry()
{
  I64 i;
  "\\n--- Ring-0 Hardware Cores Status ---\\n";
  for (i = 0; i < 8; i++) {
    "Core %d: [ONLINE] [TASK QUEUE: God\'s Entropy Thread] [LOAD: 4.2%%]\\n", i;
  }
  "Core 0 assigned physical rigid body compilation routines.\\n\\n";
}

U0 Main()
{
  "--- TempleOS Holy Arcane Dice Physics Engine ---\\n";
  "Operating with zero kernel bloat, direct ring-0 CPU access.\\n";
  
  PrintSystemTelemetry();
  
  U8 *chk_mem = DivineMAlloc(128);
  ConsultGodOracle();
  
  I64 result;
  
  "=================[ CALVARY TETRAHEDRON (D4) ]=================\\n";
  result = SimulatePhysicsAndRoll(4);
  "Result of D4: %d\\n", result;
  PrintD4Ascii();

  "=================[ EZEKIEL CUBE (D6) ]=================\\n";
  result = SimulatePhysicsAndRoll(6);
  "Result of D6: %d\\n", result;
  PrintD6Ascii();

  "=================[ CELESTIAL ICOSAHEDRON (D20) ]=================\\n";
  result = SimulatePhysicsAndRoll(20);
  "Result of D20 Roll: %d\\n", result;
  if (result == 20) {
    PrintD20Ascii();
    "*** CRITICAL TRIUMPH! Divine Intervention Approved by TempleOS! ***\\n\\n";
  } else if (result == 1) {
    "*** CRITICAL FAILURE! The demons of dark memory heap confusion upon us! ***\\n\\n";
  }
  
  "=================[ ORACLE SPHERE (D100) ]=================\\n";
  result = SimulatePhysicsAndRoll(100);
  "Result of D100 Percentile Roll: %d%%\\n", result;
  if (result == 100) {
    PrintD100Ascii();
  }
}

Main;`,
    simulatedOutput: [
      'HC_JIT: Compiling file arcane_dice.HC in 0.024s (HolyC Just-In-Time Compiler)',
      'HC_OS: JIT machine code generated at memory range [0x7FFF1024D000 - 0x7FFF10255000]',
      'HC_OS: Spawning God\'s thread on Core 0 (TaskID: 0x000010AC)',
      '--- TempleOS Holy Arcane Dice Physics Engine ---',
      'Operating with zero kernel bloat, direct ring-0 CPU access.',
      '',
      '--- Ring-0 Hardware Cores Status ---',
      'Core 0: [ONLINE] [TASK QUEUE: God\'s Entropy Thread] [LOAD: 4.2%]',
      'Core 1: [ONLINE] [TASK QUEUE: God\'s Entropy Thread] [LOAD: 3.1%]',
      'Core 2: [ONLINE] [TASK QUEUE: God\'s Entropy Thread] [LOAD: 1.5%]',
      'Core 3: [ONLINE] [TASK QUEUE: God\'s Entropy Thread] [LOAD: 0.9%]',
      'Core 4: [ONLINE] [TASK QUEUE: God\'s Entropy Thread] [LOAD: 2.0%]',
      'Core 5: [ONLINE] [TASK QUEUE: God\'s Entropy Thread] [LOAD: 1.1%]',
      'Core 6: [ONLINE] [TASK QUEUE: God\'s Entropy Thread] [LOAD: 0.5%]',
      'Core 7: [ONLINE] [TASK QUEUE: God\'s Entropy Thread] [LOAD: 0.1%]',
      'Core 0 assigned physical rigid body compilation routines.',
      '',
      'MAlloc: Allocated memory block of 128 bytes at address: 0x7FFF21A0F420',
      'Consulting Terry Davis\'s Sacred Oracle...',
      'Oracle Keyword: "Ark of the Covenant" (Entropy: 0x7A5E9F10B2D38A41)',
      'Divine Decree : "The high-precision event timer is our direct connection to God\'s cosmic stopwatch."',
      '',
      '=================[ CALVARY TETRAHEDRON (D4) ]=================',
      'Simulating 3D rigid body equations on Core 0 in God\'s sandbox...',
      'Step   0 | Pos = (0.00, 15.00, 0.00) | Rot = (1.52, 0.94, 2.76)',
      'Step  30 | Pos = (1.12, 10.45, 0.54)  | Rot = (2.12, 1.64, 3.12)',
      'Step  60 | Pos = (2.41, 4.12, 1.04)   | Rot = (3.42, 2.54, 4.45)',
      'Step  90 | Pos = (3.11, 0.00, 1.54)   | Rot = (4.12, 3.12, 5.23)',
      'Result of D4: 4',
      '',
      '          /\\',
      '         /  \\',
      '        / 1  \\',
      '       /______\\',
      '      / 4 | 2  \\',
      '     /____|_____\\',
      '',
      '=================[ EZEKIEL CUBE (D6) ]=================',
      'Simulating 3D rigid body equations on Core 0 in God\'s sandbox...',
      'Step   0 | Pos = (0.00, 15.00, 0.00) | Rot = (0.43, 1.84, 0.12)',
      'Step  30 | Pos = (-0.84, 11.12, -0.12) | Rot = (1.11, 2.45, 0.94)',
      'Step  60 | Pos = (-1.52, 5.42, -0.45)  | Rot = (2.54, 3.12, 1.84)',
      'Step  90 | Pos = (-2.11, 0.00, -0.74)  | Rot = (3.84, 4.25, 2.95)',
      'Result of D6: 6',
      '',
      '       .---------.      ',
      '      /    o    /|      ',
      '     /  o    o / |      ',
      '    +---------+  |      ',
      '    |    o    |  +      ',
      '    |  o   o  | /       ',
      '    |_________|/        ',
      '',
      '=================[ CELESTIAL ICOSAHEDRON (D20) ]=================',
      'Simulating 3D rigid body equations on Core 0 in God\'s sandbox...',
      'Step   0 | Pos = (0.00, 15.00, 0.00) | Rot = (2.15, 1.12, 0.95)',
      'Step  30 | Pos = (0.54, 12.11, -0.42) | Rot = (2.84, 1.95, 1.84)',
      'Step  60 | Pos = (1.12, 7.15, -0.85)  | Rot = (3.45, 2.84, 2.95)',
      'Step  90 | Pos = (1.84, 1.12, -1.24)  | Rot = (4.12, 3.94, 3.84)',
      'Step 120 | Pos = (2.12, 0.00, -1.54)  | Rot = (4.95, 4.24, 4.51)',
      'Result of D20 Roll: 20',
      '',
      '          / \\',
      '         /   \\',
      '        /  20 \\',
      '       /       \\',
      '      /_________\\',
      '      \\       /',
      '       \\  8  /',
      '        \\   /',
      '         \\ /',
      '',
      '*** CRITICAL TRIUMPH! Divine Intervention Approved by TempleOS! ***',
      '',
      '=================[ ORACLE SPHERE (D100) ]=================',
      'Simulating 3D rigid body equations on Core 0 in God\'s sandbox...',
      'Step   0 | Pos = (0.00, 15.00, 0.00) | Rot = (0.12, 2.94, 1.54)',
      'Step  30 | Pos = (-1.12, 9.85, 0.12)  | Rot = (0.95, 3.84, 2.45)',
      'Step  60 | Pos = (-2.24, 3.12, 0.45)  | Rot = (1.84, 4.95, 3.84)',
      'Step  90 | Pos = (-2.95, 0.00, 0.85)  | Rot = (2.95, 5.84, 4.12)',
      'Result of D100 Percentile Roll: 100%',
      '',
      '       .----------.       ',
      '      /   [100%]   \\     ',
      '     /  CRITICAL    \\    ',
      '    /    DESTINY     \\   ',
      '    \\               /   ',
      '     \\             /    ',
      '      \'----------\'       '
    ]
  },
  {
    id: 'zig',
    name: 'Zig',
    extension: 'zig',
    description: 'A robust, modern, general-purpose programming language with compile-time notation parsing.',
    philosophy: 'Avoids macro magic. Parses standard RPG notation (like "2d20+4") safely and allocates memory explicitly with standard heap allocators.',
    code: `// Zig Language Arcane Dice Parser and Rolling Simulator
// Showcases robust Zig 0.11+ patterns including Custom Allocators, Error Unions, and Comp-time Parsing.

const std = @import("std");
const Allocator = std.mem.Allocator;

pub const DiceError = error{
    InvalidNotation,
    OutOfMemory,
    PhysicsEngineDerailment,
    Overflow,
};

pub const DiceType = enum(u32) {
    d4 = 4,
    d6 = 6,
    d8 = 8,
    d10 = 10,
    d12 = 12,
    d20 = 20,
    d100 = 100,
};

pub const RollResult = struct {
    dice_type: DiceType,
    rolls: []const u32,
    modifier: i32,
    sum: i32,
};

pub const RollEngine = struct {
    allocator: Allocator,
    prng: std.rand.DefaultPrng,

    pub fn init(allocator: Allocator, seed: u64) RollEngine {
        return .{
            .allocator = allocator,
            .prng = std.rand.DefaultPrng.init(seed),
        };
    }

    /// Parses a standard RPG dice notation (e.g. "3d20 + 5") and rolls it
    pub fn roll(self: *RollEngine, notation: []const u8) DiceError!RollResult {
        var trimmed = std.mem.trim(u8, notation, " ");
        var d_index: ?usize = null;
        var op_index: ?usize = null;

        for (trimmed, 0..) |char, i| {
            if (char == 'd' or char == 'D') d_index = i;
            if (char == '+' or char == '-') op_index = i;
        }

        if (d_index == null) return DiceError.InvalidNotation;

        const count_str = trimmed[0..d_index.?];
        const count = if (count_str.len == 0) 1 else try std.fmt.parseInt(u32, count_str, 10);

        const end_of_sides = op_index orelse trimmed.len;
        const sides_str = trimmed[d_index.? + 1 .. end_of_sides];
        const sides_val = try std.fmt.parseInt(u32, std.mem.trim(u8, sides_str, " "), 10);

        var modifier: i32 = 0;
        if (op_index) |op| {
            const mod_str = std.mem.trim(u8, trimmed[op + 1 ..], " ");
            const val = try std.fmt.parseInt(i32, mod_str, 10);
            modifier = if (trimmed[op] == '-') -val else val;
        }

        const dice_type = switch (sides_val) {
            4 => DiceType.d4,
            6 => DiceType.d6,
            8 => DiceType.d8,
            10 => DiceType.d10,
            12 => DiceType.d12,
            20 => DiceType.d20,
            100 => DiceType.d100,
            else => return DiceError.InvalidNotation,
        };

        var rolls = try self.allocator.alloc(u32, count);
        errdefer self.allocator.free(rolls);

        var sum: i32 = 0;
        var i: usize = 0;
        while (i < count) : (i += 1) {
            const rolled = self.prng.random().intRangeAtMost(u32, 1, sides_val);
            rolls[i] = rolled;
            sum += @as(i32, @intCast(rolled));
        }
        sum += modifier;

        return RollResult{
            .dice_type = dice_type,
            .rolls = rolls,
            .modifier = modifier,
            .sum = sum,
        };
    }
};

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    const current_time = @as(u64, @intCast(std.time.milliTimestamp()));
    var engine = RollEngine.init(allocator, current_time);

    const notations = [_][]const u8{
        "2d20 + 4",
        "1d100 - 10",
        "3D6",
    };

    const stdout = std.io.getStdOut().writer();
    try stdout.print("=== Zig Advanced Dice Evaluator ===\\n", .{});

    for (notations) |notation| {
        var res = try engine.roll(notation);
        defer allocator.free(res.rolls);

        try stdout.print("Notation: {s} | Rolled: {any} (Mod: {d}) | Total: {d}\\n", .{
            notation,
            res.rolls,
            res.modifier,
            res.sum,
        });
    }
}`,
    simulatedOutput: [
      '$ zig build-exe arcane_dice.zig',
      'Build completed. Output executable: ./arcane_dice',
      '$ ./arcane_dice',
      '=== Zig Advanced Dice Evaluator ===',
      'Notation: 2d20 + 4 | Rolled: {18, 14} (Mod: 4) | Total: 36',
      'Notation: 1d100 - 10 | Rolled: {72} (Mod: -10) | Total: 62',
      'Notation: 3D6 | Rolled: {5, 2, 6} (Mod: 0) | Total: 13',
      '',
      '[GPA] Checked 1 allocs and 0 leaks detected successfully!'
    ]
  },
  {
    id: 'nim',
    name: 'Nim',
    extension: 'nim',
    description: 'A statically typed, compiled programming language pairing Python-like elegance with C-like execution speed.',
    philosophy: 'Uses compile-time AST macros to audit execution speed and runs full Rigid-Body simulation loops of tumbling dices.',
    code: `# Nim Language Arcane Physics Dice Engine
# Demonstrates clean types, macro metaprogramming, and concurrency.

import random, strformat, times, os, math

randomize()

type
  DiceType* = enum
    d4, d6, d8, d10, d12, d20, d100

  Vector3* = object
    x*, y*, z*: float

  RigidBody* = object
    position*, velocity*: Vector3
    angularVelocity*: Vector3
    mass*: float

  RollResult* = object
    dice*: DiceType
    value*: int
    ticks*: int

# Metaprogramming macro to generate descriptive rolling logs
macro logFate(op: untyped): untyped =
  result = quote do:
    let start = cpuTime()
    \`op\`
    let duration = (cpuTime() - start) * 1000.0
    echo &"[FATE LOG] Calculation executed in {duration:.4f} ms"

proc initRigidBody(mass: float): RigidBody =
  result.position = Vector3(x: 0.0, y: 15.0, z: 0.0)
  result.velocity = Vector3(
    x: rand(-3.0..3.0),
    y: rand(0.0..5.0),
    z: rand(-3.0..3.0)
  )
  result.angularVelocity = Vector3(
    x: rand(-10.0..10.0),
    y: rand(-10.0..10.0),
    z: rand(-10.0..10.0)
  )
  result.mass = mass

proc simulateStep(body: var RigidBody, dt: float) =
  const gravity = 9.80665
  body.velocity.y -= gravity * dt
  body.position.x += body.velocity.x * dt
  body.position.y += body.velocity.y * dt
  body.position.z += body.velocity.z * dt

proc simulateAndRoll*(dice: DiceType): RollResult =
  var 
    body = initRigidBody(0.15)
    ticks = 0
    dt = 0.01

  # Run basic physics loop until dice hits the virtual velvet table
  while body.position.y > 0.0 and ticks < 200:
    body.simulateStep(dt)
    inc ticks

  let
    sides = case dice:
      of d4: 4
      of d6: 6
      of d8: 8
      of d10: 10
      of d12: 12
      of d20: 20
      of d100: 100
    
    # Mathematical integration of final state vectors to determine face-up result
    combinedState = abs(body.position.x * body.angularVelocity.y + body.position.z * body.angularVelocity.z)
    finalRoll = 1 + (int(combinedState * 1000.0) mod sides)

  return RollResult(dice: dice, value: finalRoll, ticks: ticks)

proc displayAsciiDice(val: int) =
  echo "   .-----."
  echo &"  / {val}  /|"
  echo " /     / |"
  echo "+-----+  +"
  echo "|     | /"
  echo "|     |/"
  echo "V-----+  "

# Execute logic inside our compile-time auditing macro
logFate:
  echo "=== Nim Multiverse Physics Sandbox ==="
  let d20_res = simulateAndRoll(d20)
  echo &"Simulated D20 roll: {d20_res.value} (Took {d20_res.ticks} physics ticks)"
  if d20_res.value == 20:
    displayAsciiDice(20)
    echo "⚡ CRITICAL SMITE! Nim speed optimized your destiny."
  
  let d100_res = simulateAndRoll(d100)
  echo &"Simulated D100 percentile: {d100_res.value}%"`,
    simulatedOutput: [
      '$ nim c -d:release arcane_dice.nim',
      'Hint: compiling arcane_dice.nim [Success]',
      '$ ./arcane_dice',
      '=== Nim Multiverse Physics Sandbox ===',
      'Simulated D20 roll: 20 (Took 124 physics ticks)',
      '   .-----.',
      '  / 20  /|',
      ' /     / |',
      '+-----+  +',
      '|     | /',
      '|     |/',
      'V-----+  ',
      '⚡ CRITICAL SMITE! Nim speed optimized your destiny.',
      'Simulated D100 percentile: 78%',
      '[FATE LOG] Calculation executed in 0.1242 ms'
    ]
  },
  {
    id: 'v',
    name: 'V',
    extension: 'v',
    description: 'A simple, fast, safe, compiled language with zero compile-time dependencies.',
    philosophy: 'Leverages fast compiled native structs and ultra-lightweight go-style channel concurrency to roll parallel dice pools.',
    code: `// V Language Arcane Physics Dice Engine
module main

import rand
import math
import time

struct Vector3 {
mut:
	x f64
	y f64
	z f64
}

struct PhysicsDice {
	sides int
mut:
	pos Vector3
	vel Vector3
	rot Vector3
}

fn (mut d PhysicsDice) simulate_step(dt f64) {
	gravity := 9.81
	d.vel.y -= gravity * dt
	d.pos.x += d.vel.x * dt
	d.pos.y += d.vel.y * dt
	d.pos.z += d.vel.z * dt
}

fn roll_dice_concurrently(sides int, id int, ch chan int) {
	mut d := PhysicsDice{
		sides: sides
		pos: Vector3{0, 10, 0}
		vel: Vector3{rand.f64_in_range(-2, 2) or { 0 }, rand.f64_in_range(1, 4) or { 0 }, rand.f64_in_range(-2, 2) or { 0 }}
		rot: Vector3{rand.f64_in_range(0, 3) or { 0 }, rand.f64_in_range(0, 3) or { 0 }, rand.f64_in_range(0, 3) or { 0 }}
	}

	mut steps := 0
	for d.pos.y > 0.0 && steps < 150 {
		d.simulate_step(0.01)
		steps++
	}

	chaos := math.abs(d.pos.x * d.rot.y * 1337.0 + d.pos.z * d.rot.z * 42.0)
	final_value := 1 + (int(chaos) % sides)
	ch <- final_value
}

fn main() {
	println('--- V Lang Concurrent Arcane Solver ---')
	
	ch := chan int{cap: 5}
	
	for i in 0 .. 5 {
		go roll_dice_concurrently(20, i, ch)
	}

	mut results := []int{}
	for _ in 0 .. 5 {
		res := <-ch
		results << res
	}

	println('Concurrent D20 Results: $results')
	mut sum := 0
	for val in results {
		sum += val
	}
	println('Sum of Fate: $sum')
}`,
    simulatedOutput: [
      '$ v run arcane_dice.v',
      '--- V Lang Concurrent Arcane Solver ---',
      'Concurrent D20 Results: [14, 18, 2, 11, 20]',
      'Sum of Fate: 66',
      'V successfully executed in 0.002s (without garbage collection latency!)'
    ]
  },
  {
    id: 'forth',
    name: 'Forth',
    extension: 'fth',
    description: 'An old-school stack-oriented concatenative programming language.',
    philosophy: 'Rolls dice pools by managing stack addresses manually and calculating random bounds using customized linear congruential generators.',
    code: `\\ Forth Arcane Stack-Based Dice Engine
\\ Implements a complete Pseudorandom Number Generator, Stack Auditing, and Terminal Visualizer

VARIABLE seed

: INIT-SEED ( -- )
  TIME@ XOR seed ! ;

\\ Linear Congruential Generator for randoms (Numerical Recipes parameters)
: LCG-RANDOM ( -- n )
  seed @ 1103515245 * 12345 + DUP seed ! ;

: ROLL-SIDES ( sides -- roll )
  LCG-RANDOM ABS SWAP MOD 1+ ;

: PRINT-DICE-BAR ( val -- )
  ." ["
  0 DO
    ." *"
  LOOP
  ." ]" ;

: ROLL-POOL ( count sides -- )
  CR ." Rolling " DUP . ." Sided dice pool " OVER . ." times: " CR
  0 ROT ROT ( sum count sides )
  2DUP -ROT ( sum sides count sides )
  
  0 DO
    DUP ROLL-SIDES ( sum sides roll )
    DUP . ."  " 
    ROT + SWAP ( update sum )
  LOOP
  DROP ( drop sides )
  CR ." Pool Cumulative Sum: " . CR ;

: ROLL-D100-PERCENTILE ( -- )
  CR ." Rolling Arcane Percentile d100... " CR
  100 ROLL-SIDES
  DUP . ." % "
  DUP PRINT-DICE-BAR CR ;

INIT-SEED
CR ." === FORTH Stack-based Destiny Engine ===" CR
5 20 ROLL-POOL
ROLL-D100-PERCENTILE
BYE`,
    simulatedOutput: [
      '$ gforth arcane_dice.fth',
      '=== FORTH Stack-based Destiny Engine ===',
      'Rolling 20 Sided dice pool 5 times: ',
      '14 19 3 12 8 ',
      'Pool Cumulative Sum: 56',
      '',
      'Rolling Arcane Percentile d100... ',
      '84% [************************************************************************************]'
    ]
  },
  {
    id: 'idris',
    name: 'Idris',
    extension: 'idr',
    description: 'A purely functional programming language featuring Dependent Types.',
    philosophy: 'Leverages mathematical type-level proofs to statically prove that no rolled values can violate boundaries at runtime.',
    code: `-- Idris Type-Driven Arcane Dice Bound Safety proofs
-- Proves at compile-time that a dice roll outcome is always bounded within [1, Sides]
module ArcaneDice

import Data.Nat
import Decidable.Order

||| Evidence that roll value is strictly between 1 and the specified sides
data SafeOutcome : (sides : Nat) -> (roll : Nat) -> Type where
  ProvedSafe : {sides : Nat} -> {roll : Nat} -> (LTE 1 roll) -> (LTE roll sides) -> SafeOutcome sides roll

||| Compile-time function representing bounds assertion for arbitrary dice types
assertDiceSafety : (sides : Nat) -> (roll : Nat) -> Dec (SafeOutcome sides roll)
assertDiceSafety sides roll =
  case decLTE 1 roll of
    No contr1 => No (\\(ProvedSafe p1 p2) => contr1 p1)
    Yes prf1 =>
      case decLTE roll sides of
        No contr2 => No (\\(ProvedSafe p1 p2) => contr2 p2)
        Yes prf2 => Yes (ProvedSafe prf1 prf2)

||| Representation of an infallible, statically-verified d20 Roll Object
record VerifiedRoll where
  constructor MkVerifiedRoll
  sides : Nat
  value : Nat
  safetyProof : SafeOutcome sides value

||| Generator representing safe creation of rolls
createVerifiedRoll : (sides : Nat) -> (val : Nat) -> {auto 1_lte_val : LTE 1 val} -> {auto val_lte_sides : LTE val sides} -> VerifiedRoll
createVerifiedRoll s v = MkVerifiedRoll s v (ProvedSafe 1_lte_val val_lte_sides)

-- Example D20 rolls verified safely by compiler:
luckyRoll : VerifiedRoll
luckyRoll = createVerifiedRoll 20 20

unluckyRoll : VerifiedRoll
unluckyRoll = createVerifiedRoll 20 1`,
    simulatedOutput: [
      '$ idris2 -c arcane_dice.idr',
      'Type checking arcane_dice.idr completed successfully!',
      'Proof verified: "LTE 1 roll" and "LTE roll sides" are statically sound.',
      'Compilation successful. It is mathematically impossible for this dice to roll outside 1-20.'
    ]
  },
  {
    id: 'cobol',
    name: 'COBOL',
    extension: 'cob',
    description: 'The ancient backbone of enterprise and transaction management.',
    philosophy: 'Generates rigorous financial-grade audit logs of random percentile rolls with strict file structures.',
    code: `       IDENTIFICATION DIVISION.
       PROGRAM-ID. ARCANE-DICE-ENTERPRISE.
       AUTHOR. SENIOR-SYSTEMS-ARCHITECT.
       DATE-WRITTEN. JULY-04-2026.

       ENVIRONMENT DIVISION.
       CONFIGURATION SECTION.
       REPOSITORY.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01  WS-AUDIT-HEADER.
           05  FILLER          PIC X(40) VALUE 
               "=== COBOL ENTERPRISE AUDIT SYSTEM ===".
       
       01  WS-TRANSACTION-DATA.
           05  WS-DICE-NOTATION  PIC X(10) VALUE "3D20+15".
           05  WS-ROLL-COUNT     PIC 9(4) VALUE 3.
           05  WS-DICE-SIDES     PIC 9(4) VALUE 20.
           05  WS-MODIFIER       PIC S9(4) VALUE 15.
           05  WS-SEED           PIC 9(9) VALUE 987654321.

       01  WS-RESULT-COUNTERS.
           05  WS-TOTAL-SUM      PIC 9(6) VALUE 0.
           05  WS-TEMP-RAND      PIC 9(9) VALUE 0.
           05  WS-ROLL-VALUE     PIC 9(4) VALUE 0.
           05  WS-I              PIC 9(4) VALUE 0.
           05  WS-AVG-OUTCOME    PIC 9(4)V99 VALUE 0.

       PROCEDURE DIVISION.
       000-MAIN-LINE.
           DISPLAY WS-AUDIT-HEADER.
           DISPLAY "INITIATING COMPLIANCE RUN FOR: " WS-DICE-NOTATION.
           
           PERFORM 100-PROCESS-ROLLS
               VARYING WS-I FROM 1 BY 1 UNTIL WS-I > WS-ROLL-COUNT.
               
           ADD WS-MODIFIER TO WS-TOTAL-SUM.
           DISPLAY "TOTAL ADJUSTED LEDGER VALUE: " WS-TOTAL-SUM.
           
           COMPUTE WS-AVG-OUTCOME = WS-TOTAL-SUM / WS-ROLL-COUNT.
           DISPLAY "AUDITED LEDGER METRIC AVERAGE: " WS-AVG-OUTCOME.
           
           IF WS-TOTAL-SUM >= 60
               DISPLAY "COMPLIANCE STATUS: ULTRA-FORTUNATE CEILING."
           ELSE
               DISPLAY "COMPLIANCE STATUS: STANDARD RANDOM VARIATION."
           END-IF.
           
           STOP RUN.

       100-PROCESS-ROLLS.
           * LCG calculation within COBOL 85 standard bounds
           COMPUTE WS-TEMP-RAND = FUNCTION MOD(WS-SEED * 1103515245 + 12345, 2147483647).
           MOVE WS-TEMP-RAND TO WS-SEED.
           COMPUTE WS-ROLL-VALUE = FUNCTION MOD(WS-TEMP-RAND, WS-DICE-SIDES) + 1.
           DISPLAY "TRANSACTION LOG: INDIVIDUAL ROLL " WS-I " VALUE = " WS-ROLL-VALUE.
           ADD WS-ROLL-VALUE TO WS-TOTAL-SUM.`,
    simulatedOutput: [
      '$ cobc -x ARCANE_DICE.cob',
      'ARCANE_DICE.cob: Compiled successfully (Enterprise Level 2 Validation)',
      '$ ./arcane_dice',
      '=== COBOL ENTERPRISE AUDIT SYSTEM ===',
      'INITIATING COMPLIANCE RUN FOR: 3D20+15',
      'TRANSACTION LOG: INDIVIDUAL ROLL 0001 VALUE = 0014',
      'TRANSACTION LOG: INDIVIDUAL ROLL 0002 VALUE = 0019',
      'TRANSACTION LOG: INDIVIDUAL ROLL 0003 VALUE = 0008',
      'TOTAL ADJUSTED LEDGER VALUE: 000056',
      'AUDITED LEDGER METRIC AVERAGE: 0018.66',
      'COMPLIANCE STATUS: STANDARD RANDOM VARIATION.'
    ]
  },
  {
    id: 'lisp',
    name: 'Common Lisp',
    extension: 'lisp',
    description: 'The ancient language of the programming gods, built on recursive symbolic structures and list processing macro-sorcery.',
    philosophy: 'Expresses dice fate as an elegant tree-reduction of prime factors and lambda expressions, evaluated dynamically within the cosmic environment.',
    code: `;;;; Arcane Lisp Dice Simulator & Fate Decider
;;;; Metaclass macro-based evaluation of random state vectors.

(defpackage :arcane-dice
  (:use :common-lisp)
  (:export :roll-dice :simulate-sandbox))

(in-package :arcane-dice)

(defun make-random-state-vector (entropy)
  "Generates high-precision pseudo-random state vector based on celestial CPU clocks."
  (let* ((seed (mod (get-internal-real-time) 1000000))
         (chaos (logxor seed (ash entropy 3))))
    (make-random-state (coerce (abs chaos) 'integer))))

(defmacro with-fate-sandbox ((sides &key (modifier 0)) &body body)
  "Executes dice calculation inside a dynamic macro binding scope with absolute type assertions."
  \`(let* ((rolled-val (1+ (random ,sides *random-state*)))
          (final-result (+ rolled-val ,modifier)))
     (format t "~~&[LISP EV] Macro Expansion bindings finalized safely.~~%")
     (format t "[LISP EV] Evaluated value: ~~D (Base: ~~D, Mod: ~~D)~~%" final-result rolled-val ,modifier)
     ,@body
     final-result))

(defun sim-euler-step (pos vel dt)
  "Recursively integrates gravity over state variables to calculate table impact"
  (if (<= (second pos) 0.0)
      (values pos vel)
      (let* ((new-vel-y (- (second vel) (* 9.80665 dt)))
             (new-pos-y (+ (second pos) (* (second vel) dt)))
             (new-pos-x (+ (first pos) (* (first vel) dt)))
             (new-pos-z (+ (third pos) (* (third vel) dt))))
        (sim-euler-step (list new-pos-x new-pos-y new-pos-z)
                        (list (first vel) new-vel-y (third vel))
                        dt))))

(defun compile-and-roll (sides count)
  "Compiles lambda expressions to roll a dynamic multi-dice pool safely."
  (format t "~~&=== EVALUATING COMMON LISP DICE CONTEXT ===~~%")
  (let ((*random-state* (make-random-state-vector 0x9F42B28D)))
    (format t "[LISP COMP] JIT compiling lambda expressions for ~A dice...~~%" sides)
    (let ((results (loop repeat count
                         collect (with-fate-sandbox (sides :modifier 0)))))
      (format t "[LISP RESULTS] Pool output list: ~~A~~%" results)
      (format t "[LISP SUM] Cumulative reducing summation: ~~A~~%" (reduce #'+ results)))))

(compile-and-roll 20 3)
`,
    simulatedOutput: [
      '$ sbcl --script arcane_dice.lisp',
      '=== EVALUATING COMMON LISP DICE CONTEXT ===',
      '[LISP COMP] JIT compiling lambda expressions for 20 dice...',
      '[LISP EV] Macro Expansion bindings finalized safely.',
      '[LISP EV] Evaluated value: 18 (Base: 18, Mod: 0)',
      '[LISP EV] Macro Expansion bindings finalized safely.',
      '[LISP EV] Evaluated value: 14 (Base: 14, Mod: 0)',
      '[LISP EV] Macro Expansion bindings finalized safely.',
      '[LISP EV] Evaluated value: 20 (Base: 20, Mod: 0)',
      '[LISP RESULTS] Pool output list: (18 14 20)',
      '[LISP SUM] Cumulative reducing summation: 52',
      '',
      'Evaluation completed on cosmic heap with zero garbage collector interruptions.'
    ]
  },
  {
    id: 'brainfuck',
    name: 'Brainfuck',
    extension: 'bf',
    description: 'The minimalist eight-instruction esoteric champion, manipulating raw memory arrays directly with pointer increments.',
    philosophy: 'Operates by incrementing and decrementing raw byte-cells, visualizing a rolling dice purely as a sequence of shifting memory tape values.',
    code: `++++++++++ [ > +++++++ > ++++++++++ > +++ > + <<<< - ]
> ++ .                  Write 'H'
> + .                   Write 'k'
+++++++ ..              Write 'oo'
+++ .                   Write 'r'
> ++ .                  Write ' '
<< +++++++++++++++ .    Write 'd'
> .                     Write 'e'
+++ .                   Write 's'
------ .                Write 'm'
-------- .              Write 'e'
> + .                   Write '!'
> .                     Write '\\n'

=== Cell State Monitor ===
Pointer position: [Cell 2]
Tape values: [0, 70, 107, 114, 32, 0, 0, 0]
Fate vector alignment: Complete`,
    simulatedOutput: [
      '$ bfc arcane_dice.bf -o arcane_dice',
      'Brainfuck compiler successfully mapped 8 instructions to optimized assembly.',
      '$ ./arcane_dice',
      'Holy fate!',
      '',
      '[TAPE MONITOR] Shifting memory pointer cell indices...',
      '[TAPE MONITOR] Cell 0: 0   | Cell 1: 72  | Cell 2: 107 | Cell 3: 111',
      '[TAPE MONITOR] Cell 4: 111 | Cell 5: 114 | Cell 6: 32  | Cell 7: 100',
      'Output matches perfect ASCII stream for esoteric cosmic dice roll: 20'
    ]
  }
];
