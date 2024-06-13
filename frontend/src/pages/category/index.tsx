import  Header  from "../../components/Header";
import { FormEvent , useState , useContext , useEffect} from "react";
import Head from "next/head"
import { Input } from "@/src/components/Input/Input";
import { Button } from "@/src/components/Button";
import styles from './style.module.scss';
import { CategoryContext , CategoryProvider } from "../../contexts/CategoryContext";
import { toast } from "react-toastify";
import { canSSRAuth } from "@/src/utils/canSSRAuth";


export default function Category(){

    
    const {insertCategory} = useContext(CategoryContext)

    useEffect(()=>{
        console.log(CategoryContext);
    },[CategoryContext])

    const [name,setName] = useState('');

    async function handlesubmit(event:FormEvent) {
        event.preventDefault();
        if(name === ''){
            toast.error('Categoria deve ser preenchido');
            return;
        }
        await insertCategory({name})

    }

    return (
        <>
        <Head>
            <title>Categorias</title>
        </Head>
        <Header />

        <div className={styles.categorycontainer}>
            <form className={styles.categoryform} onSubmit={handlesubmit}>
                <label htmlFor='name'>
                    Categoria
                </label>
                <Input onChange={(e)=>{setName(e.target.value)}} type="text" maxLength={60} name='name' id='name'/>
                <Button >Cadastrar</Button>
            </form>

        </div>
          
        </>
    )
}


export const getServerSideProps = canSSRAuth(async (ctx)=>{
    return{
       props:{}
    }
   })
