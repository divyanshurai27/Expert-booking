const express = require("express");
const router = express.Router();

const {
  getExperts,
  getExpertById,
  createExpert
} = require("../controllers/expresscontrolers");

router.post("/", createExpert);   // create expert
router.get("/", getExperts);      // get all experts
router.get("/:id", getExpertById); // get single expert

module.exports = router;