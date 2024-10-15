const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const checkout = new Schema({
    name: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true,
        unique: true
    },
    quantity:{
        type: String,
        required: true,
    },
    total: {
        type: String,
        required: true
    },
});



module.exports = mongoose.model('checkout', checkout);
