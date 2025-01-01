import React from 'react';

import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import DashBoardPage from './pages/DashBoardPage';
import OrderPage from './pages/OrderPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/order" exact Component={OrderPage}/>
        <Route path="/dashboard" exact Component={DashBoardPage}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
