import * as d3 from "d3";
import Axis from "../layout/Axis";
import SingleChart from "./SingleChart";
import { computeMaxMin } from "../../utils/dataManipulation";
export default function MultiChart({
  data,
  marginTop = 20,
  marginBottom = 30,
  marginRight = 30,
  marginLeft = 40,
  width = 1200,
  height = 600,
}) {
  const [firstLine, secondLine, thirdLine] = data.reduce(
    (acc, item) => {
      return [
        [...acc[0], [item[0], item[1][0]]],
        [...acc[1], [item[0], item[1][1]]],
        [...acc[2], [item[0], item[1][2]]],
      ];
    },
    [[], [], []]
  );
  const [maxY, minY] = computeMaxMin([
    ...firstLine,
    ...secondLine,
    ...thirdLine,
  ]);
  const x = d3.scaleLinear(
    [firstLine.at(0)[0], thirdLine.at(-1)[0]],
    [marginLeft, width - marginRight]
  );
  const y = d3.scaleLinear([minY, maxY], [height - marginBottom, marginTop]);
  return (
    <div className="flex flex-col gap-2">
      <h2 className="pl-8 text-2xl font-semibold">Multi-series Chart</h2>
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
        <SingleChart child={true} data={firstLine} color="blue" />
        <SingleChart child={true} data={secondLine} color="green" />
        <SingleChart child={true} data={thirdLine} color="red" />
      </svg>
    </div>
  );
}
