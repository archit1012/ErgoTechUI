import React, { useState } from "react";
import Header from "../partials/Header";
// import DashboardCard04 from "../partials/dashboard/DashboardCard04";
// import DashboardCard12 from "../partials/dashboard/DashboardCard12";
import DashboardCard10 from "../partials/dashboard/DashboardCard10";
import DashboardChard1 from "../partials/dashboard/DashboardCard1";
import PieChartCard from "../partials/dashboard/PiechartCard";
// import DashboardMap from "../partials/dashboard/DashboardMap";
// import Dashboardcard05 from "../partials/dashboard/Dashoardcard05";

function Dashboard() {
  const [selectedAsset, setSelectedAsset] = useState("");

  const handleAssetChange = (event) => {
    setSelectedAsset(event.target.value);
  };

  // State for theme mode
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`flex flex-col h-screen overflow-hidden bg-gray-100 dark:bg-gray-900`}
    >
      {/* Header */}
      <Header toggleDarkMode={toggleDarkMode} />

      {/* Asset Dropdown */}
      {/* <div className="p-4 header-small header-text">
        <div className="flex justify-start space-x-2 overflow-x-auto items-center">
          
          <div className="relative py-2 ">
          <div>
            <label htmlFor="assets" className=" block absolute top-[-1px] left-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm"
            style={{ fontSize: '10px' }}>Assets</label>
          </div>
            <select
              id="assets"
              name="assets"
              value={selectedAsset}
              onChange={handleAssetChange}
              className={`block appearance-none w-full bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 hover:border-gray-500 px-2 py-1 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline dropdown-large`}
              style={{ paddingRight: '24px' }}
            >
              <option value=""> asset</option>
              <option value="asset1">Asset 1</option>
              <option value="asset2">Asset 2</option>
              <option value="asset3">Asset 3</option>
            </select>
          </div>
        </div>
      </div> */}

      {/* Content area */}
      <div className="flex-1 overflow-y-auto">
        <main className="px-4 sm:px-6 lg:px-4  w-full  ">
          {/* Cards */}
          <div className="grid grid-cols-12 gap-3">
            {/* Your Dashboard Cards */}
            {/* <Dashboardcard05 selectedAsset={selectedAsset} /> */}
            {/* <DashboardCard12 selectedAsset={selectedAsset} /> */}
            <DashboardCard10 selectedAsset={selectedAsset} />
            <DashboardChard1 selectedAsset={selectedAsset} />
            {/* <DashboardMap selectedAsset={selectedAsset} /> */}
          </div>
          <div className="w-1/2 m-auto mt-2">
            <PieChartCard selectedAsset={selectedAsset} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
