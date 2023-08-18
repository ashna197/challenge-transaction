import mongoose from "mongoose";

(function () {
  mongoose.connect(
    "mongodb://localhost:27017/transactionDetails_DB",
    {},
    (err) => {
      if (err) console.log("error is detected");
      else console.log("connection is made successfully");
    }
  );
})();
