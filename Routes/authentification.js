const express=require('express');
const router=express.Router();
const user_model=require('../Models/user_model');
const passwordService=require('../Services/Bcrypt');
router.post("/signUp",async(req,res)=>{
    const {email,password}=req.body;

    try{
        const hashedPassword=await passwordService.encryption(password);
        if (!hashedPassword){
            res.status(500).send("try again later");
        }else{
            const user=new user_model({email,password:hashedPassword});
            await user.save();
            res.status(201).send("your account has been created successfully");
        }
        }catch (e) {
        console.log(e);
        res.status(500).send("try again later");
    }

})
router.post("/signIn",async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user= await user_model.findOne({'email':email}).exec();
        const {result,success}=await passwordService.decryption(password,user.password);
        if(success){
            if(result){
                res.status(200).send("You are logged in successfully");
            }else{
                res.status(403).send("please verify your password");
            }

        }
        else{
            res.status(500).send("please try again");
        }
    }catch (e) {
        console.log(e);
        res.status(404).send("please verify your credentials or create an account");
    }

})
module.exports = router;