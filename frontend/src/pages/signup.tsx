import Head from "next/head"
import Image from "next/image"
import {Input , TextArea} from "../components/Input/Input";
import { Button } from "../components/Button";
import { FormEvent , useState , useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import {toast} from 'react-toastify';

import styles from "./signup.module.scss";
import logoimg from '../../public/logo.svg';
import { FaUserPlus } from "react-icons/fa";
import Link from "next/link";

function Signup(){
    const {signUp} = useContext(AuthContext)
    const [email ,setEmail] = useState('');
    const [name ,setName] = useState('');
    const [password ,setPassword] = useState('');


    async function hadleSubmit(event: FormEvent){
        event.preventDefault();
        console.log('Postou');
        if(email=== '' || name === '' || password === ''){
            toast.warn('Todos os campos devem ser preenchidos.');
            return;
        }
        const user = {
            email,
            name,
            password
        }
        const response = await signUp(user);
        console.log(response)
    }

    return(

        <>
        <Head>
            <title>Cadastre-se</title>
        </Head>
            <div className={styles.container}>
                <Image src={logoimg} alt="Pizzaria"/>
                <h1 className={styles.h1}>Cadastro de usuário</h1>
                <form onSubmit={hadleSubmit}>
                    <Input onChange={(event)=>{setName(event.target.value)}} title="Insira o usuário aqui..." placeholder="Usuário" type="text" id='name' name='name'  required />
                    <Input onChange={(event)=>{setEmail(event.target.value)}} title="Insira o e-mail aqui..." placeholder="E-Mail" type="email" id='email' name='email'  required />
                    <Input onChange={(event)=>{setPassword(event.target.value)}} placeholder="Senha" type="password" id='password' name='password' required />
                    <Button type="submit" >Cadastrar  <FaUserPlus/></Button>
                </form>
                <Link color="#fff" href='/'>Já tem cadastro?</Link>
            </div>
        </>
    )
        
}

export default Signup;