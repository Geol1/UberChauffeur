import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../components/Home";
import Authentification from "../authentification/Authentification";
import CreateAccount from "../create_account/CreateAccount";
import ForgotPassword from "../forgot_pass/ForgotPassword";
// import Language from "../Language/Language"
import Parametre from "../profil_user/Parametre"
import OrderPage from "../screens/OrderPage";
import AddNewVehicule from "../screens/AddNewVehicule"
import ListeVehicule from "../screens/ListeVehicule"
import ProfilUser from "../profil_user/ProfilUser"
import stringsoflanguages from "../langue/screenString";
import MySearch from "../screens/MySearch"

import CreationChauffeur from "../create_account/CreationChauffeur"
import ListeChauffeur from "../screens/ListeChauffeur"

const Stack = createStackNavigator();

export default function Navigators() {
  return (
    <Stack.Navigator  screenOptions={{ 
            headerStyle: { backgroundColor: '#000'},
            headerTintColor: '#FFF', 
            headerTitleStyle: { fontWeight: 'bold' }
      }}>
      {/* <Stack.Screen name="Language" component={Language} /> */}
        <Stack.Screen  name="Authentification" component={Authentification} />
        <Stack.Screen options={{ title: stringsoflanguages.home.createAccount }} name="CreateAccount" component={CreateAccount} />
        <Stack.Screen options={{ title: stringsoflanguages.home.forgot }} name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen options={{headerShown: false}} name="Home" component={Home} />
        <Stack.Screen options={{ title: stringsoflanguages.home.setting }} name="Parametre" component={Parametre} />
        <Stack.Screen options={{ title: stringsoflanguages.home.profilTitle }} name="ProfilUser" component={ProfilUser} />
        <Stack.Screen options={{ title: stringsoflanguages.home.setting }} name="OrderPage" component={OrderPage} />
        <Stack.Screen name="AddNewVehicule" component={AddNewVehicule} options={{   title: "Add A New Vehicule", }}/>
        <Stack.Screen name="ListeVehicule" component={ListeVehicule} options={{ title: "Add A New Vehicule", }}/>
        <Stack.Screen name="CreationChauffeur" component={CreationChauffeur} options={{ title: "Creer un Client", }}/>
        <Stack.Screen name="ListeChauffeur" component={ListeChauffeur} options={{ title: "Liste des Clients", }}/>
        <Stack.Screen name="MySearch" component={MySearch}/>
    </Stack.Navigator>
  );
}
