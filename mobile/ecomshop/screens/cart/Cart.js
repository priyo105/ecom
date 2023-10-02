import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import CartItems from './CartItems'
import { connect } from "react-redux"
import { Icon, ScrollView,Button } from 'native-base'
import * as actions from '../../Redux/Actions/CartActions'

import { useNavigation } from '@react-navigation/native';

const Cart=(props)=> {
   
    const navigation= useNavigation();

    removeFromCart=(product)=>{
        props.removeCart(product) 
    }




    const [total, setTotal] = useState(0);
    function calculateTotal() {
        totalPrice = 0;
        props.cartItems.map((item) => {
            totalPrice += item.product.price * item.product.quantity
            console.log("xasdasdasdasdxz" + JSON.stringify(item))
        })

        setTotal(totalPrice)
    }

    useEffect(() => {
        calculateTotal()
    })

    return (

        <View style={{ flex: 1 }}>

            <ScrollView style={{ marginBottom: 100 }}>

                <View style={{ flex: 1 ,marginBottom:30}}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', marginTop: 10 }}>Your Cart</Text>
                    {

                        props.cartItems.map((item) => {
                            // props.addItemToCart(item)

                            return (
                                <View >
                                    <CartItems products={item} removeFromCart={removeFromCart}  />
                                </View>
                            )
                        })
                    }
                </View>

            </ScrollView>

            <View style={styles.bottomView}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold',marginTop:10,color:'black',fontFamily:'monospace' }}> Total: {total.toFixed(2)} £ </Text>
                    <Button size="sm" variant="outline"  onPress={ ()=>{ navigation.navigate('checkout')}}>
                        Checkout
                    </Button>
                </View>

            </View>

        </View>

    )
}


const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (product) => dispatch(actions.addToCart({  product })),
        removeCart: (product) => dispatch(actions.removeFromCart({ product }))
    }
}

const mapStateToProps = (state) => {
    const { cartItems } = state;
    return {
        cartItems: cartItems
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Cart);



const styles = StyleSheet.create({
    bottomView: {
        position: 'absolute',
        shadowColor:'black',
        bottom: 0,
        left: 0,
        margin: 20,
        borderWidth:1,
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: 'black',
        right: 0,
        padding: 25,
        // Other styles for your bottom view, e.g., height, justifyContent, alignItems
    }
})
