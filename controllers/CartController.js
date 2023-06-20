const Cart = require("../models/Cart");
const fs = require("fs");

module.exports.addBooks = async (req, res) => {
  try {
    Cart.uploadedImage(req, res, async (err) => {
      if (err) {
        console.log(`*****Multer Error: ${err}`);
        return res.status(500).json({ error: "Image upload failed." });
      }

      const { title, author, price, totalQty, totalPrice } = req.body;

      const imagePath = req.file.path;

      const newCart = new Cart({
        imageURL: imagePath,
        title,
        author,
        price,
        totalQty,
        totalPrice,
      });

      newCart.save();
      res.status(200).json({
        message: "Successfully added to the cart",
        data: {
          cartItems: newCart,
        },
      });
    });
  } catch (error) {
    console.log(`*****Error: ${error}`);
    res.status(500).json({ error: "An error occurred while adding the book to the cart." });
  }
};

module.exports.getBooks = async (req, res) => {
  try {
    const cartItems = await Cart.find();
    res.status(200).json({
      message: "Successfully retrieved cart items",
      data: {
        cartItems,
      },
    });
  } catch (error) {
    console.log(`*****Error: ${error}`);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving cart items." });
  }
};

module.exports.update = async (req, res) => {
  try {
    const { cartItemId } = req.params;
    const { totalQty } = req.body;

    const updatedCart = await Cart.findByIdAndUpdate(
      cartItemId,
      { totalQty },
      { new: true }
    );

    if (!updatedCart) {
      return res.status(404).json({ error: "Cart item not found." });
    }

    res.status(200).json({
      message: "Successfully updated cart item",
      data: {
        cartItem: updatedCart,
      },
    });
  } catch (error) {
    console.log(`*****Error: ${error}`);
    res
      .status(500)
      .json({ error: "An error occurred while updating the cart item." });
  }
};

module.exports.delete = async (req, res) => {
  try {
    const { cartItemId } = req.params;


    const item = await Cart.findById(cartItemId);

    if (!item) {
      return res.status(404).json({ error: "Item not found." });
    }

    if (item.imageURL) {
      fs.unlinkSync(item.imageURL);
    }


    await Cart.findByIdAndDelete(cartItemId);

    res.status(200).json({ message: "Successfully removed cart item" });
  } catch (error) {
    console.log(`*****Error: ${error}`);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the item." });
  }
};
