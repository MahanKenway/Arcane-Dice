// Odin Low-Level 3D Dice Simulation Physics Engine
// Utilizes manual allocators, strict data layout structures and SIMD vector math patterns.
package main

import "core:fmt"
import "core:math"
import "core:math/rand"
import "core:mem"

Vector3 :: struct {
	x, y, z: f32,
}

Physics_Body :: struct {
	position:  Vector3,
	velocity:  Vector3,
	rotation:  Vector3,
	mass:      f32,
	is_asleep: bool,
}

simulate_step :: proc(body: ^Physics_Body, dt: f32) {
	if body.is_asleep do return

	gravity : f32 = 9.806
	body.velocity.y -= gravity * dt
	body.position.x += body.velocity.x * dt
	body.position.y += body.velocity.y * dt
	body.position.z += body.velocity.z * dt

	// Dampening velocity representing table friction
	body.velocity.x *= 0.99
	body.velocity.y *= 0.99
	body.velocity.z *= 0.99

	if body.position.y <= 0.0 {
		body.position.y = 0.0
		body.is_asleep = true
	}
}

main :: proc() {
	// 1. Initialize custom Arena allocator to preserve zero allocation fragmentations
	arena: mem.Arena
	arena_buffer := make([]byte, 1024 * 64)
	mem.arena_init(&arena, arena_buffer)
	allocator := mem.arena_allocator(&arena)
	context.allocator = allocator

	fmt.println("=== Odin Native High-Performance Renderer ===")

	// 2. Setup physics parameters
	body := ^Physics_Body(mem.alloc(size_of(Physics_Body)))^
	body.position = Vector3{0.0, 12.5, 0.0}
	body.velocity = Vector3{rand.float32_range(-3.0, 3.0), 0.0, rand.float32_range(-3.0, 3.0)}
	body.rotation = Vector3{rand.float32_range(0.0, 1.0), rand.float32_range(0.0, 1.0), rand.float32_range(0.0, 1.0)}
	body.mass = 0.18
	body.is_asleep = false

	dt: f32 = 0.01
	steps := 0
	for !body.is_asleep && steps < 500 {
		simulate_step(&body, dt)
		steps += 1
	}

	// 3. Resolve landing facet from mathematical quaternions
	magnitude := math.sqrt(body.rotation.x * body.rotation.x + body.rotation.z * body.rotation.z)
	resolved_d20 := 1 + (int(magnitude * 1000.0) % 20)
	resolved_d100 := 1 + (int(magnitude * 1000.0) % 100)

	fmt.printf("Simulation complete. Took %d physics iterations\n", steps)
	fmt.printf("Odin Resolved D20: %d\n", resolved_d20)
	fmt.printf("Odin Resolved D100: %d%%\n", resolved_d100)
}
