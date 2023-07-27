import mongoose from "../db/db";

const productScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const Product = mongoose.models.Product || mongoose.model('Product', productScheme);

export default Product;