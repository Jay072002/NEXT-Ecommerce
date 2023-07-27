import mongoose from "../db/db";

const categoryScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const Category = mongoose.models.Category || mongoose.model('Category', categoryScheme);

export default Category;