
import React from "react";
import { Text,View,StyleSheet,TouchableOpacity } from "react-native";
import ProductCard from "./ProductCard";



export default ProductItem = ({product}) => (
    <TouchableOpacity>
        <View>
            <ProductCard product={product}/>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container:{
     flex:1,
     alignItems:"center",
     justifyContent:"center"
    }  
});