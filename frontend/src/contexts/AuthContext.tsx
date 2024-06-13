import { createContext, ReactNode, useState , useEffect } from 'react';
import {destroyCookie , setCookie , parseCookies} from 'nookies';
import Router from "next/router";
import api from './../services/apiClient'
import {  toast } from 'react-toastify';

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signUp: (newuser: SignUpProps) => Promise<void>;
  signOut: () => Promise<void>;
}

type UserProps = {
  id: string;
  name: string;
  email: string;
}

type SignUpProps = {
  email: string;
  name: string;
  password: string;
}

type SignInProps = {
  email: string;
  password: string;
}

type AuthProviderProps = {
  children: ReactNode;
}



export const AuthContext = createContext({} as AuthContextData)

export async function signOut(){
  try{
    destroyCookie(undefined,'@nextauth.token')
    
  }catch(error){
    console.log("Erro signout")
  }finally{
    Router.push('/')
  }
}
export async function signUp({email,name,password}:SignUpProps){

  try{
    const response = await api.post('/users/create',{email,password,name});
    if(response){
      toast.success("Cadastrado com sucesso!!")
    }else{
      throw new Error('Erro ao cadastrar');
    }
    return response;
  }catch(err:any){
    console.log(err);
    toast.error(err.response.data.message)
  }
  
}

export function AuthProvider({ children }: AuthProviderProps){

  useEffect(()=>{
    const {'@nextauth.token':token} = parseCookies();
  
    if(token){
      
      api.get('/users/me').then((response)=>{
        
        try{
          setUser(response.data.user);
        }
        catch(err:any){
          console.log(err)
          toast.error('Erro ao obter dados do usuário, contate desenvolvedor');
          return;
        }



      }).catch((err:any)=>{
        console.log(err)
        toast.error('Erro ao obter dados do usuário, contate desenvolvedor')
        signOut();
      });
      
    }
  },[])

  const [user, setUser] = useState<UserProps>()
  const isAuthenticated = !!user;

  

  async function signIn({email,password}:SignInProps){
    try{
        

        if(email === '' || password === ''){
          toast.error('Os campos usuário e senha devem ser preenchidos!!');
          return;
        }
    
        const response = await api.post('/users/auth',{email,password});
        
        if(!response.data.token){
          toast.error('Usuário inválido!!!');
          return;
            //throw new Error('Usuário inválido')
        }
        const {token , id ,name} = response.data;
    
    
        setCookie(undefined,'@nextauth.token' ,token , {
          maxAge:60*60*24*30,
          path:'/'
        });
        
        setCookie(undefined,'@nextauth.user.name' ,name, {
          maxAge:60*60*24*30,
          path:'/'
        });
    
    
        setUser({
          email:email,
          id:id,
          name:name
    
        })

        
    
        api.defaults.headers['Authorization'] = `Bearer ${token}`;

        Router.push('/dashboard')
    
    }catch(error){
        console.log(error)
    }
    

  } 

  return(
    <AuthContext.Provider value={{ user, isAuthenticated, signIn , signOut , signUp }}>
      {children}
    </AuthContext.Provider>
  )
}