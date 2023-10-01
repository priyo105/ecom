
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image
} from 'react-native';

import ProductView from './screens/Products/ProductView';
import Header from './Commons/Header';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';

const Stack = createNativeStackNavigator();

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import ProductDetailsView from './screens/Products/ProductDetailsView';
const Tab = createMaterialBottomTabNavigator();

//Redux

import { Provider } from 'react-redux';
import store from './Redux/store';
import Cart from './screens/cart/Cart';
import Checkout from './screens/cart/Checkout';
// Redux

function HomeStack() {
  return (
        <Stack.Navigator>
          <Stack.Screen name="Home" options={{headerShown:false}} component={ProductView} />
          <Stack.Screen name="productDetails" options={{headerShown:false}} component={ProductDetailsView} />
        </Stack.Navigator>

  );
}

function CartStack() {
  return (
        <Stack.Navigator>
          <Stack.Screen name="cart" options={{headerShown:false}} component={Cart} />
          <Stack.Screen name="checkout" options={{headerShown:false}} component={Checkout} />
        </Stack.Navigator>

  );
}

// LogBox.ignoreAllLogs(true)
function App() {

  return (

    <Provider store={store}>

    <NavigationContainer>
      <NativeBaseProvider>
        <SafeAreaView >
          <Header />
        </SafeAreaView>


        <Tab.Navigator 
              activeColor="blue"         
              barStyle={{ backgroundColor: '#f5f5f5', height: 50 ,color:'white' }} // Adjust the height as needed
        >
          <Tab.Screen name="Home" options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={'black'} size={22} /> ),}} 
            component={HomeStack} ico />

          
          <Tab.Screen name="Categories" options={{
            tabBarLabel: 'Categories',
            tabBarIcon: ({ color }) => (
              <Image source={require('../../mobile/ecomshop/assets/app.png')} style={{ height: 22, width: 22, backgroundColor: 'black' }} resizeMode='contain' />
            ), }} 
            component={ProductView} />



         <Tab.Screen name="Cart" options={{
            tabBarLabel: 'Cart',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="cart" color={'black'} size={22} /> ),}} 
            
            component={CartStack} />

      <Tab.Screen name="Account" options={{
            tabBarLabel: 'account',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={'black'} size={22} /> ),}} 
            
            component={ProductView} />

        </Tab.Navigator>


      </NativeBaseProvider>
    </NavigationContainer>
    <Toast />

   </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }

});

export default App;
