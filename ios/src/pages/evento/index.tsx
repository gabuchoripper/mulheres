import React , {useContext , useState , useEffect} from "react";

import {SafeAreaView, View, ScrollView, Image, StyleSheet, Alert} from 'react-native' ;
import {FontAwesome} from "@expo/vector-icons"
import { Avatar, Button, Card, Text, useTheme , Portal} from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ListaInscritosCurso  } from "../../components/modals/ListaInscritosCurso";
import {useRoute} from "@react-navigation/native";
import {api ,AuthContext} from "../../contexts/authContext";
import styles from './styles'
import {AxiosError} from "axios";
import Toast from "react-native-toast-message";
import { useIsFocused} from "@react-navigation/native";
import {ca} from "react-native-paper-dates";

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

type UserInscritoProps = {
    id:string,
    name:string
}


export default function Curso({navigation }){

    const isfocused = useIsFocused()

    async function showConfirmDialog  ( )  {
        const message = 'Deseja excluir esse evento?';
        return Alert.alert(
            "Confirmação",
            message,
            [
                // The "Yes" button
                {
                    text: "Sim",
                    onPress:  onyesdialog,
                },
                // The "No" button
                // Does nothing but dismiss the dialog when tapped
                {
                    text: "Não",
                },
            ]
        );
    }

    async function onyesdialog(){
        try{
            const response = await api.delete(`/eventos/deleteevento/${id}`);
            console.log(response.data)
            navigation.navigate('Eventos');
        }catch (err: AxiosError | any){

            Toast.show({
                type:'error',
                text1:'Erro',
                text2:err.response.data.message

            })
        }

    }

    const {isAdmin , setLoading} = useContext(AuthContext);


    const [visiblelistainscritos , setVisiblelistainscritos] = useState(false)

    const [listainscritos,setListainscritos] = useState<UserInscritoProps[]>([])


    async function handlehideinscritos(){
        setVisiblelistainscritos(false)
    }

    async function handleshowinscritos(){
        setVisiblelistainscritos(true)
    }

    const [evento, setEvento] = useState<EventoProps>({
        created_at: "",
        data: "",
        descricao: "",
        id: "",
        label: "",
        local: "",
        name: "",
        palestrante: "",
        updated_at: "",
        vagas: ""
    })

    const [inscrito , setInscrito] = useState(false);

    const route = useRoute();
    // @ts-ignore
    const {id} = route.params;
    const insets = useSafeAreaInsets();

    async function getcurso(){
        try{

            const response = await api.get(`/eventos/detail/${id}`)
            setEvento(response.data as EventoProps)
        }catch (err: AxiosError|any){
            Toast.show({
                type:'error',
                text1:'Erro',
                text2:(!!err.data.response.message)?err.data.response.message:'Erro ao obter dados do evento'
            })
        }


    }

    async function handlesetinscricao(){

        await api.post(`/eventos/setinscricao/${id}`).then((response)=>{
            console.log(response.data)
        }).catch((err:AxiosError)=>{
            let message = 'Erro ao inscrever';
            // @ts-ignore
            if( typeof(err.response.data.message) != 'undefined'){

                //@ts-ignore
                message = err.response.data.message;
            }
            Toast.show({
                type:'error',
                text1:'Erro',
                text2:message
            })
        }).finally(()=>{
            getinscritos();
        })

    }

    async function handleEditarEvento(){
        navigation.navigate('Stack', {
            screen:'Editevento',
            params:{
                id:id
            }
        })
    }



    async function handleunsetinscricao(){


        await api.delete(`/eventos/unsetinscricao/${id}`).then((response)=>{
            console.log(response.data)
        }).catch((err:AxiosError)=>{
            let message = 'Erro ao cancelar inscrição';
            // @ts-ignore
            if( typeof(err.response.data.message) != 'undefined'){
                //@ts-ignore
                message = err.response.data.message;
            }
            Toast.show({
                type:'error',
                text1:'Erro',
                text2:message
            })


        }).finally(()=>{
            getinscritos();
        })



    }


    async function getinscritos(){
        const response = await api.get(`/eventos/getinscritos/${id}`)
        console.log(response.data)

        setInscrito(!!response.data.inscricao)
        setListainscritos(response.data.inscritos);
    }


    useEffect(()=>{
        getcurso();
        getinscritos();

        console.log(listainscritos)
    },[isfocused])



    const LeftContent = props => <Avatar.Icon {...props} icon="school" />
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

    let objdate = (!!evento.data)?new Date(evento.data):false;
    let strdate = '';
    if(!!objdate){
        strdate = `${pad(objdate.getDate())}/${pad(objdate.getMonth()+1)}/${objdate.getFullYear()} ${pad(objdate.getHours())}:${pad(objdate.getMinutes())}`;
    }
    return(
        <SafeAreaView style={containerstyle.container}>
            <ScrollView style={{width:'100%'}}>
                <View style={{justifyContent:'center',flex:1,alignItems:'center'}}>

                    <Card mode="contained" style={styles.cardcontainer}>
                        <Card.Title titleStyle={{color:theme.colors.font}} title="Evento"  left={LeftContent} />
                        <Text style={{fontSize:25,marginVertical:10,color:theme.colors.font}}>{evento.name}</Text>
                        {!!strdate?<Text variant="bodyMedium" style={{fontSize:15,marginVertical:10,textAlign:'center',color:theme.colors.font}}>Data: {strdate}</Text>:''}
                        {!!evento.local?<Text variant="bodyMedium" style={{fontSize:15,marginVertical:10,textAlign:'center',color:theme.colors.font}}>Local: {evento.local}</Text>:''}
                        {!!evento.palestrante?<Text variant="bodyMedium" style={{fontSize:15,marginVertical:10,textAlign:'center',color:theme.colors.font}}>Palestrante: {evento.palestrante}</Text>:''}
                        {!!evento.vagas?<Text variant="bodyMedium" style={{fontSize:15,marginVertical:10,textAlign:'center',color:theme.colors.font}}>Vagas: {evento.vagas}</Text>:''}

                        {!!evento.vagas?<Text variant="bodyMedium" style={{fontSize:15,marginVertical:10,textAlign:'center',color:theme.colors.font}}>Restantes: {parseInt(evento.vagas)   - listainscritos.length}</Text>:''}
                        {!inscrito?<Button  icon="check" onPress={handlesetinscricao} mode="contained">Inscreva-me</Button>:<Button  onPress={handleunsetinscricao} icon="cancel" mode="outlined">Cancelar inscrição</Button>}


                        <Button style={{marginVertical:5}} icon="image-multiple" mode="contained">Galeria</Button>
                        <Button onPress={handleshowinscritos} style={{marginVertical:5}} icon="eye" mode="contained">Ver inscritos</Button>
                        {isAdmin?
                            <View>
                                <Button onPress={handleEditarEvento}  style={{marginVertical:5}} icon="file-edit" mode="contained">Editar</Button>
                                <Button onPress={()=>showConfirmDialog()} style={{marginVertical:5}} icon="trash-can" mode="contained">Excluir evento</Button>
                            </View>
                            :''
                        }
                        <Text variant="bodyMedium" style={{fontSize:15,marginVertical:10,textAlign:'center',color:theme.colors.font}}>{evento.descricao}</Text>
                    </Card>
                </View>
                <Portal>
                    <ListaInscritosCurso inscritos={listainscritos} handleHideModal={handlehideinscritos} visible={visiblelistainscritos} />
                </Portal>


            </ScrollView>
        </SafeAreaView>
    )
}