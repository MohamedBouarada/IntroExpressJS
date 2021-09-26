const userModel=require('../Models/user_model');
const user_model = require("../Models/user_model");

class userDao{

    async addUser(user){
        let result =0;
        const userToAdd=new userModel(user)
        try{
            result = await userToAdd.save();
            return {success:true,result};
        }catch (e) {
            console.log(e);
            return {success:false,result};
        }
    }
    async findUserByEmail(email){
        let userDB=null;
        try {
            userDB=await user_model.findOne({'email':email}).exec();
            return {success:true,userDB};
        }catch (e) {
            console.log(e);
            return {success:false,userDB};
        }

    }

}

module.exports = new userDao();