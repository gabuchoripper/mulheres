import axios , {AxiosError} from "axios";
import { parseCookies } from "nookies";
import {AuthTokenError} from "./Errors/AuthTokenError";
import { signOut } from "../contexts/AuthContext";
import { Context } from "vm";


export function setupApi(context:any=undefined){

    const cookies = parseCookies(context)

    const api = axios.create({
        baseURL:'http://localhost:5000',
        headers:{
            Authorization:`Bearer ${cookies['@nextauth.token']}`
        }
    })
    axios.interceptors.response.use((response)=>{
        return response
    },
        (Error: AxiosError )=>{
            if(Error.response?.status === 401){

                if(window !== undefined){
                     signOut();  

                }else{
                    return Promise.reject(new AuthTokenError())
                }
                
            }

            return Promise.reject(Error)
        }
    )
    return api;

}

