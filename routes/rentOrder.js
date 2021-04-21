const { Movie } = require("../models/movie");
const randomString = require('randomstring');
const PagaConnect = require('paga-connect');
const express = require("express");
const router = express.Router();


// let pagaConnectClient = PagaConnect.Builder()
//     .setClientId("C1CA7F81-383E-4FFD-9317-D96D606502A8")
//     .setSecret("tF5=zpPwyqaC5Vs")
//     .setRedirectUri("http://localhost:3000/rent/getMovie/5f255392f443cee42aa33ed2")
//     .setScope("USER_DEPOSIT_FROM_CARD+MERCHANT_PAYMENT+USER_DETAILS_REQUEST+PAGA_ACCOUNT_NUBAN")
//     .setUserData("FIRST_NAME+LAST_NAME+USERNAME+EMAIL+ACCOUNT_BALANCE")
//     .setIsTest(true)
//     .build();




router.get("/getMovie/:id", async (req, res) => {
    const movie = await Movie.findById(req.params.id).select("-__v");
    if (!movie)
        return res.status(404).send("The movie with the given ID was not found.");
    res.send(movie);
})

router.post("/pay", async (req, res) => {
    
    const { authorizationToken, movieId } = req.body;
    console.log(movieId)
    
    const pagaConnectClient = PagaConnect.Builder()
    .setClientId("9BF570AA-ECCF-4F11-858F-B4108535445F")
    .setSecret("dA5+7yNeHWUP@DB")
    .setRedirectUri(`https://cryptic-fjord-22142.herokuapp.com/rent/getMovie/${movieId}`)
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
    const response = await pagaConnectClient.merchantPayment(accessToken,string,500,"asvsvew13","ZXE3","NGN");
    res.send(response);
})


module.exports = router;