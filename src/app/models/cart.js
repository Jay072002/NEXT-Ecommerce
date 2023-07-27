import mongoose from "../db/db";

const cartScheme = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
            product_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],
    created_at: {
        type: Date,
        default: Date.now
    }
});

const Cart = mongoose.models.Cart || mongoose.model('Cart', cartScheme);

export default Cart;