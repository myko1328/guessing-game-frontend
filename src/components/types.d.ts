interface PlayerResult {
  name: string;
  win_status: boolean;
  actualPrediction: number;
  winnings: number;
  bet_points: number;
  predicted_multiplier: number;
}

interface CpuPlayerResult extends PlayerResult {
  bet_points: number;
  predicted_multiplier: number;
}

export interface GameResult {
  player: PlayerResult;
  cpuPlayers: CpuPlayerResult[];
}
