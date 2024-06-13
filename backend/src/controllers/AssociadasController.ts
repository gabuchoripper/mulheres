import {Response,Request} from "express";
import AssociadasService from "../services/AssociadasService";
import associadasService from "../services/AssociadasService";


const AssociadasController = class AssociadasController{

    static async getAssociadaInfo(req: Request , res: Response) {
        const id = req.params.id;
        const associada = await associadasService.getAssociadaInfo(id);
        res.json(associada)
    }

    static  async getallassociadas(req:Request , res:Response){
        if(!!req.params.name){
            const {name} = req.params;
            res.json(await AssociadasService.getallassociadas(name) )
        }else{
            res.json(await AssociadasService.getallassociadas() )
        }
    }

    static async insertassociada(req:Request , res:Response){
        res.json(await AssociadasService.insertassociada(req.body))
    }

}

export  default AssociadasController