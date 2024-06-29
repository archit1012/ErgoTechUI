import React, { useEffect, useState } from "react";
import DoughnutChart from "../../charts/DoughnutChart";

// Import utilities
import { tailwindConfig } from "../../utils/Utils";

function PieChartCard({ pieChartData }) {
  // const { labels, datasets } = pieChartData;
  // console.log([...labels], [...datasets]);

  const [mount, setMount] = useState(false);

  const chartData1 = {
    labels: ["United States", "Italy", "Other"],
    datasets: [
      {
        label: "Top Countries",
        data: [35, 30, 35],
        backgroundColor: [
          tailwindConfig().theme.colors.indigo[500],
          tailwindConfig().theme.colors.blue[400],
          tailwindConfig().theme.colors.indigo[800],
        ],
        hoverBackgroundColor: [
          tailwindConfig().theme.colors.indigo[600],
          tailwindConfig().theme.colors.blue[500],
          tailwindConfig().theme.colors.indigo[900],
        ],
        borderWidth: 0,
      },
    ],
  };

  useEffect(() => {
    setMount(!mount);
  }, [pieChartData]);

  const chartData = {
    labels: [...pieChartData.labels],
    datasets: [
      {
        label: "Top Countries",
        data: [...pieChartData.datasets],
        backgroundColor: [
          // tailwindConfig().theme.colors.indigo[500],
          // tailwindConfig().theme.colors.blue[400],
          // tailwindConfig().theme.colors.indigo[800],
          "red",
          "blue",
          "green",
          "yellow",
          "pink",
          // "pink",
          // "grey",
          // "purple",
          "silver",
          // "gold",
        ],
        hoverBackgroundColor: [
          // tailwindConfig().theme.colors.indigo[600],
          // tailwindConfig().theme.colors.blue[500],
          // tailwindConfig().theme.colors.indigo[900],
        ],
        borderWidth: 0,
      },
    ],
  };

  console.log(chartData, "chartData");

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Top Countries
        </h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      {/* <DoughnutChart data={chartData} width={389} height={260} /> */}
      {pieChartData.labels.length > 0 && (
        <DoughnutChart data={chartData} width={489} height={360} />
      )}
    </div>
  );
}

export default PieChartCard;
