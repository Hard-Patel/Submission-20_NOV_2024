import * as React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./src/screens/HomeScreen";
import { DesignStrip } from "./src/screens/Design";

const Stack = createNativeStackNavigator();

function RootStack() { // Use `navigation` prop here
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitleAlign: "center",
          headerTitleStyle: { color: "white" },
          headerStyle: { backgroundColor: "black" },
          headerRight: () => (
            <View style={{ flexDirection: "row" }}>
                <Image
                  source={require("./src/assets/icons/filter.png")}
                  style={{ height: 24, width: 24, tintColor: "white" }}
                />
              <Image
                source={require("./src/assets/icons/search.png")}
                style={{
                  height: 24,
                  width: 24,
                  tintColor: "white",
                  marginLeft: 12,
                }}
              />
            </View>
          ),
        }}
      />
      <Stack.Screen name="DesignStrip" component={DesignStrip} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
