
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList
} from 'react-native';

import ProductView from './screens/Products/ProductView';

function App() {

  return (
    <SafeAreaView >

          <ProductView />      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
 container:{
  flex:1,
  alignItems:"center",
  justifyContent:"center"
 }

}  );

export default App;
