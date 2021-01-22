const mongoose = require('mongoose');
const Joi = require('joi');

const Response = mongoose.model('Response', new mongoose.Schema({
  statusCode: {
    type: Number,
    required: true,
    minlength: 0,
  },
  statusMessage: {
    type: String,
    required: true,
  },
  paymentReference: {
    type: String,
    required: true,
  },
  amount:{
    type: Number,
    required: true
  },
  currency:{
    type: String,
    required: true
  },
  timeStamp:{
    type: Date,
    required: true
  },
  description:{
    type:String,
    required: true
  },
  customerEmail:{
    type:String,
    required: true
  },
  customerPhoneNumber:{
    type:String,
    required: true
  }
}));

function validateResponse(response) {
  const schema = {
    statusCode: Joi.number().required(),
    statusMessage: Joi.string().required(),
    paymentReference: Joi.string().required(),
    amount: Joi.number().required(),
    currency: Joi.string().required(),
    timeStamp: Joi.date().required(),
    description: Joi.string().required(),
    customerEmail: Joi.string().required(),
    customerPhoneNumber: Joi.string().required()
  };

  return Joi.validate(response, schema);
}

exports.Response = Response; 
exports.validator = validateResponse;