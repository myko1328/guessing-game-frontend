import { IoCaretDownSharp, IoCaretUpSharp } from "react-icons/io5";
import { BetsInputOnChangeProps } from "../types";

const MultiplierInput = ({
  formHandleChange,

  betForm,
  setBetForm,
}: BetsInputOnChangeProps) => {
  const Increment = () => {
    setBetForm((prevForm: { predicted_multiplier: number }) => ({
      ...prevForm,
      predicted_multiplier: (+prevForm.predicted_multiplier + 0.05).toFixed(2),
    }));
  };

  const Decrement = () => {
    setBetForm((prevForm: { predicted_multiplier: number }) => ({
      ...prevForm,

      predicted_multiplier: Math.max(
        0,
        +prevForm.predicted_multiplier - 0.05
      ).toFixed(2),
    }));
  };

  return (
    <div className="bg-gradient-to-r from-[#181818] to-[#272b33] p-4 rounded-md border-1 ">
      <span className="flex justify-center opacity-80 text-sm font-semibold">
        Multiplier
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
          id="predicted_multiplier"
          type="text"
          name="points"
          placeholder=""
          value={betForm?.predicted_multiplier}
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

export default MultiplierInput;
