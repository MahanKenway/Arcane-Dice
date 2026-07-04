# Crystal High-Performance Object-Oriented Solver
# Features compile-time type inference, Fibers, Channels, and Cloud Storage simulations.

class CloudLogger
  # Simulates asynchronous connection to secure databases via Channels
  @channel : Channel(String)

  def initialize
    @channel = Channel(String).new
    spawn do
      loop do
        log_msg = @channel.receive
        # Simulate printing to a secure enterprise data stream
        puts " [CLOUD LOG] #{log_msg}"
      end
    end
  end

  def log(msg : String)
    @channel.send(msg)
  end
end

abstract class BaseDice
  abstract def roll : Int32
end

class StandardDice < BaseDice
  property sides : Int32
  
  def initialize(@sides = 20)
  end

  def roll : Int32
    # Yield thread of control to show true concurrent Fibers
    sleep 0.01
    1 + rand(@sides)
  end
end

puts "=== Crystal Multi-Fiber Orchestration ==="
logger = CloudLogger.new

# Spin up concurrent rollers using lightweight Fibers
spawn do
  d20 = StandardDice.new(20)
  val = d20.roll
  logger.log("Concurrent Fiber D20 outcome: #{val}")
end

spawn do
  d100 = StandardDice.new(100)
  val = d100.roll
  logger.log("Concurrent Fiber D100 outcome: #{val}%")
end

# Keep main execution thread alive to allow concurrent fibers to finalize
Fiber.yield
sleep 0.15
