import  React from 'react';
import { useState } from 'react';
import { Image , StyleSheet ,View } from 'react-native';
import { Modal, Text , useTheme} from 'react-native-paper';
import { StretchInY } from 'react-native-reanimated';

type PresidentModalProps = {
  visible:boolean,
  handleHideModal:()=>void,
  cargo:Number,
}




function EventosModal({visible,handleHideModal,cargo}:PresidentModalProps){
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

  


  if(cargo == 1){
    return (
      <Modal visible={visible} onDismiss={handleHideModal} contentContainerStyle={styles.modalcontainer}>
        <Text style={{color:theme.colors.font, textAlign:'center',fontSize:20}}>Evento 1 - 01/10/2023 10:00</Text>
        <Text style={{color:theme.colors.font, textAlign:'center',fontSize:20}}>Local Evento 1</Text>
        <Text style={{color:theme.colors.font, textAlign:'center',fontSize:20}}>Lorem Ipsum Evento 1...</Text>
      </Modal> 
    );
  }else if(cargo ==2){
    return (
      <Modal visible={visible} onDismiss={handleHideModal} contentContainerStyle={styles.modalcontainer}>
        <Text style={{color:theme.colors.font, textAlign:'center',fontSize:20}}>Evento 2 - 02/10/2023 10:00</Text>
        <Text style={{color:theme.colors.font, textAlign:'center',fontSize:20}}>Local Evento 2</Text>
        <Text style={{color:theme.colors.font, textAlign:'center',fontSize:20}}>Lorem Ipsum Evento 2...</Text>
      </Modal> 
    );
  }else if(cargo ==3){
    return (
    <Modal visible={visible} onDismiss={handleHideModal} contentContainerStyle={styles.modalcontainer}>
      <Text style={{color:theme.colors.font, textAlign:'center',fontSize:20}}>Evento 3 - 03/10/2023 10:00</Text>
      <Text style={{color:theme.colors.font, textAlign:'center',fontSize:20}}>Local Evento 3</Text>
      <Text style={{color:theme.colors.font, textAlign:'center',fontSize:20}}>Lorem Ipsum Evento 3...</Text>
    </Modal> 
    );
  }
  
}




export  {EventosModal};