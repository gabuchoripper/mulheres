import React , {useState , useContext , useEffect} from 'react'
import { AuthContext , api } from '../../contexts/authContext'

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {SafeAreaView , ScrollView , View , StyleSheet} from 'react-native';
import {TextInput, Button, Text, useTheme, Card, Avatar, IconButton, Portal} from 'react-native-paper'
import  Toast from 'react-native-toast-message';
import { AxiosError } from 'axios';
import {DeleteAccModal} from "../../components/modals/DeleteAccModal";
import {PresidentModal} from "../../components/modals/PresidentModal";

type UserProps = {
    name?:string;
    email?:string;
    cnpj?:string;
    empresa?:string;
    id?:string;
}



function Profile({navigation}){

    const [visibleDeleteAccModal , setvisibleDeleteAccModal] = useState(false)

    async function hidevisibleDeleteAccModal(){
        setvisibleDeleteAccModal(false)
    }

    async function showvisibleDeleteAccModal(){
        setvisibleDeleteAccModal(true)
    }



    const {signOut} = useContext(AuthContext);
    const [user , setUser] = useState<UserProps>({})

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [id, setId] = useState('');

    async function handleupdateuser(){
        if(!name || !email || !cnpj || !empresa) {
            Toast.show({
                type:'error',
                text1:'Erro',
                text2:'Preencha todos os campos'
            })
            return;
        }

        const data = {cnpj:cnpj , name:name , id:id , email:email , empresa:empresa} as UserProps

        const response = await api.patch('/users/update' ,data ).then((r)=>{
            Toast.show({
                type:'success',
                text1:'Sucesso',
                text2:'Atualizado com sucesso'
            })
        }).catch((err: AxiosError | any)=>{
            Toast.show({
                type:'error',
                text1:'Erro',
                text2:err.response.data.message
            })
            console.log(err)
        })
    }


    const insets = useSafeAreaInsets();
    const theme = useTheme();
    const LeftContent = props => <Avatar.Icon {...props} icon="account-circle" /> 
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
            marginVertical:5
        },
        inputs:{
            width:'90%',
            marginVertical:5
        }
    })
    
    useEffect(()=>{
        if(!!user.name){
            setName(user.name);
        }

        if(!!user.email){
            setEmail(user.email);
        }

        if(!!user.cnpj){
            setCnpj(user.cnpj);
        }

        if(!!user.empresa){
            setEmpresa(user.empresa);
        }

        if(!!user.id){
            setId(user.id);
        }
        
    },[user])
    

    useEffect(()=>{

     async function getuserdata(){
        try{
            const response = await api.get('/users/me')
            
            setUser(response.data.user)
        }catch(err: AxiosError | any){
            Toast.show({
                type:'error',
                text1:'Erro',
                text2:'Erro ao obter dados do usuário'
            })
            console.log(err.response.data)
        }
        
     }
     getuserdata()
        
    },[])


    async function menutoggle(){
        navigation.toggleDrawer()
    }

    async function delete_acc(){
        await showvisibleDeleteAccModal();
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
                        <Card.Title titleStyle={{color:theme.colors.font }} title="Minha conta"  left={LeftContent} />
                        <Text style={{fontSize:25,marginVertical:10,color:theme.colors.font}}>Bem-vindo, {user.name}</Text>
                    </Card>

                    <TextInput label='Nome' onChangeText={(text)=>setName(text)} value={name} style={[containerstyle.inputs]} textColor={theme.colors.font} outlineColor={theme.colors.font} autoComplete='off' mode='outlined'/>

                    <TextInput label='Email' autoCapitalize='none' inputMode='email' keyboardType='email-address' textContentType='emailAddress' onChangeText={(text)=>setEmail(text.trim())} value={email} style={[containerstyle.inputs]} textColor={theme.colors.font} outlineColor={theme.colors.font} autoComplete='off' mode='outlined'/>

                    <TextInput label='CNPJ' keyboardType={"phone-pad"} onChangeText={(text)=>setCnpj(text)} value={cnpj} style={[containerstyle.inputs]} textColor={theme.colors.font} outlineColor={theme.colors.font} autoComplete='off' mode='outlined' />
                    <TextInput label='Empresa' onChangeText={(text)=>setEmpresa(text)} value={empresa} style={[containerstyle.inputs]} textColor={theme.colors.font} outlineColor={theme.colors.font} autoComplete='off' mode='outlined' />

                    <View style={{flexDirection:'row' , justifyContent:'space-between' , width:'90%'}}>
                        <Button mode='contained' style={{backgroundColor:'#28a745'}} onPress={handleupdateuser}>Salvar</Button>
                        <Button mode='contained' onPress={signOut}>Sair da conta</Button>
                    </View>



                    <View style={{flexDirection:'row' , alignItems:'flex-end' , width:'90%',marginTop:30}}>
                        <Button mode='contained' style={{backgroundColor:'#e33636',}} onPress={delete_acc}>Deletar Conta</Button>
                    </View>
                

                </View>
            </ScrollView>

            <Portal>
                <DeleteAccModal  visible={visibleDeleteAccModal} handleHideModal={hidevisibleDeleteAccModal}/>
            </Portal>

        </SafeAreaView>
    )
    

}

export default Profile