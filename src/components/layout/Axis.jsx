import { useRef, useEffect } from "react";
import * as d3 from "d3";

export default function Axis({ scale, transform, ticks, tickFormat }) {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      const axisGenerator = transform.includes("translate(0,")
        ? d3.axisBottom(scale)
        : d3.axisLeft(scale);

      if (ticks) axisGenerator.ticks(ticks);
      if (tickFormat) axisGenerator.tickFormat(tickFormat);

      d3.select(ref.current).call(axisGenerator);
    }
  }, [scale, transform, ticks, tickFormat]);

  return <g ref={ref} transform={transform} />;
}
