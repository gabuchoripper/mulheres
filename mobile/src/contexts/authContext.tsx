import React, {createContext, ReactNode, useState, useEffect, Dispatch, SetStateAction} from 'react';
import { setupApi } from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message'
import {AxiosError} from "axios";


type AuthProviderProps = {
    children:ReactNode
}

type AuthProps = {
    user : UserProps;
    isAuthenticated:boolean,
    signIn:(credentials:SigInProps)=>Promise<void>,
    signOut:()=>Promise<void>,
    loading:boolean,
    loadingauth:boolean,
    isAdmin:boolean,
    setLoading:Dispatch<SetStateAction<boolean>>
}

type UserProps ={
    id:string;
    name :string;
    email:string;
    admin:boolean;
    token:string;
}

type SigInProps = {
    email:string;
    password:string ;
}

export const AuthContext = createContext({} as AuthProps);
export const api = setupApi()

export  function AuthProvider({children}:AuthProviderProps){
    
    const [user , setUser] = useState<UserProps>({
        email:'',
        id:'',
        name:'',
        token:'',
        admin:false
    })

    const [loadingauth , setLoadingauth] = useState(false);
    const [loading , setLoading] = useState(true);



    

    async function signOut() {
        setLoading(true);
        AsyncStorage.clear().then(()=>{
            setUser({
                email:'',
                id:'',
                name:'',
                token:'',
                admin:false
            });
        }).catch((e)=>{

            Toast.show({
                type:'error',
                text1:'Erro',
                text2:'Erro ao deslogar'
            })
            
            console.log(e)
        }).finally(()=>{
            setLoading(false);
        })
    }

    useEffect(()=>{
        async function getuser(){
            const userdata = await AsyncStorage.getItem('@pizzaria.user');
            
            if(!!userdata){
                const objuser:UserProps = JSON.parse(userdata);
                if(!!objuser.name){
                    setUser(objuser)
                    api.defaults.headers.common['Authorization'] = `Bearer ${objuser.token}`;
                    try{
                        const testlogin =  await api.get('/users/me');
                        if(!testlogin.data.user){
                            await signOut();
                        }
                        if(testlogin.data.user.active == false){
                            await signOut();
                        }

                        
                    }catch(err){
                        console.log(err);
                        await signOut();
                    }
                    
                }
            }else{
                
            }
            
            setLoading(false)
        }
        getuser()
    },[])



    //console.log(user)
    const isAuthenticated = (typeof(user.name) != 'undefined' && user.name!= null && user.name!= '' );
    const isAdmin : boolean = (typeof(user.name) != 'undefined'&& user.name!= null)?user.admin:false;
    //console.log(isAuthenticated)

    async function signIn({email,password}:SigInProps) {
        

            setLoadingauth(true)
            
            await api.post('/users/auth',{email,password}).then(async (response)=>{
                const data = {
                    ...response.data
                }
                console.log(response.data)

                api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

                setUser(data)
                await AsyncStorage.setItem('@pizzaria.user', JSON.stringify(data));
            }).catch((e: AxiosError|any)=>{
                Toast.show({
                    type:'error',
                    text1:'Erro',
                    text2: (!!e.response.data.message)?e.response.data.message:'Erro ao realizar login'
                })


                // @ts-ignore
                console.log(e.response.data.message)
            }).finally(()=>{
                setLoadingauth(false)
            });


    }

    return(
        <AuthContext.Provider value={{user,isAuthenticated , signIn,signOut , loading , loadingauth,isAdmin , setLoading }}>
            {children}
        </AuthContext.Provider>
    )

}