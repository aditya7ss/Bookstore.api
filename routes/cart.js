const express = require("express");
const router = express.Router();
const passport = require("passport");

const CartController = require("../controllers/CartController");

router.post(
  "/addBooks",
  passport.authenticate("jwt", { session: false }),
  CartController.addBooks
);

router.get(
  "/getBooks",
  passport.authenticate("jwt", { session: false }),
  CartController.getBooks
);

router.put(
  "/update/:cartItemId",
  passport.authenticate("jwt", { session: false }),
  CartController.update
);

router.delete(
  "/delete/:cartItemId",
  passport.authenticate("jwt", { session: false }),
  CartController.delete
);
module.exports = router;