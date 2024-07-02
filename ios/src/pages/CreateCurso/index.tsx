import React , { useState } from "react";

import {SafeAreaView, View, ScrollView, StyleSheet, Pressable } from 'react-native' ;

import { Avatar, Button, Card, useTheme , Portal , TextInput} from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


import {api } from "../../contexts/authContext";
import styles from './styles'
import {AxiosError} from "axios";
import Toast from "react-native-toast-message";



import  {DateType} from 'react-native-ui-datepicker';
import {DateTimePickerComponent } from "../../components/DateTimePicker";


type CursoProps = {
    name: string,
    descricao: string,
    professor:string,
    local:string,
    data: string,
    vagas: string,
    label:string,
    created_at:string,
    updated_at: string
}

export default function CreateCurso({navigation}){


    const insets = useSafeAreaInsets();


    const [strdate, setStrDate] = useState<DateType>(new Date());

    const [date, setDate] = useState(new Date().toLocaleString());
    const [selecteddate , setSelecteddate]= useState(new Date())


    const [name , setName] = useState('');
    const [descricao , setDescricao] = useState('');
    const [professor , setProfessor] = useState('');
    const [local , setlocal] = useState('');

    const [vagas , setVagas] = useState('');
    const [label , setLabel] = useState('');

    async function change_strDate(params:{date:DateType}){
        const {date} = params;
        setStrDate(date);
        if(!!date){
            const mydate = new Date(date.toString());
            setSelecteddate(mydate)
            console.log(mydate)
            setDate(`${mydate.toLocaleDateString()} ${mydate.toLocaleTimeString()}`)
        }


    }

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





    const showMode = (currentMode:string) => {
        setShow(true);
        setMode(currentMode);
    };





    const showDatepicker = () => {
        console.log('teste')
        showMode('date');
    };

    const confirmdatepicker = async function(){
        setShow(false)
    }

    async function oninsert(){
        try{

            const pad = function(num:number) { return ('00'+num).slice(-2) };
            const namestring = name.trim();



            let currentdate;

            currentdate = selecteddate.getFullYear()         + '-' +
                pad(selecteddate.getMonth() + 1)  + '-' +
                pad(selecteddate.getDate())       + ' ' +
                pad(selecteddate.getHours())      + ':' +
                pad(selecteddate.getMinutes())    + ':' +
                pad(selecteddate.getSeconds());


            let objdate = new Date(currentdate);
            console.log(objdate)



            if(!namestring){
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
                professor,
                local,
                data:objdate,
                vagas,
                label

            }

            await api.post('/cursos/insert',datainsert).then((response)=>{
                console.log(response.data)
                Toast.show({
                    type:'success',
                    text1:'Sucesso',
                    text2:'Gravado com sucesso'
                });
                navigation.navigate('Cursos')
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
                        <Card.Title titleStyle={{color:theme.colors.font}} title="Cadastrar curso"  left={LeftContent} />
                        <TextInput onChangeText={(text)=>setName(text)} value={name} label={'Nome do curso'} style={[containerstyle.inputs]} autoComplete='off' mode='outlined' />
                        <TextInput onChangeText={(text)=>setDescricao(text)} value={descricao} label={'Descrição'} style={[containerstyle.inputs]} autoComplete='off' mode='outlined' />
                        <TextInput onChangeText={(text)=>setProfessor(text)} value={professor} label={'Professor'} style={[containerstyle.inputs]} autoComplete='off' mode='outlined' />
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
                        <Button onPress={oninsert} mode={'contained'}>Gravar</Button>
                    </Card>
                </View>

            </ScrollView>
        </SafeAreaView>
    )

}