import { create } from "zustand";

interface PlayerState {
  name: string;
  is_registered: boolean;
  bet_points: number;
  predicted_multiplier: string;
  total_winnings: number;
  increase_amount: (operation: "pts" | "multiplier") => void;
  decrease_amount: (operation: "pts" | "multiplier") => void;
  on_amount_change: (operation: "pts" | "multiplier", value: string) => void;
  set_registered_name: (name: string, isRegistered: boolean) => void;
  set_total_winnings: (winStatus: boolean, winnings: number) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  name: "",
  is_registered: false,
  bet_points: 50,
  predicted_multiplier: (100 / 100).toFixed(2),
  total_winnings: 0,
  set_registered_name: (name: string, isRegistered: boolean) => {
    set(() => ({
      name,
      is_registered: isRegistered,
    }));
  },
  increase_amount: (operation: "pts" | "multiplier") => {
    if (operation === "pts") {
      set((state) => ({
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
      set((state) => ({
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
  on_amount_change: (operation: "pts" | "multiplier", value: string) => {
    if (operation === "pts") {
      set(() => ({
        bet_points: isNaN(+value) ? 50 : +value,
      }));
    }

    if (operation === "multiplier") {
      set(() => ({
        predicted_multiplier: isNaN(+value) ? (100 / 100).toFixed(2) : value,
      }));
    }
  },
  set_total_winnings: (winStatus: boolean, winnings: number) => {
    set((state) => ({
      total_winnings: !winStatus ? 0 : state.total_winnings + winnings,
    }));
  },
}));
