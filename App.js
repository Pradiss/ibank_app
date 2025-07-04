import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Contacts } from "./src/pages/Contatos";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import History from "./src/pages/History";
import Profile from "./src/pages/Profile";
import Login from "./src/pages/Login";
import Home from "./src/pages/Home";
import Splash from "./src/pages/Splash";
import Register from "./src/pages/Register";
import Result from "./src/pages/Result";
import Create from "./src/pages/Account";
import ScreenSend from "./src/pages/ScreenSend";
import ScreenScan from "./src/pages/ScreenScan";
import EditKeyPix from "./src/pages/EditKeyPix";
import ForwardPassword from "./src/pages/ForwardPassword";

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = "home";
          else if (route.name === "Extrato") iconName = "file-document-outline";
          else if (route.name === "Perfil") iconName = "account-circle-outline";
          else if (route.name === "Contatos") iconName = "contacts-outline";
          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },

        headerShown: false,
        tabBarActiveTintColor: "#34E167",
        tabBarInactiveTintColor: "#fff",
        tabBarStyle: {
          margin: 14,
          backgroundColor: "#232323",
          borderRadius: 24,
          position: "absolute",
          bottom: 8,
          left: 8,
          right: 8,
          height: 55,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen
        name="Contatos"
        component={Contacts}
        options={{ headerShown: true }}
      />
      <Tab.Screen
        name="Extrato"
        component={History}
        options={{ headerShown: true }}
      />
      <Tab.Screen name="Perfil" component={Profile} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="MyTabs" component={MyTabs} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Resultado" component={Result} />
          <Stack.Screen name="Create" component={Create} />
          <Stack.Screen
            name="ScreenSend"
            component={ScreenSend}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="Scan"
            component={ScreenScan}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="Editar Chave"
            component={EditKeyPix}
            options={{ headerShown: true }}
          />
          <Stack.Screen name="ForwardPassword" component={ForwardPassword} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
