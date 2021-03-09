const mongoose = require('mongoose');
const Joi = require('joi');

const Response = mongoose.model('Response', new mongoose.Schema({
  statusCode: {
    type: Number,
    minlength: 0,
  },
  statusMessage: {
    type: String,
   
  },
  errorCategory: {
    type: String,
  },
  paymentReference: {
    type: String,
    
  },
  amount:{
    type: Number,
  
  },
  currency:{
    type: String,
  
  },
  timeStamp:{
    type: Date,
 
  },
  description:{
    type:String,
  
  },
  customerEmail:{
    type:String,
    
  },
  customerPhoneNumber:{
    type:String,

  },
  
}));

function validateResponse(response) {
  const schema = {
    statusCode: Joi.number(),
    statusMessage: Joi.string(),
    errorCategory: Joi.string(),
    paymentReference: Joi.string(),
    amount: Joi.number(),
    currency: Joi.string(),
    timeStamp: Joi.date(),
    description: Joi.string(),
    customerEmail: Joi.string().required(),
    customerPhoneNumber: Joi.string(),
  };

  return Joi.validate(response, schema);
}

exports.Response = Response; 
exports.validator = validateResponse;