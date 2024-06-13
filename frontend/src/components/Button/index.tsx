
import style from './style.module.scss';
import { ReactNode } from 'react';
import { ButtonHTMLAttributes  } from 'react';
import {FaSpinner} from 'react-icons/fa'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    loading?:boolean,
    children:ReactNode,

}



 function Button({ loading , children,... rest}:ButtonProps){

    return (
        <>
            <button disabled={loading} className={style.button} {... rest}>
                {loading?<FaSpinner></FaSpinner>:children}
                
                
            </button>  
        </>
    )
}





export  {Button }