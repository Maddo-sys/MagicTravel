import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input, Image } from "react-native-elements";
import { auth } from '../firebase';
import logo from "../images/MagicTravellogo.png"

const LoginScreen = ({ navigation }) => {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");

useEffect(() => {
 const unsubscribe = auth.onAuthStateChanged((authUser) => {
  if(authUser){
   navigation.replace("HomeScreen");
  }
 })
 return unsubscribe;
}, [])

 const signIn = ()=> {
 auth.signInWithEmailAndPassword(email,password)
 .catch((error)=> alert(error));
 }
 return (
  <KeyboardAvoidingView behavior='padding'
  style={styles.container}>
  <Image
  source={logo}
  style={{width: 140, height: 140 }}
  />
  <View style={styles.inputContainer}>
   <Input
   placeholder="Email"
   autoFocus
   type="email"
   value={email}
   onChangeText={(text)=> setEmail(text)}
   />

   <Input
   placeholder="Password"
   secureTextEntry
   type="password"
   value={password}
   onChangeText={(text)=> setPassword(text)}
   onSubmitEditing={signIn}
   />
  </View>
  <Button
  containerStyle={styles.Button} 
  onPress={signIn}
  title="Login"/>

  <Button 
  containerStyle={styles.button} 
  onPress={()=> navigation.navigate("RegisterScreen")} 
  type="outline"
  title="Register"/>
  <View style={{height:100}}/>

  </KeyboardAvoidingView>
 )
}

export default LoginScreen

const styles = StyleSheet.create({
 container:{
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  padding: 10,
  backgroundColor: "white"
 },
 inputContainer:{
  width: 300,
 },
 button: {
  
  width:200,
  marginTop: 10,
 }

})
