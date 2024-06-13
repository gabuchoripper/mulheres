import {Router} from "express";
import CheckAuth from "../middlewares/CheckAuth";
import CursosController from "../controllers/CursosController";


const CursosRoutes = Router();




CursosRoutes.get('/detail/:id',CheckAuth , CursosController.getcursodetail)
CursosRoutes.get('/getinscritos/:id',CheckAuth , CursosController.getinscritos)
CursosRoutes.post('/setinscricao/:id',CheckAuth , CursosController.setinscricao)
CursosRoutes.delete('/unsetinscricao/:id',CheckAuth , CursosController.unsetinscricao)
CursosRoutes.delete('/deletecurso/:id',CheckAuth , CursosController.deletecurso)
CursosRoutes.post('/insert' , CheckAuth , CursosController.insert)
CursosRoutes.patch('/update',CheckAuth , CursosController.update)


CursosRoutes.get('/:name?'  ,CursosController.getcursos );
export default  CursosRoutes;