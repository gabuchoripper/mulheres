import {Request, Response} from "express";
import EventosService from "../services/EventosService";
const EventosController = class EventosController{
    static async  getalleventos(req:Request , res:Response){

        if(!!req.params.name){


            res.json(await EventosService.geteventos(req.params.name))
        }else{

            res.json(await EventosService.geteventos())
        }
    }

    static async geteventodetail(req:Request , res:Response){
        const id = req.params.id;
        res.json(await EventosService.geteventodetail(id))
    }

    static async  setinscricao(req:Request , res:Response){
        const id = req.params.id;
        res.json(await EventosService.setinscricao({userid:req.user_id,id}))
    }

    static async unsetinscricao(req:Request , res:Response){
        const {id} = req.params;

        res.json(await EventosService.unsetinscricao({ id,  userid:req.user_id }));
    }

    static async insert(req:Request , res:Response){



        req.body.vagas = (!!req.body.vagas) ? parseInt(req.body.vagas) : 0;

        res.json(await EventosService.insert(req.body))

    }

    static async update(req:Request , res:Response){
        req.body.vagas = (!!req.body.vagas) ? parseInt(req.body.vagas) : 0;

        res.json(await EventosService.updateevento(req.body))
    }

    static async getinscritos(req:Request , res:Response){
        const id = req.params.id;
        res.json(await EventosService.getinscritosdetail({userid:req.user_id , id}))
    }

    static async deleteevento(req:Request , res:Response){
        const {id} = req.params;
        res.json(await EventosService.deleteevento(id))
    }
}
export default  EventosController;