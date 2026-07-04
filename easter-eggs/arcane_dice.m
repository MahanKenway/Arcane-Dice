:- module arcane_dice.
:- interface.
:- import_module io.
:- pred main(io::di, io::uo) is det.

:- implementation.
:- import_module random.
:- import_module int.

main(!IO) :-
    io.print("--- Mercury Pure Logical Dice System ---\n", !IO),
    random.init(54321, Gen),
    random.random_range(1, 100, Roll, Gen, _),
    io.print("Logic-driven d100 output: ", !IO),
    io.print(Roll, !IO),
    io.nl(!IO).
