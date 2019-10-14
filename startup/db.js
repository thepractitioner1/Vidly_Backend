const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = function () {
  const db = "mongodb+srv://misan:1234@cluster0-34d9x.mongodb.net/test?retryWrites=true&w=majority"
  mongoose.connect(db)
    .then(() => winston.info(`Connected to ${db}...`));
}