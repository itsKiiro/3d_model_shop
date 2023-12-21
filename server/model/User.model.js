const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
        
    },
    cart: {
        type: Array,
        default: []
    },
    bought_items: {
        type: Array,
        default: []
    }

}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
