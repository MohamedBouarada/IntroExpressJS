
const passwordService=require('../Services/Bcrypt');
const userDao=require('../dao/userDao');
class authentificationController {
    async registerUser(req,res){
        const {email,password}=req.body;
        try{
            const hashedPassword=await passwordService.encryption(password);
            if (!hashedPassword){
                res.status(500).send("try again later");
            }else{

                const {result,success}= await userDao.addUser({email,password:hashedPassword});
                if(success){
                    if(result){
                        res.status(201).send("your account has been created successfully");
                    }else{
                        res.status(500).send("try again later");
                    }

                }else{
                    res.status(500).send("try again later");
                }
                //const user=new user_model({email,password:hashedPassword});
                //await user.save();

            }
        }catch (e) {
            console.log(e);
            res.status(500).send("try again later");
        }
    }
    async loginUser(req,res){
        const {email,password}=req.body;
        try{

            const searchResult= await userDao.findUserByEmail(email);
            if(searchResult.success===true){
                const {result,success}=await passwordService.decryption(password,searchResult.userDB.password);
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
            }
            else{
                res.status(500).send("please try again");
            }

        }catch (e) {
            console.log(e);
            res.status(404).send("please verify your credentials or create an account");
        }
    }
}

module.exports = new authentificationController();