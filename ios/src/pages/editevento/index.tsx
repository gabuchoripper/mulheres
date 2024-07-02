import React , {useContext , useState , useEffect , useCallback} from "react";

import {SafeAreaView, View, ScrollView, Image, StyleSheet, Alert, Pressable} from 'react-native' ;
import {FontAwesome} from "@expo/vector-icons"
import {Avatar, Button, Card, Text, useTheme, Portal, TextInput, IconButton} from 'react-native-paper';
import { useSafeAreaInsets,SafeAreaProvider  } from 'react-native-safe-area-context';

import {useRoute , useIsFocused} from "@react-navigation/native";
import {api ,AuthContext} from "../../contexts/authContext";
import styles from './styles'
import {AxiosError} from "axios";
import Toast from "react-native-toast-message";
import { useDrawerStatus } from '@react-navigation/drawer';


import RNDateTimePicker from '@react-native-community/datetimepicker';
import {DateTimePickerComponent } from "../../components/DateTimePicker";
import {DateType} from "react-native-ui-datepicker";

type EventoProps = {
    id:string,
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




export default function Editevento({navigation}){

    const isDrawerOpen = useDrawerStatus() === 'open';

    if(isDrawerOpen){

    }



    const {isAdmin} = useContext(AuthContext);
    const routeparams = useRoute();

    // @ts-ignore
    const id = routeparams.params.id;
    const insets = useSafeAreaInsets();

    const [open, setOpen] = useState(false);
    const [strdate, setStrDate] = useState<DateType>(new Date());

    const [date, setDate] = useState(new Date().toLocaleString());
    const [selecteddate , setSelecteddate]= useState(new Date())
    const [time, setTime] = useState(new Date());

    const [name , setName] = useState('');
    const [descricao , setDescricao] = useState('');
    const [palestrante , setPalestrante] = useState('');
    const [local , setlocal] = useState('');

    const [inscrito , setInscrito] = useState(false);
    const [listainscritos,setListainscritos] = useState<UserInscritoProps[]>([])

    const [vagas , setVagas] = useState('');
    const [label , setLabel] = useState('');

    const pad = function(num:number) { return ('00'+num).slice(-2) };



    const LeftContent = props => <Avatar.Icon {...props} icon="school" />
    const theme = useTheme();
    const isFocused = useIsFocused();

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

    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const [modetimer, setModetimer] = useState('time');
    const [showtimer, setShowtimer] = useState(false);


    const showMode = (currentMode:string) => {
        setShow(true);
        setMode(currentMode);
    };


    const showModetimer = (currentMode:string) => {
        setShowtimer(true);
        setModetimer(currentMode);
    };


    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showModetimer('time');
    };

    async function geteventodata(){
        const response = await api.get(`/eventos/detail/${id}`)

        const curso = response.data as EventoProps;

        setName(curso.name)
        setDescricao(curso.descricao)
        setVagas((!!curso.vagas.toString())?curso.vagas.toString():'0');
        setLabel(curso.label)
        setlocal(curso.local)
        setPalestrante(curso.palestrante)

        let objdate = new Date(curso.data);
        setSelecteddate(objdate)
        setStrDate(objdate)


        setDate(objdate.toLocaleString())
    }

    async function getinscritos(){
        const response = await api.get(`/eventos/getinscritos/${id}`)
        console.log(response.data)



        setInscrito(!!response.data.inscricao)
        setListainscritos(response.data.inscritos);
    }


    useEffect(()=>{
        geteventodata()
        getinscritos()
        navigation.closeDrawer();
    },[isFocused])




    async function onupdate(){
        try{


            const namestring = name.trim();



            var currentdate;

            currentdate = selecteddate.getFullYear()         + '-' +
                pad(selecteddate.getMonth() + 1)  + '-' +
                pad(selecteddate.getDate())       + ' ' +
                pad(selecteddate.getHours())      + ':' +
                pad(selecteddate.getMinutes())    + ':' +
                pad(selecteddate.getSeconds());


            let objdate = new Date(currentdate);

            if(!!namestring == false){
                Toast.show({
                    type:'error',
                    text1:'Erro',
                    text2:'Campo nome inválido'
                })
                return;
            }

            getinscritos();
            if(parseInt(vagas) < listainscritos.length){
                Toast.show({
                    type:'error',
                    text1:'Erro',
                    text2:'A nova quantidade de vagas é menor que a quantidade de usuários já inscritos'
                })
                return;
            }
            const datainsert = {
                id:id,
                name:namestring,
                descricao,
                palestrante,
                local,
                data:objdate,
                vagas,
                label
            }




            await api.patch('/eventos/update',datainsert).then((response)=>{
                console.log(response.data)
                Toast.show({
                    type:'success',
                    text1:'Sucesso',
                    text2:'Atualizado com sucesso'
                });
                navigation.navigate('Stack',{screen:'Evento',params:{
                        id:id
                    }
                })
            }).catch((err:AxiosError|any)=>{
                console.log(err)
                Toast.show({
                    type:'error',
                    text1:'Erro',
                    text2:(!!err.data.response.message)?err.data.response.message:'Erro ao Cadastrar'
                })
            })



        }catch (err:AxiosError|any){
            Toast.show({
                type:'error',
                text1:'Erro',
                text2:(!!err.data.response.message)?err.data.response.message:'Erro ao Cadastrar'
            })
        }


    }

    async function change_strDate(params:{date:DateType}){
        const {date} = params;
        setStrDate(date);
        if(!!date){
            const mydate = new Date(date.toString());
            setSelecteddate(mydate)
            setDate(`${mydate.toLocaleDateString()} ${mydate.toLocaleTimeString()}`)
        }
    }

    const confirmdatepicker = async function(){
        setShow(false)
    }
    async function menutoggle(){
        navigation.toggleDrawer()
    }
    return(
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
                        <Card.Title titleStyle={{color:theme.colors.font}} title="Editar curso"  left={LeftContent} />
                        <TextInput onChangeText={(text)=>setName(text)} value={name} label={'Nome do curso'} style={[containerstyle.inputs]} autoComplete='off' mode='outlined' />
                        <TextInput onChangeText={(text)=>setDescricao(text)} value={descricao} label={'Descrição'} style={[containerstyle.inputs]} autoComplete='off' mode='outlined' />
                        <TextInput onChangeText={(text)=>setPalestrante(text)} value={palestrante} label={'Professor'} style={[containerstyle.inputs]} autoComplete='off' mode='outlined' />
                        <TextInput onChangeText={(text)=>setlocal(text)} value={local} label={'Local'} style={[containerstyle.inputs]} autoComplete='off' mode='outlined' />

                        <Pressable onPress={showDatepicker}>
                            <View pointerEvents="none">
                                <TextInput value={date} label={'Data'} style={[containerstyle.inputs]} autoComplete='off' mode='outlined' />

                            </View>
                        </Pressable>
                        <Portal >
                            {show && (
                                <DateTimePickerComponent timePicker={true} onChange={change_strDate} date={strdate} onConfirm={confirmdatepicker} />
                            )}
                        </Portal>



                        <TextInput onChangeText={(text)=>setVagas(text.trim())} keyboardType={"numeric"} value={vagas} label={'Vagas'} style={[containerstyle.inputs]} autoComplete='off' mode='outlined' />

                        <Button onPress={onupdate} style={{marginVertical:5}} mode={'contained'}>Atualizar</Button>
                    </Card>
                </View>

            </ScrollView>
        </SafeAreaView>
    )

}