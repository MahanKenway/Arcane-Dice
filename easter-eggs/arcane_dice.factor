! Factor Arcane Roll pipeline
! Implements a robust concatenative pipeline to roll dice, filter out lowest and format output

USING: io random kernel math math.statistics sequences formatting combinators namespaces arrays sorting ;
IN: arcane-dice-concatenative

TUPLE: dice-group count sides modifier ;

: <dice-group> ( count sides modifier -- dice-group )
    dice-group New-instance
        swap >>modifier
        swap >>sides
        swap >>count ;

: roll-single ( sides -- val )
    [1,b] random ;

: roll-multiple ( count sides -- seq )
    [ drop roll-single ] curry replicate ;

: drop-lowest ( seq -- filtered )
    sorting [ rest ] keep length 1 <= [ drop ] [ ] if ;

: evaluate-group ( dice-group -- sum )
    [ count>> ] keep
    [ sides>> ] keep
    [ modifier>> ] keep
    [ -rot roll-multiple ] dip
    [ drop-lowest sum ] dip + ;

: format-report ( dice-group sum -- )
    "Group: %dd%d%+d rolled. Total Result (dropping lowest): %d\n" printf ;

: main ( -- )
    "=== Factor Concatenative Pipeline ===" print
    
    ! Create D20 rolling groups
    3 20 5 <dice-group> dup evaluate-group format-report
    
    ! Create D100 percentile rolling groups
    2 100 -10 <dice-group> dup evaluate-group format-report ;

MAIN
