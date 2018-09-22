const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  daily_Rent: {
    type: Number,
    required: true
  },
  notes: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  }
});
//switch this statement to mongoose.model("item", ItemSchema); to mongoose.model("Product", ItemSchema);
module.exports = Product = mongoose.model("Product", ItemSchema);
