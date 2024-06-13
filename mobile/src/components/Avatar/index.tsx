import React, { useState, useEffect } from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet ,PermissionsAndroid} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import {api} from "../../contexts/authContext";
// @ts-ignore
export default function UploadImage({id}) {


    async function uriToBlob (uri:string) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            xhr.onload = function () {
                // return the blob
                resolve(xhr.response)
            }
            xhr.onerror = function () {
                reject(new Error('uriToBlob failed'))
            }
            xhr.responseType = 'blob'
            xhr.open('GET', uri, true)

            xhr.send(null)})
    }

    useEffect(()=>{

        async function checkForCameraRollPermission(){

            console.log('pegando permissoes galeria')

            const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
            if (status !== 'granted') {


                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.CAMERA,
                        {
                            title: 'Fórum das Mulheres',
                            message:
                                'Fórum das Mulheres precisa acessar sua câmera.' ,
                            buttonNeutral: 'Perguntar depois',
                            buttonNegative: 'Negar',
                            buttonPositive: 'Permitir',
                        },
                    );
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {

                    } else {
                        console.log('Camera permission denied');
                    }
                } catch (err) {
                    console.warn(err);
                }
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
                        {
                            title: 'Fórum das Mulheres',
                            message:
                                'Fórum das Mulheres precisa acessar sua Galeria.' ,
                            buttonNeutral: 'Perguntar depois',
                            buttonNegative: 'Negar',
                            buttonPositive: 'Permitir',
                        },
                    );
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {

                    } else {
                        console.log('Camera permission denied');
                    }
                } catch (err) {
                    console.warn(err);
                }

            }else{
                console.log('Media Permissions are granted')
            }

        }


        checkForCameraRollPermission()
    },[])

    const [image, setImage] = useState('');
    const addImage = async () => {
        let _image : ImagePicker.ImagePickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection:false,
            selectionLimit:1,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1,
        });

        if (!_image.canceled) {

            _image.assets?.map(async (imageasset)=>{
                setImage(imageasset.uri);

                console.log(imageasset);


                const blob = await uriToBlob(imageasset.uri)
                console.log('blob = ');
                console.log(blob);

                const data = new FormData();
                // @ts-ignore
                data.append('file', {blob});
                data.append('id' , id);

                console.log(data)

                try{
                    const response  = await api.patch('/users/updatepicture' ,data )
                    console.log(response.data);
                }catch (err){
                    console.log(err);
                }
            })



        }
    };
    return (
        <View style={imageUploaderStyles.container}>
            {
                image  && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
            }
            <View style={imageUploaderStyles.uploadBtnContainer}>
                <TouchableOpacity onPress={addImage} style={imageUploaderStyles.uploadBtn} >
                    <Text>{image ? 'Edit' : 'Upload'} Image</Text>
                    <AntDesign name="camera" size={20} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
}
const imageUploaderStyles=StyleSheet.create({
    container:{
        elevation:2,
        height:200,
        width:200,
        backgroundColor:'#efefef',
        position:'relative',
        borderRadius:999,
        overflow:'hidden',
    },
    uploadBtnContainer:{
        opacity:0.7,
        position:'absolute',
        right:0,
        bottom:0,
        backgroundColor:'lightgrey',
        width:'100%',
        height:'25%',
    },
    uploadBtn:{
        display:'flex',
        alignItems:"center",
        justifyContent:'center'
    }
})