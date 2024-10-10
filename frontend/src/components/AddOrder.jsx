import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddOrder = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        c_name: '',
        p_name: '',
        quantity: '',
        price: '',
        location: '',
        status: 'pending',
        date: new Date().toISOString().slice(0, 10)
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const postItemDetails = async (formData) => {
        const response = await fetch('http://localhost:5000/api/order', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(formData),  
        });
    
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Error: ${response.status} - ${errorMessage}`);
        }
    
        const data = await response.json();
        return data;
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
 
        try {
            const { message } = await postItemDetails(  formData);
            console.log('Response Message:', message);
            setFormData({
                c_name: '',
                p_name: '',
                quantity: '',
                price: '',
                location: '',
                status: 'pending',
                date: new Date().toISOString().slice(0, 10),
            });  
            navigate('/');
        } catch (err) {
            console.error('Error:', err);
            setError(err.message);
        }
    };
    

    return (
        <div className="p-7 md:p-16  rounded-xl">
            <form onSubmit={handleSubmit} className='mb-2 p-8 bg-gray-200 shadow-md rounded-md'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <div>
                        <label htmlFor="c_name" className="block font-semibold mb-1">Customer Name</label>
                        <input
                            id="c_name"
                            name="c_name"
                            type="text"
                            placeholder="Enter Customer Name"
                            value={formData.c_name}
                            onChange={handleChange}
                            className="w-full border rounded p-2  "
                        />
                    </div>
                    <div>
                        <label htmlFor="p_name" className="block mb-1 font-semibold">Product Name</label>
                        <input
                            id="p_name"
                            name="p_name"
                            type="text"
                            placeholder="Enter Product Name"
                            value={formData.p_name}
                            onChange={handleChange}
                            className="w-full border rounded p-2  "
                        />
                    </div>
                    <div>
                        <label htmlFor="quantity" className="block mb-1 font-semibold">Quantity</label>
                        <input
                            id="quantity"
                            name="quantity"
                            type="number"
                            placeholder="Quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            className="w-full border rounded p-2  "
                        />
                    </div>
                    <div>
                        <label htmlFor="price" className="block mb-1 font-semibold">Price</label>
                        <input
                            id="price"
                            name="price"
                            type="number"
                            placeholder="Price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full border rounded p-2  "
                        />
                    </div>
                    <div>
                        <label htmlFor="location" className="block mb-1 font-semibold">Location</label>
                        <input
                            id="location"
                            name="location"
                            type="text"
                            placeholder="Enter Location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full border rounded p-2  "
                        />
                    </div>
                    <div>
                        <label htmlFor="status" className="block mb-1 font-semibold">Status</label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full border rounded p-2  "
                        >
                             <option value="pending">Pending</option>
                             <option value="canceled">Delivered</option>
                            <option value="pending">Cancelled</option>

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
                            className="w-full border rounded p-2 "
                        />
                    </div>
                </div>
                <div className="mt-7">
                    <button className="px-4 py-1 bg-[#3dc0c1] text-white rounded" type="submit">Save</button>
                </div>
                {error && <div className="text-red-500 mt-3">{error}</div>}
            </form>
        </div>
    );
};

export default AddOrder;
