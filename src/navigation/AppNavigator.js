import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import ChatList from "../screens/ChatList";
import ChatScreen from "../screens/ChatScreen";
import NewChat from "../screens/NewChat";
import ProfileScreen from "../screens/ProfileScreen";
import AuthNavigator from "./AuthNavigator";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { token } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {token ? (
        <>
          <Stack.Screen name="Chats" component={ChatList} />
          <Stack.Screen name="NewChat" component={NewChat} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </>
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
}
