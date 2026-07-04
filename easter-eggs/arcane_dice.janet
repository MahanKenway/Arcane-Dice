# Janet Lisp Arcane Roller
(defn roll-dice [sides]
  (math/seedrandom (os/cryptorand 8))
  (let [val (math/ceil (* (math/random) sides))]
    (print "Janet rolled a d" sides " -> " val)
    val))

(print "--- Janet Lisp Engine ---")
(roll-dice 20)
(roll-dice 100)
