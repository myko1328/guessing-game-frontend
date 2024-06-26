import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Title from "../Title";
import { IoMdSpeedometer } from "react-icons/io";

interface SpeedSliderProps {
  setAnimationSpeed: React.Dispatch<React.SetStateAction<number>>;
}

const SpeedSlider = ({ setAnimationSpeed }: SpeedSliderProps) => {
  return (
    <div className="flex flex-col justify-center gap-4 mt-4">
      <Title
        icon={<IoMdSpeedometer size={22} style={{ margin: "auto 0 auto 0" }} />}
        name="Speed"
      />
      <div className="p-4 rounded-md bg-[#272b33] h-20 my-auto">
        <Slider
          className="mt-1"
          min={10}
          max={50}
          marks={{
            10: (
              <p className="text-md font-bold mt-2 relative left-1 text-white">
                1x
              </p>
            ),
            20: (
              <p className="text-md font-bold mt-2 relative left-1 text-white">
                2x
              </p>
            ),
            30: (
              <p className="text-md font-bold mt-2 relative left-1 text-white">
                3x
              </p>
            ),
            40: (
              <p className="text-md font-bold mt-2 relative left-1 text-white">
                4x
              </p>
            ),
            50: (
              <p className="text-md font-bold mt-2 relative text-white">5x</p>
            ),
          }}
          style={{ background: "" }}
          styles={{
            rail: { background: "#4e5461", height: "12px" },
            handle: {
              width: "20px",
              height: "20px",
              background: "#fb7185",
              border: "#fb7185",
            },
            track: { background: "#fb7185", height: "12px" },
          }}
          dotStyle={{ display: "none" }}
          onChange={(value) =>
            setAnimationSpeed(((1 / (+value / 2)) * 100) / 5)
          }
        />
      </div>
    </div>
  );
};

export default SpeedSlider;
