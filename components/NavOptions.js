import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import { selectOrigin } from '../slices/navSlice';


const data = [
 {
  id: "123",
  title:"Travel Now",
  image:"https://links.papareact.com/3pn",
  screen:"MapScreen",
 },
 {
  id: "789",
  title:"Parcel",
  image:"https://links.papareact.com/28w",
  screen:"ParcelScreen",
 },

]

const data2 = [
  {
  id: "456",
  title:"Car Hire",
  image:"https://links.papareact.com/3pn",
  screen:"CarHireScreen",
 },
 {
  id: "012",
  title:"Book Travel",
  image:"https://links.papareact.com/3pn",
  screen:"BookingScreen",
 }

]

const NavOptions = () => {
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin)
 return (
  <View>
  <FlatList
  data={data}
  keyExtractor={(item) => item.id}
  horizontal
  renderItem={({item}) => (
   <TouchableOpacity 
   onPress={()=> navigation.navigate(item.screen)}
   style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}
   disabled={!origin}>

    <View style={tw`${!origin && "opacity-20"}`}>
     <Image
     style={{ width: 120, height: 120, resizeMode: "contain" }}
     source={{ uri: item.image }}
     />
     <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
     <Icon 
     style={tw`p-2 bg-black rounded-full w-10 mt-4`}
     name="arrowright"
     color="white"
     type="antdesign"/>
    </View>
   </TouchableOpacity>
  )}
  />
 
 {/* <FlatList
  data={data2}
  keyExtractor={(item) => item.id}
  horizontal
  renderItem={({item}) => (
   <TouchableOpacity style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}>
    <View>
     <Image
     style={{ width: 120, height: 120, resizeMode: "contain" }}
     source={{ uri: item.image }}
     />
     <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
     <Icon 
     style={tw`p-2 bg-black rounded-full w-10 mt-4`}
     name="arrowright"
     color="white"
     type="antdesign"/>
    </View>
   </TouchableOpacity>
  )}
  /> */}

  </View>
  
 )
}

export default NavOptions

const styles = StyleSheet.create({})
