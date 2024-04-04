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

export interface BetsInputOnChangeProps {
  formHandleChange: React.ChangeEventHandler<HTMLInputElement>;
  pointsDefault?: number;
  multiplierDefault?: string;
  setBetForm: React.Dispatch<React.SetStateAction<BetFormState>>;
  betForm?: {
    bet_points: number;
    predicted_multiplier: string;
  };
}
