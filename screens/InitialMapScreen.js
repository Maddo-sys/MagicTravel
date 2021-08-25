import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
import HomeMap from '../components/HomeMap';
import NavFavourites from '../components/NavFavourites';
import NavigateCard from '../components/NavigateCard';
import RideOptionsCard from '../components/RideOptionsCard';

const InitialMapScreen = () => {

 const Stack = createStackNavigator();
 const navigation = useNavigation();

 return (
 
  <View>

   <TouchableOpacity 
   onPress={()=> navigation.navigate("HomeScreen")}
   style={tw`bg-gray-100 absolute top-16
   left-8 z-50 p-3 rounded-full shadow-lg`}>
    <Icon name="menu"/>
   </TouchableOpacity>
   <View style={tw`h-1/2`}>
    <HomeMap/>
   </View>
   <View style={tw`h-1/2`}>
    <NavigateCard/>
    {/* <Stack.Navigator>
     <Stack.Screen
     name="NavigateCard"
     component={NavigateCard}
     options={{
      headerShown: false,
     }}
     />

     <Stack.Screen
     name="RideOptionsCard"
     component={RideOptionsCard}
     options={{
      headerShown: false,
     }}
     />
    </Stack.Navigator> */}
   </View>
  </View>
 )
}

export default InitialMapScreen

const styles = StyleSheet.create({})
