import '../styles/Global.scss';
import { AppProps } from "next/app";
import { AuthProvider } from '../contexts/AuthContext';
import { CategoryProvider } from '../contexts/CategoryContext';
import { ToastContainer, toast } from 'react-toastify';
import Modal from "react-modal";
import 'react-toastify/dist/ReactToastify.css';


function MyApp({Component , pageProps}:AppProps){
    Modal.setAppElement('#__next');
    return(
        <AuthProvider>
            <CategoryProvider>
            <ToastContainer  />
            <Component {...pageProps}/>
            </CategoryProvider>
        </AuthProvider>
        
    )
}

export default MyApp;