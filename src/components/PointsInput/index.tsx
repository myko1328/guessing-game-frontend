import { IoCaretDownSharp, IoCaretUpSharp } from "react-icons/io5";
import { BetsInputOnChangeProps } from "../types";

const PointsInput = ({
  formHandleChange,
  betForm,
  setBetForm,
}: BetsInputOnChangeProps) => {
  const Increment = () => {
    setBetForm((prevForm: { bet_points: number }) => ({
      ...prevForm,
      bet_points: prevForm.bet_points + 50,
    }));
  };

  // Decrement function
  const Decrement = () => {
    setBetForm((prevForm: { bet_points: number }) => ({
      ...prevForm,
      bet_points:
        prevForm.bet_points >= 50 ? 50 : Math.max(0, prevForm.bet_points - 50),
    }));
  };

  return (
    <div className="bg-gradient-to-r from-[#181818] to-[#272b33] p-4 rounded-md border-1 ">
      <span className="flex justify-center opacity-80 text-sm font-semibold">
        Points
      </span>
      <div className="gap-4 flex">
        <button
          onClick={Decrement}
          className="w-8 h-8 border border-white rounded-xl"
        >
          <IoCaretDownSharp size={22} style={{ margin: "auto" }} />
        </button>

        <input
          className="bg-transparent focus:outline-none focus:border-none border-none text-center text-lg font-bold max-w-28"
          id="bet_points"
          type="text"
          name="points"
          placeholder=""
          value={betForm?.bet_points}
          onChange={formHandleChange}
        />

        <button
          onClick={Increment}
          className="w-8 h-8 border border-white rounded-xl"
        >
          <IoCaretUpSharp size={22} style={{ margin: "auto" }} />
        </button>
      </div>
    </div>
  );
};

export default PointsInput;
