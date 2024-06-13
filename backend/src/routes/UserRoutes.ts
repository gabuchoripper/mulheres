import { Router } from "express";
import UserController from "../controllers/UserController";
import CheckAuth from "../middlewares/CheckAuth";

import uploadConfig from './../config/multer'
import multer from "multer";

const upload = multer(uploadConfig.upload('./tmp'))
const UserRouter = Router();


UserRouter.get('/' ,CheckAuth, UserController.home)

UserRouter.get('/edit/:id' , CheckAuth , UserController.getedituser)

UserRouter.post('/create' , UserController.createUser)
UserRouter.post('/auth' , UserController.Auth)
UserRouter.post('/deleteuseracc' , UserController.UserDeletebyEmail)
UserRouter.get('/me' ,CheckAuth , UserController.UserDetail)
UserRouter.patch('/update' , CheckAuth , UserController.updateuser)
UserRouter.patch('/updatepicture' , CheckAuth  , UserController.updatepicture)
UserRouter.patch('/activatesuser/:id' , CheckAuth , UserController.activateuser)
UserRouter.patch('/deactivatesuser/:id' , CheckAuth , UserController.deactivateuser)
UserRouter.patch('/edit' , CheckAuth , UserController.updateuser)
UserRouter.delete('/deleteuseracc/:key' , UserController.DeleteAccountbyKey)
UserRouter.delete('/deleteuserbyapp' ,CheckAuth , UserController.deleteuserbyapp)

export default UserRouter


