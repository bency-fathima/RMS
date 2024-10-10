import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditOrder = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        c_name: '',
        p_name: '',
        quantity: '',
        price: '',
        location: '',
        status: 'pending',
        date: new Date().toISOString().slice(0, 10),
    });

    useEffect(() => {
        if (id) {
            console.log(`Fetching order details for ID: ${id}`);
            fetchOrderDetails(id);
        }
    }, [id]);

    const fetchOrderDetails = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/order/${id}`);
            console.log('API Response:', response.data);  
    
            if (response.data) {
                const orderData = response.data;
                setFormData({
                    c_name: orderData.c_name || '',
                    p_name: orderData.p_name || '',
                    quantity: orderData.quantity || 1,
                    price: orderData.price || '',
                    location: orderData.location || '',
                    status: orderData.status || 'pending',
                    date: orderData.date || new Date().toISOString().slice(0, 10),
                });
            } else {
                setError('Order data is not available.');
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/api/order/${id}`, formData);
            console.log('Order updated:', response.data);
            navigate('/franchise/items');
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        }
    };

    return (
        <div className="p-7 md:p-16 bg-white rounded-xl">
            {loading ? (
                <div>Loading...</div>
            ) : (
                <form onSubmit={handleSubmit} className="mb-2 p-8 bg-gray-200 shadow-md rounded-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label htmlFor="c_name" className="block mb-1 font-semibold">Customer Name</label>
                            <input
                                id="c_name"
                                name="c_name"
                                type="text"
                                placeholder="Enter customer name"
                                value={formData.c_name}
                                onChange={handleChange}
                                className="w-full border rounded p-2 "
                            />
                        </div>
                        <div>
                            <label htmlFor="p_name" className="block mb-1 font-semibold">Product Name</label>
                            <input
                                id="p_name"
                                name="p_name"
                                type="text"
                                placeholder="Enter product name"
                                value={formData.p_name}
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="quantity" className="block mb-1 font-semibold">Quantity</label>
                            <input
                                id="quantity"
                                name="quantity"
                                type="number"
                                placeholder="Enter quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="price" className="block mb-1 font-semibold">Price</label>
                            <input
                                id="price"
                                name="price"
                                type="number"
                                placeholder="Enter price"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="location" className="block mb-1 font-semibold">Location</label>
                            <input
                                id="location"
                                name="location"
                                type="text"
                                placeholder="Enter location"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="status" className="block mb-1 font-semibold">Status</label>
                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                            >
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="date" className="block mb-1 font-semibold">Date</label>
                            <input
                                id="date"
                                name="date"
                                type="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                            />
                        </div>
                    </div>
                    <div className="mt-7">
                        <button className="px-4 py-1 bg-[#3dc0c1] text-white rounded" type="submit">Save</button>
                    </div>
                    {error && <div className="text-red-500 mt-3">{error}</div>}
                </form>
            )}
        </div>
    );
};

export default EditOrder;
