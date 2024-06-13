import { createContext, ReactNode} from 'react';

import Router from "next/router";
import api from './../services/apiClient'
import {  toast } from 'react-toastify';
import { AxiosResponse } from 'axios';


type CategoryProps = {
    insertCategory: (category: CategoryInsertProps)=> Promise<void>;
    getCategoryList:()=>Promise<AxiosResponse<any , any> | undefined> 

}

type CategoryInsertProps = {
    name:string;
}

type CategoryProviderProps = {
    children: ReactNode;
  }
  


export const CategoryContext = createContext({} as CategoryProps )






export function CategoryProvider({ children }: CategoryProviderProps){

    async function insertCategory({name}:CategoryInsertProps){
   
        await api.post('/category/insert',{name}).then((response)=>{
            toast.success('Gravado com sucesso!!')
        }).catch((err:any)=>{
            toast.error(err.response.data.message || "Erro ao inserir categoria");
            console.log(err)
        })
 
    }

    async function getCategoryList(){

        try{
            const response = await api.get('/category/shwoall/');
            return response;
        }catch(err:any){
            toast.error("Erro ao obter Categorias");
            console.log(err)
            Router.push('/')
        }
    }

    return (
        <CategoryContext.Provider value={{insertCategory , getCategoryList}}>
            {children}
        </CategoryContext.Provider>
    )
}

