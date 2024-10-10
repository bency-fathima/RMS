import React from "react";
import { FaDatabase } from "react-icons/fa";

const StatusCards = ({ totalEarnings, totalOrders, totalCustomers }) => {
  return (
    
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 px-16">
      <div className="flex bg-white shadow-md rounded-lg p-6">
        <FaDatabase className="text-green-800 text-[25px] mt-4 m-4" />
        <div>
          <p className="text-2xl font-bold text-green-600 mt-2">
            ${totalEarnings}
          </p>

          <h2 className="text-md text-gray-400 font-semibold">
            Total Earnings
          </h2>
        </div>
      </div>

      <div className="flex bg-white shadow-md rounded-lg p-6">
        <FaDatabase className="text-green-800 text-[25px] mt-4 m-4" />
        <div>
          <p className="text-2xl font-bold text-blue-600 mt-2">{totalOrders}</p>

          <h2 className="text-md text-gray-400 font-semibold">Total Orders</h2>
        </div>
      </div>

      <div className="flex bg-white shadow-md rounded-lg p-6">
        <FaDatabase className="text-green-800 text-[25px] mt-4 m-4" />
        <div>
          <p className="text-2xl font-bold text-orange-600 mt-2">
            {totalCustomers}
          </p>

          <h2 className="text-md  text-gray-400 font-semibold">Total Customers</h2>
        </div>
      </div>
      <div className="flex bg-white shadow-md rounded-lg p-6">
        <FaDatabase className="text-green-800 text-[25px] mt-4 m-4" />
        <div>
          <p className="text-2xl font-bold text-orange-600 mt-2">
            {totalCustomers}
          </p>

          <h2 className="text-md text-gray-400 font-semibold">Total Revenue</h2>
        </div>
      </div>
    </div>
  );
};

export default StatusCards;
