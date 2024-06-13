import {Router} from "express";

import AssociadasController from "../controllers/AssociadasController";
import CheckAuth from "../middlewares/CheckAuth";

const AssociadasRoutes = Router();



AssociadasRoutes.post('/insert' , CheckAuth , AssociadasController.insertassociada)
AssociadasRoutes.get('/associadainfo/:id' , CheckAuth , AssociadasController.getAssociadaInfo)

AssociadasRoutes.get('/:name?' , CheckAuth , AssociadasController.getallassociadas)



export default AssociadasRoutes