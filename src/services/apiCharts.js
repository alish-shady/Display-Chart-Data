const API_URL_ONE = import.meta.env.VITE_API_URL_ONE;
const API_URL_TWO = import.meta.env.VITE_API_URL_TWO;
export async function loadChartData() {
  try {
    const [res1, res2] = await Promise.all([
      fetch(API_URL_ONE),
      fetch(API_URL_TWO),
    ]);
    if (!res1.ok || !res2.ok)
      throw new Error("There is an issue with the chart dataset!");
    const [dataset1, dataset2] = await Promise.all([res1.json(), res2.json()]);
    if (!dataset1.data || !dataset2.data)
      throw new Error("The chart dataset's data is not valid!");
    return [...dataset1.data, ...dataset2.data];
  } catch (err) {
    throw new Error(err.message);
  }
}
