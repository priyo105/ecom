

import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Card } from 'native-base'
var { width } = Dimensions.get("window");
import InputSpinner from 'react-native-input-spinner';
import { showDanger, showToastSuccess } from '../../Commons/Toast';

 CartItems=(props)=> {
    const cartItem = props.products.product;
    return (
        <View style={styles.card}>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: '' }}>
                <Image source={{ uri: cartItem.image }} height={100} width={100} resizeMode='contain'></Image>
                <View style={{ width: 150 }}>
                    <Text style={styles.title}>{cartItem.name}</Text>
                    <Text style={{ color: 'darkred', marginLeft: 20, fontWeight: 'bold' }}> £ {cartItem.price}</Text>
                    <View style={{ height: 80, width: 100, marginLeft: 30, marginTop: 10 }}>
                        <InputSpinner
                            max={100}
                            min={1}
                            step={1}
                            fontSize={10}
                            height={32}
                            width={70}
                            colorMax={"darkgrey"}
                            colorMin={"grey"}
                            skin='square'
                            value={cartItem.quantity}
                            onChange={(num) => {
                                // setQuantity(num);
                                console.log(num);
                            }} />
                    </View>
                </View>
                <View >

                    <Text style={{ color: 'navy', marginLeft: 0, marginTop: 10, fontWeight: 'bold', fontSize: 12, fontFamily: 'monospace' }}>  £ {(cartItem.price * cartItem.quantity).toFixed(2)}</Text>
                    
                    <TouchableOpacity onPress={()=>{    
                     props.removeFromCart(cartItem);
                      console.log('delete' + JSON.stringify(cartItem.name))
                        showDanger('Item Deleted')}}>
                        <Image
                            source={require('../../assets/delete.png')}
                            style={{ height: 25, width: 25, resizeMode: 'contain', marginLeft: 40, marginTop: 20 }}
                        />
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    )
}


export default CartItems


const styles = StyleSheet.create({

    card: {
        width: width / 1 - 40,
        height: width / 3.5,
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 5,
        marginLeft: 20,
        elevation: 9,
        backgroundColor: 'white'
    },
    title: {
        fontWeight: "bold",
        fontSize: 14,
        marginTop: 10,
        color: 'black',
        fontFamily: 'notoserif',
        marginLeft: 20
    }
})