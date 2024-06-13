import EventosController from "../controllers/EventosController";
import {Router} from "express";
import CheckAuth from "../middlewares/CheckAuth";




const EventosRoutes = Router();

EventosRoutes.get('/detail/:id',CheckAuth , EventosController.geteventodetail)
EventosRoutes.get('/getinscritos/:id',CheckAuth , EventosController.getinscritos)
EventosRoutes.post('/setinscricao/:id',CheckAuth , EventosController.setinscricao)
EventosRoutes.delete('/unsetinscricao/:id',CheckAuth , EventosController.unsetinscricao)
EventosRoutes.delete('/deletecurso/:id',CheckAuth , EventosController.deleteevento)
EventosRoutes.post('/insert' , CheckAuth , EventosController.insert)
EventosRoutes.patch('/update',CheckAuth , EventosController.update)


EventosRoutes.get('/:name?' , CheckAuth ,EventosController.getalleventos );

export default EventosRoutes