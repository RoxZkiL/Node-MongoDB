const express = require("express");
const router = express.Router();

const { signup, signin, signout } = require("../controllers/auth");
const { userSignupValidator } = require("../validator/index");

// Routes
router.post("/singup", userSignupValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);

module.exports = router;
