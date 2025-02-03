import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Layout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "index") {
            iconName = "home";
          } else if (route.name === "ProfileScreen") {
            iconName = "person";
          } else if (route.name === "SettingsScreen") {
            iconName = "settings";
          } else if (route.name === "AboutScreen") {
            iconName = "information-circle";
          }

          return <Ionicons size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="ProfileScreen" options={{ title: "Profile" }} />
      <Tabs.Screen name="SettingsScreen" options={{ title: "Settings" }} />
      <Tabs.Screen name="AboutScreen" options={{ title: "About" }} />
    </Tabs>
  );
}
