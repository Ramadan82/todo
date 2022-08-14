const mongoose = require("mongoose");

const { options: connectionParam } = {
  useNewUrlParser: true,
};

const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.a8zi6ab.mongodb.net/auth-tuts?retryWrites=true&w=majority`;

const dbCon = mongoose.connect(url, connectionParam);

module.exports = dbCon;
