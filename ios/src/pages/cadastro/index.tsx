import React , {useState} from 'react'

import { SafeAreaView , StyleSheet  ,ScrollView,View} from 'react-native'
import {useTheme, Card, Text, Avatar, TextInput, Button, IconButton} from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import { setupApi } from '../../utils/api';
import { AxiosError } from 'axios';

export default function Cadastro({navigation}){

    const api = setupApi();

    const [nome , setNome] = useState('');
    const [email , setEmail] = useState('');
    const [senha , setSenha] = useState('');
    const [confirmsenha , setConfirmsenha] = useState('');
    const [cnpj , setCnpj] = useState('');
    const [empresa , setEmpresa] = useState('');

    


    async function handleSubmit() {
        if(!nome || !email || !cnpj || !empresa){
            Toast.show({
                type:'error',
                text1:'Erro',
                text2:'Preencha todos os dados'
            })
            return;
        }

        if(senha  != confirmsenha){
            Toast.show({
                type:'error',
                text1:'Erro',
                text2:'Senhas não coincidem'
            })
            return;
        }

        if(senha.length<4 || senha.length > 32){
            Toast.show({
                type:'error',
                text1:'Erro',
                text2:'Senha deve ter entre 4 e 32 dígitos!!'
            })
            return;
        }

        const user = {
            name:nome,
            email:email,
            password:senha,
            cnpj:cnpj,
            empresa:empresa,
            admin:false
        }


        try{
            const response = await api.post('/users/create',user)
            Toast.show({
                type:'success',
                text1:'Sucesso',
                text2: 'Cadastro feito com sucesso!!'
            })

            navigation.navigate('Listar Usuários')
        }catch(err :AxiosError|any){
            
            Toast.show({
                type:'error',
                text1:'Erro',
                text2: err.response.data.message
            })
            return;
        }

       

    }


    const theme = useTheme();

    const insets = useSafeAreaInsets();
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
    const LeftContent = props => <Avatar.Icon {...props} icon="account-plus-outline" />


    async function menutoggle(){



        navigation.toggleDrawer()
    }

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
            <View style={{justifyContent:'center',flex:1,alignItems:'center'}}>

            <Card mode="contained" style={containerstyle.cardcontainer}>
                <Card.Title titleStyle={{color:theme.colors.font}} title="Cadastro"  left={LeftContent} />
                <Text style={{fontSize:25,marginVertical:10,color:theme.colors.font}}>Cadastrar novo usuário</Text>
                <Text variant="bodyMedium" style={{fontSize:15,marginVertical:10,textAlign:'center',color:theme.colors.font}}>Preencha os dados abaixo</Text>
            </Card>

            <TextInput onChangeText={(text)=>setNome(text)} value={nome} label={'Nome'} style={[containerstyle.inputs]} autoComplete='off' mode='outlined' />
            <TextInput autoCapitalize='none' inputMode='email' keyboardType='email-address' textContentType='emailAddress' onChangeText={(text)=>setEmail(text.trim())} value={email} label={'E-Mail'} style={[containerstyle.inputs]} autoComplete='off' mode='outlined' />
            <TextInput onChangeText={(text)=>setSenha(text)} value={senha} returnKeyType='go'secureTextEntry={true} autoCorrect={false} label={'Senha'} style={[containerstyle.inputs]} autoComplete='off' mode='outlined'  maxLength={32} />
            
            <TextInput onChangeText={(text)=>setConfirmsenha(text)} value={confirmsenha} returnKeyType='go'secureTextEntry={true} autoCorrect={false} label={'Confirme sua senha'} style={[containerstyle.inputs]} autoComplete='off' mode='outlined'  maxLength={32} />
            
            
            <TextInput onChangeText={(text)=>setCnpj(text)} value={cnpj} label={'CNPJ'} style={[containerstyle.inputs]} autoComplete='off' mode='outlined' />
            <TextInput onChangeText={(text)=>setEmpresa(text)} value={empresa} label={'Empresa'} style={[containerstyle.inputs]} autoComplete='off' mode='outlined' />

            <Button  onPress={handleSubmit} buttonColor={theme.colors.primary} style={[containerstyle.inputs]} icon='account-plus-outline' mode='contained'>Cadastrar</Button>

            </View>
            </ScrollView>
        </SafeAreaView>

    )

}