const { Movie } = require("../models/movie");
const express = require("express");
const router = express.Router();


router.get("/:id", async(req, res)=>{
    const movie = await Movie.findById(req.params.id).select("-__v");
    if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(movie);
})

module.exports = router