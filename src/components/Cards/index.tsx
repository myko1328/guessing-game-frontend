import { FaUser } from "react-icons/fa";
import { IoMdClock } from "react-icons/io";
import { FaMedal } from "react-icons/fa6";
import { CardItem } from "./types";
import CardItems from "./CardItems";
import { usePlayerStore } from "../../store/playerStore";

const Cards = () => {
  const { isRegistered, name, totalWinnings } = usePlayerStore((state) => ({
    isRegistered: state.is_registered,
    name: state.name,
    totalWinnings: state.total_winnings,
  }));

  const currentTime = new Date();
  const hours = currentTime.getHours().toString().padStart(2, "0");
  const minutes = currentTime.getMinutes().toString().padStart(2, "0");
  const formattedTime = `${hours}:${minutes}`;

  const cards: CardItem[] = [
    {
      id: 1,
      title: isRegistered && totalWinnings,
      icon: <FaMedal size={22} style={{ margin: "auto 0 auto 0" }} />,
    },
    {
      id: 2,
      title: name && name,
      icon: <FaUser size={22} style={{ margin: "auto 0 auto 0" }} />,
    },
    {
      id: 3,
      title: name && formattedTime,
      icon: <IoMdClock size={22} style={{ margin: "auto 0 auto 0" }} />,
    },
  ];

  return (
    <div className="flex gap-5">
      {cards.map(({ id, title, icon }) => (
        <div
          key={id}
          className="w-full bg-gradient-to-r from-[#181818] to-[#272b33] p-4 rounded-md border-1 h-[84px] flex gap-7"
        >
          <CardItems title={title} icon={icon} />
        </div>
      ))}
    </div>
  );
};

export default Cards;
