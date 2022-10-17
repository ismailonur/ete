import * as React from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { navigationRef } from './navigator';

import AddItemPage from '../screens/AddItemPage';
import DetailPage from '../screens/DetailPage';
import ListPage from '../screens/ListPage';

const stack = createNativeStackNavigator();

class Navigation extends React.Component {
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <SafeAreaProvider>
                    <NavigationContainer ref={navigationRef}>
                        <stack.Navigator screenOptions={{ headerShown: true }}>
                            <stack.Screen name="Simpsons" component={ListPage} />
                            <stack.Screen name="Details" component={DetailPage} />
                            <stack.Screen name="Add New Character" component={AddItemPage} />
                        </stack.Navigator>
                    </NavigationContainer>
                </SafeAreaProvider>
            </SafeAreaView>
        );
    }
}

export default Navigation;
