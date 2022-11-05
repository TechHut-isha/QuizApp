const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const resultSchema = new Schema({
  score: {
    type: String,
    required: true,
  },
});

const result = mongoose.model("result", resultSchema);

module.exports = result;