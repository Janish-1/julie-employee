import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "./pages/LoginPage";
import Otplogin from "./pages/Index";
import Become from "./pages/Become";
import Camera from "./pages/Camera";
import Dashboard from "./pages/Dashboard";
import EditProfile from "./pages/Edit-Profile";
import Index from "./pages/Index";
import InformationScreen from "./pages/Information";
import LeavePage from "./pages/LeavePage";
import LoginPage from "./pages/LoginPage";
import NotificationScreen from "./pages/Notification";
import Profile from "./pages/Profile";
import ProgressPage from "./pages/Progress";
import SalaryPage from "./pages/Salary";
import TaskDetails from "./pages/TaskDetails";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Otplogin" component={Otplogin} />
        <Stack.Screen name="Become" component={Become} />
        <Stack.Screen name="Camera" component={Camera} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="Index" component={Index} />
        <Stack.Screen name="Information" component={InformationScreen} />
        <Stack.Screen name="LeavePage" component={LeavePage} />
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="Notification" component={NotificationScreen} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Progress" component={ProgressPage} />
        <Stack.Screen name="Salary" component={SalaryPage} />
        <Stack.Screen name="TaskDetails" component={TaskDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
