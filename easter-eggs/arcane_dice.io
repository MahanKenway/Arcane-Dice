// Io Prototype-Oriented Arcane Dice
ArcaneDice := Object clone do(
    sides := 20
    roll := method(
        result := Random value(1, sides + 1) floor
        writeln("Io Prototype dice rolled d", sides, ": ", result)
        if(result == sides, writeln("✨ Cosmic Triumph! ✨"))
        result
    )
)

"--- Io Prototypes ---" writeln
myD20 := ArcaneDice clone
myD20 roll

myD100 := ArcaneDice clone
myD100 sides = 100
myD100 roll
