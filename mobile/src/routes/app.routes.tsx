import React, {useState, useContext, useEffect} from 'react';
import {useWindowDimensions , StatusBar}from 'react-native'
import Dashboard from '../pages/dashboard';
import Cursos from '../pages/cursos';
import Curso from '../pages/curso';
import Eventos from '../pages/eventos';
import Evento from '../pages/evento';
import Editevento from "../pages/editevento";

import CreateEvento from "../pages/CreateEvento";
import Contato from '../pages/contato';
import ListUsers from "../pages/ListUsers";
import CreateCurso from "../pages/CreateCurso";
import Editcurso from "../pages/editcurso";
import Sobre from '../pages/sobre'

import EditUser from "../pages/editUser";

import Associadas from '../pages/associadas';
import Profile from '../pages/profile';
import { PaperProvider  , DefaultTheme,Text, overlay } from 'react-native-paper'
import { Appearance } from 'react-native';
import MenuBottomGuest from '../components/menubottomguest';

//import {createNativeStackNavigator } from '@react-navigation/native-stack'

import { createDrawerNavigator } from '@react-navigation/drawer';

import { createNativeStackNavigator  } from '@react-navigation/native-stack';
import Cadastro from '../pages/cadastro';
import {AuthContext} from '../contexts/authContext';
import * as ImagePicker from "expo-image-picker";

const Stack = createNativeStackNavigator();

export type RoutesNavigateParams = {
    Dashboard:undefined;
}
const lightTheme = {
  ...DefaultTheme,
  roundness:2,
  colors:{
    primary:'#dba99e',
    background:'#fcedf8',
    accent:'#550000',
    danger:'#ed1c24',
    font:'#181818',
    onSurfaceVariant: '#181818'
  }
}


const darktheme = {
  ...DefaultTheme,
  roundness:2,
  colors:{
    primary:'#ffdbd4',
    background:'#181818',
    accent:'#bbaaaa',
    danger:'#ed1c24',
    font:'#eee',
    onSurfaceVariant: '#eee'
  }
}


const colorscheme  = Appearance.getColorScheme();


const Drawer = createDrawerNavigator();



function DrawerMenu() {



  const dimensions = useWindowDimensions();



  return (
    
        <Drawer.Navigator defaultStatus='open' screenOptions={{
          drawerType: dimensions.width >= 768 ? 'permanent' : 'front'
        }}  >
          <Drawer.Screen  name="Quem somos" component={Dashboard} options={{headerShown:false,unmountOnBlur:true}}/>
          <Drawer.Screen  name="Sobre" component={Sobre} options={{headerShown:false,unmountOnBlur:true}}/>
          <Drawer.Screen name="Contato" component={Contato} options={{headerShown:false,unmountOnBlur:true}}/>
          <Drawer.Screen name="Cadastro" component={Cadastro} options={{headerShown:false,unmountOnBlur:true}}/>
          <Drawer.Screen name="Listar Usuários" component={ListUsers} options={{headerShown:false,unmountOnBlur:true}}/>
          <Drawer.Screen name="Minha conta" component={Profile} options={{headerShown:false,unmountOnBlur:true}}/>
          <Drawer.Screen name="Associadas" component={Associadas} options={{headerShown:false,unmountOnBlur:true}}/>
          <Drawer.Screen name="Cursos" component={Cursos} options={{headerShown:false,unmountOnBlur:true}}/>
          <Drawer.Screen name="Eventos" component={Eventos} options={{headerShown:false,unmountOnBlur:true}}/>
        </Drawer.Navigator>

       
        
    
    
  );
}

