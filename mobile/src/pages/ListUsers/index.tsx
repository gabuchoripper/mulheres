import React, {useContext, useEffect, useState} from "react";

import {SafeAreaView ,View , ScrollView ,Image , StyleSheet, FlatList} from 'react-native' ;
import {FontAwesome} from "@expo/vector-icons"
import {Avatar, Button, Card, Text, useTheme, Portal, TextInput, IconButton} from 'react-native-paper';
import {useNavigation} from "@react-navigation/native";

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {api} from '../../contexts/authContext'
import { AxiosError } from 'axios';

import styles from './styles'
type User = {
    name:string,
    id:string,
    email:string,
    empresa:string,
    active:boolean,
    admin:boolean,
    inactivedate:string
}


export default  function ListUsers({navigation}){


    const navigate = useNavigation();
    async function editUser(id:string){
        console.log(`passando id = ${id}`)


       navigation.navigate('Stack',{screen:'EditUser',params:{
            id:id
            }})

    }

    const [users, setUsers] = useState<User[]>([])
    const [searchuser , setSearchuser] = useState('');
    const insets = useSafeAreaInsets();

    useEffect(()=>{

        async function getusers(){
            const users = await api.get('/users')


            setUsers(users.data.users)
        }
         getusers()



    },[])

    useEffect(() => {
        async function getusers(){
            const data = {
                name:searchuser
            }
            const users = await api.get('/users',{
                params:{
                    name:searchuser
                }
            })

            setUsers(users.data.users)
        }
        getusers()
    }, [searchuser]);



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

        }
    })

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

                    <Card mode="contained" style={styles.cardcontainer}>
                        <Card.Title titleStyle={{color:theme.colors.font}} title="Usuários"  left={LeftContent} />
                        <Text style={{fontSize:25,marginVertical:10,color:theme.colors.font}}>Lista de usuários</Text>

                        <TextInput value={searchuser} onChangeText={setSearchuser} autoFocus={true} placeholder={'Procurar por...'} mode='flat' ></TextInput>
                    </Card>

                    {
                        users.length>0?
                        users.map((user)=>{
                        return(
                            <Card key={user.id} onPress={()=>editUser(user.id)} style={styles.cardcontainer}>
                                <Card.Title titleStyle={{color:theme.colors.font}} title={user.email}  left={Singleaccicon} />
                                <Card.Content>
                                    <Text style={{color:theme.colors.font}} variant="titleLarge">{user.name}</Text>
                                    <Text style={{color:'#00f',fontWeight:"900"}} variant="bodyMedium">Ver</Text>
                                </Card.Content>

                            </Card>
                        )
                    }):
                            <Card  style={styles.cardcontainer}>
                                <Card.Content>
                                    <Text style={{color:theme.colors.font}} variant="titleLarge">Nenhum usuário encontrado</Text>
                                </Card.Content>
                            </Card>
                    }


                </View>

            </ScrollView>
        </SafeAreaView>
    )

}