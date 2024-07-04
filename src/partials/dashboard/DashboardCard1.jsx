import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

// Import tailwindConfig for colors
import { tailwindConfig } from "../../utils/Utils";

const AnalysisGraph = () => {
  const chart1Ref = useRef(null);

  useEffect(() => {
    const ctx1 = chart1Ref.current.getContext("2d");
    const chart1 = new Chart(ctx1, {
      type: "line",
      data: {
        labels: [
          "2017-01-02",
          "2017-04-02",
          "2017-07-02",
          "2018-01-02",
          "2018-07-02",
          "2019-01-02",
          "2018-07-02",
        ],
        datasets: [
          {
            label: "Purchase amount2 (USD)",
            fill: false,
            data: [300, -1200, 500, -340, 500, -400, 600],
            borderColor: tailwindConfig().theme.colors.blue[400],
            backgroundColor: "transparent",
            pointBackgroundColor: tailwindConfig().theme.colors.blue[400],
            pointBorderColor: tailwindConfig().theme.colors.blue[400],
            pointHoverBackgroundColor: tailwindConfig().theme.colors.blue[500],
            pointHoverBorderColor: tailwindConfig().theme.colors.blue[500],
            yAxisID: "y1",
          },
          {
            label: "Purchase amount1 (USD)",
            fill: false,
            data: [100, 120, 80, 134, 200, 80, 99],
            borderColor: tailwindConfig().theme.colors.indigo[500],
            backgroundColor: "transparent",
            pointBackgroundColor: tailwindConfig().theme.colors.indigo[500],
            pointBorderColor: tailwindConfig().theme.colors.indigo[500],
            pointHoverBackgroundColor:
              tailwindConfig().theme.colors.indigo[600],
            pointHoverBorderColor: tailwindConfig().theme.colors.indigo[600],
            yAxisID: "y",
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          y: {
            position: "left",
            grid: {
              color: "rgba(128, 128, 128, 0.1)",
            },
          },
          y1: {
            position: "right",
            grid: {
              color: "rgba(128, 128, 128, 0.1)",
              drawOnChartArea: false,
            },
            ticks: {
              beginAtZero: true,
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              color: "rgba(128, 128, 128, 1)",
            },
          },
          tooltip: {
            backgroundColor: "rgba(128, 128, 128, 0.8)",
          },
        },
      },
    });
    return () => {
      chart1.destroy();
    };
  }, []);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 h-96">
      <header className="px-4 py-2 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Compliance Analysis Graph
        </h2>
      </header>
      <div className="p-4 relative h-full w-auto">
        <canvas ref={chart1Ref} />
      </div>
    </div>
  );
};

export default AnalysisGraph;
