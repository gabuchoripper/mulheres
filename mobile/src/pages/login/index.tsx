import React , {useState , useContext} from 'react'

import {SafeAreaView, StyleSheet, Text, Image, View} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {TextInput, Button, useTheme, IconButton} from 'react-native-paper';
import  Toast  from 'react-native-toast-message';
import styles from './styles'
import { AuthContext } from '../../contexts/authContext';
import { AxiosError } from 'axios';

export default function Login({navigation}){
    const theme = useTheme();

    const {signIn} = useContext(AuthContext)

    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');

    const insets = useSafeAreaInsets();
    const containerstyle = StyleSheet.create({
        container:{
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            flex:1,
            alignItems:'center',
            justifyContent:'center',
            backgroundColor: theme.colors.background,
            fontFamily: 'sans-serif'  
        }
    })

    async function handleLogin(){
        if(!email || !password){
            Toast.show({
                type:'error',
                text1:'Erro',
                text2:'Preencha todos os campos'
            })
            return;

        }

        try{
            signIn({email:email,password:password})
            console.log('sucesso')
        }
        catch(err: AxiosError|any)
        {
            Toast.show({
                type:'error',
                text1:'Erro',
                text2: err.response.data.message
            })
            console.log(err)
        }





    }

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
            <SafeAreaView  style={styles.containerimg} >
                <Image style={styles.imglogo}  source={require('../../assets/mulhereslogo.png')} />
            </SafeAreaView>
            <SafeAreaView style={styles.logincontainer}>
                <TextInput label={'E-Mail'} autoCapitalize='none' inputMode='email' keyboardType='email-address' textContentType='emailAddress' onChangeText={(text)=>setEmail(text.trim())} value={email} textColor={theme.colors.font} outlineColor={theme.colors.font} style={styles.loginitems} mode='outlined'  />
                <TextInput label={'Senha'}  onChangeText={(text)=>setPassword(text)} value={password} secureTextEntry={true} maxLength={32} textColor={theme.colors.font} outlineColor={theme.colors.font} style={styles.loginitems} mode='outlined'  />
                <Button  onPress={handleLogin} buttonColor={theme.colors.primary} style={styles.loginitems} icon='login' mode='contained'>Login</Button>
            </SafeAreaView>
        </SafeAreaView>
    );

}