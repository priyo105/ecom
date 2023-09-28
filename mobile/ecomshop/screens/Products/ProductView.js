import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, Text, FlatList, SafeAreaView } from "react-native"
import data from "../../assets/products.json"
import categoryData from "../../assets/categories.json"
import ProductItem from "./ProductItem";
import { Container, Header, Item, Input, ScrollView } from "native-base"
import Icon from 'react-native-vector-icons/FontAwesome';
import FilteredProductView from "./FilteredProductView";
import Banner from "../../Commons/Banner";
import CategroiesHorizontal from "../categories/CategroiesHorizontal";

export default ProductView = () => {

    const [products, setProduct] = useState(['ps3', 'ps4']);
    const [productFilter, setProductFilter] = useState([]);
    const [focus, setFocus] = useState();
    const [categories, setCategories] = useState([]);
    const [active, setActive] = useState([]);

    useEffect(() => {
        setProduct(data);
        setCategories(categoryData);
        setFocus(false);
        setProductFilter(data);
    }, [])

    const SearchProduct = (text) => {
        setFocus(true)
        setProductFilter(
            products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
        )
    }

    const OpenSearchList = () => {
        setFocus(true);
    }


    return (
        <ScrollView>
            <SafeAreaView>
                {/* searchbar */}
                <View style={{ marginHorizontal: 20 }}>
                    <Input
                        placeholder="Search"
                        variant="filled"
                        width="100%"
                        borderRadius="10"
                        onFocus={OpenSearchList}  // when focus it will one
                        InputRightElement={focus ? <Icon onPress={() => { setFocus(false) }} margin={10} name="close" ></Icon> : <View />}
                        py="1" px="2"
                        onChangeText={(text) => SearchProduct(text)}
                        InputLeftElement={<Icon name="search" margin={10} size={20} color="#000" />
                        } />
                </View>

                {focus == false ? (<View >
                    <Banner />
                    <CategroiesHorizontal data={categories} onPress={()=>{console.warn('pressed')}} />

                </View>) : <View />}






                {/* // When Focus is True It will render the search ProductView , Other wise regular Product List View  */}
                {focus == true ? (
                    <View>
                        <FilteredProductView productFilter={productFilter} />

                    </View>
                ) : (
                    <FlatList
                        data={products}
                        numColumns={2}
                        renderItem={({ item }) => <ProductItem key={item.name} product={item} />}
                        keyExtractor={item => item.name} />
                )}


            </SafeAreaView>
        </ScrollView>

    )
}

