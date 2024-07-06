import React,{Component} from "react";
import { View,Text,StyleSheet, Alert,SafeAreaView } from "react-native";
import { StripeProvider } from '@stripe/stripe-react-native';
import PaymentScreen from "./src/PaymentScreen";
// import {PUBLISH_KEY} from '@env'

const App=()=>{

  return(
    <View style={styles.container}>
      <StripeProvider
      publishableKey={process.env.PUBLISH_KEY}
      merchantIdentifier="merchant.identifier" 
      urlScheme="your-url-scheme"
    >
      <PaymentScreen />
    </StripeProvider>
    </View>
  )
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    
  }
})

export default App;