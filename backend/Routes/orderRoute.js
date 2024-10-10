import express from 'express';
import Order from '../Models/orderModel.js';  

const router = express.Router();

 router.post('/', async (req, res) => {
    try {
         let lastOrder = await Order.findOne().sort({ order_id: -1 });
        let id;

         id = lastOrder && lastOrder.order_id ? lastOrder.order_id + 1 : 1;

         

         const newOrder = {
            order_id: id,  
            c_name: req.body.c_name,
            p_name: req.body.p_name,
            quantity: req.body.quantity,
            price: req.body.price,
            location: req.body.location,
            status: req.body.status || 'pending',  
            date: req.body.date || Date.now()  
        };

         const order = await Order.create(newOrder);
        return res.status(201).send(order);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message: error.message
        });
    }
});

 
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find();
        console.log('Fetched orders:', orders); // Log the fetched orders
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

 router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({
                message: 'Order not found'
            });
        }

        return res.status(200).json(order);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message: error.message
        });
    }
});

 router.put('/:id', async (req, res) => {
    try {
        if (
            !req.body.c_name ||
            !req.body.p_name ||
            !req.body.quantity ||
            !req.body.price ||
            !req.body.location
        ) {
            return res.status(400).send({
                message: 'Please send all required fields: c_name,p_name, quantity, price, location',
            });
        }

        const { id } = req.params;
        const updatedOrder = await Order.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({
                message: 'Order not found'
            });
        }

        return res.status(200).send({ message: 'Order updated successfully', data: updatedOrder });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message: error.message
        });
    }
});

 router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Order.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({
                message: 'Order not found'
            });
        }

        return res.status(200).send({ message: 'Order deleted successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message: error.message
        });
    }
});

router.delete('/', async (req, res) => {
    try {
        const result = await Order.deleteMany({});  

        return res.status(200).send({
            message: `${result.deletedCount} orders deleted successfully`,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message: error.message,
        });
    }
});

export default router;  
