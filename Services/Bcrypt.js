const bcrypt=require('bcrypt');

class Bcrypt{
    salt=12;
    async encryption(plainPassword){
        try{
        const hashPassword = await bcrypt.hash(plainPassword,this.salt);
        return hashPassword;
        }catch (e) {
            console.log(e);
            return 0;
        }
    }
    async decryption(plainPassword,hashedPassword){
        try{
            const result=await bcrypt.compare(plainPassword,hashedPassword);
            return {success:true,result};
        }catch (e) {
            console.log(e);
            return {success:false,result:false};
        }
    }
}

module.exports = new Bcrypt();