import axios , {AxiosError} from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';


export function setupApi(context:any=undefined){

    
    const api = axios.create({

        baseURL:'http://186.227.203.10:5000'
    })
    return api;
}

  //baseURL:'http://api.forumdasmulheresdenegocios.org'
  //baseURL:'http://186.227.203.10:5000'
  //baseURL:'http://192.168.99.230:5000'