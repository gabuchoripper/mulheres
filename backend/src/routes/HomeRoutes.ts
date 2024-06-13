import  {Router} from "express";
import HomeController from './../controllers/HomeController';

const HomeRouter = Router();
HomeRouter.get('/' , HomeController.Home);




export default HomeRouter