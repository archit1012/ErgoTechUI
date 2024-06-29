import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logoImg from "../images/logo.jpeg";
import SearchModal from "../components/ModalSearch";
import Notifications from "../components/DropdownNotifications";
import Help from "../components/DropdownHelp";
import UserMenu from "../components/DropdownProfile";
import ThemeToggle from "../components/ThemeToggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleRight,
  faArrowRotateRight,
} from "@fortawesome/free-solid-svg-icons";

function Header({ sidebarOpen, setSidebarOpen }) {
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path) => (currentPath === path ? "active" : "");

  const linkStyle = {
    textDecoration: "none", // Remove underline
    fontSize: "0.85rem",
    color: "#64748b", // Default text color
    padding: "0.5rem 1rem", // Padding for links
    borderBottom: "3px solid transparent", // Transparent border by default
    transition: "border-bottom 0.3s ease, color 0.3s ease", // Smooth transition for color and border
  };

  const activeLinkStyle = {
    color: "rgba(0,191,255,1)", // Active text color
    borderBottom: "3px solid rgba(0,191,255,1)", // Active border color
  };
  const [selectedInterval, setSelectedInterval] = useState("Disabled");

  const handleIntervalChange = (event) => {
    setSelectedInterval(event.target.value);
  };

  const clickRefresh = () => {
    setSelectedInterval("Disabled");
    setTimeout(() => {
      setSelectedInterval(null);
    }, 1000);
  };

  const Options = [
    { name: "2 min", value: 2 * 60 * 1000 },
    { name: "5 min", value: 5 * 60 * 1000 },
    { name: "10 min", value: 10 * 60 * 1000 },
    { name: "15 min", value: 15 * 60 * 1000 },
    { name: "Disabled", value: "Disabled" },
  ];

  return (
    <header
      className="sticky top-0 bg-white dark:bg-[#182235] border-b border-slate-200 dark:border-slate-700 z-30"
      style={{ height: "2.5rem" }}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-full -mb-px">
          <div className="flex items-center space-x-4">
            <button
              className="text-slate-500 hover:text-slate-600 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={(e) => {
                e.stopPropagation();
                setSidebarOpen(!sidebarOpen);
              }}
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>

            <Link
              to="/"
              className={isActive("/") ? "active" : ""}
              style={
                isActive("/") ? { ...linkStyle, ...activeLinkStyle } : linkStyle
              }
            >
              Home
            </Link>
            <Link
              to="/monitoring"
              className={isActive("/monitoring") ? "active" : ""}
              style={
                isActive("/monitoring")
                  ? { ...linkStyle, ...activeLinkStyle }
                  : linkStyle
              }
            >
              Monitoring
            </Link>
            <Link
              to="/alarms"
              className={isActive("/alarms") ? "active" : ""}
              style={
                isActive("/alarms")
                  ? { ...linkStyle, ...activeLinkStyle }
                  : linkStyle
              }
            >
              Alarms
            </Link>
            <Link
              to="/analysis"
              className={isActive("/analysis") ? "active" : ""}
              style={
                isActive("/analysis")
                  ? { ...linkStyle, ...activeLinkStyle }
                  : linkStyle
              }
            >
              Analysis
            </Link>
          </div>

          <div className="flex items-center space-x-3">
            <div>
              <SearchModal
                id="search-modal"
                searchId="search"
                modalOpen={searchModalOpen}
                setModalOpen={setSearchModalOpen}
              />
            </div>

            <ThemeToggle />
            {/* <div className="flex items-center">
              <label htmlFor="interval" className="mr-1 text-sm h-fit">
                Refresh Every
              </label>
              <select
                id="interval"
                value={selectedInterval}
                onChange={handleIntervalChange}
                className="mr-1 h-fit text-sm  bg-white dark:bg-[#182235] border border-gray-300 rounded"
              >
                {Options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>

              <button
                onClick={clickRefresh}
                className="h-fit bg-white text-sm dark:bg-[#182235] text-primary hover:bg-gray-200 rounded p-1"
                title="Refresh the data"
              >
                <FontAwesomeIcon icon={faArrowRotateRight} />
              </button>
            </div> */}
            {/* <hr className="w-px h-6 bg-slate-200 dark:bg-slate-700 border-none" />
            <UserMenu align="right" /> */}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
