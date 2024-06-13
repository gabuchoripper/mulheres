import  {Router } from "express";



const router = Router();

import HomeRouter from './routes/HomeRoutes';
import UserRouter from "./routes/UserRoutes";
import EventosRoutes from "./routes/EventosRoutes";
import CursosRoutes from "./routes/CursosRoutes";
import AssociadasRoutes from "./routes/AssociadasRoutes";


router.use('/users' , UserRouter)
router.use('/eventos',EventosRoutes)
router.use('/cursos',CursosRoutes)
router.use('/associadas',AssociadasRoutes)


router.use('/' ,HomeRouter )



export {router}