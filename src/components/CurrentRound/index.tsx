import { FaTrophy } from "react-icons/fa";
import Title from "../Title";
import { GameResult } from "../types";

const CurrentRound = ({
  gameResult,
  onGameStart,
}: {
  gameResult: GameResult;
  onGameStart: boolean;
}) => {
  return (
    <div className="mt-4 flex flex-col gap-2">
      <Title
        icon={<FaTrophy size={22} style={{ margin: "auto 0 auto 0" }} />}
        name="Current Round"
      />
      <table className="table-auto w-full  border border-[#272b33]">
        <thead className="bg-inherit h-12">
          <tr>
            <th>Name</th>
            <th>Points</th>
            <th>Multiplier</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center h-12 bg-[#4e5461] font-bold">
            <td
              className={`${
                gameResult.player.win_status && onGameStart
                  ? "text-green-500"
                  : !gameResult.player.win_status && !onGameStart
                  ? "text-white"
                  : "text-red-500"
              }`}
            >
              YOU
            </td>
            <td
              className={`${
                gameResult.player.win_status && onGameStart
                  ? "text-green-500"
                  : !gameResult.player.win_status && !onGameStart
                  ? "text-white"
                  : "text-red-500"
              }`}
            >
              {gameResult?.player?.bet_points || "--"}
            </td>
            <td
              className={`${
                gameResult.player.win_status && onGameStart
                  ? "text-green-500"
                  : !gameResult.player.win_status && !onGameStart
                  ? "text-white"
                  : "text-red-500"
              }`}
            >
              {gameResult?.player?.predicted_multiplier || "--"}
            </td>
          </tr>
          {gameResult.cpuPlayers.map((cpu, index) => (
            <tr
              key={index}
              className={`text-center h-12 font-bold ${
                index % 2 === 0 ? "bg-[#272b33]" : "bg-[#1f2229]"
              } `}
            >
              <td
                className={`${
                  cpu.win_status ? "text-green-500" : "text-red-500"
                }`}
              >
                CPU {index + 1}
              </td>
              <td
                className={`${
                  cpu.win_status ? "text-green-500" : "text-red-500"
                }`}
              >
                {cpu.winnings.toFixed(2)}
              </td>
              <td
                className={`${
                  cpu.win_status ? "text-green-500" : "text-red-500"
                }`}
              >
                {cpu.predicted_multiplier}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CurrentRound;
