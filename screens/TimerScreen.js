import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'; 
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker'; // Updated import for Picker

export default function TimerScreen() {
  const [timeLeft, setTimeLeft] = useState(0); // Time left in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [inputTime, setInputTime] = useState(''); // Time input
  const [timeUnit, setTimeUnit] = useState('minutes'); // Selected time unit (minutes, seconds, hours)

  // Handle the start/stop of the timer
  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (!isRunning && timeLeft !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  // Handle the start/stop button press
  const handleStartStop = () => {
    if (isRunning) {
      setIsRunning(false);
    } else {
      if (inputTime && !isNaN(inputTime) && inputTime > 0) {
        let timeInSeconds;
        if (timeUnit === 'seconds') {
          timeInSeconds = Number(inputTime); // Time in seconds
        } else if (timeUnit === 'minutes') {
          timeInSeconds = Number(inputTime) * 60; // Convert minutes to seconds
        } else if (timeUnit === 'hours') {
          timeInSeconds = Number(inputTime) * 3600; // Convert hours to seconds
        }
        setTimeLeft(timeInSeconds);
        setIsRunning(true);
      } else {
        Alert.alert('Invalid Input', 'Please enter a valid time.');
      }
    }
  };

  // Format the remaining time to hh:mm:ss
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Timer</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={`Enter time in ${timeUnit}`}
          keyboardType="numeric"
          value={inputTime}
          onChangeText={setInputTime}
        />
        <Text style={styles.timeText}>{formatTime(timeLeft)}</Text>

        {/* Dropdown for time units */}
        <Picker
          selectedValue={timeUnit}
          style={styles.picker}
          onValueChange={(itemValue) => setTimeUnit(itemValue)}
        >
          <Picker.Item label="Seconds" value="seconds" />
          <Picker.Item label="Minutes" value="minutes" />
          <Picker.Item label="Hours" value="hours" />
        </Picker>
      </View>

      <TouchableOpacity
        style={[styles.button, isRunning ? styles.stopButton : styles.startButton]}
        onPress={handleStartStop}
      >
        <MaterialIcons name={isRunning ? 'pause' : 'play-arrow'} size={24} color="#fff" />
        <Text style={styles.buttonText}>{isRunning ? 'Stop' : 'Start'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0F7FA',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#00796B',
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
    alignItems: 'center',
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#00796B',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    fontSize: 18,
    color: '#00796B',
    marginBottom: 10,
  },
  timeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00796B',
  },
  picker: {
    width: '100%',
    height: 50,
    marginTop: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    width: '60%',
    justifyContent: 'center',
  },
  startButton: {
    backgroundColor: '#00796B',
  },
  stopButton: {
    backgroundColor: '#D32F2F',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
});
