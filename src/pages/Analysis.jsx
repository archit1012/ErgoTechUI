import React, { useEffect, useRef, useState, useMemo } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import Header from "../partials/Header";
import { useTable, useFilters } from "react-table";
import { CSVLink } from "react-csv";
import "../css/style.css"; // Ensure your custom CSS file is imported

const MonitoringGrid = ({ data, columns }) => {
  const [sorting, setSorting] = useState({ key: "assetId", ascending: true });
  const [currentUsers, setCurrentUsers] = useState(data);
  const handleSort = (key) => {
  
    setSorting((prevSorting) => ({
      key,
      ascending: prevSorting.key === key ? !prevSorting.ascending : true,
    }));
    
  };
  useEffect(() => {
    // Copy array to prevent data mutation
    const currentUsersCopy = [...currentUsers];

    // Apply sorting
    const sortedCurrentUsers = currentUsersCopy.sort((a, b) => {
      if (typeof a[sorting.key] === "string") {
        return a[sorting.key].localeCompare(b[sorting.key]);
      } else {
        return a[sorting.key] - b[sorting.key];
      }
    });
 
    // Replace currentUsers with sorted currentUsers
    setCurrentUsers(
      sorting.ascending ? sortedCurrentUsers : sortedCurrentUsers.reverse()
    );
  }, [sorting]);

  const [filterInput, setFilterInput] = useState("");
  data = currentUsers;
  const filterData = useMemo(() => {
    if (filterInput === "") return data;
    return data.filter((row) =>
      columns.some((col) =>
        row[col.accessor]
          ?.toString()
          .toLowerCase()
          .includes(filterInput.toLowerCase())
      )
    );
  }, [data, filterInput, columns]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: filterData }, useFilters);

  const handleFilterChange = (e) => {
    const value = e.target.value || "";
    setFilterInput(value);
  };

  return (
    <>
    <div className="flex items-center mb-4">
      <input
        value={filterInput}
        onChange={handleFilterChange}
        placeholder="Filter data"
        className={`block appearance-none bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 hover:border-gray-500 px-2 py-1 rounded shadow leading-tight focus:outline-none focus:shadow-outline`}
        style={{ marginRight: "15px", fontSize: "14px" }}
      />
      <CSVLink
        data={data}
        filename="data_export.csv"
        className="text-sm btn-primary"
        target="_blank"
      >
        Export CSV
      </CSVLink>
    </div>
    <div className="overflow-x-auto">
      <table
        {...getTableProps()}
        className="table-outline"
        style={{ width: "100%", marginTop: "10px" }}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              style={{ borderBottom: "1px solid #ddd" }}
            >
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{ padding: "10px", textAlign: "left" }}
                  onClick={() => handleSort(column.id)}
                >
                  {column.render("Header")}

                  {sorting.key === column.id
                    ? sorting.ascending
                      ? " 🔼"
                      : " 🔽"
                    : ""}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                style={{ borderBottom: "1px solid #ddd" }}
              >
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} style={{ padding: "10px" }}>
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </>
  );
};

