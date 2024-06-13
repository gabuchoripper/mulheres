import Head from "next/head"
import Image from "next/image"
import {useContext, useState } from 'react'
import Router from "next/router";
import {FiRefreshCcw} from 'react-icons/fi';


import Link from "next/link";

import Header from "./../../components/Header";
import {canSSRAuth} from '../../utils/canSSRAuth';

import styles from './styles.module.scss';
import {setupApi } from '../../services/api';
import { AxiosResponse } from "axios";
import api from "@/src/services/apiClient";
import { toast } from "react-toastify";

import {ModalOrder} from '../../components/Modal/order';


type ItemProps ={
    id:string,
    table:number,
    status:boolean,
    draft:boolean,
    name:string,
    created_at:string,
    updated_at:string
}


interface  OrderProps {
    OrderList:{orders:ItemProps[]}
}

export type orderItemsProps = {
    id:string,
    order_id:string,
    product_id:string,
    amount:number,
    productid:{
        id:string,
        name:string,
        price:string,
        banner:string,
        description:string
    },
    orderid:{
        id:string,
        table:number,
        name:string | null,
        status:boolean,
        draft:boolean,
    }

}




export default function dashboard({OrderList}:OrderProps){

    async function onRequestClose(){
        setIsVisible(false)
    }

    async function concluirpedido(id:string){
        try{
            await api.put(`/orders/finish/${id}`);
            toast.success('Finalizado com sucesso')
            Router.push('/dashboard')
            setIsVisible(false)
            console.log(id);
        }catch(err:any){
            toast.error('Erro ao finalizar pedido')
            console.log(err);
        }
    
        
    }

    console.log(ModalOrder)
    
    

    const [OrderItems,setOrderItems] = useState<orderItemsProps[]>();
    const [isVisible,setIsVisible] = useState(false);

    async function handleOrder(id:string){
        try{
            
            const response = await api.get(`/orders/items/${id}`)
           

            setOrderItems(response.data)
            setIsVisible(true);
        }catch(err:any){
            toast.error('Erro ao obter items');
            console.log(err)
        }
       
        
    }
    
    return(
        <>
            <Head>
                <title>Pedidos</title>
            </Head>
            <Header/>
            <div className={styles.container}>
                <h1>Pedidos</h1>
                <Link href={'/dashboard'} className={styles.buttonreload}><FiRefreshCcw/></Link>
                <ul className={styles.lista}>
                {
                OrderList.orders.map((order)=>{
                    
                    return(<li key={order.id} onClick={()=>handleOrder(order.id)}>
                        <span>{order.table} - {order.name}</span>
                    </li>)
                })
            }
                </ul>
                
            </div>

            {isVisible && (<ModalOrder isVisible={isVisible} order={OrderItems} onRequestClose={onRequestClose} handleconcluir={concluirpedido} />)}
            
        </>
    )
}


export const getServerSideProps = canSSRAuth(async (ctx)=>{

    const apicliente  = setupApi(ctx);
    const orders = await apicliente.get('/orders/confirmeds')
 return{
    props:{OrderList:orders.data}
 }
})