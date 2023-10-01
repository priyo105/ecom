import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CartItems from './CartItems'
import { connect } from "react-redux"
import { ScrollView } from 'native-base'

function Cart(props) {
    console.log("asdasdasdasdasdqwe")
    return (
        <ScrollView>

            <View style={{flex:1,height:1000}}>

                <Text style={{ textAlign: 'center', fontWeight: 'bold', marginTop: 10 }}>Your Cart</Text>
                {

                    props.cartItems.map((item) => {
                        return (
                            <View >
                                <CartItems products={item} />
                            </View>
                        )
                    })
                }

            </View>




            <View style={styles.bottomView}>

            </View>


        </ScrollView>
    )
}

const styles = StyleSheet.create({
    bottomView: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'red',
        right: 0,
        padding: 25,
        // Other styles for your bottom view, e.g., height, justifyContent, alignItems
    }
})

const mapStateToProps = (state) => {
    const { cartItems } = state;
    return {
        cartItems: cartItems
    }
}

export default connect(mapStateToProps, null)(Cart);