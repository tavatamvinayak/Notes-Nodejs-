const jwt = require('jsonwebtoken');

const auth = async(req,res,next)=>{
    try {
        let Token = req.headers.authorization;
        if(Token){
            Token = Token.split(" ")[1]
            let user = jwt.verify(Token , 'SecreteKeyVT')
            req.userId = user.id; /// signup & login  line : 37 & 40  user.id
            console.log("token verify success middleware")
        }
        else{
           return res.status(401).json({message:"unauthorized User OR middleware error"})
        }
        next();

    } catch (error) {
        console.log(error)
        res.status(401).json({message:"error User"})
    }
}

module.exports=auth;