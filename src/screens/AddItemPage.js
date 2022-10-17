import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage';

const AddItemPage = ({ navigation }) => {
    const [data, setData] = React.useState([]);
    const [name, setName] = React.useState('');
    const [job, setJob] = React.useState('');
    const [about, setAbout] = React.useState('');
    const [avatar, setAvatar] = React.useState('');

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const response = await AsyncStorage.getItem('deviceData');
            if (response)
                setData(JSON.parse(response));
        } catch (e) {
            console.log(e)
        }
    }

    const buttonAddItem = async () => {
        let newItem = {};
        if (name.length > 0 && job.length > 0 && about.length > 0) {
            const id = Math.random().toString()
            newItem = {
                name: name,
                job: job,
                description: about,
                avatar: avatar,
                id: id,
            }
            const newData = [...data, newItem];
            await AsyncStorage.setItem('deviceData', JSON.stringify(newData));
            navigation.navigate('Simpsons');
        }
        if (name.length === 0 || job.length === 0 || about.length === 0) {
            alert('Please fill Name, Job and About fields.')
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Name Surname:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setName}
                value={name}
            />

            <Text style={styles.title}>Job Title:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setJob}
                value={job}
            />

            <Text style={styles.title}>About Him/Her:</Text>
            <TextInput
                style={styles.aboutInput}
                onChangeText={setAbout}
                value={about}
                multiline={true}
                numberOfLines={4}
            />

            <Text style={styles.title}>Image Link:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setAvatar}
                value={avatar}
            />

            <TouchableOpacity style={styles.button}
                onPress={buttonAddItem} >
                <Text style={styles.buttonText}>Add Character</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default AddItemPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
    },

    title: {
        fontSize: 16,
        marginTop: 10,
    },

    input: {
        height: 50,
        marginTop: 5,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#eee',
        backgroundColor: 'white',
    },

    aboutInput: {
        height: 100,
        marginTop: 5,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#eee',
        backgroundColor: 'white',
        textAlignVertical: 'top',
    },

    button: {
        backgroundColor: '#2f86df',
        height: 50,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },

    buttonText: {
        color: 'white',
        fontSize: 16,
    },
})