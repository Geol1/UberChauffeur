import * as React from 'react';
import {NativeBaseProvider,Center,VStack,FormControl,Input,Button,Icon} from 'native-base';

import Ionicons from "react-native-vector-icons/Ionicons";
import {  StyleSheet, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Validation() {
  
  const navigation = useNavigation();
      const [formData, setData] = React.useState({});
      const [errors, setErrors] = React.useState({});
      const validate = () => {
        if (formData.email === undefined) {
          setErrors({
            ...errors,
            email: 'Numero de telephone requis',
          });
          return false;
        } else if (formData.email.length < 9) {
          setErrors({
            ...errors,
            email: 'Dois contenir au moins 9 caracteres',
          });
          return false;
        }
        return true;
      };

      const send =()=>{
        if (formData.email) {
          navigation.navigate('HistoriqueTransaction',formData.email)
        }
      }
    
      const onSubmit = () => {
        validate() ? send() : alert('Echec de validation, verifier vos informations svp');
      };
    
      return (
            <VStack width="90%" mx={3}>
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
            <FormControl isRequired isInvalid={'email' in errors}>
                <FormControl.Label _text={{bold: true}}>Telephone</FormControl.Label>
                <Input placeholder="Telephone" onChangeText={(value) => setData({ ...formData, email: value })} />
                {'email' in errors ?
                <FormControl.ErrorMessage _text={{fontSize: 'xs', color: 'error.500', fontWeight: 500}}>{errors.email}</FormControl.ErrorMessage>
        :
                <FormControl.HelperText _text={{fontSize: 'xs'}}>Veuiller entrer de bonne donnees merci. </FormControl.HelperText>
                }
            </FormControl>
             <Button onPress={onSubmit} mt={5} p={2} colorScheme="cyan">Voir Mon Profil</Button>
             <Button onPress={
              () => navigation.navigate('CreationChauffeur')
            } mt={5} p={2} colorScheme="cyan">Creer un Client</Button>
             <Button onPress={
              () => navigation.navigate('ListeChauffeur')
            } mt={5} p={2} colorScheme="cyan">Liste des Clients</Button>
            </VStack>
      );
    }
export default function ForgotPassword() {
      return (
        <NativeBaseProvider>
        <Center flex={1}>
          <Validation />
          </Center>
        </NativeBaseProvider>
      );
    }

    const styles = StyleSheet.create({
        avatar: {
            height: 200,
            width: 200,
            borderRadius: 100,
          }
    })