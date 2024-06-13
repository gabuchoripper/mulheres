import React , {useContext , useState} from "react";

import {SafeAreaView ,View , ScrollView ,Image , StyleSheet , Button as Buttonmenu} from 'react-native' ;
import {FontAwesome} from "@expo/vector-icons" 
import { Avatar, Button, Card, Text, useTheme , Portal,IconButton} from 'react-native-paper';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PresidentModal  } from "../../components/modals/PresidentModal";


import styles from './styles'




export default function Dashboard({navigation}){
    const [visiblePresidentModal , setVisiblePresidentModal] = useState(false)
    const [cargo , setCargo] = useState<Number>(1);

    function showPresidentModal(funcao:Number){
        setCargo(funcao)
        setVisiblePresidentModal(true)
    }

    function hidePresidentModal(){
        setVisiblePresidentModal(false)
    }

    


    const insets = useSafeAreaInsets();
    const LeftContent = props => <Avatar.Icon {...props} icon="account-group" /> 
    const PresidentsContent = props => <Avatar.Icon {...props} icon="account-cog" /> 
    const VicePresidentsContent = props => <Avatar.Icon {...props} icon="account-cog-outline" /> 
    
    const cashierContent = props => <Avatar.Icon {...props} icon="account-cash" /> 
    

    
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



    return (
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
                    <Card.Title titleStyle={{color:theme.colors.font}} title="Quem somos"  left={LeftContent} />
                    <Text style={{fontSize:25,marginVertical:10,color:theme.colors.font}}>Conheça o Fórum das Mulheres de Negócios</Text>
                    <Text variant="bodyMedium" style={{fontSize:15,marginVertical:10,textAlign:'center',color:theme.colors.font}}>Somos uma associação, sem fins lucrativos, de caráter empreendedor, com atividades voltadas ao desenvolvimento das associadas. A nossa missão é fomentar o empreendedorismo feminino, inspirando e revelando novas empreendedoras que buscam a excelência nos negócios e na sociedade!</Text>
                </Card>
                <View style={{justifyContent:'center',flex:1,alignItems:'center'}}>
                    <Text style={{fontSize:35,marginVertical:10,fontWeight:"bold",color:theme.colors.font}}>Diretoria</Text>
                </View>
                

                <Card onPress={()=>showPresidentModal(1)} style={styles.cardcontainer}>
                    <Card.Title titleStyle={{color:theme.colors.font}} title="Presidente"  left={PresidentsContent} />
                    <Card.Content>
                    <Text style={{color:theme.colors.font}} variant="titleLarge">Melca Farias</Text>
                    <Text style={{color:'#00f',fontWeight:"900"}} variant="bodyMedium">Ver Mais</Text>
                    </Card.Content>

                </Card>
                <Card onPress={()=>showPresidentModal(2)} style={styles.cardcontainer}>
                    <Card.Title titleStyle={{color:theme.colors.font}} title="Vice-Presidente"  left={VicePresidentsContent} />
                    <Card.Content>
                    <Text style={{color:theme.colors.font}} variant="titleLarge">Camila Machado Arantes</Text>
                    <Text style={{color:'#00f',fontWeight:"900"}} variant="bodyMedium">Ver Mais</Text>
                    </Card.Content>
                
                </Card>

                

                <Card onPress={()=>showPresidentModal(3)} style={styles.cardcontainer}>
                    <Card.Title titleStyle={{color:theme.colors.font}} title="Diretora Secretária"  left={LeftContent} />
                    <Card.Content>
                    <Text style={{color:theme.colors.font}} variant="titleLarge">Cristiane Lacerda</Text>
                    <Text style={{color:'#00f',fontWeight:"900"}} variant="bodyMedium">Ver Mais</Text>
                    </Card.Content>
                
                </Card>

                <Card onPress={()=>showPresidentModal(4)} style={styles.cardcontainer}>
                    <Card.Title titleStyle={{color:theme.colors.font}} title="Diretora Financeira"  left={cashierContent} />
                    <Card.Content>
                    <Text style={{color:theme.colors.font}} variant="titleLarge">Fátima Marques</Text>
                    <Text style={{color:'#00f',fontWeight:"900"}} variant="bodyMedium">Ver Mais</Text>
                    </Card.Content>
                
                </Card>     
                </View>
                

                 
            </ScrollView>
            <Portal>
                <PresidentModal cargo={cargo} visible={visiblePresidentModal} handleHideModal={hidePresidentModal}/>
            </Portal>
            
           
        </SafeAreaView>
        
    )
};