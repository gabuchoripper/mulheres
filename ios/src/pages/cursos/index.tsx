import React , {useContext , useEffect , useState} from "react";

import {SafeAreaView ,View , ScrollView ,Image , StyleSheet } from 'react-native' ;
import {FontAwesome} from "@expo/vector-icons" 
import {Avatar, Button, Card, Text, useTheme, Portal, IconButton} from 'react-native-paper';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CursosModal  } from "../../components/modals/CursosModal";
import {api ,AuthContext} from "../../contexts/authContext";


import styles from './styles'
import { useIsFocused} from "@react-navigation/native";


type CursoProps = {
    id: string,
    name: string,
    descricao: string,
    professor:string,
    local:string,
    data: string,
    vagas: string,
    label:string,
    created_at:string,
    updated_at: string
}



export default function Cursos({navigation}){
    const {isAdmin} = useContext(AuthContext)
    const [cursos , setCursos] = useState<CursoProps[]>([])

    const isfocused = useIsFocused()



    async function vercurso(id:string){


        navigation.navigate('Stack',{screen:'Curso',params:{
                id:id
            }})
    }

    async function searchcursos(){
        const response = await api.get('/cursos')
        setCursos(response.data)
        console.log(response.data)
    }

    useEffect(()=>{

        searchcursos()
        navigation.closeDrawer();
    },[isfocused])

    const [visiblePresidentModal , setVisiblePresidentModal] = useState(false)
    const [cargo , setCargo] = useState<Number>(1);



    function hidePresidentModal(){
        /*setVisiblePresidentModal(false)*/
    }

    


    const insets = useSafeAreaInsets();
    const LeftContent = props => <Avatar.Icon {...props} icon="school-outline" /> 
    const PresidentsContent = props => <Avatar.Icon {...props} icon="note-text" /> 
    const VicePresidentsContent = props => <Avatar.Icon {...props} icon="note-text" /> 
    
    const cashierContent = props => <Avatar.Icon {...props} icon="note-text" /> 
    

    
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

    const pad = function(num:number) { return ('00'+num).slice(-2) };

    async function oncreatecurso(){
        navigation.navigate('Stack',{
            screen:'CreateCurso'
        })
    }

    
    return (
        <SafeAreaView style={containerstyle.container}>

            <View style={{borderWidth:0,position:'relative',top:0,alignSelf:'flex-end',padding:5,zIndex:1000}}>
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
                    <Card.Title titleStyle={{color:theme.colors.font}} title="Cursos"  left={LeftContent} />
                    <Text style={{fontSize:25,marginVertical:10,color:theme.colors.font}}>Lista de cursos</Text>
                    {isAdmin?<Button onPress={oncreatecurso} mode={"contained"}>Novo curso</Button>:''}

                </Card>


                    {cursos.map((curso)=>{
                            let objdate = (!!curso.data)?new Date(curso.data):false;
                            let strdate = '';
                            if(!!objdate){
                                strdate = `${pad(objdate.getDate())}/${pad(objdate.getMonth()+1)}/${objdate.getFullYear()} ${pad(objdate.getHours())}:${pad(objdate.getMinutes())}`;
                            }
                        return(
                            <Card key={curso.id} onPress={()=>vercurso(curso.id)} style={styles.cardcontainer}>
                                <Card.Title titleStyle={{color:theme.colors.font}} title={curso.name}  left={PresidentsContent} />
                                <Card.Content>
                                    <Text style={{color:theme.colors.font}} variant="titleLarge">{curso.name}</Text>
                                    <Text style={{color:theme.colors.font}} variant="titleLarge">Data: {strdate} - Vagas: {curso.vagas}</Text>
                                    <Text style={{color:'#00f',fontWeight:"900"}} variant="bodyMedium">Ver Mais</Text>
                                </Card.Content>

                            </Card>
                        )
                    }

                    )}
                



                    
                </View>
                

                 
            </ScrollView>

            
           
        </SafeAreaView>
        
    )
};