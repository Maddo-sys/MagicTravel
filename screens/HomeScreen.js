import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import tw from "tailwind-react-native-classnames";
import NavOptions from '../components/NavOptions';
import logo from '../images/MagicTravellogo.png';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { setOrigin, setDestination } from '../slices/navSlice';
import { useDispatch } from 'react-redux';
import NavFavourites from '../components/NavFavourites';


const HomeScreen = () => {

 const dispatch = useDispatch();

 return (
  <SafeAreaView style={tw`bg-white h-full`}>
   <View style={tw`p-5`}>
    <Image
      style={{
       width: 120,
       height: 120,
       resizeMode: "contain",
      }}
      source={logo}
     />
     <GooglePlacesAutocomplete
     
     placeholder="Where From"
     styles={{
      container: {
       flex: 0,
      },
      textInput: {
       fontSize: 18,
       fontWeight: 'bold',
       backgroundColor: '#eee',
      },
     }}
     enablePoweredByContainer={false}
     //suppressDefaultStyles
     //currentLocation={true}
     //currentLocationLabel='Current location'
     // minLength={2}
     onPress={(data, details = null) =>{
      // console.log(data);
      // console.log(details);
      dispatch (setOrigin({
       location: details.geometry.location,
       description:data.description,
      }));
      dispatch(setDestination(null))
     }}
     fetchDetails={true}
     returnKeyType={"search"}
     query={{
      key: GOOGLE_MAPS_APIKEY,
      language: "en",
     }}
     nearbyPlacesAPI="GooglePlacesSearch"
     // debounce={100}
     />
        <NavOptions/>
        {/* <NavFavourites/> */}
   </View>
  </SafeAreaView>
 )
}

export default HomeScreen

const styles = StyleSheet.create({
 text: {
  color: "blue",
 }
})
