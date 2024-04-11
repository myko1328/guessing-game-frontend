import { IoCaretDownSharp, IoCaretUpSharp } from "react-icons/io5";

import Button from "../Button";
import ButtonLayout from "../Button/layout";

import { usePlayerStore } from "../../store/playerStore";

import { BetsInputOnChangeProps } from "../types";

const MultiplierInput = ({ formHandleChange }: BetsInputOnChangeProps) => {
  const { multiplier, increaseAmount, decreaseAmount, onAmountChange } =
    usePlayerStore((state) => ({
      increaseAmount: state.increase_amount,
      decreaseAmount: state.decrease_amount,
      onAmountChange: state.on_amount_change,
      multiplier: state.predicted_multiplier,
    }));

  return (
    <ButtonLayout name="Multiplier">
      <Button
        type="icon"
        className="w-8 h-8 border border-white rounded-xl"
        icon={<IoCaretDownSharp size={22} style={{ margin: "auto" }} />}
        handleClick={() => decreaseAmount("multiplier")}
      />
      <input
        className="bg-transparent focus:outline-none focus:border-none border-none text-center text-lg font-bold max-w-28"
        id="predicted_multiplier"
        type="text"
        name="points"
        placeholder=""
        value={multiplier}
        onChange={(e) => onAmountChange("multiplier", e.target.value)}
      />
      <Button
        type="icon"
        className="w-8 h-8 border border-white rounded-xl"
        icon={<IoCaretUpSharp size={22} style={{ margin: "auto" }} />}
        handleClick={() => increaseAmount("multiplier")}
      />
    </ButtonLayout>
  );
};

export default MultiplierInput;
