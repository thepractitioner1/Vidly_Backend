const { createPaymentRequest, getOrderStatus } = require("../services/paymentService")
const auth = require("../middleware/auth");
const { Movie } = require("../models/movie");
const randomString = require('randomstring');
const PagaConnect = require('paga-connect');
const express = require("express");
const { User } = require("../models/user");
const { Order, validateOrderSchema } = require("../models/order");
const router = express.Router();


router.get("/getMovie/:id", async (req, res) => {
    const movie = await Movie.findById(req.params.id).select("-__v");
    if (!movie)
        return res.status(404).send("The movie with the given ID was not found.");
    res.send(movie);
})


router.post("/createPaymentRequest", auth, async (req, res) => {
    const { name, phoneNumber, email, paymentMethod, movieId } = req.body;
    const movie = await Movie.findById(movieId);
    const result = await createPaymentRequest(movie.dailyRentalRate, name, phoneNumber, email, paymentMethod);
    if (result.error) {
        return res.status(400).send("An error occured. Please contact customer service");
    }
    const { referenceNumber, requestAmount } = result.response

   
    const user = await User.findById(req.user._id);

    const order = new Order({
        userId: user._id,
        transactionId: referenceNumber,
        movieName: movie.title,
        movieGenre: movie.genre.name,
        orderStatus: "PENDING",
        amount: requestAmount
    })

    // console.log(order);

    // const {error} = validateOrderSchema(order);
    // if (error) return res.status(400).send(error.details[0].message);

   const orderDetails =  await order.save();
    const resposneData = {
        result,
        orderId: orderDetails._id
    }

    res.send(resposneData)
})

router.get("/getOrdersbyCustomer", auth, async (req, res) => {
    const orders = await Order.find({ userId: req.user._id }).select("-__v")
    if (!orders) return res.status(404).send("This customer currently has 0 orders.");
    res.send(orders);

})

router.get("/getOrderStatus/:id", auth, async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).send("The order with the given ID was not found.");
    let data = {
        referenceNumber: order.transactionId
      }
    const statusResult = await getOrderStatus(data);
    res.send(statusResult);
})

router.post("/pay", async (req, res) => {

    const { authorizationToken, movieId } = req.body;
    console.log(movieId)

    const pagaConnectClient = PagaConnect.Builder()
        .setClientId("A6C42F91-ABCB-412F-B65D-AF0871F86604")
        .setSecret("dA2=3#esvJvs7b+")
        .setRedirectUri(`http://localhost:3000/rent/getMovie/${movieId}`)
        .setScope("USER_DEPOSIT_FROM_CARD+MERCHANT_PAYMENT+USER_DETAILS_REQUEST+PAGA_ACCOUNT_NUBAN")
        .setUserData("FIRST_NAME+LAST_NAME+USERNAME+EMAIL+ACCOUNT_BALANCE")
        .setIsTest(true)
        .build();

    async function getAccessToken(authorizationToken) {
        const response = await pagaConnectClient.getAccessToken(authorizationToken);
        console.log(response);
        return response.result.access_token;
    }


    const string = randomString.generate();
    const accessToken = await getAccessToken(authorizationToken);
    console.log(accessToken);
    const response = await pagaConnectClient.merchantPayment(accessToken, string, 500, "asvsvew13", "ZXE3", "NGN");
    res.send(response);
})


module.exports = router;