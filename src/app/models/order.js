import mongoose from "../db/db";

const orderScheme = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    order_date: {
        type: Date,
        required: true,
        default: Date.now
    },
    total_price: {
        type: Number,
        required: true
    },
    shipping_address: {
        type: String,
        required: true
    },
    ordered_items: [
        {
            product_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    created_at: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.models.Order || mongoose.model('Order', orderScheme);

export default Order;