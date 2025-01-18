import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import Dashboard from './screens/Dashboard';
import AboutMeScreen from './screens/AboutMeScreen';
import EducationScreen from './screens/EducationScreen';
import AchievementScreen from './screens/AchievementScreen';
import ContactMeScreen from './screens/ContactMeScreen';
import AppsScreen from './screens/AppsScreen'; // New screen for Apps
import CalculatorScreen from './screens/CalculatorScreen'; // New screen for Calculator
import NotesScreen from './screens/NotesScreen'; // New screen for Notes
import CalendarScreen from './screens/CalendarScreen'; // New screen for Calendar
import TimerScreen from './screens/TimerScreen'; // New screen for Timer

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="LoadingScreen"
        screenOptions={{
          headerShown: false, // Hides the header globally for all screens
        }}
      >
        <Stack.Screen 
          name="LoadingScreen" 
          component={LoadingScreen} 
        />
        <Stack.Screen 
          name="LoginScreen" 
          component={LoginScreen} 
        />
        <Stack.Screen 
          name="SignupScreen" 
          component={SignupScreen} 
        />
        <Stack.Screen 
          name="Dashboard" 
          component={Dashboard} 
        />
        <Stack.Screen 
          name="AboutMeScreen" 
          component={AboutMeScreen} 
        />
        <Stack.Screen 
          name="EducationScreen" 
          component={EducationScreen} 
        />
        <Stack.Screen 
          name="AchievementScreen" 
          component={AchievementScreen} 
        />
        <Stack.Screen 
          name="ContactMeScreen" 
          component={ContactMeScreen} 
        />
        <Stack.Screen 
          name="AppsScreen" 
          component={AppsScreen} 
        />
        <Stack.Screen 
          name="CalculatorScreen" 
          component={CalculatorScreen} 
        />
        <Stack.Screen 
          name="NotesScreen" 
          component={NotesScreen} 
        />
        <Stack.Screen 
          name="CalendarScreen" 
          component={CalendarScreen} 
        />
        <Stack.Screen 
          name="TimerScreen" 
          component={TimerScreen} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
