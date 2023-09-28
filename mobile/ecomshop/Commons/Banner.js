import React,{useEffect, useState} from "react";
import {Image,StyleSheet,Dimensions,View,ScrollView,Text} from "react-native"
import Swiper from "react-native-swiper/src";

var {width}= Dimensions.get('window');


const Banner= ()=>{
    const [bannerData,setBannerData]=useState([]);
    
    useEffect(()=>{
        setBannerData([
            //Banner Image Urls
            "https://plus.unsplash.com/premium_photo-1673502752899-04caa9541a5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            "https://images.unsplash.com/photo-1594969155368-f19485a9d88c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            "https://plus.unsplash.com/premium_photo-1670152411569-7cbc00946857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2030&q=80"
        ])
    },[])


    return (
        <ScrollView>
        <View style={styles.container}>
             <View style={styles.swiper}>
                 <Swiper style={{height:width/2}} showsButtons={false}  autoplay={true}>
                     
                     {bannerData.map((item)=>{
                       
                       return <Image  style={styles.imageBanner}  resizeMode="contain" source={{uri:item}}/>
                     })}

                 </Swiper>
             </View>
        </View>
        </ScrollView>
    )
}


const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'gainsboro'
    },
    swiper:{
        width:width,
        alignItems:'center',
        marginTop:10
    },
    imageBanner:{
        height: width/2,
        width: width-40,
        borderRadius:10,
        marginHorizontal:20
    }
})

export default Banner;