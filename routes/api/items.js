const express = require("express");
const router = express.Router();

// connect with controller - product controller folder
const productController = require("../../controllers/productController")

// @route   GET api/items
// @desc    Get All Items

router.route("/")
    .get(productController.findAll)
    .post(productController.create)

//matches with route("api/items/:id")
router
    .route("/:id")
    .get(productController.findById)
    .put(productController.update)
    .delete(productController.remove);

// @route   POST api/items
// @desc    Create An Item

// router.post("/", (req, res) => {
//   const newItem = new Item({
//     name: req.body.name,
//     description: req.body.description,
//     daily_Rent: req.body.daily_Rent
//   });

//   newItem.save().then(item => res.json(item));
// });

// router.delete("/:id", (req, res) => {
//   Item.findById(req.params.id)
//     .then(item => item.remove().then(() => res.json({ success: true })))
//     .catch(err => res.status(404).json({ success: false }));
// });

module.exports = router;
