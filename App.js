import { StatusBar } from 'expo-status-bar';
import {  Text, View } from 'react-native';
import { Provider as PaperProvider  } from 'react-native-paper';
import styles from './src/components/Style';
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/pages/Login';
import Home from './src/pages/Home';
import Splash from './src/pages/Splash';
import Register from './src/pages/Register';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import History from './src/pages/History';
import Profile from './src/pages/Profile';
import { Transaction } from './src/pages/Transaction';

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function MyTabs(){
  return(
      <Tab.Navigator 
      screenOptions={({ route}) =>({
        tabBarIcon: ({color, size }) =>{
          let iconName
          if(route.name === "Home") iconName = "home";
           else if (route.name === "History") iconName = "menu";
           else if (route.name === "Profile") iconName = "account-circle-outline";
           else if (route.name === "Transaction") iconName = "plus";
          return <MaterialCommunityIcons name={iconName} size={size} color={color} />
        },
        headerShown: false,
      })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Transaction" component={Transaction} options={{headerShown: true}}/>
        <Tab.Screen name="History" component={History} options={{headerShown: true}} />
        <Tab.Screen name="Profile" component={Profile} />

      </Tab.Navigator>
  )





  
}

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="MyTabs" component={MyTabs} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

