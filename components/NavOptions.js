import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import { selectOrigin } from '../slices/navSlice';
import travelImg from '../images/travel.jpg'
import parcelImg from '../images/parcel.jpg'
import carHireImg from '../images/carHire2.jpg'
import bookingImg from '../images/bookTravel.jpg'



const data = [
 {
  id: "123",
  title:"Travel Now",
  image:travelImg,
  screen:"MapScreen",
 },
 {
  id: "789",
  title:"Parcel",
  image:parcelImg,
  screen:"ParcelScreen",
 },

]

const data2 = [
  {
  id: "456",
  title:"Car Hire",
  image:carHireImg,
  screen:"CarHireScreen",
 },
 {
  id: "012",
  title:"Book Travel",
  image:bookingImg,
  screen:"BookingScreen",
 }

]

const NavOptions = () => {
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);
 return (
  <View>
  <FlatList
  style={tw`pl-2`}
  data={data}
  keyExtractor={(item) => item.id}
  horizontal
  renderItem={({item}) => (
   <TouchableOpacity 
   onPress={()=> navigation.navigate(item.screen)}
   style={tw`p-2 pl-6 pb-8 pt-4 bg-white m-2 w-40 shadow-lg`}
   disabled={!origin}>

    <View style={tw`${!origin && "opacity-20"}`}>
     <Image
     style={{ width: 120, height: 120, resizeMode: "stretch" }}
     source={ item.image }
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
 
 <FlatList
 style={tw`pl-2`}
  data={data2}
  keyExtractor={(item) => item.id}
  horizontal
  renderItem={({item}) => (
   <TouchableOpacity style={tw`p-2 pl-6 pb-8 pt-4 bg-white m-2 w-40 shadow-lg`}
   disabled={!origin}>
    <View style={tw`${!origin && "opacity-20"}`}>
     <Image
     style={{ width: 120, height: 120, resizeMode: "contain" }}
     source={ item.image }
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

  </View>
  
 )
}

export default NavOptions

const styles = StyleSheet.create({})
