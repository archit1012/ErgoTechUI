import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { tailwindConfig } from "../../utils/Utils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EnergyChart = () => {
  const [selectedDate, setSelectedDate] = useState("2024-05"); // Default to May 2024
  const [chartData, setChartData] = useState([]);
  const [textColor, setTextColor] = useState("#000"); // Default text color

  // Sample data
  const data = {
    "2024-05": [5, 35],
    "2024-06": [0, 30],
    "2024-07": [10, 40],
  };

  useEffect(() => {
    // Set chart data based on the selected date
    setChartData(data[selectedDate] || []);
  }, [selectedDate]);

  useEffect(() => {
    const updateTextColor = () => {
      const isDarkMode = document.documentElement.classList.contains("dark");
      setTextColor(isDarkMode ? "#fff" : "#000");
    };

    // Update text color on mount
    updateTextColor();

    // Add event listener for class changes
    const observer = new MutationObserver(updateTextColor);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Cleanup observer on unmount
    return () => observer.disconnect();
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const generateDays = () => {
    const [year, month] = selectedDate.split("-");
    const daysInMonth = new Date(year, month, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, index) =>
      (index + 1).toString()
    );
  };

  const chartConfig = {
    labels: generateDays(), // Dynamically generate days for the selected month
    datasets: [
      {
        label: "kWh",
        data: chartData,
        backgroundColor: tailwindConfig().theme.colors.blue[400],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[500],
        borderRadius: 8, // Adjust the value to change the roundness of the edges
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 45,
        title: {
          display: true,
          text: "kWh", // Label for y-axis
          color: textColor,
          font: {
            size: 9,
            weight: "bold",
            family: "Arial",
          },
        },
        ticks: {
          color: textColor,
        },
      },
      x: {
        title: {
          display: true,
          text: "Day", // Label for x-axis
          color: textColor,
          font: {
            size: 9,
            weight: "bold",
            family: "Arial",
          },
        },
        ticks: {
          color: textColor,
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: textColor, // Dynamic color for legend labels
        },
      },
    },
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 h-96">
      <header className="px-4 flex py-2 border-b border-slate-100 dar k:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Energy Generated
        </h2>
        {/* <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          className=" w-40 bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 hover:border-gray-500 px-4 py-2 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline"
        /> */}
      </header>

      <div
        className="wrapper flex-grow"
        style={{ width: "100%", height: "100%" }}
      >
        <Bar data={chartConfig} options={options} />
      </div>
    </div>
  );
};

export default EnergyChart;
