import { useEffect, useState } from "react";
import SingleChart from "../charts/SingleChart";
import { loadChartData } from "../../services/apiCharts";
import MultiChart from "../charts/MultiChart";
import { separateChartData } from "../../utils/dataManipulation";

export default function DisplayChart() {
  const [singleChartData, setSingleChartData] = useState([]);
  const [multiChartData, setMultiChartData] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    async function getData() {
      try {
        setError("");
        const chartData = await loadChartData();
        const { singleSeriesData, multiSeriesData } =
          separateChartData(chartData);
        setSingleChartData(singleSeriesData);
        setMultiChartData(multiSeriesData);
      } catch (err) {
        setError(err.message);
      }
    }
    getData();
  }, []);
  if (error)
    return (
      <div className="w-full flex flex-col items-center gap-8">
        <p className="font-bold text-4xl">{error}</p>
      </div>
    );
  return (
    <div className="w-full flex flex-col items-center gap-8">
      {singleChartData.length && multiChartData.length ? (
        <>
          <SingleChart data={singleChartData} />
          <MultiChart data={multiChartData} />
        </>
      ) : (
        <p className="font-bold text-2xl">loading...</p>
      )}
    </div>
  );
}
