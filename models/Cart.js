const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const IMAGE_PATH = path.join("/uploads/image");

const cartSchema = new mongoose.Schema(
  {
    imageURL: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    totalQty: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", IMAGE_PATH));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

cartSchema.statics.uploadedImage = multer({ storage: storage }).single(
  "imageURL"
);
cartSchema.statics.imagePath = IMAGE_PATH;

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;