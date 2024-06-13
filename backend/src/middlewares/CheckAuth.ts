import { Request, Response , NextFunction } from "express";
import { verify } from "jsonwebtoken";



interface Payload{
    sub:string
}
function CheckAuth(req:Request , res:Response , next:NextFunction){
    const authtoken = req.headers.authorization;
    if(!authtoken){
        return res.status(401).end();
    }
    
    const [,token] = authtoken.split(" ");
    //console.log(token);
    try{
        const {sub} = verify(token , process.env.JWT_HASH) as Payload;
        if(!sub){
            return res.status(401).end();  
        }
        req.user_id = sub;
        return next();

    }catch(err){
        return res.status(401).end();
    }

    
}

export default CheckAuth