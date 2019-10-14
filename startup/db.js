const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = function () {
  const db = "mongodb://misan:1234@cluster0-shard-00-00-34d9x.mongodb.net:27017,cluster0-shard-00-01-34d9x.mongodb.net:27017,cluster0-shard-00-02-34d9x.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"
  mongoose.connect(db)
    .then(() => winston.info(`Connected to ${db}...`));
}