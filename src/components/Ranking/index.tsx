import { FaRankingStar } from "react-icons/fa6";
import Title from "../Title";
import { GameResult } from "../types";

const Ranking = ({ gameResults }: { gameResults: GameResult }) => {
  // Add a name to the player object
  gameResults.player.name = "Player";

  // Add names to each CPU player based on their index
  gameResults.cpuPlayers.forEach((cpu, index) => {
    cpu.name = `CPU ${index + 1}`;
  });

  // Combine the player with the cpuPlayers, now including names
  const combinedPlayers = [gameResults.player, ...gameResults.cpuPlayers];

  // Sort the combined array by winnings in descending order
  const sortedByWinnings = combinedPlayers.sort(
    (a, b) => b.winnings - a.winnings
  );

  return (
    <div className="mt-8 flex flex-col gap-2">
      <Title
        icon={<FaRankingStar size={22} style={{ margin: "auto 0 auto 0" }} />}
        name="Ranking"
      />
      <table className="table-auto w-full border border-[#272b33] min-h-[209px]">
        <thead className="bg-inherit h-12">
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {sortedByWinnings.map((player, index) => (
            <tr
              className={`text-center h-8 ${
                index % 2 === 0 ? "bg-[#4e5461]" : "bg-[#272b33]"
              } `}
            >
              <td>{index}</td>
              <td>{player.name}</td>
              <td>{player.winnings.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Ranking;
