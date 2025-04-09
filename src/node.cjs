const Razorpay = require("razorpay");
const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

app.use(cors()); 
app.use(bodyParser.json());


const razorpay = new Razorpay({
    key_id: 'rzp_test_ZEhdI4PadvIIKN',
    key_secret: 'uyNxOkDYzoEgg5SuIUQ1oWZ7' 
});


app.post('/create-order', async (req, res) => {
    const options = {
        amount: req.body.amount, 
        currency: 'INR',
        receipt: 'receipt#1',
        payment_capture: 1
    };

    try {
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).send('Error creating order');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
