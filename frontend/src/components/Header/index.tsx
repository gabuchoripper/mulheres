import {useState , useContext, useEffect} from 'react';
import { AuthContext } from '@/src/contexts/AuthContext';
import styles from './style.module.scss';
import Link from 'next/link';



import {FiLogOut} from 'react-icons/fi'



export default function  Header(){
    const {user , signOut} = useContext(AuthContext)

    return(
        <header className={styles.headerContaier}>
            <div className={styles.headercontent}>
                <Link href='/dashboard'>
                    <img src='/logo.svg' width={190} height={60}/>
                </Link>


                <nav className={styles.menunav}>
                    <Link href='/category'>
                        Categoria
                    </Link>
                    <Link href='/products'>
                        Cardápio
                    </Link>
                    <button onClick={signOut}><FiLogOut  /></button>
                </nav>
            </div>
        </header>
    )
}