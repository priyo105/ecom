
import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import ProductCard from "./ProductCard";
import { useNavigation } from "@react-navigation/native";


const ProductItem = ({ product }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => {
            navigation.navigate('productDetails', {
                product: product
            })
        }}>
            <View>
                <ProductCard product={product} />
            </View>
        </TouchableOpacity>)
};

export default ProductItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});