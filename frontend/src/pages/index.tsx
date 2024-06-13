import {useContext , FormEvent , useState} from 'react'
import Head from "next/head"
import Image from "next/image"
import {Input , TextArea} from "../components/Input/Input";
import { Button } from "../components/Button";
import {canSSRGuest} from '../utils/canSSRGuest'


import Link from "next/link";

import styles from "./home.module.scss";
import logoimg from '../../public/logo.svg';
import { AuthContext } from '../contexts/AuthContext';
import {toast} from 'react-toastify';

export default function Home() {

  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const [loading,setLoading] = useState(false)
 
  const {signIn} = useContext(AuthContext)

  async function handleLogin(event:FormEvent){
    
    event.preventDefault();
    if(email === '' || password === '' ){
        toast.warning('Os campos de usuário e senha devem ser preenchidos');
        return;
    }

    setLoading(true);
    let data = {
      email:email,
      password:password
    }
    
    
    await signIn(data)
  }
  return (
    <>
      <Head>
        <title>Home Pizzaria</title>
      </Head>
      <div className={styles.logindiv} >
        <Image src={logoimg} alt='Logo'></Image> 
        <form method="post" onSubmit={handleLogin}>
        
          <Input name="user" value={email} onChange={(e)=>setEmail(e.target.value)} id='user' type="email" placeholder="Usuário" maxLength={32} minLength={3} autoComplete={'on'} />
          <Input name="password" value={password} onChange={(e)=>setPassword(e.target.value)} id='password' type="password" placeholder="Senha" maxLength={32} minLength={3} autoComplete={'on'} />

          <Button type='submit'  >Login</Button>

          <Link  href='/signup' > Cadastre-se</Link>
          
        </form>
        
        
      </div>
    </>
    
  )
    
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  
  return {
    props: {}
  }
})
