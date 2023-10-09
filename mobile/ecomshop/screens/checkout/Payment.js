import { View, Text, TouchableOpacity ,Image} from 'react-native'
import React, { useState } from 'react'
import { Divider } from 'native-base'
import { showToastSuccess } from '../../Commons/Toast'
import { Button } from 'native-base'
import { useNavigation } from '@react-navigation/native'

export default function Payment(props) {
 
   
  const navigation=useNavigation();

  
  const [selectedPaymentMethod,setSelectedPaymentMethod]=useState('')
  const paymentMethods=[
    {
      id:1,
      name: "Cash On Delivery",
      value:1
    },
    {
      id:2,
      name:"Bank Transfer",
      value:2
    },
    {
      id:3,
      name:"Card Payment",
      value:3
    }
  ]


  return (
    <View>

      <Text style={{fontWeight:"bold",fontSize:15,textAlign:"center",marginTop:20}}> Choose a Payment Method</Text>

      {

        paymentMethods.map(item=>{
          return(
            <TouchableOpacity  onPress={()=>{setSelectedPaymentMethod(item.value) }}>
            <View style={{padding:0,marginTop:20,marginLeft:20}}>
                   
                    

                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{fontWeight:"bold"}}>{ item.name}</Text>
                 
                 {
                   selectedPaymentMethod==item.value? (
                    //  <Text style={{marginRight:20,color:'green'}}>*</Text>
                     <Image style={{height:20,width:20,marginRight:20}} source={require('../../assets/check.png')}></Image>
                   ): 
                   (
                     <View />
                   )
                 }

                    </View>


                


                   <Divider />
     
                 </View>
            </TouchableOpacity>

          )
        })
      }


       <Button onPress={()=>{

const shippingDetails=props.route.params.shippingDetails;

        navigation.navigate('confirm',{
          details:{...shippingDetails,paymentMethod:selectedPaymentMethod}
        })

       }} style={{margin:100,}} >Next</Button>






    </View>
  )
}