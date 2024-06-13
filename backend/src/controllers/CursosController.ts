import {Request, Response} from "express";
import CursosService from "../services/CursosService";

const CursosController = class CursosController{
    static async  getcursos(req:Request , res:Response){

        if(!!req.params.name){


            res.json(await CursosService.getcursos(req.params.name))
        }else{

            res.json(await CursosService.getcursos())
        }
    }

    static async getcursodetail(req:Request , res:Response){
        const id = req.params.id;
        res.json(await CursosService.getcursodetail(id))
    }

    static async  setinscricao(req:Request , res:Response){
        const id = req.params.id;
        res.json(await CursosService.setinscricao({userid:req.user_id,id}))
    }

    static async unsetinscricao(req:Request , res:Response){
        const {id} = req.params;

        res.json(await CursosService.unsetinscricao({ id,  userid:req.user_id }));
    }

    static async insert(req:Request , res:Response){



        req.body.vagas = (!!req.body.vagas) ? parseInt(req.body.vagas) : 0;

        res.json(await CursosService.insert(req.body))

    }

    static async update(req:Request , res:Response){
        req.body.vagas = (!!req.body.vagas) ? parseInt(req.body.vagas) : 0;

        res.json(await CursosService.updatecurso(req.body))
    }

    static async getinscritos(req:Request , res:Response){
        const id = req.params.id;
        res.json(await CursosService.getinscritosdetail({userid:req.user_id , id}))
    }

    static async deletecurso(req:Request , res:Response){
        const {id} = req.params;
        res.json(await CursosService.deletecurso(id))
    }
}
export default  CursosController;