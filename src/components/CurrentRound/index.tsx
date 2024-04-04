import { GameResult } from "../types";

const CurrentRound = ({ gameResult }: { gameResult: GameResult }) => {
  return (
    <div className="mt-4 flex flex-col gap-2">
      <h3 className="text-lg font-bold">Current Round</h3>
      <table className="table-auto w-full  border border-[#272b33]">
        <thead className="bg-inherit h-12">
          <tr>
            <th>Name</th>
            <th>Points</th>
            <th>Multiplier</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center h-12 bg-[#4e5461]">
            <td>YOU</td>
            <td>{gameResult?.player?.bet_points || "--"}</td>
            <td>{gameResult?.player?.predicted_multiplier || "--"}</td>
          </tr>
          {gameResult.cpuPlayers.map((cpu, index) => (
            <tr
              key={index}
              className={`text-center h-12 ${
                index % 2 === 0 ? "bg-[#272b33]" : "bg-[#1f2229]"
              }`}
            >
              <td>CPU {index + 1}</td>
              <td>{cpu.winnings.toFixed(2)}</td>
              <td>{cpu.predicted_multiplier}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CurrentRound;
