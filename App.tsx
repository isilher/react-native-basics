import { StatusBar } from "expo-status-bar"
import React from "react"
import { StyleSheet, View, ViewStyle, Dimensions } from "react-native"
import { AppContent } from "./src/AppContent"
import { Login } from "./src/Login"
import { NavigationContainer } from "@react-navigation/native"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { UserNameProvider } from "./src/components/UserNameContext"
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"

export default function App() {
  const Drawer = createDrawerNavigator()

  // Initialize Apollo Client
  const client = new ApolloClient({
    uri: "https://graphql-pokemon2.vercel.app",
    cache: new InMemoryCache(),
  })

  return (
    <View style={styles.container}>
      <ApolloProvider client={client}>
        <UserNameProvider>
          <NavigationContainer>
            <Drawer.Navigator>
              <Drawer.Screen name="login" component={Login} />
              <Drawer.Screen name="welcome" component={AppContent} />
            </Drawer.Navigator>
          </NavigationContainer>
        </UserNameProvider>

        <StatusBar backgroundColor="#fff" style="auto" />
      </ApolloProvider>
    </View>
  )
}

const styles = StyleSheet.create<{
  container: ViewStyle
}>({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "pink",
    maxHeight: Dimensions.get("window").height,
  },
})
