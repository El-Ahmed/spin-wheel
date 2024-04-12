import { animate, cubicBezier } from "framer-motion";
import PieChart from "./PieChart";
import "./SpinWheel.css";
import { useState } from "react";

interface SpinWheelProps {
  names: {text:string, id:string}[];
  winningId: string;
  winsCounter: number,
  setWinsCounter: (count:number)=>void,
  size?: number;
}
const SpinWheel: React.FC<SpinWheelProps> = ({
  names,
  winningId,
  winsCounter,
  setWinsCounter,
  size = 200,
}) => {
  const [angle, setAngle] = useState(0);

  const spin = () => {
    const winningIndex = winsCounter > 0 ? names.findIndex(item => item.id.split(':')[0] === winningId) : Math.floor(Math.random() * names.length)
    if (winsCounter > 0) setWinsCounter(winsCounter - 1)
    const startingAngle = angle % (2 * Math.PI);
    const sliceAngle = (2 * Math.PI) / names.length;
    const winningAngle = 32 * Math.PI - winningIndex * sliceAngle;
    const adjustedAngle =
      winningAngle -
      sliceAngle / 2 +
      sliceAngle / 10 +
      (Math.random() * 8 * sliceAngle) / 10;
    animate(startingAngle, adjustedAngle, {
      onUpdate: (latest) => {
        setAngle(latest);
      },
      duration: 5,
      ease: cubicBezier(0.86, 0, 0.07, 1),
    });
  };

  return (
    <div className="container" style={{ height: size, width: size }}>
      <div className="absolute">
        <PieChart names={names} size={size} angle={angle}></PieChart>
      </div>

      <div
        className="spinButtonContainer"
        style={{ height: size / 8, width: size / 8 }}
        onClick={spin}
      >
        <div
          className="spinButtonBackground absolute"
          style={{
            height: size / 8,
            width: size / 8,
            borderTopLeftRadius: size,
            borderTopRightRadius: size / 8,
            borderBottomLeftRadius: size,
            borderBottomRightRadius: size,
          }}
        ></div>
        <span className="spinButton" style={{ fontSize: size / 28 }}>
          Spin
        </span>
      </div>
    </div>
  );
};

export default SpinWheel;
