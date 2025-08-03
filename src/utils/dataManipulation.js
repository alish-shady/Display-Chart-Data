export function aggregateData(data) {
  const bucketSize = Math.ceil(data.length / 100);
  if (bucketSize <= 1) {
    return data;
  }
  const buckets = data.reduce((allBuckets, point, index) => {
    const bucketIndex = Math.floor(index / bucketSize);
    if (!allBuckets[bucketIndex]) {
      allBuckets[bucketIndex] = [];
    }
    allBuckets[bucketIndex].push(point);
    return allBuckets;
  }, []);

  return buckets.map((bucket) => {
    const sumX = bucket.reduce((sum, point) => sum + point[0], 0);
    const sumY = bucket.reduce((sum, point) => sum + point[1], 0);
    const avgX = sumX / bucket.length;
    const avgY = sumY / bucket.length;
    return [avgX, avgY];
  });
}
export function removeNull(data) {
  return data.filter((item) => item[0] !== null && item[1] !== null);
}
export function computeMaxMin(data) {
  return data.reduce(
    (maxMin, item) => {
      if (item.at(1) === null) return maxMin;
      if (maxMin[0] < item.at(1)) maxMin[0] = item.at(1);
      if (maxMin[1] > item.at(1)) maxMin[1] = item.at(1);
      return maxMin;
    },
    [-Infinity, Infinity]
  );
}
export function separateChartData(mixedData) {
  const singleSeriesData = [];
  const multiSeriesData = [];
  mixedData.forEach((item) => {
    if (Number.isFinite(item[1])) singleSeriesData.push(item);
    if (Array.isArray(item[1])) multiSeriesData.push(item);
  });
  return { singleSeriesData, multiSeriesData };
}
