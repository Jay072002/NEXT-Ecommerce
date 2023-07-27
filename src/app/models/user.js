import mongoose from "../db/db";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    profile_picture: {
        type: String,
        required: false,
        default: null
    },
    password: {
        type: String,
        required: true
    },
    shipping_address: {
        type: String,
        required: true
    },
    phone_number: {
        type: Number,
        required: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;