# Crystal - Slick Ruby syntax, blazing C speed
class ArcaneDice
  property sides : Int32

  def initialize(@sides = 20)
  end

  def roll : Int32
    result = rand(1..@sides)
    puts "Crystal compiled dice d#{@sides} rolled: #{result}"
    result
  end
end

puts "--- Crystal Shards of Fate ---"
dice = ArcaneDice.new(100)
dice.roll
