import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiEdit } from "react-icons/fi";
 import { Link } from "react-router-dom";
 import { RiDeleteBin5Line } from "react-icons/ri";
import { RiPlayListAddLine } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import * as XLSX from "xlsx";  

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/order");
      console.log("Fetched orders:", response.data);

      if (Array.isArray(response.data)) {
        setOrders(response.data);
      } else {
        console.error("Unexpected response structure:", response.data);
      }
    } catch (error) {
      console.error(
        "Error fetching orders:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      console.error("Invalid order ID:", id);
      return;
    }

    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        console.log("Deleting order with ID:", id);
        await axios.delete(`http://localhost:5000/api/order/${id}`);
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order._id !== id)
        );
        console.log(`Deleted order with ID: ${id}`);
      } catch (error) {
        console.error(
          "Error deleting order:",
          error.response ? error.response.data : error.message
        );
      }
    }
  };

  const handleClearAll = async () => {
    if (window.confirm("Are you sure you want to clear all orders?")) {
      try {
        await axios.delete("http://localhost:5000/api/order");
        setOrders([]);
        console.log("All orders cleared");
      } catch (error) {
        console.error(
          "Error clearing orders:",
          error.response ? error.response.data : error.message
        );
      }
    }
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(orders);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
    XLSX.writeFile(workbook, "orders.xlsx");
  };

  const getStatusStyles = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-200 text-yellow-700 ';
      case 'completed':
        return 'bg-green-200 text-green-700';
      case 'cancelled':
        return 'bg-red-200 text-red-700';
      default:
        return 'bg-gray-200 text-gray-700';
    }
  };

  return (
    <div className="pl-16 py-6">
      <div className="col-span-1 sm:col-span-2 bg-white rounded-md p-5">
        <div className="flex justify-between items-center">
          <h3 className="text-[12px] sm:text-[14px] md:text-[16px] font-bold ">
            Order List
          </h3>
          <Link to="/addOrder">
            <button className=" flex px-4 py-2 mb-2 font-semibold bg-green-200 text-green-600 rounded hover:bg-green-600 hover:text-white transition">
              <div className="py-1 px-2">
                <RiPlayListAddLine />
              </div>
              Add Order
            </button>
          </Link>
        </div>
        <div className="flex justify-end mb-3">
          <button
            onClick={handleClearAll}
            className="flex px-2 py-1 text-black mb-2 border border-black rounded hover:bg-red-600 transition"
          >
            Clear All
            <div className="px-1 py-1"><CiCircleRemove /></div>
          </button>
          <button
            onClick={exportToExcel}
            className="flex px-2 py-1.5 mb-2  ml-2 text-white bg-blue-500 rounded hover:bg-blue-700 transition"
          >
            Export to Excel
          </button>
        </div>
        <div className="overflow-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  DATE
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CUSTOMER NAME
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  PRODUCT NAME
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  PRICE
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  QUANTITY
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  LOCATION
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  STATUS
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody className="bg-white font-semibold divide-y divide-gray-200">
              {orders.map((orderItem) => (
                <tr key={orderItem._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                    {new Date(orderItem.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                    {orderItem.order_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                    {orderItem.c_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                    {orderItem.p_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                    {orderItem.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                    {orderItem.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                    {orderItem.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                    <button
                      className={`px-4 py-1 rounded ${getStatusStyles(
                        orderItem.status
                      )}`}
                    >
                      {orderItem.status}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                    <Link to={`/${orderItem._id}`}>
                      <button className="px-4 py-1 text-xl text-orange-800 rounded">
                        <FiEdit />
                      </button>
                    </Link>
                    <button
                      className="px-2 py-1 text-red-800 text-2xl rounded"
                      onClick={() => handleDelete(orderItem._id)}
                    >
                      <RiDeleteBin5Line />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
