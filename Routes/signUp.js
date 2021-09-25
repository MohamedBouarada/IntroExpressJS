const express=require('express');
const router=express.Router();
const user_model=require('../Models/user_model');

router.post("/signUp",async(req,res)=>{
    const {email,password}=req.body;
    const user=new user_model({email,password});
    try{
        await user.save();
        res.status(201).send({email,password});
    }catch (e) {
        console.log(e);
        res.status(500).send("try again later");
    }

})
module.exports = router;