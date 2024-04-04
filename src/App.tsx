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

import { GameResult } from "./components/types";

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
  const [registeredName, setRegisteredName] = useState<{
    name: string;
    isRegisted: boolean;
  }>({
    name: "",
    isRegisted: false,
  });
  const [onGameStart, setOnGameStart] = useState<boolean>(false);
  const [gameResult, setGameResult] = useState<GameResult>(initialGameState);
  const [animationSpeed, setAnimationSpeed] = useState<number>(1);
  const [betForm, setBetForm] = useState<{
    bet_points: number;
    predicted_multiplier: string;
  }>({
    bet_points: 50,
    predicted_multiplier: (100 / 100).toFixed(2),
  });
  const [totalWinnings, setTotalWinnings] = useState<number>(0);

  const formHandleChange = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    (e) => {
      setBetForm({ ...betForm, [e.target.id]: e.target.value });
    },
    [betForm]
  );

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
      const response = await axios.post("http://localhost:3000/users", {
        name: formData,
      });

      if (response.status === 201 || response.status === 200) {
        const { data } = response;

        setRegisteredName({
          name: data.name,
          isRegisted: true,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleGameStart = async () => {
    try {
      setOnGameStart(true);
      const response = await axios.post<GameResult>(
        "http://localhost:3000/users/play",
        {
          bet_points: betForm.bet_points,
          predicted_multiplier: +betForm.predicted_multiplier,
        }
      );

      if (response.status === 201 || response.status === 200) {
        const { data } = response;

        setGameResult(data);
        setTotalWinnings((prevTotal) => prevTotal + data.player.winnings);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex gap-4 mt-8">
        {registeredName.isRegisted ? (
          <aside className="flex-none">
            <div className="flex gap-4">
              <PointsInput
                pointsDefault={betForm.bet_points}
                formHandleChange={formHandleChange}
                setBetForm={setBetForm}
                betForm={betForm}
              />
              <MultiplierInput
                multiplierDefault={betForm.predicted_multiplier}
                formHandleChange={formHandleChange}
                setBetForm={setBetForm}
                betForm={betForm}
              />
            </div>
            <button
              onClick={handleGameStart}
              className="bg-gradient-to-r from-rose-400 to-orange-300 w-full rounded-md p-4 font-bold text-lg mt-6"
            >
              START
            </button>
            <CurrentRound gameResult={gameResult} />
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
          <Cards
            totalWinnings={totalWinnings}
            registeredName={registeredName}
          />
          <MultiplierGraph
            isRegistered={registeredName.isRegisted}
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
