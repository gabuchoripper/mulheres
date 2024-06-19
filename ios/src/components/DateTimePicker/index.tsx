import * as React from 'react'

import {SafeAreaView} from 'react-native'
import DateTimePicker, {DateType} from 'react-native-ui-datepicker';

import styles from "./styles"
import {Button} from "react-native-paper";



interface  DateTimePickerComponentProps{
    timePicker:boolean,
    onChange:(params: { date:DateType })=>Promise<void>,
    date:DateType,
    onConfirm:()=>void|Promise<void>
}
const DateTimePickerComponent = function ({timePicker,onChange,date,onConfirm}:DateTimePickerComponentProps){


    return(
        <SafeAreaView style={styles.container}>
            <DateTimePicker
                date={date}
                mode="single"
                onChange={onChange}
                locale={"ptBr"}
                timePicker={timePicker}
            />
            <Button onPress={onConfirm} mode={'contained'}>Ok</Button>
        </SafeAreaView>
    )
}

export {DateTimePickerComponent , DateTimePickerComponentProps}