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

  console.log(sortedByWinnings);
  return (
    <div className="mt-8 flex flex-col gap-2">
      <h3 className="text-lg font-bold">Rank</h3>
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
            <tr className="text-center h-8 bg-[#4e5461]">
              <td>{index}</td>
              <td>{player.name}</td>
              <td>{player.winnings.toFixed(2)}</td>
            </tr>
          ))}
          {/* <tr className="text-center h-8 bg-[#4e5461]">
            <td>1</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr className="text-center h-8 bg-[#272b33]">
            <td>2</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr className="text-center h-8">
            <td>3</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr className="text-center h-8 bg-[#272b33]">
            <td>4</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr className="text-center h-8">
            <td>5</td>
            <td>-</td>
            <td>-</td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default Ranking;
