import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        order_id: {
            type: Number,  
            required: true,
         },
         c_name:{
            type: String,
            required: true
         },
        p_name: {
            type: String,
            required: true
        },
        quantity: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        status: {
            type: String,
            default: 'pending'
        },
        date: {
            type: Date,
            default: Date.now  
        }
    },
    {
        timestamps: true
    }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
