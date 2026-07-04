// V Language Arcane Physics Dice Engine
// Demonstrates fast compiled structs, memory-safe pointers, and concurrency patterns in V.
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

	// Calculating final value through a deterministic hash of chaotic vectors
	chaos := math.abs(d.pos.x * d.rot.y * 1337.0 + d.pos.z * d.rot.z * 42.0)
	final_value := 1 + (int(chaos) % sides)
	ch <- final_value
}

fn main() {
	println('--- V Lang Concurrent Arcane Solver ---')
	
	// Create channels for parallel rolling simulation
	ch := chan int{cap: 5}
	
	// Roll 5 dice concurrently using goroutine-style fibers
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
}
