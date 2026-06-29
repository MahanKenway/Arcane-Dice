export type RollResult = {
  id: string;
  timestamp: number;
  notation: string;
  total: number;
  breakdown: string;
};

export type AppMode = 'simple' | 'ai';
