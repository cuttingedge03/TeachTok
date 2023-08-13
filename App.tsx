// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
import * as React from 'react';

// import
//  MaterialCommunityIcons
// from 'react-native-vector-icons/MaterialCommunityIcons';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

import Home from './pages/Home';
import HomeScreen from './pages/HomeScreen';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
    <Tab.Navigator screenOptions={{headerShown: false, tabBarStyle: {height: 80, backgroundColor: 'black', borderColor: 'black'}, tabBarActiveTintColor: 'white', tabBarInactiveTintColor: 'gray'}} >
      <Tab.Screen 
        name="Home" 
        component={Home} 
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color='white', size }) => (
            <Image 
              source={require('./images/home.png')} 
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Discover" 
        component={HomeScreen} 
        options={{
          tabBarLabel: 'Discover',
          tabBarIcon: ({ color, size }) => (
            <Image 
              source={require('./images/discover.png')} 
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Activity" 
        component={HomeScreen} 
        options={{
          tabBarLabel: 'Activity',
          tabBarIcon: ({ color, size }) => (
            <Image 
              source={require('./images/activity.png')} 
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Bookmarks" 
        component={HomeScreen} 
        options={{
          tabBarLabel: 'Bookmarks',
          tabBarIcon: ({ color, size }) => (
            <Image 
              source={require('./images/bookmarks.png')} 
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={HomeScreen} 
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Image 
              source={require('./images/profile.png')} 
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
    </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;