package;

class ArcaneDice {
    static public function main() {
        trace("--- Haxe Cross-Platform Fate Engine ---");
        var sides = 100;
        var roll = Math.floor(Math.random() * sides) + 1;
        trace("d100 unified cross-target roll: " + roll);
    }
}
