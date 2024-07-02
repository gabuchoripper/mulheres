import React , {useContext , useEffect , useState} from "react";

import {SafeAreaView ,View , ScrollView ,Image , StyleSheet } from 'react-native' ;
import {FontAwesome} from "@expo/vector-icons"
import {Avatar, Button, Card, Text, useTheme, Portal, IconButton} from 'react-native-paper';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {api , AuthContext} from "../../contexts/authContext";


import styles from './styles'
import { useIsFocused} from "@react-navigation/native";


type EventoProps = {
    id: string,
    name: string,
    descricao: string,
    palestrante:string,
    local:string,
    data: string,
    vagas: string,
    label:string,
    created_at:string,
    updated_at: string
}



export default function Eventos({navigation}){
    const [eventos , setEventos] = useState<EventoProps[]>([])

    const isfocused = useIsFocused()

    const {isAdmin} = useContext(AuthContext)



    async function verevento(id:string){


        navigation.navigate('Stack',{screen:'Evento',params:{
                id:id
            }})
    }

    async function searcheventos(){
        const response = await api.get('/eventos')
        setEventos(response.data)
        console.log(response.data)
    }

    useEffect(()=>{

        searcheventos()
        navigation.closeDrawer();
    },[isfocused])










    const insets = useSafeAreaInsets();
    const LeftContent = props => <Avatar.Icon {...props} icon="school-outline" />
    const PresidentsContent = props => <Avatar.Icon {...props} icon="note-text" />




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

        }
    })


    const pad = function(num:number) { return ('00'+num).slice(-2) };

    async function oncreateevento(){
        navigation.navigate('Stack',{
            screen:'CreateEvento'
        })
    }


    async function menutoggle(){



        navigation.toggleDrawer()
    }

    return (
        <SafeAreaView style={containerstyle.container}>

            <View style={{borderWidth:0,position:'relative',top:0,alignSelf:'flex-end',padding:5,zIndex:1000}}>
                <IconButton
                    mode={"outlined"}

                    style={{backgroundColor:theme.colors.primary,borderWidth:0}}
                    icon="menu"

                    size={25}
                    onPress={menutoggle}
                />
            </View>

            <ScrollView style={{width:'100%'}}>
                <View style={{justifyContent:'center',flex:1,alignItems:'center'}}>

                    <Card mode="contained" style={styles.cardcontainer}>
                        <Card.Title titleStyle={{color:theme.colors.font}} title="Eventos"  left={LeftContent} />
                        <Text style={{fontSize:25,marginVertical:10,color:theme.colors.font}}>Lista de eventos</Text>
                        {isAdmin?<Button onPress={oncreateevento} mode={"contained"}>Novo evento</Button>:''}

                    </Card>


                    {eventos.map((evento)=>{
                            let objdate = (!!evento.data)?new Date(evento.data):false;
                            let strdate = '';
                            if(!!objdate){
                                strdate = `${pad(objdate.getDate())}/${pad(objdate.getMonth()+1)}/${objdate.getFullYear()} ${pad(objdate.getHours())}:${pad(objdate.getMinutes())}`;
                            }
                            return(
                                <Card key={evento.id} onPress={()=>verevento(evento.id)} style={styles.cardcontainer}>
                                    <Card.Title titleStyle={{color:theme.colors.font}} title={evento.name}  left={PresidentsContent} />
                                    <Card.Content>
                                        <Text style={{color:theme.colors.font}} variant="titleLarge">{evento.name}</Text>
                                        <Text style={{color:theme.colors.font}} variant="titleLarge">Data: {strdate} - Vagas: {evento.vagas}</Text>
                                        <Text style={{color:'#00f',fontWeight:"900"}} variant="bodyMedium">Ver Mais</Text>
                                    </Card.Content>

                                </Card>
                            )
                        }

                    )}





                </View>



            </ScrollView>



        </SafeAreaView>

    )
};