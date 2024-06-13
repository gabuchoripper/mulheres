import React, {useState ,useEffect} from 'react';
import { SafeAreaView ,ScrollView , StyleSheet ,Image,View , Button} from 'react-native';
import {Avatar, Card, IconButton, Text, useTheme} from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {api} from "../../contexts/authContext";
import styles from "../dashboard/styles";

type AssociadaProp =  {
    id:string,
    name: string,
    razaosocial: string,
    ramo: string,
    website: string,
    description: string,
    discount: string,
    imagepath: string,
    created_at:string,
    updated_at:string,
}

function Associadas({navigation}){




    const [listassociadas , setListaassociadas] = useState<AssociadaProp[]>([])
    const insets = useSafeAreaInsets();
    const theme = useTheme();
    const containerstyle = StyleSheet.create({
        container:{
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            flex:1,
            alignItems:'center',
            justifyContent:'center',
            backgroundColor: theme.colors.background,
            fontFamily: 'sans-serif'  ,
            
        },cardcontainer:{
            width:'90%',
            marginVertical:10
        },
        containerimg:{
            width:'100%',
            padding:5,
            height:200
        },imglogo:{
            flex: 1,
            width: null,
            height: null,
            resizeMode: 'contain' 
        }
    })




    async function menutoggle(){



        navigation.toggleDrawer()
    }

    async function listar(){
        const response = await api.get('/associadas');
        console.log(response.data)

        setListaassociadas(response.data)
    }

    async function handleassociado(id:string){
        console.log(`associadas/associadainfo/${id}`);

        const result = await api.get(`associadas/associadainfo/${id}`)
        console.log(result.data)
    }

    useEffect(()=>{
            listar();

        },
        [])


    const LeftContent = props => <Avatar.Icon {...props} icon="account-group-outline" />

    return(
        <SafeAreaView style={containerstyle.container}>



            <View style={{borderWidth:0,position:'absolute',top:0,alignSelf:'flex-end',padding:5,zIndex:1000}}>
                <IconButton
                    mode={"outlined"}

                    style={{backgroundColor:theme.colors.primary,borderWidth:0}}
                    icon="menu"

                    size={25}
                    onPress={menutoggle}
                />
            </View>

            <ScrollView style={{width:'100%'}}>
                <View style={{width:'100%',alignItems:'center' , justifyContent:'center'}}>
                    <Card mode="contained" style={styles.cardcontainer}>
                        <Card.Title titleStyle={{color:theme.colors.font}} title="Associadas"  left={LeftContent} />
                        <Text style={{fontSize:25,marginVertical:10,color:theme.colors.font}}>Empresas associadas</Text>

                    </Card>

                    {

                        // @ts-ignore
                        listassociadas.map((associado)=>
                        <Card key={associado.id} style={containerstyle.cardcontainer} onPress={()=>handleassociado(associado.id)} >
                            <Card.Content>
                                {!!associado.imagepath?
                                    <View style={containerstyle.containerimg}>
                                        <Image style={containerstyle.imglogo} source={{uri:associado.imagepath}}/>
                                    </View>
                                    :
                                    <Text style={{color:theme.colors.font}}>{!!associado.razaosocial?associado.razaosocial:associado.name}</Text>
                                }


                            </Card.Content>
                        </Card>
                    )}



                </View>
                
            </ScrollView>
        </SafeAreaView>
    );

}
export default Associadas