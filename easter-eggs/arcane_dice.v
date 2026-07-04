// V Language Arcane Dice Roller
module main

import rand

fn roll_arcane(sides int) int {
	if sides <= 1 {
		return 1
	}
	// Secure and fast random bounds
	return rand.int_in_range(1, sides + 1) or { 1 }
}

fn main() {
	println('--- V Lang Arcane Physics ---')
	d20_res := roll_arcane(20)
	d100_res := roll_arcane(100)
	println('Result of d20: ${d20_res}')
	println('Result of d100 (Percentile): ${d100_res}%')
}
