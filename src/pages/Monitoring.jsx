import React, { useState, useMemo, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import Header from "../partials/Header"; // Import the Header component
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

const MonitoringPage = () => {
  // State for LineChart
  const lineChartData = {
    labels: [
      "2024-01-01",
      "2024-02-01",
      "2024-03-01",
      "2024-04-01",
      "2024-05-01",
      "2024-06-01",
      "2024-07-01",
    ],
    datasets: [
      {
        label: "My Dataset",
        data: [65, 71, 62, 81, 34, 55, 47],
        borderColor: "rgba(0,191,255,1)",
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const lineChartOptions = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "month",
          tooltipFormat: "ll",
          displayFormats: {
            month: "MMM YYYY",
          },
        },
        title: {
          display: true,
          text: "Date",
          font: {
            size: 10,
          },
        },

        ticks: {
          source: "labels",
          font: {
            size: 10,
          },
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Value",
          font: {
            size: 10,
          },
        },
        ticks: {
          font: {
            size: 10,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          // This more specific font property overrides the global property
          font: {
            size: 11,
          },
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  // State for dropdown values
  const [home, setHome] = useState("Home 1");
  const [device, setDevice] = useState("Device 1");
  const [sensor, setSensor] = useState("Sensor 1");
  const [date, setDate] = useState("");
  const [formData, setFormData] = useState({
    home: "",
    device: "",
    sensor: "",
    dateTime1: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  // State for theme mode
  const [darkMode, setDarkMode] = useState(false);

  const handleApply = () => {
    // Apply button logic
    console.log("Applied!");
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  const formStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
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
    <div
      className={`flex flex-col h-screen overflow-y-auto bg-gray-100 dark:bg-gray-900`}
    >
      <Header />
      <main className="flex-grow">
        <div className="p-4 header-small header-text">
          <div className="px-4 sm:px-6 lg:px-2 py-2  overflow-x-auto w-full max-w-9xl mx-auto ">
            <form onSubmit={handleSubmit} style={formStyle}>
              <div className="relative flex-grow ">
                <label
                  htmlFor="profile-dropdown"
                  className="block absolute top-[-7px] left-2 bg-gray-100 dark:bg-gray-800 px-0.5 font-medium text-gray-700 dark:text-gray-300"
                  style={{ fontSize: "10px" }}
                >
                  Home
                </label>
                <select
                  id="home"
                  name="home"
                  value={formData.home}
                  onChange={handleChange}
                  className="block appearance-none w-32 bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 hover:border-gray-500 px-1 py-1 rounded shadow leading-tight focus:outline-none focus:shadow-outline dropdown-small"
                >
                  <option value="" disabled>
                    Home
                  </option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </select>
              </div>

              <div className="relative flex-grow">
                <label
                  htmlFor="profile-dropdown"
                  className="block absolute top-[-7px] left-2 bg-gray-100 dark:bg-gray-800 px-0.5 font-medium text-gray-700 dark:text-gray-300"
                  style={{ fontSize: "10px" }}
                >
                  Device
                </label>
                <select
                  id="device"
                  name="device"
                  value={formData.device}
                  onChange={handleChange}
                  className="block appearance-none w-32 bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 hover:border-gray-500 px-1 py-1 rounded shadow leading-tight focus:outline-none focus:shadow-outline dropdown-small"
                >
                  <option value="" disabled>
                    Device
                  </option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </select>
              </div>
              <div className="relative flex-grow">
                <label
                  htmlFor="profile-dropdown"
                  className="block absolute top-[-7px] left-2 bg-gray-100 dark:bg-gray-800 px-0.5 font-medium text-gray-700 dark:text-gray-300"
                  style={{ fontSize: "10px" }}
                >
                  Sensor1
                </label>
                <select
                  id="sensor"
                  name="sensor"
                  value={formData.sensor}
                  onChange={handleChange}
                  className="block appearance-none w-32 bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 hover:border-gray-500 px-1 py-1 rounded shadow leading-tight focus:outline-none focus:shadow-outline dropdown-small"
                >
                  <option value="" disabled>
                    Sensor1
                  </option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </select>
              </div>
              <div className="relative flex-grow">
                <label
                  htmlFor="date"
                  className="block absolute top-[-7px] left-2 bg-gray-100 dark:bg-gray-800 px-0.5 font-medium text-gray-700 dark:text-gray-300"
                  style={{ fontSize: "10px" }}
                >
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="block appearance-none bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 hover:border-gray-500 px-1 py-1 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="mx-1 text-sm btn-primary"
                  style={{ marginTop: "4px", padding: "5px 10px" }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>

          <div className="overflow-y-auto max-w-9xl mx-auto ">
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Monitoring
            </h1>
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4">
              <div style={{ height: "400px", width: "100%" }}>
                <Line data={lineChartData} options={lineChartOptions} />
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 mt-4">
              <MonitoringGrid data={data} columns={columns} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MonitoringPage;
