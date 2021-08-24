import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, SafeAreaView, View } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY} from "@env";
import { setDestination, setOrigin } from '../slices/navSlice';
import Entypo from "react-native-vector-icons/Entypo";
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
// import PlaceRow from './PlaceRow';

const homePlace = {
  description: 'Home',
  geometry: { location: { lat: 48.8152937, lng: 2.4597668 } },
};
const workPlace = {
  description: 'Work',
  geometry: { location: { lat: 48.8496818, lng: 2.2940881 } },
};

const PlaceRow = ({ data }) => {
 //console.log(data)
 return (
  <View style={styles.row}>
  <View >
    {data.description === 'Home'? 
    <Icon
    style={tw`mr-4 rounded-full bg-gray-300 p-3`}
    name="home"
    type="ionicon"
    color='white'
    size={18} /> :
    <Icon
    style={tw`mr-4 rounded-full bg-gray-300 p-3`}
    name="location"
    type="ionicon"
    color='white'
    size={18} /> }
  </View>
  <Text style={styles.locationText}> 
  {data.description || data.vicinity}
 </Text>
  </View>
 );
};



const DestinationSearch = () => {

 const dispatch = useDispatch();
const navigation = useNavigation();

const [originPlace,setOriginPlace] = useState('');
const [destinationPlace, setDestinationPlace]= useState('');

 const checkNavigation = ()=>{

  if(originPlace && destinationPlace) {
     navigation.navigate('RideOptionsCard')
   }
 }
 useEffect(() => {
 
  checkNavigation();
  
 }, [originPlace, destinationPlace])


 return (
  <SafeAreaView>
   <View style={styles.container}>

    <GooglePlacesAutocomplete
     placeholder="Where From?"
     onPress={(data, details = null) =>{
      // console.log(data);
      // console.log(details);
      dispatch (setOrigin({
       location: details.geometry.location,
       description:data.description,
       }));
       setOriginPlace({data,details});
     }}
     enablePoweredByContainer={false}
     suppressDefaultStyles
     currentLocation={true}
     currentLocationLabel='Show places near me'
     styles={{
       textInput: styles.textInput,
       container: styles.autocompleteContainer,
       listView: styles.listView,
       separator: styles.separator,
      }}
     fetchDetails={true}
      query={{
       key: GOOGLE_MAPS_APIKEY,
       language:"en"
     }}
     nearbyPlacesAPI="GooglePlacesSearch"
     returnKeyType={"search"}
     //minLength={2}
     //debounce={100}
    

     renderRow={(data) => <PlaceRow data={data}/>}
     renderDescription={(data)=> data.description || data.vicinity }
     predefinedPlaces={[homePlace, workPlace]}
     
     
     />

     <GooglePlacesAutocomplete
     placeholder="Where to?"
    // styles={toInputBoxstyles}
     onPress={(data, details = null) =>{
      // console.log(data);
      // console.log(details);
      dispatch (setDestination({
       location: details.geometry.location,
       description:data.description,
      }));
      setDestinationPlace({data,details});
     }}
     styles={{
       textInput: styles.textInput,
       container: styles.autocompleteContainer,
       listView: styles.listView,
       separator: styles.separator,
      }}
     fetchDetails={true}
     nearbyPlacesAPI="GooglePlacesSearch"
     returnKeyType={"search"}
     //minLength={2}
    
     enablePoweredByContainer={false}
     //debounce={100}
     suppressDefaultStyles
      styles={{
       textInput: styles.textInput,
        container: {
         ...styles.autocompleteContainer,
         top: 60,
       },
       separator: styles.separator,
      }}
   
     query={{
       key: GOOGLE_MAPS_APIKEY,
       language:"en"
     }}
     renderRow={(data) => <PlaceRow data={data}/>}
     
     />


    {/* Circle near "From" input */}
     <View style={styles.circle}/>
     
    {/* Line between dots */}
    <View style={styles.line}/>
     

    {/* Square near destination input */}
    <View style={styles.square}/>

   </View>
  </SafeAreaView>
 )
}

export default DestinationSearch

const styles = StyleSheet.create({

 container: {
  padding: 10,
  height: '100%'
 },
 textInput: {
  padding: 10,
  backgroundColor: '#DDDDDF',
  marginVertical: 5,
  marginLeft:20,
  marginRight: 20,
 },
 autocompleteContainer: {
         position: 'absolute',
         top: 5,
         left: 10,
         right: 10,
         paddingTop:50,
       },
 row: {
 flexDirection: 'row',
 alignItems: 'center',
 marginVertical: 18,
 },
 iconContainer: {
 backgroundColor: '#a2a2a2',
 padding: 5,
 borderRadius: 50,
 marginRight: 15,
 },
 locationText: {

 },
 separator:  {
         backgroundColor: '#dddddd',
         height: 1
       },
 listView: {
         position: 'absolute',
         top: 163
       },
 circle:{
  borderRadius: 50,
  width: 5,
  height: 5,
  backgroundColor: 'black',
  position: 'absolute',
  top:80,
  left: 15,
  //paddingTop: 50,

 },
 square: {
  width: 5,
  height: 5,
  backgroundColor: 'black',
  position: 'absolute',
  top:135,
  left: 15,
  // paddingTop: 50,
 },
 line: {
  width: 1,
  height: 50,
  backgroundColor: '#919191',
  position: 'absolute',
  top:85,
  left: 17,
  // paddingTop: 50,
 } 
})
