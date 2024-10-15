const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Items = new Schema({
    name: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    imageSrc: {
        type: String,
        required: true
    }
});



module.exports = mongoose.model('Items', Items);
