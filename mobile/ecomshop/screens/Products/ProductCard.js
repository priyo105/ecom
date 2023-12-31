import React from "react";
import { TouchableOpacity } from "react-native";
import {
    StyleSheet,
    View,
    Dimensions,
    Image,
    Text,
    Button
} from "react-native"

import { connect } from 'react-redux'
import * as actions from '../../Redux/Actions/CartActions'
var { width } = Dimensions.get("window");
import addToCart from "../cart/AddToCart";

const ProductCard = (product) => {

    let { name, brand, image, price, countInStock } = product.product

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: image ? image : 'https://www.transparentpng.com/thumb/adidas-shoes/MQFKhq-youth-adidas-mat-wizard-wrestling-shoes-free-shipping-march.png' }}></Image>
            <View style={styles.card} >
                <Text style={styles.title}>
                    {name}
                </Text>

                <Text style={styles.text}>
                    {brand}
                </Text>

                <Text style={[styles.text, { color: 'red', fontSize: 12, marginTop: 10 }]}>
                    £ {price}
                </Text>
                <View style={{ width: 100, height: 40, alignContent: 'center', alignItems: "center", marginLeft: 95, marginTop: 10 }}>
                    <TouchableOpacity onPress={() => { addToCart(product, 1), 'ProductCard' }}>
                        <Text style={{ fontSize: 12, textAlign: "center", backgroundColor: "black", color: "white", padding: 6, border: 1, borderRadius: 5 }}>Add </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}


const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (product) => dispatch(actions.addToCart({ product })),
        updateCart: (product, qty) => dispatch(actions.updateQuantity({ product, quantity: qty }))
    }
}

const mapStateToProps = (state) => {
    const { cartItems } = state;
    return {
        cartItems: cartItems
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
const styles = StyleSheet.create({
    container: {
        width: width / 2 - 40,
        height: width / 2.2,
        padding: 10,
        borderRadius: 10,
        marginTop: 55,
        marginBottom: 5,
        marginLeft: 20,
        alignItems: 'center',
        elevation: 9,
        backgroundColor: 'white'
    },
    image: {

        width: width/2-40,
        height: 130,
        resizeMode: "contain",
        backgroundColor: 'transparent',
        position: 'absolute',
        top: -40
    },
    card: {
        marginTop: 10,
        zIndex: -20,
        marginBottom: 10,
        height: width / 2.2,
        width: width / 2 - 20 - 10
    },
    title: {
        fontWeight: "bold",
        fontSize: 13,
        marginTop: 60,
        color: '#000000',
        textAlign: "center"
    },
    text: {
        fontSize: 10,
        textAlign: 'center',
        color: '#4682B4',
        fontWeight: "bold"
    }
})

