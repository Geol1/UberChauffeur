import React  from 'react'
import {View,SafeAreaView} from 'react-native';
import {NativeBaseProvider,Button,Icon} from 'native-base';
import Ionicons from "react-native-vector-icons/Ionicons";
const SecondPage = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NativeBaseProvider>
      <Button.Group variant="solid" isAttached space={6} mx={{ base: "auto", md: 0, }} mt={5}>
              
              <Button endIcon={<Icon as={Ionicons} name="car-sport-sharp" size={4} />} mr={2} 
              onPress={
                () => navigation.navigate('AddNewVehicule')
              }>Creer un nouveau Vehicule</Button>
       
        </Button.Group>
      <Button.Group variant="solid" isAttached space={6} mx={{ base: "auto", md: 0, }} mt={5}>
        <Button colorScheme="dark" mr={2} onPress={()=>{navigation.navigate('ListeVehicule')}}>Afficher la liste des vehicules</Button>
      </Button.Group>
      <Button.Group variant="solid" isAttached space={6} mx={{ base: "auto", md: 0, }} mt={5}>
      <Button  onPress={() =>{ console.log("pas encore fais")}} colorScheme="teal" _text={{ color: "white" }} 
              endIcon={<Icon as={Ionicons} name="power" size={4} />}>Activer un vehicule</Button>
      </Button.Group>
      <Button.Group variant="solid" isAttached space={6} mx={{ base: "auto", md: 0, }} mt={5}>
      <Button  onPress={   () => navigation.navigate('HistoriqueTransaction') }> Historique de Transaction</Button>
      </Button.Group>
      </NativeBaseProvider>
    </SafeAreaView>
  );
}

export default SecondPage;