// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const DataSchema = new Schema(
  {
    id: { type: Number, default: 0000, required: true },
    message: { type: String, default: "", required: true },
    signature: { type: String, default: "", required: true }
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Data", DataSchema);