const express = require('express');
const router = express.Router();

const { signupSchema, loginSchema } = require("../Validators/auth-validator"); 
const validate = require("../middlewares/validate-middleware");

const authController = require("../controllers/auth-controller");

router.route("/home").get(authController.Home);
router.route("/register").post(validate(signupSchema), authController.Register);
router.route("/login").post(validate(loginSchema), authController.LogIn);
module.exports = router;