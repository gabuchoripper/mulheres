import { Request , Response } from "express";
import UserService from "../services/UserServices";
import UserServices from "../services/UserServices";




const UserController = class UserController{

    static async getedituser(req:Request , res:Response){

        const id = req.params.id;
        const response = await UserService.getedituser(id);
        res.json(response)
    }
    static async createUser(req:Request , res:Response){
        
        const response = await UserService.insertUser(req.body);
        return res.json({message : 'Create user ok' , data:response}) 
    }

    static async home(req:Request , res:Response){
        if(!!req.query.name ){
            const {name} = req.query;
            const users = await UserService.listusers({namesearch:name})
                res.json({users})

        }else{
            const users = await UserService.listusers({});
            res.json({users})
        }

    }

    static async updatepicture(req: Request , res : Response){

        res.json(req.body)

    }

    static async activateuser(req:Request , res:Response){
        const id = req.params.id;
        const user = await UserService.activateuser(id);
        res.json(user)
    }

    static async deactivateuser(req:Request , res:Response){
        const id = req.params.id;
        const user = await UserService.deactivateuser(id);
        res.json(user)
    }

    static async Auth(req:Request , res:Response){
        const authenticateduser = await UserService.Auth(req.body)
        return res.json(authenticateduser)
    }

    static async updateuser(req:Request , res:Response){
        const response = await UserService.UpdateUser(req.body);
        return res.json(response)
    }

    static async editeuser(req:Request , res:Response){
        const response = await UserService.editeuser(req.body);
        return res.json(response)
    }

    static async UserDetail(req:Request , res:Response){

        const user =  await UserService.UserDetailService(req.user_id)
        return res.json({ok:true , user})
    }

    static async UserDeletebyEmail(req:Request , res:Response){
        const email = req.body.email ;
        if(!email){
            throw new Error('parâmetro inválido');
        }

        return res.json(await UserService.deleteaccountbyemail(email))
    }

    static async deleteuserbyapp(req:Request , res:Response){
        const userid = req.user_id;
        res.json(await UserServices.deleteuserapp(userid))


    }

    static async DeleteAccountbyKey(req:Request , res:Response){
        if(!req.params.key){
            throw new Error('parâmetro inválido')
        }

        const key = req.params.key.trim();
        const response = await UserServices.deleteaccountbykey(key)

        res.json(response)
    }
}

export default UserController;