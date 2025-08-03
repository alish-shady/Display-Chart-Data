import Chart from "./components/layout/DisplayChart";
import Header from "./components/layout/Header";

function App() {
  return (
    <div>
      <Header />
      <main className="w-full p-4 bg-gray-200">
        <Chart />
      </main>
    </div>
  );
}

export default App;
