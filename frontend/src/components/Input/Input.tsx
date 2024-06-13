
import style from './style.module.scss';
import { InputHTMLAttributes  ,TextareaHTMLAttributes} from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{}

 function Input({... rest}:InputProps){

    return (
        <>
            <input className={style.input} {... rest}  />
        </>
    )
}

function TextArea({... rest}:TextAreaProps){

    return (
        <>
            <textarea className={style.input} {... rest}  ></textarea>
        </>
    )
}



export  {Input , TextArea}