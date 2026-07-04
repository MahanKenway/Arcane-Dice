# Nim Language Arcane Physics Dice Engine
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
    `op`
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
  echo &"Simulated D100 percentile: {d100_res.value}%"
