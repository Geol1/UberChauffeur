import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect,useRef} from 'react'
import { StyleSheet, TouchableOpacity ,Image,Pressable} from 'react-native';
import { View, Text } from "react-native";
import { Avatar, Center, NativeBaseProvider,Button,Icon,ScrollView} from "native-base";

import Ionicons from "react-native-vector-icons/Ionicons";
// import { Auth } from 'aws-amplify';
import { useNavigation } from '@react-navigation/native';
import ProfilUser from "../profil_user/ProfilUser";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import stringsoflanguages from "../langue/screenString";

export default function ListeVehicule() {
    const navigation = useNavigation();
    const [Img,setImg]=useState(require('../assets/ic_newCon.jpg'))
    const [TabImgUser,setTabImgUser]=useState([{Tableau: [require('../assets/ic_newCon.jpg')],image: require('../assets/ic_newCon.jpg'),infos: {username:"element.immatriculation",telephone:"element.marque"}}])
    const [TabImg,setTabImg]=useState([{Tableau: [require('../assets/ic_newCon.jpg')],infos: {username:"element.immatriculation",telephone:"element.marque"}}])
    const [id , setId] = useState("");
    const [visibleImg , setVisibleImg] = useState(2);
    const [user, setUser] = useState( {username:"Geol",telephone:"+237 ********",image: require('../assets/ic_newCon.jpg'),email: "mail"} );
    const getId = async () => {
      try {
        const value = await AsyncStorage.getItem('userId')
        if(value !== null){ setId(value); setId(value) }
      }  catch (e){}
  }
  const state = {
    avatar:Img
  }
  const CurrentUser=() => {
    getId().then()
    firestore()
    .collection('vehicule')
    .onSnapshot((querySnapshot) => {
        var TabVehicule=[]
        setTabImg([])
        TabImg.splice(0,3)
        querySnapshot.docs.forEach((doc)=>{
          TabVehicule.push(doc.data());
        })
        TabVehicule.map((element)=>{
         var Tableau=[]
          for (let i = 0; i < 3; i++) {
            const refImage = storage().ref(element.image+(i+1))
            refImage.getDownloadURL().then(function(url) {
              Tableau.push({uri: url})
            });
          }
          var prof=[]
          console.log(element.image.substring(14,42));
          firestore().collection('user').doc(element.image.substring(14,42)).get().then(documentSnapshot => {
            const refImage = storage().ref(documentSnapshot.data().image)
            
            refImage.getDownloadURL().then(function(url) {
              setImg({uri: url});
              prof=[]
              prof.push({uri: url})
            });
          })
          // TabImg.push({Tableau,image:prof[0] ,infos: {username:element.immatriculation,telephone:element.marque}})
          TabImg.push({Tableau,image: require('../assets/ic_newCon.jpg') ,infos: {username:element.immatriculation,telephone:element.marque}})
          setUser({username:element.immatriculation,telephone:element.marque})
        })
        setTabImg(TabImg)
    })
    
}
useEffect(() => CurrentUser(),[id]);
  return (
<NativeBaseProvider>
  <ScrollView >
      <Button.Group   space={0} mx={{ base: "auto", md: 0, }} mt={0} mb={0}>
          <Button endIcon={<Icon as={Ionicons} name="car-sport-sharp" size={4} />} mb={0}
             onPress={() => {getId(); console.log((visibleImg));}} >Actualiser</Button>
      </Button.Group>
    <View >
    {TabImg.map((type,index) => (
        
      <View style={{backgroundColor: '#000', padding: 5,marginVertical: 10}}>

        <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-around'}}>
          <Image style={styles.avatar} source={type.image} />
        <View>
        <Pressable
          onPress={() => {console.warn('Make Money Driving')}}>
          <Text style={{color: '#dddddd',  marginVertical: 10}}>Marque: {type.infos.username}</Text>
        </Pressable>

        <Pressable onPress={() => {console.warn('Make Money Driving')}}>
          <Text style={{color: 'white',   marginVertical: 10}}>IM: {type.infos.telephone}</Text>
        </Pressable>
        </View>
        
        <View style={{ borderBottomWidth: 1,borderBottomColor: '#919191',borderTopWidth: 1,borderTopColor: '#919191',paddingVertical: 5,marginVertical: 10, }}></View>
        
        </View>
        
        <Pressable onPress={() => {setVisibleImg(3); }} >
          <Avatar.Group size="xl" max={visibleImg}>
            <Avatar source={type.Tableau[0]}>Vue avant</Avatar>
            <Avatar source={type.Tableau[1]}>Vue arriere</Avatar>
            <Avatar source={type.Tableau[2]} >Vue lateral</Avatar>
          </Avatar.Group>
          </Pressable>
      </View>
    ))}
    </View>
  </ScrollView>
</NativeBaseProvider>
  );
};


const styles = StyleSheet.create({
    avatar: {
      height: 100,
      width: 100,
      borderRadius: 20,
    }
})
