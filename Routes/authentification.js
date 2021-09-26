const express=require('express');
const router=express.Router();

const authController=require('../controllers/authentificationController')
router.post("/signUp",authController.registerUser);


router.post("/signIn",authController.loginUser);
module.exports = router;