# Raku Reactive Asynchronous Dice Evaluator
# Uses grammars for parsing, reactive pipelines with Supplies, and multi-threaded channels

grammar RPGDiceGrammar {
    rule TOP { <dice-spec> <modifier-spec>? }
    token dice-spec { (\d+)? <[dD]> (\d+) }
    token modifier-spec { <[+-]> (\d+) }
}

class RPGDiceActions {
    method TOP($/) {
        my $count = $<dice-spec>[0] ?? +$<dice-spec>[0] !! 1;
        my $sides = +$<dice-spec>[1];
        my $mod = $<modifier-spec> ?? +$<modifier-spec>[0] !! 0;
        $mod = -$mod if $<modifier-spec> && $<modifier-spec>.Str.starts-with('-');
        make { :$count, :$sides, :$mod };
    }
}

sub roll-interactive(Str $notation) {
    my $match = RPGDiceGrammar.parse($notation, :actions(RPGDiceActions));
    unless $match {
        die "Improper dice expression: $notation";
    }
    
    my $data = $match.made;
    my @rolls = (1..$data<sides>).roll($data<count>);
    my $sum = @rolls.sum + $data<mod>;
    
    return {
        :notation($notation),
        :rolls(@rolls),
        :modifier($data<mod>),
        :total($sum)
    };
}

# Run asynchronous rolling simulation using reactive streams
sub MAIN() {
    say "=== Raku Advanced Reactive Grid ===";
    
    my $channel = Channel.new;
    
    my @queries = <3d20+5 1d100-10 4d6>;
    
    # Spawn thread to write calculations to channel
    start {
        for @queries -> $q {
            my $res = roll-interactive($q);
            $channel.send($res);
            sleep 0.1;
        }
        $channel.close;
    }
    
    # Read as reactive supply pipeline
    my $supply = Supply.from-list($channel.list);
    $supply.tap(-> $val {
        say "Processed Raku Feed -> {$val<notation>}: Rolls = {$val<rolls>.gist}, Total = {$val<total>}";
    });
}
