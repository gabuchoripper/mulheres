import * as React from 'react';
import {Appearance} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {PaperProvider , useTheme , DefaultTheme} from 'react-native-paper'
import Dashboard from '../../pages/dashboard';
import Login from '../../pages/login';


const Tab = createBottomTabNavigator();

function MenuBottomGuest() {
    const lightTheme = {
        ...DefaultTheme,
        roundness:2,
        colors:{
          primary:'#dba99e',
          background:'#fff',
          accent:'#550000',
          danger:'#ed1c24',
          font:'#181818'
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
          font:'#eee'
        }
      }
    const colorscheme  = Appearance.getColorScheme();
    let currenttheme ={};
  
  
    if(colorscheme =='light'){
      currenttheme=darktheme;
    }else{
      currenttheme=darktheme;
    }

  return (
    <Tab.Navigator initialRouteName='Login'>
        <Tab.Screen options={{headerShown:false}} name="Quem somos" component={Dashboard}  />
        <Tab.Screen options={{headerShown:false}} name="Login" component={Login} />
  </Tab.Navigator>
  );
}

export default MenuBottomGuest;
