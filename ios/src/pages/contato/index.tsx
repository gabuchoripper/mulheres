import React from 'react'

import { SafeAreaView , StyleSheet    ,View,ScrollView , Platform } from 'react-native';
import * as Linking from 'expo-linking';
import {Avatar, Button, Card, Text, useTheme, IconButton} from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles'
import {A} from "@expo/html-elements";

export default function Contato({navigation}){

    const theme = useTheme();

    const url = Platform.OS == "ios" ? 'whatsapp://send?phone=5583981930549' : 'whatsapp://send?phone=+5583981930549'
    const urlinstagram = Platform.OS == 'ios' ?'instagram://user?username=forumdasmulheresdenegocios' : 'https://www.instagram.com/forumdasmulheresdenegocios/';

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

    const LeftContent = props => <Avatar.Icon {...props} icon="mail" /> 
    const phoneavatar = props => <Avatar.Icon {...props} icon="phone" /> 
    const webavatar = props => <Avatar.Icon {...props} icon="web" /> 
    

    async function sendemail() {
        let mailurl = 'mailto:contato@forumdasmulheresdenegocios.org';
        const response = await Linking.canOpenURL(mailurl)
        if(response){
            await Linking.openURL(mailurl);
        }
    }

    async function phone() {
        let url = 'tel:83981930549';
        const response = await Linking.canOpenURL(url)
        if(response){
            await Linking.openURL(url);
        }
    }

    async function whatsapp(){
       
        let url = Platform.OS == "ios" ? 'whatsapp://send?phone=5583981930549' : 'whatsapp://send?phone=+5583981930549' 
        const response = await Linking.canOpenURL(url);
        if(response){
            await Linking.openURL(url)
        }
        
    }

    async function youtube(){
        let url = 'https://www.youtube.com/channel/UCHI6uVZmBiKjgNiJgFsTfMw/featured';
        const response = await Linking.canOpenURL(url);
        if(response){
            await Linking.openURL(url)
        }
        
    }

    async function facebook(){
        let url = "fb://facewebmodal/f?href=https://www.facebook.com/ForumdasMulheresdeNegocios/"
        const response = await Linking.canOpenURL(url);
        if(response){
            await Linking.openURL(url)
        }
    }
    

    async function instagram(){
        let url = Platform.OS == 'ios' ?'instagram://user?username=forumdasmulheresdenegocios' : 'https://www.instagram.com/forumdasmulheresdenegocios/';
        const response = await Linking.canOpenURL(url);
        if(response){
            await Linking.openURL(url)
        }
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
                <Card.Title titleStyle={{color:theme.colors.font}} title="Contato"  left={LeftContent} />
                <Text style={{fontSize:25,marginVertical:10,color:theme.colors.font}}>Quer falar conosco?</Text>
                <Text variant="bodyMedium" style={{fontSize:15,marginVertical:10,textAlign:'center',color:theme.colors.font}}>Abaixo você encontrará algumas formas de falar conosco!!</Text>
            </Card>

            <Card  style={containerstyle.cardcontainer}>
                    <Card.Title titleStyle={{color:theme.colors.font}} title="E-Mail"  left={LeftContent} />
                    <Card.Content>
                    <Text style={{color:theme.colors.font}} variant="bodyMedium">contato@forumdasmulheresdenegocios.org</Text>
                    <Card.Actions>

                        <A style={{color:theme.colors.font,backgroundColor:theme.colors.primary,padding:10,paddingHorizontal:20,borderRadius:10}}
                           href='mailto:contato@forumdasmulheresdenegocios.org'>
                            <Icon size={20} color={'#181818'} name='paper-plane-o'/>
                        </A>

                        
                        
                    </Card.Actions>
                    </Card.Content>

            </Card>

            <Card  style={containerstyle.cardcontainer}>
                    <Card.Title titleStyle={{color:theme.colors.font}} title="Telefone/Whatsapp"  left={phoneavatar} />
                    <Card.Content>
                    <Text style={{color:theme.colors.font}} variant="bodyMedium">(83) 98193-0549</Text>
                    </Card.Content>
                    <Card.Actions>

                        <A style={{color:theme.colors.font,backgroundColor:theme.colors.primary,padding:10,paddingHorizontal:20,borderRadius:10}}
                           href='tel:83981930549'>
                            <Icon size={20} color={'#181818'} name='phone'/>
                        </A>




                        <A style={{color:theme.colors.font,backgroundColor:theme.colors.primary,padding:10,paddingHorizontal:20,borderRadius:10}}
                           href={url}>
                            <Icon size={20} color={'#181818'} name='whatsapp'/>
                        </A>
                        
                    </Card.Actions>

            </Card>

            <Card  style={containerstyle.cardcontainer}>
                    <Card.Title titleStyle={{color:theme.colors.font}} title="Redes Sociais"  left={webavatar} />
                    <Card.Content>
                    <Text style={{color:theme.colors.font}} variant="bodyMedium">Youtube, FaceBook e Instagram</Text>
                    </Card.Content>
                    <Card.Actions>


                        <A style={{color:theme.colors.font,backgroundColor:theme.colors.primary,padding:10,paddingHorizontal:20,borderRadius:10}}
                           href='https://www.youtube.com/channel/UCHI6uVZmBiKjgNiJgFsTfMw/featured'>
                            <Icon size={20} color={'#181818'} name='youtube'/>
                        </A>



                        <A style={{color:theme.colors.font,backgroundColor:theme.colors.primary,padding:10,paddingHorizontal:20,borderRadius:10}}
                           href="fb://facewebmodal/f?href=https://www.facebook.com/ForumdasMulheresdeNegocios/">
                            <Icon size={20} color={'#181818'} name='facebook'/>
                        </A>



                        <A style={{color:theme.colors.font,backgroundColor:theme.colors.primary,padding:10,paddingHorizontal:20,borderRadius:10}}
                           href={urlinstagram}>
                            <Icon size={20} color={'#181818'} name='instagram'/>
                        </A>
                    </Card.Actions>
            </Card>

            </View>

            </ScrollView>

            </SafeAreaView>


        

    );

}