import React, {useState, useEffect} from 'react'
import {NativeBaseProvider,Box,Text,Heading,VStack,FormControl,Input,Link,Button,Icon,IconButton,HStack,Divider} from 'native-base';
import Avatar from '../components/Avatar';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

import stringsoflanguages from "../langue/screenString";
import { ToastAndroid } from "react-native";
const Toast = ({ visible, message }) => {
  if (visible) {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
    return null;
  }
  return null;
};
export default function CreateAccount({navigation}) {

  const [formData, setData] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [Img, setImg] = useState(require('../assets/images/Comfort.jpeg'));
  const [TabImg, setTabImg] = useState([]);
  const [id , setId] = useState("");
  const [exe , setExe] = useState(0);
  const validate = () => {
    if (formData.name === undefined || formData.password === undefined) {
      setErrors({ ...errors, password: 'Svp veuiller remplir tous les champs.' });
      return false;
    }else if( formData.name.length < 5){
      setErrors({ ...errors, password: "L'immatriculation doit contenir au moins 5 caracteres." });
      return false;
    }else if (TabImg.length<3){
        handleButtonPress("Ajouter des Images");
        return false;
    }
    return true;
  };
  const getId = async () => {
    try {
      const value = await AsyncStorage.getItem('userId')
      if(value !== null){ setId(value); setId(value) }
    }  catch (e){}
}

  const Create=()=>{
    
    getId().then((resp) => {
      handleButtonPress("Authentification success :)")
      var IdCreation=id+"vehicule";
      const fileStoragePath = "ImageVehicule/"+id;
      var i=1;

      TabImg.map((image)=>{
        var imageRef= storage().ref(fileStoragePath+i);
        var fileUri = decodeURI(image.uri)
      imageRef.putString(fileUri,`data_url`).then(()=>{
        //  console.log(fileUri);
        })
        i++;
      })
        firestore().doc(`vehicule/${IdCreation}`).set({
          immatriculation:formData.name,
          marque:formData.password,
          image: fileStoragePath,
        })
     
      navigation.navigate('Transaction')
      handleButtonPress('User account created & signed in!');
  })
  .catch(error => {
    handleButtonPress(error.code)
  });
  }

  const [visibleToast, setvisibleToast] = useState(false);
  const [toastM,setToastM]=useState("youpi")
  useEffect(() => setvisibleToast(false), [visibleToast]);
  useEffect(() => { getId(); if(TabImg.length<3 && exe>=1){ TabImg.push(Img)} ;setExe(exe+1);handleButtonPress(TabImg.length+" ")}, [Img]);

  const handleButtonPress = (message) => {
    setToastM(message);
    setvisibleToast(true);
  };

  const onSubmit = () => {
    validate() ? Create() : handleButtonPress("validation failled");
  };

 return (
      <NativeBaseProvider>
        <Toast visible={visibleToast} message={toastM} />
        <Avatar
        setImg={setImg}
        Img={Img}/>
      <Box  p={2} w="90%" mx='auto' >
        
        <VStack space={0} mt={0}>
          <FormControl isRequired isInvalid={'password' in errors}>
                <FormControl.Label _text={{bold: true}}>IMMATRICULATION</FormControl.Label>
                <Input placeholder="CE 245" onChangeText={(value) => setData({ ...formData, name: value })} />
                
        </FormControl>
            
            <FormControl isRequired isInvalid={'password' in errors}>
                <FormControl.Label _text={{bold: true}}>MARQUE</FormControl.Label>
                <Input placeholder="Ferrary" onChangeText={(value) => setData({ ...formData, password: value })} />
                {'password' in errors ?
                <FormControl.ErrorMessage _text={{fontSize: 'xs', color: 'error.500', fontWeight: 500}}>{errors.password}</FormControl.ErrorMessage>
        :
                <FormControl.HelperText _text={{fontSize: 'xs'}}>Entrer une immatriculation valide svp</FormControl.HelperText>
                }
            </FormControl>

          <Button  onPress={onSubmit} mt={5} colorScheme="cyan" _text={{color: 'black' }}>Add New Vehicule</Button>
          
          <Heading size="lg" pt="20" >
            Le Vehicule de l'heure
          </Heading>

        </VStack>
      </Box>
    </NativeBaseProvider>
  );
}