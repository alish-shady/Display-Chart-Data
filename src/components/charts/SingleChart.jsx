import * as d3 from "d3";
import Axis from "../layout/Axis";
import {
  aggregateData,
  computeMaxMin,
  removeNull,
} from "../../utils/dataManipulation";

export default function SingleChart({
  data,
  width = 1200,
  height = 600,
  marginTop = 20,
  marginRight = 30,
  marginBottom = 30,
  marginLeft = 40,
  child = false,
  color,
}) {
  const finalData = aggregateData(removeNull(data));
  const [maxY, minY] = computeMaxMin(finalData);
  const x = d3.scaleLinear(
    [finalData.at(0).at(0), finalData.at(-1).at(0)],
    [marginLeft, width - marginRight]
  );

  const y = d3.scaleLinear([minY, maxY], [height - marginBottom, marginTop]);
  const line = d3
    .line()
    .x((d) => x(d[0]))
    .y((d) => y(d[1]))
    .defined((d) => d[1]);
  if (child) {
    return (
      <path fill="none" stroke={color} strokeWidth="2.5" d={line(finalData)} />
    );
  }
  return (
    <div className="flex flex-col gap-2">
      <h2 className="pl-8 text-2xl font-semibold">Single-series Chart</h2>
      <svg width={width} height={height}>
        <Axis
          scale={x}
          transform={`translate(0, ${height - marginBottom})`}
          ticks={width / 50}
        />
        <Axis
          scale={y}
          transform={`translate(${marginLeft}, 0)`}
          ticks={height / 20}
        />
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          d={line(finalData)}
        />
      </svg>
    </div>
  );
}
