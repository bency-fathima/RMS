import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import AddOrder from './components/AddOrder';
import EditOrder from './components/EditOrder';
import OrderList from './components/orderList';
  
const App = () => {
    

    return (
        <BrowserRouter>
            <Routes>
                 <Route path="/" element={<Dashboard />}>
                    <Route index element={<Home/>} />
                </Route>
                <Route path="*" element={<Navigate to="/" />} />
                <Route path='/orderlist' element={<OrderList/>}/>
                <Route path='/order-list' element={<OrderList/>}/>

                <Route path='/addOrder' element={<AddOrder/>}/>
                <Route path='/:id' element={<EditOrder/>}/>

            </Routes>
        </BrowserRouter>
    );
};

export default App;
