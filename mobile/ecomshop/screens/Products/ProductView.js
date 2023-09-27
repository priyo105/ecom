import React,{useState,useEffect} from "react";
import {View,StyleSheet,ActivityIndicator,Text, FlatList, SafeAreaView} from "react-native"
import data from "../../assets/products.json"
import ProductItem from "./ProductItem";

export default ProductView=()=>{

    const [products,setProduct]=useState(['ps3','ps4']);
    
        useEffect(()=>{
            setProduct(data);
        },[])

    return(
        <SafeAreaView>           
            <FlatList
                 data={products}
                 numColumns={2}
                 renderItem={({item}) => <ProductItem key={item.name} product={item} />}
                 keyExtractor={item => item.name}

            />
        </SafeAreaView>
    )
}

