const express = require("express");

const {getSliders, deleteSlider} = require("../controllers/slider");

const router = express.Router();

router.get("/", getSliders);
router.delete("/:id", deleteSlider);

module.exports = router;