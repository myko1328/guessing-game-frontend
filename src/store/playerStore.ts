import { create } from "zustand";

// Define the state structure
interface PlayerState {
  bet_points: number;
  predicted_multiplier: string;
  increase_amount: (operation: "pts" | "multiplier") => void;
  decrease_amount: (operation: "pts" | "multiplier") => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
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
  decrease_amount: (operation: "pts" | "multiplier") => {
    if (operation === "pts") {
      set((state: any) => ({
        bet_points:
          state?.bet_points >= 50 ? 50 : Math.max(0, state?.bet_points - 50),
      }));
    }

    if (operation === "multiplier") {
      set((state: any) => ({
        predicted_multiplier: (+state?.predicted_multiplier - 0.05).toFixed(2),
      }));
    }
  },
}));
