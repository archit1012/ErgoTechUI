import React, { useEffect, useState, useMemo } from "react";
import Header from "../partials/Header"; // Adjust the import path as necessary
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

const Alarms = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tabelData, setTableData] = useState([]);

  const fetchPieChartData = async () => {
    try {
      const res = await fetch(
        "https://run.mocky.io/v3/d1b26ab3-c53d-470f-850d-46612159ef31"
      );
      if (res.ok) {
        console.log(res);
        const data = await res.json();
        console.log("first");
        console.log(data);
        setTableData(data);
      } else {
        throw Error("Oops something went wrong!");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchPieChartData();
  }, []);

  const [formData, setFormData] = useState({
    assets: "",
    profile: "",
    device: "",
    deviceCategory: "",
    severity: "",
    status: "",
    dateTime1: "",
    dateTime2: "",
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

  const formStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  };

  // Sample data and columns for the grid component
  const data = [
    {
      assetId: "12345",
      // customerDeviceName: "Device 1",
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

  const [selected, setSelected] = useState("");
  const handleSelectChange = (e) => {
    setSelected(e.target.value);
  };
  // const columns = [
  //   { Header: "Asset Id", accessor: "assetId" },
  //   { Header: "Customer Device Name", accessor: "customerDeviceName" },
  //   { Header: "Customer Id", accessor: "customerId" },
  //   { Header: "Device Category", accessor: "deviceCategory" },
  //   { Header: "Device Location", accessor: "deviceLocation" },
  //   { Header: "Device Name", accessor: "deviceName" },
  //   { Header: "Device Id", accessor: "deviceId" },
  //   { Header: "Data", accessor: "data" },
  //   { Header: "Measurement", accessor: "measurement" },
  //   { Header: "Variable Name", accessor: "variableName" },
  //   { Header: "Variable Unit", accessor: "variableUnit" },
  //   { Header: "Sensor Time", accessor: "sensorTime" },
  // ];

  const columns = [
    { Header: "column 1", accessor: "column1" },
    { Header: "column 2", accessor: "column2" },
    { Header: "column 3", accessor: "column3" },
    { Header: "column 4", accessor: "column4" },
    { Header: "column 5", accessor: "column5" },
    { Header: "column 6", accessor: "column6" },
    { Header: "column 7", accessor: "column7" },
    { Header: "column 8", accessor: "column8" },
    { Header: "column 9", accessor: "column9" },
    { Header: "column 10", accessor: "column10" },
  ];

  return (
    <div className="flex flex-col min-h-screen overflow-y-auto bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <main className="flex-grow">
        {/* <div className="  py-3 overflow-x-auto  w-full max-w-9xl mx-auto sm:px-6  lg:px-2 ">
          <form onSubmit={handleSubmit} style={formStyle}>

            <div className="relative flex-grow">
              <label
                htmlFor="profile-dropdown"
                className="block absolute top-[-7px] left-4 bg-gray-100 dark:bg-gray-800 px-0.5 font-medium text-gray-700 dark:text-gray-300"
                style={{ fontSize: "10px" }}
              >
                Assets
              </label>
              <select
                id="assets"
                name="assets"
                value={formData.assets}
                onChange={handleChange}
                className="block appearance-none mx-2 w-32 bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 hover:border-gray-500 px-1 py-1 rounded shadow leading-tight focus:outline-none focus:shadow-outline dropdown-small"
              >
                <option value="" disabled>
                  Assets
                </option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>
            <div className="relative flex-grow">
              <label
                htmlFor="profile"
                className="block absolute top-[-7px] left-4 bg-gray-100 dark:bg-gray-800 px-0.5 font-medium text-gray-700 dark:text-gray-300"
                style={{ fontSize: "10px" }}
              >
                Profile
              </label>
              <select
                id="profile"
                name="profile"
                value={formData.profile}
                onChange={handleChange}
                className="block appearance-none  mx-2 w-32 bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 hover:border-gray-500 px-1 py-1 rounded shadow leading-tight focus:outline-none focus:shadow-outline dropdown-small"
              >
                <option value="" disabled>
                  Profile
                </option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>
            <div className="relative flex-grow">
              <label
                htmlFor="device"
                className="block absolute top-[-7px] left-4 bg-gray-100 dark:bg-gray-800 px-0.5 font-medium text-gray-700 dark:text-gray-300"
                style={{ fontSize: "10px" }}
              >
                Device
              </label>
              <select
                id="device"
                name="device"
                value={formData.device}
                onChange={handleChange}
                className="block appearance-none mx-2 w-32 bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 hover:border-gray-500 px-1 py-1 rounded shadow leading-tight focus:outline-none focus:shadow-outline dropdown-small"
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
                htmlFor="deviceCategory"
                className="block absolute top-[-7px] left-4 bg-gray-100 dark:bg-gray-800 px-0.5 font-medium text-gray-700 dark:text-gray-300"
                style={{ fontSize: "10px" }}
              >
                Device Category
              </label>
              <select
                id="deviceCategory"
                name="deviceCategory"
                value={formData.deviceCategory}
                onChange={handleChange}
                className="block appearance-none mx-2 w-40 bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 hover:border-gray-500 px-1 py-1 rounded shadow leading-tight focus:outline-none focus:shadow-outline dropdown-small"
              >
                <option value="" disabled>
                  Device Category
                </option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>

            <div className="relative flex-grow">
              <label
                htmlFor="severity"
                className="block absolute top-[-7px] left-4 bg-gray-100 dark:bg-gray-800 px-0.5 font-medium text-gray-700 dark:text-gray-300"
                style={{ fontSize: "10px" }}
              >
                Severity
              </label>
              <select
                id="severity"
                name="severity"
                value={formData.severity}
                onChange={handleChange}
                className="block appearance-none mx-2 w-32 bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 hover:border-gray-500 px-1 py-1 rounded shadow leading-tight focus:outline-none focus:shadow-outline dropdown-small"
              >
                <option value="" disabled>
                  Severity
                </option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>

            <div className="relative px-2 flex-grow">
              <label
                htmlFor="status"
                className="block absolute top-[-7px] left-4 bg-gray-100 dark:bg-gray-800 px-0.5 font-medium text-gray-700 dark:text-gray-300"
                style={{ fontSize: "10px" }}
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="block appearance-none w-32 mx-2 bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 hover:border-gray-500 px-1 py-1 rounded shadow leading-tight focus:outline-none focus:shadow-outline dropdown-small"
              >
                <option value="" disabled>
                  Status
                </option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>

            <div className="relative  top-[-4.5px] flex-grow">
              <label
                htmlFor="dateTime1"
                className="block absolute top-[-7px] left-4 bg-gray-100 dark:bg-gray-800 px-0.5 font-medium text-gray-700 dark:text-gray-300"
                style={{ fontSize: "10px" }}
              >
                Date Time 1
              </label>
              <input
                type="datetime-local"
                id="dateTime1"
                name="dateTime1"
                value={formData.dateTime1}
                onChange={handleChange}
                className="block appearance-none bg-white mx-2 dark:bg-gray-800 border border-gray-400 dark:border-gray-700 hover:border-gray-500 px-1 py-1 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="relative flex-grow top-[-4.5px]">
              <label
                htmlFor="dateTime2"
                className="block absolute top-[-7px] left-4 bg-gray-100 dark:bg-gray-800 px-0.5 font-medium text-gray-700 dark:text-gray-300"
                style={{ fontSize: "10px" }}
              >
                Date Time 2
              </label>
              <input
                type="datetime-local"
                id="dateTime2"
                name="dateTime2"
                value={formData.dateTime2}
                onChange={handleChange}
                className="block appearance-none mx-2 bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 hover:border-gray-500 px-1 py-1 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <button
              type="submit"
              className="mx-1 top-[-15px] text-sm btn-primary"
              style={{ marginTop: "-8px", padding: "5px 10px" }}
            >
              Submit
            </button>
          </form>
        </div> */}

        {/* Monitoring Grid */}
        <div className="overflow-y-auto max-w-9xl  mx-auto">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Alarm Data
          </h1>
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 mt-4  ">
            <MonitoringGrid data={tabelData} columns={columns} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Alarms;
