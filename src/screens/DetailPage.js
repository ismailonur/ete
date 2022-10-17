import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const DetailPage = ({ route }) => {
    const { item } = route.params;
    return (
        <View style={styles.container}>
            {
                item.avatar &&
                <Image source={{ uri: item.avatar }} style={styles.image} />
            }
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.textJob}>{item.job}</Text>
            <Text style={styles.textDesc}>{item.description}</Text>
        </View>
    )
}

export default DetailPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },

    image: {
        width: '100%',
        height: 300,
        resizeMode: 'contain',
        marginTop: 20
    },

    title: {
        fontSize: 30,
        fontWeight: '600',
        marginTop: 20
    },

    textJob: {
        fontSize: 20,
        marginBottom: 15
    },

    textDesc: {
        fontSize: 15,
        margin: 10,
    }
})