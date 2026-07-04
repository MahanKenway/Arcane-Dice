// Io Dynamic Prototype Message Passing Physics simulation
// Models Collision, Physics loop and Dice using prototype chains and Asynchronous messaging.

PhysicsEngine := Object clone do(
    gravity := 9.81
    dt := 0.01
    
    simulate := method(dice,
        steps := 0
        while(dice y > 0 and steps < 200,
            dice yVel = dice yVel - (gravity * dt)
            dice x = dice x + (dice xVel * dt)
            dice y = dice y + (dice yVel * dt)
            steps = steps + 1
        )
        dice resolveFace
    )
)

Dice3D := Object clone do(
    sides := 20
    x := 0.0
    y := 10.0
    xVel := 1.5
    yVel := 0.0
    rotX := 0.5
    rotY := 1.2
    
    resolveFace := method(
        // Dynamic evaluation of vectors to find landing face
        chaos := (x * rotX + yVel * rotY) abs
        result := 1 + ((chaos * 100) floor % sides)
        result
    )
)

CollisionManager := Object clone do(
    handleImpactAsync := method(dice,
        // Using Io's built-in Actor Messaging (yields to scheduler asynchronously)
        @processImpact(dice)
    )
    
    processImpact := method(dice,
        writeln("[COLLISION] Dice landed and collided with virtual table!")
        final := PhysicsEngine simulate(dice)
        writeln("[COLLISION] Final Resolved Face: ", final)
        if(final == dice sides, writeln("[COLLISION] CRITICAL TRIUMPH!"))
    )
)

"=== Io Concurrent Actor Engine ===" writeln
myD20 := Dice3D clone
myD20 xVel = 2.4
myD20 yVel = 1.0

CollisionManager handleImpactAsync(myD20)

// Pause to let actor execution process in the background scheduler
System sleep(0.5)
