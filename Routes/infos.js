const express=require('express');
const router=express.Router();
const user_model=require('../Models/user_model');

router.get("/emailList",async(req,res)=>{
    try{
        const emailList= await user_model.find({},{"email":1,"_id":0});
        res.status(200).send(emailList);
    }catch (e) {
        console.log(e);
        res.status(500).send("error");
    }
})

module.exports = router;