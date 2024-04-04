import { FaUser } from "react-icons/fa";
import { IoMdClock } from "react-icons/io";
import { FaMedal } from "react-icons/fa6";

const Cards = ({
  registeredName,
  totalWinnings,
}: {
  totalWinnings: number;
  registeredName: { name: string; isRegisted: boolean };
}) => {
  const currentTime = new Date();
  const hours = currentTime.getHours().toString().padStart(2, "0");
  const minutes = currentTime.getMinutes().toString().padStart(2, "0");
  const formattedTime = `${hours}:${minutes}`;
  return (
    <div className="flex gap-5">
      <div className="w-full bg-gradient-to-r from-[#181818] to-[#272b33] p-4 rounded-md border-1 h-[84px] flex gap-7">
        <FaMedal size={22} style={{ margin: "auto 0 auto 0" }} />

        <p className="my-auto">{registeredName.isRegisted && totalWinnings}</p>
      </div>
      <div className="w-full bg-gradient-to-r from-[#181818] to-[#272b33] p-4 rounded-md border-1 h-[84px] flex gap-7">
        <FaUser size={22} style={{ margin: "auto 0 auto 0" }} />
        <p className="my-auto">{registeredName.name && registeredName.name}</p>
      </div>
      <div className="w-full bg-gradient-to-r from-[#181818] to-[#272b33] p-4 rounded-md border-1 h-[84px] flex gap-7">
        <IoMdClock size={22} style={{ margin: "auto 0 auto 0" }} />
        <p className="my-auto">{registeredName.name && formattedTime}</p>
      </div>
    </div>
  );
};

export default Cards;