const AnalysisPage = () => {
  const chart1Ref = useRef(null);
  const [selectedProfile, setSelectedProfile] = useState("");
  const [selectedAsset, setSelectedAsset] = useState("");
  const [selectedDevice, setSelectedDevice] = useState("");
  const [selectedY1Category, setSelectedY1Category] = useState("");
  const [selectedY1Value, setSelectedY1Value] = useState("");
  const [selectedY2Category, setSelectedY2Category] = useState("");
  const [selectedY2Value, setSelectedY2Value] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const lineChartData = {
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
        yAxisID: "y1",
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.4)",
      },
      {
        label: "Purchase amount1 (USD)",
        fill: false,
        data: [100, 120, 80, 134, 200, 80, 99],
        yAxisID: "y",
        borderColor: "rgba(153,102,255,1)",
        backgroundColor: "rgba(153,102,255,0.4)",
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          font: {
            size: 10,
          },
        },
      },
      y: {
        position: "left",
        grid: {
          color: "rgba(128, 128, 128, 0.1)",
        },
        ticks: {
          font: {
            size: 10,
          },
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
          font: {
            size: 10,
          },
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "rgba(128, 128, 128, 1)",
          font: {
            size: 10,
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(128, 128, 128, 0.8)",
      },
    },
  };

  const handleApply = () => {
    console.log("Apply button clicked");
  };

  // Sample data and columns for the grid component
  const data = [
    {
      assetId: "12345",
      customerDeviceName: "Device 1",
      customerId: "Cust123",
      deviceCategory: "Category A",
      deviceLocation: "Location X",
      deviceName: "Device A",
      deviceId: "Dev001",
      data: 100,
      measurement: "m",
      variableName: "Variable 1",
      variableUnit: "Unit 1",
      sensorTime: "2024-05-28 08:00:00",
    },
    {
      assetId: "67890",
      customerDeviceName: "Device 2",
      customerId: "Cust456",
      deviceCategory: "Category B",
      deviceLocation: "Location Y",
      deviceName: "Device B",
      deviceId: "Dev002",
      data: 200,
      measurement: "cm",
      variableName: "Variable 2",
      variableUnit: "Unit 2",
      sensorTime: "2024-05-28 09:00:00",
    },
  ];
  const formStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const columns = [
    { Header: "Asset Id", accessor: "assetId" },
    { Header: "Customer Device Name", accessor: "customerDeviceName" },
    { Header: "Customer Id", accessor: "customerId" },
    { Header: "Device Category", accessor: "deviceCategory" },
    { Header: "Device Location", accessor: "deviceLocation" },
    { Header: "Device Name", accessor: "deviceName" },
    { Header: "Device Id", accessor: "deviceId" },
    { Header: "Data", accessor: "data" },
    { Header: "Measurement", accessor: "measurement" },
    { Header: "Variable Name", accessor: "variableName" },
    { Header: "Variable Unit", accessor: "variableUnit" },
    { Header: "Sensor Time", accessor: "sensorTime" },
  ];

  return (
    <div className="flex h-fit overflow-hidden bg-gray-100 dark:bg-gray-900">
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header className="header-small" />
        <main className="flex-grow">
          <div className="p-4 header-small header-text">
            <div className="px-4 py-2 sm:px-6 lg:px-2  overflow-x-auto  w-full max-w-9xl mx-auto">
              <form onSubmit={handleSubmit} style={formStyle}>
                <div className="relative flex-grow">
                  <label
                    htmlFor="profile-dropdown"
                    className="block absolute top-[-7px] left-2 bg-gray-100 dark:bg-gray-800 px-0.5 font-medium text-gray-700 dark:text-gray-300"
                    style={{ fontSize: "10px" }}
                  >
                    Profile
                  </label>
                  <select
                    id="profile-dropdown"
                    value={selectedProfile}
                    onChange={(e) => setSelectedProfile(e.target.value)}
                    className="block appearance-none mx-1 w-32 bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 hover:border-gray-500 px-1 py-1 rounded shadow leading-tight focus:outline-none focus:shadow-outline dropdown-small"
                  >
                    <option value="" disabled>
                      Select Profile
                    </option>
                    <option>Profile 1</option>
                    <option>Profile 2</option>
                  </select>
                </div>
                <div className="relative flex-grow">
                  <label
                    htmlFor="asset-dropdown"
                    className="block absolute top-[-7px] left-2 bg-gray-100 dark:bg-gray-800 px-0.5 font-medium text-gray-700 dark:text-gray-300"
                    style={{ fontSize: "10px" }}
                  >
                    Asset
                  </label>
                  <select
                    id="asset-dropdown"
                    value={selectedAsset}
                    onChange={(e) => setSelectedAsset(e.target.value)}
                    className="block appearance-none mx-1 w-32 bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 hover:border-gray-500 px-1 py-1 rounded shadow leading-tight focus:outline-none focus:shadow-outline dropdown-small"
                  >
                    <option value="" disabled>
                      Select Asset
                    </option>
                    <option>Asset 1</option>
                    <option>Asset 2</option>
                  </select>
                </div>
                <div className="relative flex-grow">
                  <label
                    htmlFor="device-dropdown"
                    className="block absolute top-[-7px] left-2 bg-gray-100 dark:bg-gray-800 px-0.5 font-medium text-gray-700 dark:text-gray-300"
                    style={{ fontSize: "10px" }}
                  >
                    Device
                  </label>
                  <select
                    id="device-dropdown"
                    value={selectedDevice}
                    onChange={(e) => setSelectedDevice(e.target.value)}
                    className="block appearance-none mx-1 w-32 bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 hover:border-gray-500 px-1 py-1 rounded shadow leading-tight focus:outline-none focus:shadow-outline dropdown-small"
                  >
                    <option value="" disabled>
                      Select Device
                    </option>
                    <option>Device 1</option>
                    <option>Device 2</option>
                  </select>
                </div>
                <div className="relative flex-grow">
                  <label
                    htmlFor="y1-category-dropdown"
                    className="block absolute top-[-7px] left-2 bg-gray-100 dark:bg-gray-800 px-0.5 font-medium text-gray-700 dark:text-gray-300"
                    style={{ fontSize: "10px" }}
                  >
                    Y1 Category
                  </label>
                  <select
                    id="y1-category-dropdown"
                    value={selectedY1Category}
                    onChange={(e) => setSelectedY1Category(e.target.value)}
                    className="block appearance-none  mx-1 w-44 bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 hover:border-gray-500 px-1 py-1 rounded shadow leading-tight focus:outline-none focus:shadow-outline dropdown-small"
                  >
                    <option value="" disabled>
                      Select Y1 Category
                    </option>
                    <option>Y1 Category 1</option>
                    <option>Y1 Category 2</option>
                  </select>
                </div>
                <div className="relative flex-grow">
                  <label
                    htmlFor="y1-value-dropdown"
                    className="block absolute top-[-7px] left-2 bg-gray-100 dark:bg-gray-800 px-0.5 font-medium text-gray-700 dark:text-gray-300"
                    style={{ fontSize: "10px" }}
                  >
                    Y1 Value
                  </label>
                  <select
                    id="y1-value-dropdown"
                    value={selectedY1Value}
                    onChange={(e) => setSelectedY1Value(e.target.value)}
                    className="block appearance-none  mx-1 w-40 bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 hover:border-gray-500 px-1 py-1 rounded shadow leading-tight focus:outline-none focus:shadow-outline dropdown-small"
                  >
                    <option value="" disabled>
                      Select Y1 Value
                    </option>
                    <option>Y1 Value 1</option>
                    <option>Y1 Value 2</option>
                  </select>
                </div>
                <div className="relative flex-grow">
                  <label
                    htmlFor="y2-category-dropdown"
                    className="block absolute top-[-7px] left-2 bg-gray-100 dark:bg-gray-800 px-0.5 font-medium text-gray-700 dark:text-gray-300"
                    style={{ fontSize: "10px" }}
                  >
                    Y2 Category
                  </label>
                  <select
                    id="y2-category-dropdown"
                    value={selectedY2Category}
                    onChange={(e) => setSelectedY2Category(e.target.value)}
                    className="block appearance-none  mx-1 w-44 bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 hover:border-gray-500 px-1 py-1 rounded shadow leading-tight focus:outline-none focus:shadow-outline dropdown-small"
                  >
                    <option value="" disabled>
                      Select Y2 Category
                    </option>
                    <option>Y2 Category 1</option>
                    <option>Y2 Category 2</option>
                  </select>
                </div>
                <div className="relative flex-grow">
                  <label
                    htmlFor="y2-value-dropdown"
                    className="block absolute top-[-7px] left-2 bg-gray-100 dark:bg-gray-800 px-0.5 font-medium text-gray-700 dark:text-gray-300"
                    style={{ fontSize: "10px" }}
                  >
                    Y2 Value
                  </label>
                  <select
                    id="y2-value-dropdown"
                    value={selectedY2Value}
                    onChange={(e) => setSelectedY2Value(e.target.value)}
                    className="block appearance-none  mx-1 w-40 bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 hover:border-gray-500 px-1 py-1 rounded shadow leading-tight focus:outline-none focus:shadow-outline dropdown-small"
                  >
                    <option value="" disabled>
                      Select Y2 Value
                    </option>
                    <option>Y2 Value 1</option>
                    <option>Y2 Value 2</option>
                  </select>
                </div>
                <div className="relative flex-grow">
                  <label
                    htmlFor="start-date-input"
                    className="block absolute top-[-7px] left-2 bg-gray-100 dark:bg-gray-800 px-0.5 font-medium text-gray-700 dark:text-gray-300"
                    style={{ fontSize: "10px" }}
                  >
                    Start Date
                  </label>
                  <input
                    id="start-date-input"
                    type="datetime-local"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="block appearance-none mx-1 w-32 bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 hover:border-gray-500 px-1 py-1 rounded shadow leading-tight focus:outline-none focus:shadow-outline dropdown-small"
                  />
                </div>
                <div className="relative flex-grow">
                  <label
                    htmlFor="end-date-input"
                    className="block absolute top-[-7px] left-2 bg-gray-100 dark:bg-gray-800 px-0.5 font-medium text-gray-700 dark:text-gray-300"
                    style={{ fontSize: "10px" }}
                  >
                    End Date
                  </label>
                  <input
                    id="end-date-input"
                    type="datetime-local"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="block appearance-none mx-1 w-32 bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 hover:border-gray-500 px-1 py-1 rounded shadow leading-tight focus:outline-none focus:shadow-outline dropdown-small"
                  />
                </div>

                <button
                  type="submit"
                  className="mx-1 text-sm btn-primary"
                  style={{ marginTop: "-8px", padding: "5px 10px" }}
                >
                  Submit
                </button>
              </form>
            </div>

            <div className=" overflow-y-auto max-w-9xl mx-auto">
              <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Analysis
              </h1>
              <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 mb-4">
                <div  style={{ height: "400px",width:'100%' }}>
                  <Line data={lineChartData} options={lineChartOptions} />
                </div>
              </div>

              {/* Table */}
              <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 mt-4">
                <MonitoringGrid data={data} columns={columns} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AnalysisPage;
