import { NavigationContainer } from '@react-navigation/native';
import React, { useState,useEffect } from 'react';
import { KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from "react-redux";
import "react-native-gesture-handler";
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import { store } from './store';
import MapScreen from './screens/MapScreen';
import * as Location from 'expo-location';
import { withAuthenticator } from 'aws-amplify-react-native'
import Amplify from 'aws-amplify'
import config from './src/aws-exports'
import { Linking } from 'react-native';
import Constants from 'expo-constants'
import * as IntentLauncher from 'expo-intent-launcher'
import DestinationSearch from './screens/DestinationSearch';

Amplify.configure(config);

Location.installWebGeolocationPolyfill()
navigator.geolocation.getCurrentPosition();

function App() {
  const Stack = createStackNavigator();

  // const globalScreenOptions = {
  //   headerStyle: {backgroundColor: "#2C6BED"},
  //   headerTitleStyle: { color: "white"},
  //   headerTintColor: "white",
  // }


  const pkg = Constants.manifest.releaseChannel
  ? Constants.manifest.android.package 
  : 'host.exp.exponent'

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  
  

useEffect(() => {
   let isMounted = true; 

   const requestLocationPermission = async () => {
  try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (isMounted) {
     if (status !== 'granted') {
        // setErrorMsg('Permission to access location was denied');
        console.log("Location permission denied");
        console.log("STATUS:");
        console.log(status);
        if(Platform.OS === 'android'){
          IntentLauncher.startActivityAsync(
          IntentLauncher.ACTION_APPLICATION_DETAILS_SETTINGS,
          { data: 'package:' + pkg }
         )
        } else { 
          Linking.openURL('app-settings:');
         }
        return;
      }
      // (status === 'granted')
    else {

      console.log("You can access location");
      console.log("STATUS:");
      console.log(status);
      let location = await Location.getCurrentPositionAsync({
         accuracy: Location.Accuracy.BestForNavigation,
         maximumAge: 10000
      });
      console.log("LOCATION:");
      console.log(location);
      //setLocation(location);
      
    } 

  }
   
  } catch (err) {
    console.warn(err);
    // setErrorMsg('Permission to access location was denied');
  }
};
    requestLocationPermission(); 

    return () => { isActive = false };
    
}, [])

  return (
    <Provider store={store}>
    <NavigationContainer>
    <SafeAreaProvider>
      <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{flex: 1}}
      keyboardVerticalOffset={ Platform.OS === "ios" ? -64 : 0}
      >

        <Stack.Navigator >
        <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}/>

         <Stack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          headerShown: false,
        }}/>

        <Stack.Screen
         name="DestinationSearch"
         component={DestinationSearch}
         options={{
         headerShown: false,
         }}
     />

    
      </Stack.Navigator>
      </KeyboardAvoidingView> 
    </SafeAreaProvider>  
    </NavigationContainer>  
    </Provider>
  );
}

export default withAuthenticator(App);


