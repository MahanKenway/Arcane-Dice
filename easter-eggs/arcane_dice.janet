# Janet Lisp RPG Dice Parsing Expression Grammar (PEG) & Macro system
# Features complex string pattern matching, custom environments and metaprogramming.

# Define PEG grammar to compile dice strings like "2d20+15" or "1d100-5"
(def dice-grammar
  ~{:main (and :dice :opt-modifier)
    :dice (and (number :number) (set "dD") (number :sides))
    :opt-modifier (opt (and (choice "+" "-") (number :modifier)))
    :number (some :digit)})

(defn parse-dice-notation [str-not]
  (if-let [res (peg/match dice-grammar str-not)]
    (struct :count (get res 0)
            :sides (get res 1)
            :modifier (if (= (length res) 3) (get res 2) 0))
    nil))

# Define an audit macro to wrap rolling operations with trace logging
(defmacro audit-fate [expr]
  ~(let [start (os/clock)]
     (print "[AUDIT] Initiating roll computation sequence...")
     (let [result ,expr]
       (print "[AUDIT] Result: " result " (Time: " (- (os/clock) start) " seconds)")
       result)))

(defn simulate-roll [notation]
  (let [info (parse-dice-notation notation)]
    (if (nil? info)
      (print "Invalid Notation")
      (do
        (print "Parsing: " notation " -> " (string/format "%j" info))
        (var total 0)
        (for i 0 (info :count)
          (let [r (+ 1 (math/rng-int (math/rng) (info :sides)))]
            (set total (+ total r))))
        (set total (+ total (info :modifier)))
        total))))

(print "=== Janet Functional Parsing Sandbox ===")
(audit-fate (simulate-roll "3D20+10"))
(audit-fate (simulate-roll "1d100-5"))
