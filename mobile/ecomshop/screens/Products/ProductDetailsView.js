import { View, Text, Image, StyleSheet, ScrollView, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import InputSpinner from 'react-native-input-spinner';
import { Rating, AirbnbRating } from 'react-native-ratings';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ProductDetailsView({ route }) {
    console.log(route.params)
    const product = route.params.product;
    return (
        <View style={styles.container}>
            <ScrollView>
                <Image source={{ uri: product.image }} height={200} width={200} resizeMode='contain' style={{ alignSelf: 'center' }} />

                <View style={{ flex: 1, flexDirection: 'row', justifyContent: "space-between" }}>
                    <Text style={styles.text}>{product.name}</Text>
                    <Text style={styles.priceText}> £ {product.price}</Text>

                </View>
                <View style={{marginTop:20,marginLeft:20}}>
                    <Text style={{fontWeight:"bold",marginBottom:10,color:'black'}}> Rating </Text>   
                <View>
                    <Rating
                        type='star'
                        ratingCount={5}
                        imageSize={30}
                        style={{alignSelf:'flex-start'}}
                        tintColor='white'
                        startingValue={product.rating}
                        showReadOnlyText={false}
                        readonly={true}
                        onFinishRating={4}
                    />
                </View>
                </View>
                <Text style={styles.descriptionHeading}>Description</Text>
                <Text style={styles.description}>{product.description}</Text>


                <Text style={styles.description}>{product.bigdescription}</Text>

            </ScrollView>

            <View style={styles.bottomView}>
                <View style={{ flex: 1, flexDirection: 'row', height: 40, justifyContent: 'center', alignItems: 'center' }}>


                    <InputSpinner
                        max={100}
                        min={0}
                        step={1}
                        height={50}
                        width={160}
                        colorMax={"darkgrey"}
                        colorMin={"black"}
                        skin='square'
                        value={0}
                        onChange={(num) => {
                            console.log(num);
                        }} />

                    <TouchableOpacity style={{flex:1,flexDirection:'row', backgroundColor: 'navy', alignItems: 'center', alignContent: 'center', marginHorizontal: 30, height: 50, width: 120, borderRadius: 10 }}>
                          <Icon  color='white' size={20} margin={10} name="cart-plus" ></Icon>
                          <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', marginTop: 0 }}>Add to Cart</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        fontWeight: "bold",
        color: "black",
        fontSize: 20,
        marginLeft: 20,
    },
    descriptionHeading: {
        marginTop: 20,
        marginLeft: 20,
        fontSize: 20,
        fontWeight: "bold",
        color: 'black'
    },
    description: {
        marginLeft: 20,
        marginTop: 10
    },
    priceText: {
        alignSelf: "flex-end",
        marginRight: 50,
        fontSize: 18,
        color: "darkred",
        fontWeight: "bold"
    },
    bottomView: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 25,
        // Other styles for your bottom view, e.g., height, justifyContent, alignItems
    },
})