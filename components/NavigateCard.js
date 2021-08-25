import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Pressable } from 'react-native'
import tw from 'tailwind-react-native-classnames';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY} from "@env";
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/core';
import NavFavourites from './NavFavourites';
import { Icon } from 'react-native-elements';;

const NavigateCard = () => {

 const dispatch = useDispatch();
 const navigation = useNavigation();
 return (
  <SafeAreaView 
  style={tw`bg-white flex-1`}>
   <Text style={tw`text-center py-5 text-xl`}>
    Good Morning Joshua
    </Text>
   <View style={tw`border-t border-gray-200 flex-shrink`}>
    <View>
     {/* <GooglePlacesAutocomplete
     placeholder="Where to?"
     styles={toInputBoxstyles}
     fetchDetails={true}
     nearbyPlacesAPI="GooglePlacesSearch"
     returnKeyType={"search"}
     //minLength={2}
     onPress={(data, details = null) =>{
      // console.log(data);
      // console.log(details);
      dispatch (setDestination({
       location: details.geometry.location,
       description:data.description,
      }));
       navigation.navigate("RideOptionsCard");
     }}
     enablePoweredByContainer={false}
     //debounce={100}
     query={{
       key: GOOGLE_MAPS_APIKEY,
       language:"en"
     }}
     
     
     /> */}

    <Pressable onPress={()=> navigation.navigate("DestinationSearch")} 
      style={toInputBoxstyles.container}>  
      <View style={toInputBoxstyles.textInputContainer}>
        <Text style={toInputBoxstyles.textInput}>Where To?</Text>
      </View>
     
    </Pressable>


    </View>
    <NavFavourites/>
    <View 
    style={tw`flex flex-row bg-white justify-evenly py-2 mt-auto
    border-t border-gray-100`}>
      <TouchableOpacity 
      // onPress={()=> navigation.navigate("RideOptionsCard")}
      style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 
      rounded-full`}>
        <Icon name="car" type="font-awesome" color="white" size={16}/>
        <Text style={tw`text-white text-center`}>Rides</Text>
      </TouchableOpacity>

       <TouchableOpacity 
        // onPress={()=> navigation.navigate("")}
       style={tw`flex flex-row justify-between w-24 px-4 py-3 
      rounded-full`}>
        <Icon
         name="fast-food-outline" 
         type="ionicon" 
         color="black" 
         size={16}/>

        <Text style={tw`text-center text-black`}>Parcel</Text>
      </TouchableOpacity>
    </View>
    </View> 

  </SafeAreaView>
 )
}

export default NavigateCard

const toInputBoxstyles = StyleSheet.create({
 container: {
  backgroundColor: "white",
  paddingTop: 20,
  padding:5,
  flex: 0,
 },
 textInput: {
  backgroundColor: '#DDDDDF',
  borderRadius: 0,
  fontSize: 20,
  padding: 10,
  fontWeight: 'bold',
  
 },

 textInputContainer: {
  paddingHorizontal: 20,
  paddingBottom: 0,
 }
})







