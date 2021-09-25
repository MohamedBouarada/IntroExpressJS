const mongoose=require('mongoose');
const {Schema}=mongoose;

const user=new Schema({
    email: {type: String , required:true , unique:true } ,
    password: {type: String , required:true}
},{timestamps:true});

const user_model=mongoose.model('user',user);
module.exports=user_model;