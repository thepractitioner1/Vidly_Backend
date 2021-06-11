const Joi = require('joi');
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },

    transactionId: {
        type: String,
        required: true,
        minLength:5
    },

    movieName: {
        type: String,
        required: true
    },
    
    movieGenre: {
        type: String,
        required: true
    },

    orderStatus: {
        type: String,
        required: true
    },

    orderDate: {
        type: Date,
        default: Date.now,
    },
    amount: {
        type: Number,
        required:true
    }
})


const Order = mongoose.model('order', orderSchema);


function validateOrderSchema(order){
    const schema = {
        userId: Joi.string().required(),
        transactionId: Joi.string().min(5).required(),
        movieName: Joi.string().required(),
        movieGenre: Joi.string().required(),
        orderStatus: Joi.string().required(),
        orderDate: Joi.date(),
        amount: Joi.number().required()
    }

    return Joi.validate(order, schema);
}

module.exports.validateOrderSchema = validateOrderSchema;
module.exports.Order =  Order;