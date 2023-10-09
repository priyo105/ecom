import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { FormControl, Input, Stack, WarningOutlineIcon, Box, Center, NativeBaseProvider, Button } from "native-base";
import { showDanger } from '../../Commons/Toast';
showDanger
export default function Shipping(props) {

    const [shippingAddress, setShippingAddress] = useState('')
    const [shippingAddreessError, setShippingAddressError] = useState(false);
    const [shippingaddress2, setShippingAdress2] = useState('')
    const [postCode, setPostCode] = useState('')
    const [postCodeError, setPostCodeError] = useState(false)
    const [city, setCity] = useState('')
    const [phoneNo, setPhoneNo] = useState()
    const [phoneNoError, setPhoneNoError] = useState(false)


    const formvalidation = () => {
        if (!shippingAddress) {
            showDanger('Shipping Address Missing')
            setShippingAddressError(true)
        } else if (!postCode) {
            showDanger('Post Code Missing')
            setPostCodeError(true)

        }  else if (!phoneNo) {
        showDanger('Phone No Missing')
        setPhoneNoError(true)
    }
        else {

          //send the details to next page

            let shippingDetails={
                "shippingAddress":shippingAddress,
                "shippingAddress2":shippingaddress2,
                "postcode":postCode,
                "city":city,
                "phone":phoneNo
            }

            props.navigation.navigate('payment',{
                shippingDetails:shippingDetails
            })
        }
    }


    return (
        <View style={{ margin: 20 }}>
            <FormControl isInvalid={shippingAddreessError} isRequired={true} >
                <FormControl.Label>Shipping address</FormControl.Label>
                <Input placeholder="Enter the Address you want your products delivered" borderColor={'black'} onChangeText={(text) => { setShippingAddress(text); setShippingAddressError(false) }} />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    Shipping Address is Mandatory
                </FormControl.ErrorMessage>
            </FormControl>

            <FormControl  >
                <FormControl.Label>Shipping address 2</FormControl.Label>
                <Input placeholder="Address Line 2" borderColor={'black'} onChangeText={(text) => { setShippingAdress2(text) }} />
              
            </FormControl>


            <FormControl isInvalid={postCodeError} isRequired={true}>
                <FormControl.Label>Post code</FormControl.Label>
                <Input placeholder="Enter Your Postcode" borderColor={'black'} onChangeText={(text) => { setPostCode(text) }} />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                Post code is Mandatory
                </FormControl.ErrorMessage>
            </FormControl>


            <FormControl  >
                <FormControl.Label>City</FormControl.Label>
                <Input placeholder="Enter your City Name" borderColor={'black'} onChangeText={(text)=>{setCity(city)}} />
 
            </FormControl>


            <FormControl isInvalid={phoneNoError} isRequired={true} >
                <FormControl.Label>Phone</FormControl.Label>
                <Input placeholder="Enter your Mobile No. " borderColor={'black'} inputMode='tel' onChangeText={(text)=>{setPhoneNo(text)}} />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    Something is wrong.
                </FormControl.ErrorMessage>
            </FormControl>


            <Button bgColor={'black'} style={{ marginTop: 10, height: 40 }} onPress={formvalidation} >Continue</Button>


        </View>
    )
}