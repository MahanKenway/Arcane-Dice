export type DiceType = 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20' | 'd100';

export interface RollResult {
  id: string;
  timestamp: number;
  notation: string;
  total: number;
  rolls: number[];
  modifier: number;
  diceType: DiceType;
  isCriticalSuccess?: boolean;
  isCriticalFailure?: boolean;
  advantageMode?: 'advantage' | 'disadvantage' | 'none';
  allDiceRolls?: { type: DiceType; value: number }[];
}

export const rollDice = (diceType: DiceType, count: number = 1, modifier: number = 0): RollResult => {
  const sides = parseInt(diceType.substring(1), 10);
  const rolls: number[] = [];
  let total = modifier;

  for (let i = 0; i < count; i++) {
    const roll = Math.floor(Math.random() * sides) + 1;
    rolls.push(roll);
    total += roll;
  }

  const isCriticalSuccess = diceType === 'd20' && rolls.length === 1 && rolls[0] === 20;
  const isCriticalFailure = diceType === 'd20' && rolls.length === 1 && rolls[0] === 1;

  const notation = `${count}${diceType}${modifier !== 0 ? (modifier > 0 ? '+' : '') + modifier : ''}`;

  return {
    id: Math.random().toString(36).substring(2, 9),
    timestamp: Date.now(),
    notation,
    total,
    rolls,
    modifier,
    diceType,
    isCriticalSuccess,
    isCriticalFailure,
  };
};

export const parseNotation = (notation: string): { count: number; type: DiceType; modifier: number } | null => {
  const match = notation.trim().toLowerCase().match(/^(\d*)?(d\d+)([+-]\d+)?$/);
  if (!match) return null;

  const count = match[1] ? parseInt(match[1], 10) : 1;
  const type = match[2] as DiceType;
  const modifier = match[3] ? parseInt(match[3], 10) : 0;

  const validTypes: DiceType[] = ['d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100'];
  if (!validTypes.includes(type)) return null;

  return { count, type, modifier };
};
