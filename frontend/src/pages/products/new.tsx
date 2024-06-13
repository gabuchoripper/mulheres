import Header from "@/src/components/Header"
import Head from "next/head";
import style from './stylenew.module.scss';
import {setupApi } from '../../services/api';
import apiclient from '../../services/apiClient'
import { Button } from "@/src/components/Button";
import { canSSRAuth } from "@/src/utils/canSSRAuth";
import {toast} from 'react-toastify';
import {FiUpload} from 'react-icons/fi'
import {useState , useContext , ChangeEvent} from 'react';

type ItemProps = {
    id:string;
    name:string
}

interface CategoryProps {
    categoryList:ItemProps[]
}

export default  function New({categoryList}:CategoryProps){
    
    const [avatarUrl ,setAvatarUrl] = useState('');
    const [imageAvatar ,setImageAvatar] = useState<File>();
    const [categories,setCategories] = useState(categoryList || [])
    const [categoryselected , setCategoryselected] = useState<number>(0)
    const [name,setName] = useState('');
    const [price,setPrice] = useState('');
    const [description,setDescription] = useState('')
    

    async function handleFile(event:ChangeEvent<HTMLInputElement>) {
        if(!event.target.files){
            return;
        }

        if(!event.target.files[0]){
            return;
        }
        const image = event.target.files[0];

        
    if(!image){
        return;
      }
  
      if(image.type === 'image/jpeg' || image.type === 'image/png'){
  
        setImageAvatar(image);
        setAvatarUrl(URL.createObjectURL(event.target.files[0]))
  
      }
       
        
        
    }

    function handleDescription(e:ChangeEvent<HTMLTextAreaElement>){
        console.log(e.target.value);
    }

    function handlecategoryselect(event:ChangeEvent<HTMLSelectElement>){
    
        const categorycheck = categories[event.target.value as any]
        setCategoryselected(event.target.value as any)
        console.log(categorycheck)
    }

    async function handleform(e:ChangeEvent<HTMLFormElement>){
        e.preventDefault();
        if(name === '' || price === ''){
            toast.error('Campos nome e preço devem ser definidos');
            return
        }
        if(!imageAvatar){
            toast.error('Imagem deve ser enviada');
            return
        }

        const product = new FormData();
        product.append('name' , name);
        product.append('price' , price);
        product.append('description' , description);
        product.append('file' , imageAvatar);
        product.append('category_id' , categories[categoryselected].id);

        console.log(product)

        apiclient.post('/products/insert',product).then(()=>{
            toast.success('Inserido com sucesso!!')
        }).catch((err)=>{
            toast.error(err.response.data.message ||'Erro ao inserir produto!');
            console.log(err)
        })

        
    }


    return(  
        <>
        <Head>
            <title>Cadastro de produtos</title>
        </Head>
            <Header/>
            <div className={style.container}>
            <h1>Novo produto</h1>
                <form className={style.form} onSubmit={handleform}>

                    
                <label className={style.labelAvatar}>
              <span>
                <FiUpload size={30} color="#FFF" />
              </span>

              <input type="file" accept="image/png, image/jpeg" onChange={handleFile} />

              {avatarUrl && (     
                  <img 
                    className={style.preview}
                    src={avatarUrl}
                    alt="Foto do produto" 
                    width={250}
                    height={250}
                  />
              )}
            </label>


                    <label htmlFor="name">Produto</label>
                    <input type="text" onChange={(e)=>setName(e.target.value)} name='name' id='name' placeholder="Nome do produto" />

                    <label htmlFor="price">Valor</label>
                    <input type="text" onChange={(e)=>setPrice(e.target.value)} name='price' id='price' placeholder="Valor" />

                    <label htmlFor="category_id">Categoria</label>
                    <select onChange={handlecategoryselect} value={categoryselected} id='category_id'>
                        {categoryList.map((category,index)=>{
                           return(<option key={category.id} value={index} >{category.name}</option>)
                        })}
                       
                    </select>

                    <label  htmlFor="description">Descrição</label>
                    <textarea onChange={(e)=>setDescription(e.target.value)}  rows={5} id="description" />
                    <Button type="submit">Cadastrar</Button>
                    
                    
                </form>
            </div>
            
        </>
    )
}




export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiclient = setupApi(ctx);

    const response = await apiclient.get('/category/shwoall/');
    return {
      props: {categoryList:response.data}
    }
  })