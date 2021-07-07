import * as React from 'react';
import {Dimensions,Button,View,Text,SafeAreaView } from 'react-native';


import HomeMap from '../components/HomeMap';
// import CovidMessage from '../../components/CovidMessage';
import HomeSearch from '../components/HomeSearch';
const FirstPage = ({ navigation }) => {
  return (

    <View>
      <View style={{height: Dimensions.get('window').height - 400}}>
        <HomeMap />
      </View>

      {/*  Covid Message*/}
      {/* <CovidMessage /> */}

      {/*  Bottom Comp*/}
      <HomeSearch />
    </View>
    
  );
}

export default FirstPage;