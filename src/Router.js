import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './Main';
import Nav from './components/Nav';
import PathFinder from './pages/Pathfinder/PathFinder';
import Subway from './pages/Subway/Subway';
import Bus from './pages/Bus/Bus';
import BusStationInfo from './pages/Bus/components/station/BusStationInfo';
import BusRouteInfo from './pages/Bus/components/route/BusRouteInfo';

const Router = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/pathfinder" element={<PathFinder />} />
        <Route path="/bus" element={<Bus />} />
        <Route path="/bus/route" element={<BusRouteInfo />} />
        <Route path="/bus/station" element={<BusStationInfo />} />
        <Route path="/subway" element={<Subway />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
