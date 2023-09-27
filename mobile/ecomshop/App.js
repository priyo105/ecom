
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList
} from 'react-native';

import ProductView from './screens/Products/ProductView';
import Header from './Commons/Header';
import { NativeBaseProvider } from 'native-base';

function App() {

  return (

    <NativeBaseProvider>
       <SafeAreaView >
              <Header />
              <ProductView />      
        </SafeAreaView> 
    </NativeBaseProvider>
  
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
