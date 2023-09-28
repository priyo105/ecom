import React from 'react'
import { View, Image, Text, ScrollView, TouchableOpacity } from 'react-native'

export default function CategroiesHorizontal(data) {
    return (
        <ScrollView horizontal={true} style={{ height: 80 }}>
            <View style={{ alignSelf: 'center', flex: 1 }}>
                <View style={{ flexDirection: 'row' }}>
                    {
                        data.data.map(item => {
                            return (
                                <TouchableOpacity onPress={() => data.onPress(item._id)}>
                                    <View style={{ marginTop: 20, marginHorizontal: 10, padding: 10, backgroundColor: '#FAF9F6', borderRadius: 10 }}>
                                        <Image style={{ alignSelf: 'center' }} source={{ uri: item.icon }} height={30} width={30} resizeMode='contain' />
                                        <Text style={{ marginTop: 5, marginLeft: 4, fontSize: 11, fontWeight: 'bold', color: 'grey' }}>{item.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </View>
        </ScrollView>

    )
}
