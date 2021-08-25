import React from 'react'
import { View, Text, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import { GOOGLE_MAPS_APIKEY } from "@env"
import { useState, useEffect } from 'react';
import {API, graphqlOperation} from 'aws-amplify';
import { listCars } from '../src/graphql/queries'
import rideShare5 from '../images/rideShare5.png'
import tw from 'tailwind-react-native-classnames';
import { useSelector } from 'react-redux';
import { selectOrigin } from '../slices/navSlice';
//import cars from '../images'

const HomeMap = () => {

const origin = useSelector(selectOrigin);
 

 const [cars, setCars] = useState([]);

 useEffect(()=>{

  const fetchCars = async ()=> {
   try{
    const response = await API.graphql(
     graphqlOperation(
      listCars
     )
    )

    console.log(response);
    setCars(response.data.listCars.items);
   }catch(e){
   console.error(e)
   }
  };

  fetchCars();

 }, [])

 // const getImage = (type) => {
 //  if (type === 'rideShare5'){
 //   return require('../images/rideShare5.png')
 //  }
 // }
 return (
 <MapView
 //ref={mapRef}
 style={tw`flex-1`}
 provider={PROVIDER_GOOGLE}
 showsUserLocation={true}
 mapType="mutedStandard"
  initialRegion={{
   latitude: origin.location.lat,
   longitude: origin.location.lng,
   latitudeDelta: 0.010,
   longitudeDelta: 0.010,
  }}>
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
   
   {cars.map((car)=> (
    <Marker
    key={car.id}
    coordinate={{
     latitude: car.latitude, longitude: car.longitude
    }}>
     <Image
     style={{
      width: 50,
      height: 50,
      resizeMode: 'contain',
      transform :[{
       rotate: `${car.heading}deg`
      }]
     }}
     source={rideShare5}
     />
    </Marker>
   ))}
  </MapView>
 )
}

export default HomeMap
