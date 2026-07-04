package;

import haxe.ds.StringMap;

typedef RollOutput = {
    var notation:String;
    var rawRolls:Array<Int>;
    var total:Int;
}

class ArcaneDice {
    private static var rollLimits:StringMap<Int>;

    public static function main() {
        trace("=== Haxe Polyhedral Unified Engine ===");
        
        rollLimits = new StringMap<Int>();
        rollLimits.set("d4", 4);
        rollLimits.set("d6", 6);
        rollLimits.set("d8", 8);
        rollLimits.set("d10", 10);
        rollLimits.set("d12", 12);
        rollLimits.set("d20", 20);
        rollLimits.set("d100", 100);

        var outcome = processRoll("3d20", 5);
        trace("Output parsed notation: " + outcome.notation);
        trace("Output individual values: " + outcome.rawRolls.toString());
        trace("Final adjusted sum: " + outcome.total);
    }

    public static function processRoll(not:String, modifier:Int):RollOutput {
        var r = ~/([0-9]+)[dD]([0-9]+)/;
        if (r.match(not)) {
            var count = Std.parseInt(r.matched(1));
            var sides = Std.parseInt(r.matched(2));
            var rolledValues = new Array<Int>();
            var sum = 0;

            for (i in 0...count) {
                var single = Math.floor(Math.random() * sides) + 1;
                rolledValues.push(single);
                sum += single;
            }
            sum += modifier;

            return {
                notation: not + "+" + modifier,
                rawRolls: rolledValues,
                total: sum
            };
        }
        return { notation: "Invalid", rawRolls: [], total: 0 };
    }
}
