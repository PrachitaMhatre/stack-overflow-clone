const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/Cluster0";

module.exports.connect = () => {
  mongoose
    .connect(url)
    .then(() => console.log("MongoDB is connected successfully"))
    .catch((err) => console.log("Error: ", err));
};
