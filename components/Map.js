import React, { useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import { useDispatch, useSelector } from 'react-redux'
import tw from 'tailwind-react-native-classnames'
import { selectDestination, selectOrigin, setTravelTimeInformation } from '../slices/navSlice'
import { GOOGLE_MAPS_APIKEY } from "@env"
import { useEffect } from 'react'
const Map = () => {

 const origin = useSelector(selectOrigin);
 const destination = useSelector(selectDestination);
 const mapRef = useRef(null);
 const dispatch = useDispatch();


 useEffect(()=>{
  if(!origin || !destination) return;

// Zoom & Fit to markers
mapRef.current.fitToSuppliedMarkers(['origin', 'destination'],
{edgePadding: {top: 50, right: 50, bottom: 50, left: 50 }});

 },[origin,destination]);

// Calculate Distance and Cost of ride

useEffect(()=> {
  if(!origin || !destination) return;

  const getTravelTime = async()=> {
     fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?
     units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`)
     .then((res)=> res.json())
     .then((data) => {
       console.log(data);
       dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
     })
  }

    getTravelTime();

},[origin, destination, GOOGLE_MAPS_APIKEY]);


 return (
 <MapView
 ref={mapRef}
 style={tw`flex-1`}
 mapType="mutedStandard"
  initialRegion={{
   latitude: origin.location.lat,
   longitude: origin.location.lng,
   latitudeDelta: 0.005,
   longitudeDelta: 0.005,
  }}>

   {origin && destination && (
    <MapViewDirections
    origin={origin.description}
    destination={destination.description}
    apikey= {GOOGLE_MAPS_APIKEY}
    strokeWidth={3}
    strokeColor="black"
    lineDashPattern={[0]}
    />
   )}


   {origin?.location && (
    <Marker
       coordinate={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
       }}
       title="Your Location"
       description={origin.description}
       identifier="origin"
       />
   )}

    {destination?.location && (
    <Marker
       coordinate={{
        latitude: destination.location.lat,
        longitude: destination.location.lng,
       }}
       title="Your Location"
       description={destination.description}
       identifier="destination"
       />
   )}
  </MapView>
 )
}

export default Map

const styles = StyleSheet.create({})
