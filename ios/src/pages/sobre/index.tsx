import React from 'react'

import { SafeAreaView , StyleSheet    ,View,ScrollView , Platform } from 'react-native';
import * as Linking from 'expo-linking';
import {Avatar, Button, Card, Text, useTheme, IconButton} from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles'

import { A } from '@expo/html-elements';




export default function Sobre({navigation}){


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
        }
    })

    async function menutoggle(){
        navigation.toggleDrawer()
    }

    async function openpolicy() {
        let mailurl = 'https://www.forumdasmulheresdenegocios.org/privacy_policy.html';
        const response = await Linking.canOpenURL(mailurl)
        if(response){
            await Linking.openURL(mailurl);
        }
    }

    async function sendemail() {
        let mailurl = 'mailto:suporte@heroica.com.br?subject=Suporte%20App%20Forum%20Mulheres';
        const response = await Linking.canOpenURL(mailurl)
        if(response){
            await Linking.openURL(mailurl);
        }
    }

    const LeftContent = props => <Avatar.Icon {...props} icon="mail" />

    const webavatar = props => <Avatar.Icon {...props} icon="web" />

    return(
        <SafeAreaView style={containerstyle.container}>

            <View style={{borderWidth:0,position:'relative',top:0,alignSelf:'flex-end',padding:5,zIndex:1000}}>
                <IconButton
                    mode={"outlined"}

                    style={{backgroundColor:theme.colors.primary, borderWidth:0 }}
                    icon="menu"

                    size={25}
                    onPress={menutoggle}
                />
            </View>

            <ScrollView style={{width:'100%'}}>
                <View style={{justifyContent:'center',flex:1,alignItems:'center'}}>

                    <Card mode="contained" style={containerstyle.cardcontainer}>
                        <Card.Title titleStyle={{color:theme.colors.font}} title="Sobre"  left={LeftContent} />
                        <Text style={{fontSize:25,marginVertical:10,color:theme.colors.font}}>Informações do App</Text>

                        <Text variant="bodyMedium" style={{fontSize:15,marginVertical:10,textAlign:'center',color:theme.colors.font}}>Fórum das Mulheres de Negócios.</Text>
                        <Text variant="bodyMedium" style={{fontSize:15,marginVertical:10,textAlign:'center',color:theme.colors.font}}>Versão 1.0.1</Text>
                        <Text variant="bodyMedium" style={{fontSize:15,marginVertical:10,textAlign:'center',color:theme.colors.font}}>Desenvolvido por Heroica Tecnologia.</Text>
                    </Card>

                    <Card  style={containerstyle.cardcontainer}>
                        <Card.Title titleStyle={{color:theme.colors.font}} title="Suporte"  left={LeftContent} />
                        <Card.Content>

                            <Text style={{color:theme.colors.font}} variant="bodyMedium">Para quaisquer dúvidas ou problemas, envie um e-mail para suporte@heroica.com.br</Text>
                            <Card.Actions>


                                <A style={{color:theme.colors.font,backgroundColor:theme.colors.primary,padding:10,paddingHorizontal:20,borderRadius:10}}
                                   href='mailto:suporte@heroica.com.br?subject=Suporte%20App%20Forum%20Mulheres'>
                                    <Icon size={20} color={'#181818'} name='paper-plane-o'/>
                                </A>


                            </Card.Actions>
                        </Card.Content>

                    </Card>

                    <Card  style={containerstyle.cardcontainer}>
                        <Card.Title titleStyle={{color:theme.colors.font}} title="Política de Privacidade"  left={webavatar} />
                        <Card.Content>
                            <Text style={{color:theme.colors.font}} variant="bodyMedium">Termos de Política de Privacidade.</Text>

                            <Card.Actions>

                                <A style={{color:theme.colors.font,backgroundColor:theme.colors.primary,padding:10,paddingHorizontal:20,borderRadius:10}}
                                   href='https://www.forumdasmulheresdenegocios.org/privacy_policy.html'>
                                    <Icon size={20} color={'#181818'} name='external-link'/>
                                </A>



                            </Card.Actions>
                        </Card.Content>

                    </Card>





                </View>

            </ScrollView>

        </SafeAreaView>

    )

}



export default Sobre