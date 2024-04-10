import { create } from "zustand";

// Define the state structure
interface PlayerState {
  bet_points: number;
  predicted_multiplier: string;
  increase_amount: (operation: "pts" | "multiplier") => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  bet_points: 50,
  predicted_multiplier: (100 / 100).toFixed(2),
  increase_amount: (operation: "pts" | "multiplier") => {
    if (operation === "pts") {
      set((state: any) => ({
        bet_points: state?.bet_points + 50,
      }));
    }

    if (operation === "multiplier") {
      set((state: any) => ({
        predicted_multiplier: (+state?.predicted_multiplier + 0.05).toFixed(2),
      }));
    }
  },
}));