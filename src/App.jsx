import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import Analysis from './pages/Analysis';
import Monitoring from './pages/Monitoring';
import Alarms from './pages/Alarms';
import Footer from './partials/Footer';

function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/analysis" element={<Analysis />} />
        <Route exact path="/Monitoring" element={<Monitoring />} />
        <Route exact path="/alarms" element={<Alarms />} />
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;
