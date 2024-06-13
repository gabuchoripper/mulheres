import Modal from "react-modal";
import styles from './orderstyles.module.scss';
import {FiX} from 'react-icons/fi'
import {orderItemsProps} from '../../pages/dashboard/index'

interface ModalOrderProps {
    isVisible:boolean;
    onRequestClose : ()=> void;
    handleconcluir : ()=> void;
    order : orderItemsProps[]
}

export function ModalOrder({isVisible , onRequestClose , order , handleconcluir}:ModalOrderProps|any){

    const customsytlemodal = {
        content:{
            top:'50%',
            bottom:'auto',
            left : '50%',
            right: 'auto',
            padding: '30px',
            transform: 'translate(-50%,-50%)' ,
            backgroundColor:'#1d1d2e',
            color:'#fff'
        }
    }
    return (
        <Modal style={customsytlemodal} isOpen={isVisible} onRequestClose={onRequestClose}   >
            <button
                type="button"
                onClick={onRequestClose}
                style={{background:'transparent',border:0,cursor:'pointer'}}
            >
                <FiX size={45} color="#f34748"/>
            </button>
            <div className={styles.container}>
                <h2 >Detalhes do pedido</h2>
                <section className={styles.mesainfo}><strong><span>Mesa: {order[0].orderid.table} - Nome: {order[0].orderid.name}</span></strong></section>
                
                <h3 className={styles.itemslabel}>Items</h3>
                
                    {order.map((item:orderItemsProps)=>{
                        return(
                            <section key={item.id} className={styles.contaienritem}>
                                <strong><span>{item.amount} - {item.productid.name}</span></strong>
                                <span className={styles.description}>{item.productid.description}</span>
                                
                            </section>
                        )
                    })}
                
                <button className={styles.buttonconcluir} onClick={()=>handleconcluir(order[0].order_id)}>Concluir Pedido</button>
            </div>
        </Modal>
    )

}