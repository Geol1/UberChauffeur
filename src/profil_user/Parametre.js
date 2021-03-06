import React, { Component } from 'react';
import { View,ScrollView } from 'react-native';
import stringsoflanguages from "../langue/screenString";
import AsyncStorage from '@react-native-async-storage/async-storage';

import {VStack, Box, Divider,NativeBaseProvider,Text, Body,useToast,Button,Icon} from 'native-base';

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
export default class Parametre extends Component {
   
    constructor(props){
        super(props)
        const lang=[
            {shortform: "en", longform: stringsoflanguages.params.en},
            {shortform: "fr", longform: stringsoflanguages.params.fr}
        ];
        global.lang=lang;
    }
   
    settext(value){
        this.handleButtonPress(value)
        AsyncStorage.setItem('lang',value)
        stringsoflanguages.setLanguage(value);
        this.props.navigation.navigate("Home", {langue:value})
    }
    state={
        visibleToast: false,
        toastM:"youpi"
    }
    componentDidMount(){
        this.setState({visibleToast: false})
    }

    handleButtonPress = (message) => {
        this.setState({visibleToast: false,toastM:message})
        console.log("ok");
      }; 

    render() {
        return (
        <NativeBaseProvider>
            <Toast visible={this.state.visibleToast} message={this.state.toastM} />
        <Box border={1} borderRadius='md'>
            <VStack space={4} divider={<Divider />}>
                <Box px={4} pt={4}>
                {stringsoflanguages.params.description}
                </Box>
                <Box px={4} >
                
                <ScrollView >
                    {global.lang.map((item,key)=>{
                        // this.handleButtonPress(item.shortform)
                        return (
                            <VStack key={key} >
                                <Text ref={item.shortform} px={4} pt={4}
                                onPress={()=>  this.settext(item.shortform) }>
                                    {item.longform}
                                </Text>
                            </VStack>
                        ) 
                    })}   
                    </ScrollView>
                </Box>
                <Box px={4} pb={8} pt={8}>
                {stringsoflanguages.params.theme}
                </Box>
            </VStack>
        </Box>
              <View>
                  </View>
                  <Button
                      onPress={() => { this.handleButtonPress("boom")}}
                    >
                    Button
                    </Button>
            </NativeBaseProvider>
          );
    }
}
