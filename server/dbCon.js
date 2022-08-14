const mongoose = require("mongoose");

const { options: connectionParam } = {
  useNewUrlParser: true,
};

const dbCon = mongoose.connect(process.env.URI, connectionParam);

module.exports = dbCon;
