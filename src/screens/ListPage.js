import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, FlatList, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useIsFocused } from "@react-navigation/native";

import { Request } from '../request'
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    PLUS,
    TRASH,
    UP,
    DOWN
} from '../assets/index.js';

const ListPage = (props) => {
    const isFocused = useIsFocused();
    const [data, setData] = React.useState([]);

    useEffect(() => {
        if (isFocused) {
            getData();
        }
    }, [props, isFocused]);

    const getItems = async () => {
        const response = await AsyncStorage.getItem('deviceData');
        if (response)
            return;
        try {
            const response = await Request.get('/simpsons');
            await AsyncStorage.setItem('deviceData', JSON.stringify(response.data));
        } catch (e) {
            console.log(e)
        }
    }

    const getData = async () => {
        await getItems();
        const data = await AsyncStorage.getItem('deviceData');
        if (data)
            setData(JSON.parse(data));
    }

    const trashItem = async (id) => {
        const newData = data.filter(item => item.id !== id);
        await AsyncStorage.setItem('deviceData', JSON.stringify(newData));
        setData(newData);
    }

    const upStepItem = async (id) => {
        const index = data.findIndex(item => item.id === id);
        if (index === 0) return;
        const newData = [...data];
        const temp = newData[index];
        newData[index] = newData[index - 1];
        newData[index - 1] = temp;
        await AsyncStorage.setItem('deviceData', JSON.stringify(newData));
        setData(newData);
    }

    const downStepItem = async (id) => {
        const index = data.findIndex(item => item.id === id);
        if (index === data.length - 1) return;
        const newData = [...data];
        const temp = newData[index];
        newData[index] = newData[index + 1];
        newData[index + 1] = temp;
        await AsyncStorage.setItem('deviceData', JSON.stringify(newData));
        setData(newData);
    }

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => props.navigation.navigate('Details', { item })}
                style={styles.itemContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.index}>{index + 1}</Text>
                    {
                        item.avatar ?
                            <Image source={{ uri: item.avatar }} style={styles.image} />
                            :
                            <View style={styles.image} />
                    }
                    <Text style={styles.title}>{item.name}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => upStepItem(item.id)}>
                        <Image source={UP} style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => downStepItem(item.id)}>
                        <Image source={DOWN} style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => trashItem(item.id)}>
                        <Image source={TRASH} style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Details')}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => props.navigation.navigate('Add New Character')}
                    style={styles.addItem}
                >
                    <Image source={PLUS} style={styles.plus} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default ListPage

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    buttonContainer: {
        flex: 1,
        justifyContent: "flex-end",
        width: "100%",
        alignItems: "center",
        marginBottom: 20
    },

    addItem: {
        backgroundColor: '#2f86df',
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },

    plus: {
        width: 30,
        height: 30,
    },

    icon: {
        width: 30,
        height: 30,
        margin: 3
    },

    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },

    index: {
        fontSize: 18
    },

    image: {
        width: 50,
        height: 50,
        alignSelf: 'center',
        resizeMode: 'contain',
        marginLeft: 5,
        marginRight: 10
    },

    title: {
        fontSize: 18,
    }
})