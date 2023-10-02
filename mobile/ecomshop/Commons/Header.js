import React from "react";
import { StyleSheet,Image,SafeAreaView ,Text} from "react-native";


const Header=()=>{
  return(
    <SafeAreaView style={styles.header}>
        <Image  
              source={require('../assets/ecommerce.png')}
              resizeMode="contain"
              style={{height:30}}
              >
        </Image>

        <Text style={styles.title}>Ecom Shop</Text>
    </SafeAreaView>
  )
}

export default Header


const styles=StyleSheet.create({
    header:{
        width:'100%',
        flexDirection:'row',
        alignContent:'center',
        justifyContent:'center',
        padding:20,
        backgroundColor:"white"
    },

    title:{
    fontWeight:"bold",
    textAlign:"center",
    marginTop:5,
    color:"black"
    }
})