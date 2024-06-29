import React, { useState, useEffect } from "react";
import logoImg from "../images/logo.jpeg";

const Footer = () => {
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="fixed bottom-0 w-full flex justify-end items-center text-xs  bg-white dark:bg-black border-t z-10 border-gray-200 shadow-md">
      <p className="mx-1">Current Time: {currentTime}</p>
      <p className="mx-2">Language: English</p>
      {/* <img src={logoImg} alt="Logo" className="w-28" /> */}
      {/* <div className="mx-2">
        <label className="form-check-label">
          <input
            type="checkbox"
            className="form-check-input"
            checked={isDarkMode}
            onChange={handleThemeToggle}
          />
          {isDarkMode ? "Dark" : "Light"}
        </label>
      </div> */}
    </div>
  );
};

export default Footer;
