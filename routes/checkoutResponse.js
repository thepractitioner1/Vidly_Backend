const express = require("express");
const {Response,validator} = require("../models/checkoutResponse");
const router = express.Router();


router.get("/", async(req, res)=>{
    const webhookResponse =  await Response.find();
    res.send(webhookResponse);
})

router.post("/", async(req, res)=>{
    const {error} = validator(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const response = new Response({
        statusCode: req.body.statusCode,
        statusMessage: req.body.statusMessage,
        paymentReference: req.body.paymentReference,
        amount: req.body.amount,
        currency: req.body.currency,
        timeStamp: req.body.timeStamp,
        description: req.body.description,
        customerEmail: req.body.customerEmail,
        customerPhoneNumber: req.body.customerPhoneNumber,
        errorCategory: req.body.errorCategory
    })
    await response.save();
    res.send(response);
})

module.exports = router;