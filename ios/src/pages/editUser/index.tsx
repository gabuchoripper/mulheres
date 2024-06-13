import React, {useContext, useEffect, useState} from "react";

import {SafeAreaView, View, ScrollView, Image, ImageProps, StyleSheet, FlatList, Alert} from 'react-native' ;
import {FontAwesome} from "@expo/vector-icons"
import { Avatar, Button, Card, Text, useTheme , Portal , TextInput} from 'react-native-paper';

import Avatarprofile from '../../components/Avatar'


import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {useIsFocused} from "@react-navigation/native"

import {api} from '../../contexts/authContext'
import { AxiosError } from 'axios';

import styles from './styles'

import {useRoute} from "@react-navigation/native";
import Toast from "react-native-toast-message";

type UserPropReceived = {
    active:boolean,
    inactivedate:string,
    name:string,
    id:string,
    password:string,
    email:string,
    admin:boolean,
    cnpj:string,
    empresa:string,
    created_at:string,
    updated_at:string,
}




export default function EditUser({navigation }){

    const isFocused = useIsFocused();

    const route = useRoute();


    // @ts-ignore
    const {id} = route.params;

    console.log(route.params)

    function cnpjMask(value:string){
        return value
            .replace(/\D+/g, '') // não deixa ser digitado nenhuma letra
            .replace(/(\d{2})(\d)/, '$1.$2') // captura 2 grupos de número o primeiro com 2 digitos e o segundo de com 3 digitos, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de número
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1/$2') // captura 2 grupos de número o primeiro e o segundo com 3 digitos, separados por /
            .replace(/(\d{4})(\d)/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1') // captura os dois últimos 2 números, com um - antes dos dois números
    }







    const insets = useSafeAreaInsets();
    const LeftContent = props => <Avatar.Icon {...props} icon="account-group" />
    const Singleaccicon = props => <Avatar.Icon {...props} icon="account" />
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
        inputs:{
            width:'90%',
            marginVertical:5
        }
    })


    const [nome , setNome] = useState('');
    const [email , setEmail] = useState('');

    const [cnpj , setCnpj] = useState('');
    const [empresa , setEmpresa] = useState('');

    const [senha , setSenha] = useState('');
    const [confirmsenha , setConfirmsenha] = useState('');

    const [isadmin , setIsadmin] = useState(false);
    const [isactive , setIsactive] = useState(true);


    useEffect(()=>{
        async function getuser(){
            const user = await api.get(`/users/edit/${id}`)
            console.log(user.data)

            const userreceived:UserPropReceived = user.data;
            setNome(userreceived.name)
            setEmail(userreceived.email)
            setCnpj(userreceived.cnpj)
            setEmpresa(userreceived.empresa)
            setIsadmin(userreceived.admin)
            setIsactive(userreceived.active)
        }


        getuser()
    },[isFocused])



    async function showConfirmDialogactive  ( )  {
        const message = 'Deseja ativar esse usuário?';
        return Alert.alert(
            "Confirmação",
            message,
            [
                // The "Yes" button
                {
                    text: "Sim",
                    onPress:  handleActive,
                },
                // The "No" button
                // Does nothing but dismiss the dialog when tapped
                {
                    text: "Não",
                },
            ]
        );
    }

    async function showConfirmDialogdeactive  ( )  {
        const message = 'Deseja desativar esse usuário?';
        return Alert.alert(
            "Confirmação",
            message,
            [
                // The "Yes" button
                {
                    text: "Sim",
                    onPress:  handleDeactive,
                },
                // The "No" button
                // Does nothing but dismiss the dialog when tapped
                {
                    text: "Não",
                },
            ]
        );
    }
    async function handleDeactive(){

        const response = await api.patch(`/users/deactivatesuser/${id}`)
        console.log(response.data)
        const userreceived = response.data;
        setNome(userreceived.name)
        setEmail(userreceived.email)
        setCnpj(userreceived.cnpj)
        setEmpresa(userreceived.empresa)
        setIsadmin(userreceived.admin)
        setIsactive(userreceived.active)
    }

    async function handleActive(){
        try{
            const response = await api.patch(`/users/activatesuser/${id}`)
            console.log(response.data)
            const userreceived = response.data;
            setNome(userreceived.name)
            setEmail(userreceived.email)
            setCnpj(userreceived.cnpj)
            setEmpresa(userreceived.empresa)
            setIsadmin(userreceived.admin)
            setIsactive(userreceived.active)
        }catch (err){
            console.log(err)
        }

    }

    async function handleSubmit(){



        console.log(cnpj.replace(/\D+/g, ''));


        const datauser = {
            id,
            name :nome ,
            email,
            cnpj,
            empresa,
            admin :isadmin,
            senha ,
            confirmsenha
        }



        const response = await api.patch('/users/edit' ,datauser ).then((response)=>{

            Toast.show({
                type:'success',
                text2:'Salvo com sucesso',
                text1:'Sucesso'
            })
        }).catch((err:AxiosError|any)=>{
            Toast.show({
                type:'error',
                text2:'Erro',
                text1:err.response.data.message
            })
        });


    }


    return(
        <SafeAreaView style={containerstyle.container}>

            <Avatarprofile id={id}  />

            <ScrollView style={{width:'100%'}}>
                <View style={{justifyContent:'center',flex:1,alignItems:'center'}}>

                    <Card mode="contained" style={containerstyle.cardcontainer}>
                        <Card.Title titleStyle={{color:theme.colors.font}} title="Editar usuário"  left={LeftContent} />

                    </Card>

                    <TextInput onChangeText={(text)=>setNome(text.trim())} value={nome} label={'Nome'} style={[containerstyle.inputs]} autoComplete='off' mode='outlined' />
                    <TextInput autoCapitalize='none' inputMode='email' keyboardType='email-address' textContentType='emailAddress' onChangeText={(text)=>setEmail(text.trim())} value={email} label={'E-Mail'} style={[containerstyle.inputs]} autoComplete='off' mode='outlined' />


                    <TextInput onChangeText={(text)=>setCnpj(text.trim())} value={cnpjMask(cnpj)} label={'CNPJ'} style={[containerstyle.inputs]} autoComplete='off' mode='outlined' />
                    <TextInput onChangeText={(text)=>setEmpresa(text.trim())} value={empresa} label={'Empresa'} style={[containerstyle.inputs]} autoComplete='off' mode='outlined' />


                    <TextInput onChangeText={(text)=>setSenha(text)} value={senha} returnKeyType='go'secureTextEntry={true} autoCorrect={false} label={'Senha'} style={[containerstyle.inputs]} autoComplete='off' mode='outlined'  maxLength={32} />

                    <TextInput onChangeText={(text)=>setConfirmsenha(text)} value={confirmsenha} returnKeyType='go'secureTextEntry={true} autoCorrect={false} label={'Confirme sua senha'} style={[containerstyle.inputs]} autoComplete='off' mode='outlined'  maxLength={32} />


                    <Button  onPress={handleSubmit} buttonColor={theme.colors.primary} style={[containerstyle.inputs]} icon='account-plus-outline' mode='contained'>Atualizar</Button>

                    {isactive?
                        <Button  onPress={()=>{showConfirmDialogdeactive()}} buttonColor={theme.colors.primary} style={[containerstyle.inputs]} icon='account-cancel' mode='contained'>Desativar</Button>
                        :
                        <Button  onPress={()=>showConfirmDialogactive()} buttonColor={theme.colors.primary} style={[containerstyle.inputs]} icon='account-check-outline' mode='contained'>Ativar</Button>

                    }



                </View>
            </ScrollView>
        </SafeAreaView>
    )
}