function StackMenu(){
  return(
      <Stack.Navigator>
        <Stack.Screen name="EditUser" component={EditUser} options={{ headerShown: false,unmountOnBlur:true   }} />
        <Stack.Screen name="EditCurso" component={Editcurso} options={{ headerShown: false,unmountOnBlur:true   }} />
        <Stack.Screen name="Evento" component={Evento} options={{headerShown:false,unmountOnBlur:true}}/>
        <Stack.Screen name="Editevento" component={Editevento} options={{headerShown:false,unmountOnBlur:true}}/>
        <Stack.Screen name="Curso" component={Curso} options={{headerShown:false,unmountOnBlur:true}}/>
        <Stack.Screen name="CreateCurso" component={CreateCurso} options={{headerShown:false,unmountOnBlur:true}}/>
        <Stack.Screen name="CreateEvento" component={CreateEvento} options={{headerShown:false,unmountOnBlur:true}}/>
      </Stack.Navigator>
      )
}

function AppRoutes() {
  const dimensions = useWindowDimensions();

  const {isAdmin} = useContext(AuthContext);

  let currenttheme ={};
  
  
  if(colorscheme =='light'){
    currenttheme=lightTheme;
  }else{
    currenttheme=lightTheme;
  }
  const bartheme = `${colorscheme}-content`

  if(isAdmin){

      return (

        <>
          <StatusBar barStyle={bartheme} />
          <PaperProvider theme={currenttheme}>

            <Drawer.Navigator defaultStatus='open' screenOptions={{
              drawerType: dimensions.width >= 768 ? 'permanent' : 'front'
            }}  >
              <Drawer.Screen name="Quem somos" component={Dashboard} options={{headerShown:false,unmountOnBlur:true}}/>
              <Drawer.Screen name="Sobre" component={Sobre} options={{headerShown:false,unmountOnBlur:true}}/>
              <Drawer.Screen name="Contato" component={Contato} options={{headerShown:false,unmountOnBlur:true}}/>
              <Drawer.Screen name="Cadastro" component={Cadastro} options={{headerShown:false,unmountOnBlur:true}}/>
              <Drawer.Screen name="Listar Usuários" component={ListUsers} options={{headerShown:false,unmountOnBlur:true}}/>
              <Drawer.Screen name="Minha conta" component={Profile} options={{headerShown:false,unmountOnBlur:true}}/>
              <Drawer.Screen name="Associadas" component={Associadas} options={{headerShown:false,unmountOnBlur:true}}/>
              <Drawer.Screen name="Cursos" component={Cursos} options={{headerShown:false,unmountOnBlur:true}}/>
              <Drawer.Screen name="Eventos" component={Eventos} options={{headerShown:false,unmountOnBlur:true}}/>
              <Drawer.Screen name="Stack"  component={StackMenu} options={{headerShown:false,drawerItemStyle: { height: 0 }}}/>

            </Drawer.Navigator>



          </PaperProvider>
        </>


    );
  }else{
    return (

        <>
          <StatusBar barStyle={bartheme} />
          <PaperProvider theme={currenttheme}>

            <Drawer.Navigator defaultStatus='open' screenOptions={{
              drawerType: dimensions.width >= 768 ? 'permanent' : 'front'
            }}  >
                <Drawer.Screen name="Quem somos" component={Dashboard} options={{headerShown:false,unmountOnBlur:true}}/>
                <Drawer.Screen name="Sobre" component={Sobre} options={{headerShown:false,unmountOnBlur:true}}/>
                <Drawer.Screen name="Contato" component={Contato} options={{headerShown:false,unmountOnBlur:true}}/>
                <Drawer.Screen name="Minha conta" component={Profile} options={{headerShown:false,unmountOnBlur:true}}/>
                <Drawer.Screen name="Associadas" component={Associadas} options={{headerShown:false,unmountOnBlur:true}}/>
                <Drawer.Screen name="Cursos" component={Cursos} options={{headerShown:false,unmountOnBlur:true}}/>
                <Drawer.Screen name="Eventos" component={Eventos} options={{headerShown:false,unmountOnBlur:true}}/>
                <Drawer.Screen name="Stack"  component={StackMenu} options={{headerShown:false,drawerItemStyle: { height: 0 }}}/>

            </Drawer.Navigator>



          </PaperProvider>
        </>


    );
  }


}

export default AppRoutes;

/*
<Stack.Screen name="BottomMenu" component={MenuBottomGuest} options={{ headerShown: false }} />


*/