import { useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { GameResult } from "../types";
import { renderGraphNumber } from "../../utils/utils";
import { usePlayerStore } from "../../store/playerStore";

// Register the plugin
gsap.registerPlugin(MotionPathPlugin);

const MARGIN = { top: 30, right: 30, bottom: 50, left: 50 };

const MultiplierGraph = ({
  gameResult,
  onGameStart,
  animationSpeed,
}: {
  gameResult: GameResult;
  onGameStart: boolean;
  animationSpeed: number;
}) => {
  const { isRegistered } = usePlayerStore((state) => ({
    isRegistered: state.is_registered,
  }));
  const textRef = useRef(null);
  const axesRef = useRef(null);

  const data = renderGraphNumber(gameResult.player.actualPrediction);
  const width = 990;
  const height = 560;

  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const yScale = useMemo(() => {
    return d3.scaleLinear().domain([0, 10]).range([boundsHeight, 0]);
  }, [gameResult, height, onGameStart]);

  const xScale = useMemo(() => {
    return d3.scaleLinear().domain([0, 10]).range([0, boundsWidth]);
  }, [gameResult, width, onGameStart]);

  useEffect(() => {
    const svgElement = d3.select(axesRef.current);
    svgElement.selectAll("*").remove();

    const xAxisGenerator = d3.axisBottom(xScale).tickSizeOuter(0);

    const xAxis = svgElement
      .append("g")
      .attr("transform", `translate(0,${boundsHeight})`)
      .call(xAxisGenerator);

    xAxis.select(".domain").attr("stroke", "#4e5461").attr("stroke-width", 6);
    xAxis.selectAll(".tick line").attr("stroke", "none");

    xAxis
      .selectAll(".tick text")
      .attr("fill", "#b1b6c1")
      .style("font-size", "16px")
      .attr("dy", "20px");

    const extensionLength = 14;

    // Line before the domain
    svgElement
      .append("line")
      .attr("x1", xScale.range()[0] - extensionLength)
      .attr("y1", boundsHeight + 0.5)
      .attr("x2", xScale.range()[0])
      .attr("y2", boundsHeight + 0.5)
      .attr("stroke", "#4e5461")
      .attr("stroke-width", 6);

    // Line after the domain
    svgElement
      .append("line")
      .attr("x1", xScale.range()[1])
      .attr("y1", boundsHeight + 0.5)
      .attr("x2", xScale.range()[1] + extensionLength)
      .attr("y2", boundsHeight + 0.5)
      .attr("stroke", "#4e5461")
      .attr("stroke-width", 6);

    if (isRegistered && onGameStart) {
      const filteredData = data.slice(
        0,
        data.findIndex(
          (d) => d.multiplier === gameResult.player.actualPrediction
        ) + 1
      );

      // line graph
      const lineBuilder = d3
        .line<any>()
        .x((d) => xScale(d.x))
        .y((d) => yScale(d.multiplier));
      const linePath = lineBuilder(filteredData);

      const path = svgElement
        .append("path")
        .attr("d", linePath)
        .attr("class", "line-path")
        .attr("fill", "none")
        .attr("stroke", "#fb7185")
        .attr("stroke-width", 6);

      // Calculate the total length of the path for animation
      const totalLength = path?.node()?.getTotalLength();

      // Set the initial state of the line to not visible
      path
        .attr("stroke-dasharray", totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength || 0);

      // Animate the line drawing using GSAP
      gsap.to(path.node(), {
        strokeDashoffset: 0,
        duration: animationSpeed,
        ease: "power1.easeInOut",
      });

      // Append a circle at the start point
      const circle = svgElement
        .append("circle")
        .attr("cx", xScale(data[0].x))
        .attr("cy", yScale(data[0].multiplier))
        .attr("r", 12)
        .attr("fill", "#fb7185");

      // Animate the circle to move to the end point synchronized with the line drawing
      // Animate the circle to follow the path
      gsap.to(circle.node(), {
        duration: animationSpeed,
        ease: "power1.easeInOut",
        motionPath: {
          path: ".line-path",
          align: ".line-path",
          alignOrigin: [0.5, 0.5],
          autoRotate: true,
        },
      });
    } else {
      svgElement
        .append("circle")
        .attr("cx", xScale(data[0].x))
        .attr("cy", yScale(data[0].multiplier))
        .attr("r", 12)
        .attr("fill", "#fb7185");
    }
  }, [xScale, boundsHeight, isRegistered]);

  useGSAP(
    () => {
      if (!onGameStart) return;

      gsap.to(textRef.current, {
        duration: animationSpeed,
        ease: "none",
        textContent: String(gameResult?.player.actualPrediction) + "x",
        snap: { textContent: 0.01 },

        onStart: () => {
          //@ts-ignore
          textRef.current.textContent = "0.00x";
        },
      });
    },
    { dependencies: [onGameStart, gameResult], scope: textRef }
  );

  return (
    <div className="bg-[#272b33] mt-4 min-h-[620px] ">
      <svg width={width} height={height}>
        {/* x-axis domain */}
        <g
          width={boundsWidth}
          height={boundsHeight}
          ref={axesRef}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        />

        {/* line graph */}

        <text
          ref={textRef}
          x="460"
          y="220"
          textAnchor="middle"
          fontSize="48"
          fill="white"
          fontWeight="bold"
        >
          0.00x
        </text>
      </svg>
    </div>
  );
};

export default MultiplierGraph;
