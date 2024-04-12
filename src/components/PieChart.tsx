import { useEffect, useRef } from "react";

interface PieChartProps {
  names: {text:string, id:string}[];
  size?: number;
  angle?: number;
}
const defaultColors = ['#FFC54D','#BD4291','#F94C66']

const strokeColor = '#111'

const PieChart: React.FC<PieChartProps> = ({ names, size = 200, angle = 0 }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');

      if (!canvas || !ctx) return;

      const usableNames = names

      const namesCount = usableNames.length;
      const sliceAngle = 2 * Math.PI / namesCount
      const fixingAngle = - sliceAngle / 2

      const drawSlice = (position: number, color: string) => {
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2); 

        ctx.arc(canvas.width / 2, canvas.height / 2, size / 2 - size / 100, sliceAngle * position + fixingAngle + angle, sliceAngle * (position + 1) + fixingAngle + angle); 
        ctx.lineTo(canvas.width / 2, canvas.height / 2);
        ctx.fillStyle = color;
        ctx.fill();

        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = size/100;

        ctx.stroke();

      }
      
      const drawText = (position: number, text: string) => {
        ctx.save();

        ctx.translate(canvas.width / 2, canvas.height/2);

        ctx.rotate((position + 0.5) * sliceAngle + fixingAngle + angle);

        ctx.fillStyle = "black";
        const fontSize = size / 16
        ctx.font = `${fontSize}px Arial`;

        ctx.textAlign = "end";
        ctx.textBaseline = 'middle';

        const textMetrics = ctx.measureText(text);
        const desiredMetrics = ctx.measureText('Ahmed EL');
        if (textMetrics.width > desiredMetrics.width) {
          const adjustedFont = fontSize * desiredMetrics.width / textMetrics.width
          ctx.font = `${adjustedFont}px Arial`;
        }

        ctx.fillText(text, size/2 - size/20, 0, size/2 - size/5);

        ctx.restore();

      }

      // Clear the canvas before redrawing
      ctx.clearRect(0, 0, canvas.width, canvas.height);


      usableNames.forEach((value, index) => {
        if (usableNames.length %3 === 1 && index === usableNames.length - 1) {
          drawSlice(index, defaultColors[(index+1) % 3]);
        } 
        else {
          drawSlice(index, defaultColors[index % 3]);
        }
        drawText(index, value.text)
      });

    }, [angle, names, size]);

    return (
        <canvas ref={canvasRef} width={size} height={size} />
    );

};

export default PieChart;
