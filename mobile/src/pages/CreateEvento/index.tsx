import React , {useContext , useState , useEffect , useCallback} from "react";

import {SafeAreaView, View, ScrollView, Image, StyleSheet, Alert, Pressable} from 'react-native' ;
import {FontAwesome} from "@expo/vector-icons"
import { Avatar, Button, Card, Text, useTheme , Portal , TextInput} from 'react-native-paper';
import { useSafeAreaInsets,SafeAreaProvider  } from 'react-native-safe-area-context';

import {useRoute} from "@react-navigation/native";
import {api ,AuthContext} from "../../contexts/authContext";
import styles from './styles'
import {AxiosError} from "axios";
import Toast from "react-native-toast-message";





import RNDateTimePicker from '@react-native-community/datetimepicker';








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




export default function CreateEvento({navigation}){

    const {isAdmin} = useContext(AuthContext);
    const routeparams = useRoute();
    const insets = useSafeAreaInsets();

    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());

    const [name , setName] = useState('');
    const [descricao , setDescricao] = useState('');
    const [palestrante , setPalestrante] = useState('');
    const [local , setlocal] = useState('');
    const [data , setData] = useState(undefined);
    const [hora , setHora] = useState(undefined);
    const [vagas , setVagas] = useState('');
    const [label , setLabel] = useState('');

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

    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const [modetimer, setModetimer] = useState('time');
    const [showtimer, setShowtimer] = useState(false);
    const onChange = (event, selectedDate:Date) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    const onChangetimer = (event, selectedDate:Date) => {
        const currentDate = selectedDate;
        setShowtimer(false);
        setTime(currentDate);
    };

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





    async function oninsert(){
        try{

            const pad = function(num:number) { return ('00'+num).slice(-2) };
            const namestring = name.trim();



            var currentdate;

            currentdate = date.getFullYear()         + '-' +
                pad(date.getMonth() + 1)  + '-' +
                pad(date.getDate())       + ' ' +
                pad(time.getHours())      + ':' +
                pad(time.getMinutes())    + ':' +
                pad(time.getSeconds());


            let objdate = new Date(currentdate);
            console.log(objdate)



            if(!!namestring == false){
                Toast.show({
                    type:'error',
                    text1:'Erro',
                    text2:'Campo nome inválido'
                })
                return;
            }
            const datainsert = {
                name:namestring,
                descricao,
                palestrante,
                local,
                data:objdate,
                vagas,
                label


            }




            await api.post('/eventos/insert',datainsert).then((response)=>{
                console.log(response.data)
                Toast.show({
                    type:'success',
                    text1:'Sucesso',
                    text2:'Gravado com sucesso'
                });
                navigation.navigate('Eventos')
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

    return(
        <SafeAreaView style={containerstyle.container}>
            <ScrollView style={{width:'100%'}}>
                <View style={{justifyContent:'center',flex:1,alignItems:'center'}}>

                    <Card mode="contained" style={styles.cardcontainer}>
                        <Card.Title titleStyle={{color:theme.colors.font}} title="Cadastrar evento"  left={LeftContent} />
                        <TextInput onChangeText={(text)=>setName(text)} value={name} label={'Nome do evento'} style={[containerstyle.inputs]} autoComplete='off' mode='outlined' />
                        <TextInput onChangeText={(text)=>setDescricao(text)} value={descricao} label={'Descrição'} style={[containerstyle.inputs]} autoComplete='off' mode='outlined' />
                        <TextInput onChangeText={(text)=>setPalestrante(text)} value={palestrante} label={'Palestrante'} style={[containerstyle.inputs]} autoComplete='off' mode='outlined' />
                        <TextInput onChangeText={(text)=>setlocal(text)} value={local} label={'Local'} style={[containerstyle.inputs]} autoComplete='off' mode='outlined' />






                        <Pressable onPress={showDatepicker}>
                            <View pointerEvents="none">
                                <TextInput   value={date.toLocaleDateString()} label={'Data'} style={[containerstyle.inputs]} autoComplete='off' mode='outlined' />
                                {show && (
                                    <RNDateTimePicker
                                        testID="dateTimePicker"
                                        value={date}
                                        mode={mode}
                                        is24Hour={true}
                                        onChange={onChange}
                                    />
                                )}
                            </View>
                        </Pressable>

                        <Pressable onPress={showTimepicker}>
                            <View pointerEvents="none">
                                <TextInput   value={time.toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})} label={'Hora'} style={[containerstyle.inputs]} autoComplete='off' mode='outlined' />
                                {showtimer && (
                                    <RNDateTimePicker
                                        testID="dateTimePickertime"
                                        value={time}
                                        mode={modetimer}
                                        is24Hour={true}
                                        onChange={onChangetimer}

                                    />
                                )}
                            </View>
                        </Pressable>



                        <TextInput onChangeText={(text)=>setVagas(text.trim())} keyboardType={"numeric"} value={vagas} label={'Vagas'} style={[containerstyle.inputs]} autoComplete='off' mode='outlined' />

                        <Button onPress={oninsert} mode={'contained'}>Gravar</Button>
                    </Card>
                </View>

            </ScrollView>
        </SafeAreaView>
    )

}