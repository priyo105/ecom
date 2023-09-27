import React from 'react'
import {View,StyleSheet} from "react-native";
import { Divider, Text ,Image} from "native-base"









const FilteredProductView= (productFilter)=> {
  
    // console.log(productFilter)

  return (
    <View>

       {                
             productFilter.productFilter.length > 0 ? 
            
            (      
                productFilter.productFilter.map((item)=>(
                           <SearchItemView item={item} />
                    ))
            )
            :
            (
              <View>
                 <Text style={{textAlign:'center',fontWeight:"bold",marginTop:30}}> No Products Found</Text>
              </View>
            )
        } 


    </View>
  )
}



const SearchItemView=(item)=>{
  console.log("I:::"+JSON.stringify(item))
  return(
  <View style={{flexDirection:'row',marginLeft:20}}> 

    <View style={{flex:.2,height:80}}>
        <Image  height={70} width={70} resizeMode='contain' source={{uri:item.item.image?item.item.image:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'}} />
    
    </View>

    <View style={{flex:.6}}>
        <Text style={styles.text}>{item.item.name}</Text>
        <Text style={styles.description} >{item.item.description}</Text>
    </View>

    <View style={{flex:.2}}>

        <Text style={styles.priceText}> £ {item.item.price}</Text>

    </View>

  </View>  
  )

}







export default FilteredProductView

const styles = StyleSheet.create({
  center: {
      height: 60,
      marginLeft:20,
      felx:.5,
      backgroundColor:'red',
      flexDirection:'row',
  
  },
  text:{
    marginTop:10,
    padding:5,
    marginLeft:20,
    fontWeight:'bold',
    fontFamily:"arial"
  },
  description:{
   marginLeft:20,
   fontSize:12
  },

  priceText:{
    alignSelf:'flex-end',
    marginRight:10,
    padding:5,
    fontSize:10,
    fontWeight:'bold',
    textAlign:'center',
    marginTop:20,
    color:'#808080'
  }
})
