import React , {useState , useContext , useEffect} from "react";
import {SafeAreaView , View , Text , TouchableOpacity   } from 'react-native';
import Toast from 'react-native-toast-message';
import styles from './style'
import { OrderProps } from "../../routes/app.routes";
import {api} from '../../contexts/authContext'
import SelectDropdown from 'react-native-select-dropdown'
import {FontAwesome , MaterialCommunityIcons} from "@expo/vector-icons" 

import { useRoute , RouteProp } from "@react-navigation/native";
type RouteDetailProps = {
    Order:OrderProps
}

type OrderRouteProps = RouteProp<RouteDetailProps,'Order'>

type CategoryProps = {
    id:string;
    name:string
}


export default function Order(){
    const route = useRoute<OrderRouteProps>();
    const [categories , setCategories] = useState<CategoryProps[]>([])
    const [categoryselected , setCategoryselected] = useState('')

    //Carregar Categorias
    useEffect(()=>{

        async function getcategories(){
            try{
                const response = await api.get('/category/shwoall/');
                setCategories(response.data);
               
            }catch(err){
                Toast.show({
                    type:'error',
                    text1:'Erro',
                    text2:'Erro ao obter categorias'
                })
            }
        }
        getcategories()
    },[])


    //Handle categoria selecionada
    useEffect(()=>{

    },[categoryselected])


    

    async function handleDeleteOrder(id: string){
        console.log(id)
    }


    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.rowmesacontaier}>
                <Text style={styles.mesatitle}>Mesa {route.params.number}</Text>
                <TouchableOpacity onPress={()=>handleDeleteOrder(route.params.order_id)} style={styles.mesadeletebutton}><FontAwesome size={30} name="trash" color='#dc3545' /></TouchableOpacity>
            </View>
            <View style={styles.rowmesacategoria}>
                
                <SelectDropdown buttonStyle={styles.categoryinput}  defaultButtonText="Categoria" 
                        data={categories}
                        onSelect={(selectedItem:CategoryProps, index) => {
                            console.log(selectedItem, index)
                            setCategoryselected(selectedItem.id)
                        }}
                        buttonTextAfterSelection={(selectedItem:CategoryProps, index) => {
                            // text represented after item is selected
                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                            return selectedItem.name
                    }}
                    rowTextForSelection={(item:CategoryProps, index) => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return item.name
                    }}
                />
                
            </View>
            
        </SafeAreaView>
    )
}