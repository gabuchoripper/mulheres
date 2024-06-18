import { StatusBar } from 'expo-status-bar';
import { StyleSheet,SafeAreaView } from 'react-native';
import Routes from './src/routes';
import 'react-native-gesture-handler';
import  Toast  from 'react-native-toast-message';
import { AuthProvider } from './src/contexts/authContext';

import { NavigationContainer } from '@react-navigation/native';

import { registerTranslation } from 'react-native-paper-dates'
registerTranslation('pt', {
  save: 'Salvar',
  selectSingle: 'Selecionar data',
  selectMultiple: 'Selecionar datas',
  selectRange: 'Selecionar periodo',
  notAccordingToDateFormat: (inputFormat) =>
      `Formato de data deve estar em ${inputFormat}`,
  mustBeHigherThan: (date) => `Deve ser depois de ${date}`,
  mustBeLowerThan: (date) => `Deve ser antes de ${date}`,
  mustBeBetween: (startDate, endDate) =>
      `Deve estar entre ${startDate} - ${endDate}`,
  dateIsDisabled: 'Dia não permitido',
  previous: 'Anterior',
  next: 'Próximo',
  typeInDate: 'Digite a data',
  pickDateFromCalendar: 'Selecione no calendário',
  close: 'Fechar',
})

console.log("teste")
export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Routes/>
        <Toast  visibilityTime={5000} autoHide={true}/>
      </AuthProvider>
    </NavigationContainer>   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
