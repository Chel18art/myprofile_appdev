import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function AppsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Apps</Text>

      {/* Calculator */}
      <TouchableOpacity 
        style={styles.card} 
        onPress={() => navigation.navigate('CalculatorScreen')}
      >
        <Image source={require('../assets/calculator.jpg')} style={styles.appIcon} />
        <Text style={styles.cardText}>Calculator</Text>
      </TouchableOpacity>

      {/* Notes */}
      <TouchableOpacity 
        style={styles.card} 
        onPress={() => navigation.navigate('NotesScreen')}
      >
        <Image source={require('../assets/notes.jpg')} style={styles.appIcon} />
        <Text style={styles.cardText}>Notes</Text>
      </TouchableOpacity>

      {/* Calendar */}
      <TouchableOpacity 
        style={styles.card} 
        onPress={() => navigation.navigate('CalendarScreen')}
      >
        <Image source={require('../assets/calendar.jpg')} style={styles.appIcon} />
        <Text style={styles.cardText}>Calendar</Text>
      </TouchableOpacity>

      {/* Timer */}
      <TouchableOpacity 
        style={styles.card} 
        onPress={() => navigation.navigate('TimerScreen')}
      >
        <Image source={require('../assets/timer.jpg')} style={styles.appIcon} />
        <Text style={styles.cardText}>Timer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0F7FA', // Light blue background
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#00796B', // Dark teal color for title
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginVertical: 10,
    borderRadius: 15,
    width: '80%',
    alignItems: 'center',
    elevation: 5,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  cardText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    color: '#00796B',
  },
  appIcon: {
    width: 70,
    height: 70,
    borderRadius: 10,
    resizeMode: 'contain',
  },
});
