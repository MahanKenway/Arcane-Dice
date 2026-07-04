// Zig Language Arcane Dice Parser and Rolling Simulator
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
    try stdout.print("=== Zig Advanced Dice Evaluator ===\n", .{});

    for (notations) |notation| {
        var res = try engine.roll(notation);
        defer allocator.free(res.rolls);

        try stdout.print("Notation: {s} | Rolled: {any} (Mod: {d}) | Total: {d}\n", .{
            notation,
            res.rolls,
            res.modifier,
            res.sum,
        });
    }
}
