import  React from 'react';
import { useState } from 'react';
import { Image , StyleSheet ,View } from 'react-native';
import { Modal, Text , useTheme} from 'react-native-paper';

type PresidentModalProps = {
  visible:boolean,
  handleHideModal:()=>void,
  cargo:Number,
}




function PresidentModal({visible,handleHideModal,cargo}:PresidentModalProps){
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
        <View style={styles.containerimg}>
          <Image style={styles.imgperfil} source={require('../../assets/melca-preisdnedt.jpg')} />
        </View>
        
        <Text style={{color:theme.colors.font, textAlign:'center',fontSize:20}}>Melca Farias</Text>
        <Text style={{color:theme.colors.font, textAlign:'center',fontSize:20}}>Presidente</Text>
      </Modal> 
    );
  }else if(cargo ==2){
    return (
      <Modal visible={visible} onDismiss={handleHideModal} contentContainerStyle={styles.modalcontainer}>
        <View style={styles.containerimg}>
          <Image style={styles.imgperfil} source={require('../../assets/camilla-vicepresidente.jpg')} />
        </View>
        
        <Text style={{color:theme.colors.font, textAlign:'center',fontSize:20}}>Camila Machado Arantes</Text>
        <Text style={{color:theme.colors.font, textAlign:'center',fontSize:20}}>Vice-Presidente</Text>
      </Modal> 
    );
  }else if(cargo ==3){
    return (
      <Modal visible={visible} onDismiss={handleHideModal} contentContainerStyle={styles.modalcontainer}>
        <View style={styles.containerimg}>
          <Image style={styles.imgperfil} source={require('../../assets/cristianelacerda-diretorasecretaria.jpg')} />
        </View>
        
        <Text style={{color:theme.colors.font, textAlign:'center',fontSize:20}}>Cristiane Lacerda Rodrigues Costa</Text>
        <Text style={{color:theme.colors.font, textAlign:'center',fontSize:20}}>Diretora Secretária</Text>
      </Modal> 
    );
  }else if(cargo ==4){
    return (
      <Modal visible={visible} onDismiss={handleHideModal} contentContainerStyle={styles.modalcontainer}>
        <View style={styles.containerimg}>
          <Image style={styles.imgperfil} source={require('../../assets/fatima-diretorafinanceira.png')} />
        </View>
        
        <Text style={{color:theme.colors.font, textAlign:'center',fontSize:20}}>Fátima Marques</Text>
        <Text style={{color:theme.colors.font, textAlign:'center',fontSize:20}}>Diretora Financeira</Text>
      </Modal> 
    );
  }


  
}




export  {PresidentModal};