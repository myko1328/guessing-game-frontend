import { useCallback, useState } from "react";
import axios from "axios";

import MultiplierInput from "./components/MultiplierInput";
import PointsInput from "./components/PointsInput";
import SpeedSlider from "./components/SpeedSlider";
import MultiplierGraph from "./components/MultiplierGraph";
import Chat from "./components/Chat/Index";
import Ranking from "./components/Ranking";
import CurrentRound from "./components/CurrentRound";
import SignIn from "./components/SignIn";
import Cards from "./components/Cards";
import Button from "./components/Button";

import { GameResult } from "./components/types";
import { usePlayerStore } from "./store/playerStore";

const initialGameState: GameResult = {
  player: {
    win_status: false,
    actualPrediction: 0,
    winnings: 0,
    bet_points: 0,
    predicted_multiplier: 0,
    name: "",
  },
  cpuPlayers: [],
};

function App() {
  const [formData, setFormData] = useState<string>("");
  const [onGameStart, setOnGameStart] = useState<boolean>(false);
  const [gameResult, setGameResult] = useState<GameResult>(initialGameState);
  const [animationSpeed, setAnimationSpeed] = useState<number>(1);

  const {
    betPts,
    multiplier,
    setRegisteredName,
    isRegistered,
    setTotalWinnings,
  } = usePlayerStore((state) => ({
    betPts: state.bet_points,
    multiplier: state.predicted_multiplier,
    setRegisteredName: state.set_registered_name,
    isRegistered: state.is_registered,
    setTotalWinnings: state.set_total_winnings,
  }));

  const handleChange = useCallback((e: { target: { value: string } }) => {
    setFormData(e.target.value);
  }, []);

  const handleRegister = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!formData) {
      alert("Please enter your name");

      return;
    }

    try {
      const response = await axios.post(
        "https://guessing-game-backend-iv52.onrender.com/users",
        {
          name: formData,
        }
      );

      if (response.status === 201 || response.status === 200) {
        const { data } = response;

        setRegisteredName(data.name, true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleGameStart = async () => {
    try {
      setOnGameStart(true);
      const response = await axios.post<GameResult>(
        "https://guessing-game-backend-iv52.onrender.com/users/play",
        {
          bet_points: betPts,
          predicted_multiplier: +multiplier,
        }
      );

      if (response.status === 201 || response.status === 200) {
        const { data } = response;

        setGameResult(data);
        setTotalWinnings(data.player.win_status, data.player.winnings);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex gap-4 mt-8">
        {isRegistered ? (
          <aside className="flex-none">
            <div className="flex gap-4">
              <PointsInput />
              <MultiplierInput />
            </div>
            <Button
              type="text-lg"
              className="bg-gradient-to-r from-rose-400 to-orange-300 w-full rounded-md p-4 font-bold text-lg mt-6"
              buttonName="Start"
              handleClick={handleGameStart}
            />
            <CurrentRound onGameStart={onGameStart} gameResult={gameResult} />
            <SpeedSlider setAnimationSpeed={setAnimationSpeed} />
          </aside>
        ) : (
          <SignIn
            handleChange={handleChange}
            formData={formData}
            handleRegister={handleRegister}
          />
        )}

        <div className="flex-1 col-span-2 w-full">
          <Cards />
          <MultiplierGraph
            gameResult={gameResult}
            onGameStart={onGameStart}
            animationSpeed={animationSpeed}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pb-8">
        <Ranking gameResults={gameResult} />
        <Chat />
      </div>
    </div>
  );
}

export default App;
