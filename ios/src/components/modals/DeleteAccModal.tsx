import  React from 'react';
import {useContext} from "react";
import {api,AuthContext} from "../../contexts/authContext";
import {  StyleSheet ,View } from 'react-native';
import {Button, Modal, Text, useTheme} from 'react-native-paper';
import  Toast from 'react-native-toast-message';

type DeleteAccModalProps = {
    visible:boolean,
    handleHideModal:()=>void
}




function DeleteAccModal({visible,handleHideModal}:DeleteAccModalProps){
    const theme = useTheme();
    const {signOut} = useContext(AuthContext)

    async function delete_acc_confirmed(){

        await api.delete('/users/deleteuserbyapp').then((response)=>{
            Toast.show({
                type:'success',
                text1:'Exclusão',
                text2:'Conta encerrada com sucesso!'
            })

        }).catch((error)=>{
            console.log(error)
            Toast.show({
                type:'error',
                text1:'Exclusão',
                text2:'Erro ao excluir, tente novamente mais tarde'
            })
        }).finally(()=>{
            handleHideModal();
            signOut();
        })


    }

    const styles = StyleSheet.create({
        imgperfil:{
            flex: 1,
            width: null,
            height: null,
            resizeMode: 'contain'

        },
        containerimg:{
            width:'100%',
            height:'60%'
        },modalcontainer:{
            backgroundColor: theme.colors.background ,
            paddingVertical:3,
            paddingHorizontal:5,
            borderColor:theme.colors.primary,
            borderWidth:4

        }
    })


    return (
        <Modal visible={visible} onDismiss={handleHideModal} contentContainerStyle={styles.modalcontainer}>
            <Text style={{color:theme.colors.font, textAlign:'center',fontSize:20}}>Deseja realmente deletar sua conta?</Text>
            <View style={{flexDirection:'row' , justifyContent:'space-between' , width:'90%',marginTop:30,marginBottom:15}}>
                <Button mode='contained' style={{backgroundColor:'#28a745'}} onPress={delete_acc_confirmed}>Sim</Button>
                <Button mode='contained' onPress={handleHideModal}>Não</Button>
            </View>

        </Modal>
    );



}




export  {DeleteAccModal};