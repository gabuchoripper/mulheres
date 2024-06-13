import  React from 'react';
import { useState } from 'react';
import { Image , StyleSheet ,View } from 'react-native';
import { Modal, Text , useTheme} from 'react-native-paper';

type PresidentModalProps = {
    visible:boolean,
    handleHideModal:()=>void,
    inscritos:InscritosProps[],
}

type InscritosProps = {
    id:string,
    name:string
}




function ListaInscritosCurso({visible,handleHideModal,inscritos}:PresidentModalProps){
    const theme = useTheme();

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


        return(
                <Modal visible={visible} onDismiss={handleHideModal} contentContainerStyle={styles.modalcontainer}>
                    <Text style={{color:theme.colors.font, textAlign:'center',fontSize:20}}>Inscritos: {inscritos.length}</Text>
                    {inscritos.map((inscrito)=><Text key={inscrito.id} style={{color:theme.colors.font, textAlign:'center',fontSize:20}}>{inscrito.name}</Text>)}
                </Modal>
        )





}




export  {ListaInscritosCurso};