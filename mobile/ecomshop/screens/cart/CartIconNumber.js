import React from 'react'
import {connect} from "react-redux"
import { Text } from 'react-native'
import * as actions from '../../Redux/Actions/CartActions'

 function CartIconNumber(props) {

    
  return (
    
    <Text style={{fontWeight:'bold', color:'red'}}>  {props.cartItems.length>0?props.cartItems.length:''}</Text>
  )
}


const mapStateToProps = (state) => {
    const { cartItems } = state;
    return {
        cartItems: cartItems
    }
}

export default connect(mapStateToProps,null)(CartIconNumber);
