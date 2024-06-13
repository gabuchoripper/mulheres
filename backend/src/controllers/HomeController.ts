import { Request , Response } from "express";
import HomeService from "../services/HomeServices";

const HomeController = class HomeController{
    static async Home(req:Request,res:Response){
        const orders = await HomeService.listorders();
        return res.json({message:"Ok Home" , orders : orders})
    }
}

export default HomeController