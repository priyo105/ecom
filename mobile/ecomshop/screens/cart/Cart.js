import { View, Text } from 'react-native'
import React from 'react'
import {connect} from "react-redux"
import { SvgFromXml } from 'react-native-svg'


function Cart(props) {
  return (
    <View>
      <Text>Cart</Text>
      {
        props.cartItems.map((x)=>{
            console.log(x)
            return(
                <Text>xxx</Text>
            )
        })
      }
    </View>
  )
}


const mapStateToProps= (state)=>{
    const {cartItems}= state;
    return {
        cartItems: cartItems
    }
}

export default connect(mapStateToProps,null) (Cart);