import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from "react-redux";
import "react-native-gesture-handler";
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import { store } from './store';
import MapScreen from './screens/MapScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import { withAuthenticator } from 'aws-amplify-react-native'
import Amplify from 'aws-amplify'
import config from './src/aws-exports'
Amplify.configure(config)

function App() {
  const Stack = createStackNavigator();

  const globalScreenOptions = {
    headerStyle: {backgroundColor: "#2C6BED"},
    headerTitleStyle: { color: "white"},
    headerTintColor: "white",
  }
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
      {/* <Stack.Navigator initialRouteName="LoginScreen"> */}
       {/* <Stack.Navigator screenOptions={globalScreenOptions}> */}
        {/* <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}/> 

        <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          headerShown: false,
        }}/> */}

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

    
      </Stack.Navigator>
      </KeyboardAvoidingView> 
    </SafeAreaProvider>  
    </NavigationContainer>  
    </Provider>
  );
}

export default withAuthenticator(App);


