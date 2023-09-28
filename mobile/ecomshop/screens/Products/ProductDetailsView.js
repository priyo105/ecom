import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

export default function ProductDetailsView({ route }) {
    console.log(route.params)
    const product = route.params.product;
    return (
        <View>
            <Image source={{ uri: product.image }} height={200} width={200} resizeMode='contain' style={{ alignSelf: 'center' }} />
            <Text style={styles.text}>{product.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        fontWeight: "bold",
        color: "black",
        fontSize: 20,
        fontFamily: "San Francisco"
    }
})