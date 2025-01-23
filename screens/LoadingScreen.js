import React, { useState, useEffect } from 'react'; 
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';

export default function LoadingScreen({ navigation }) {
  const [magnifyingState, setMagnifyingState] = useState([false, false, false, false, false]);

  const handleStartNow = () => {
   
    let index = 4; // Start from the last glass (rightmost)
    const interval = setInterval(() => {
      if (index >= 0) {
        setMagnifyingState(prevState => {
          const newState = [...prevState];
          newState[index] = true;
          return newState;
        });
        index--;
      } else {
        clearInterval(interval); // Stop after all 5 have appeared
      }
    }, 600); // Delay between each magnifying glass (600ms)

    // Navigate to LoginScreen after 3 seconds
    setTimeout(() => {
      navigation.replace('LoginScreen');
    }, 3000); // 3-second delay
  };

  return (
    <View style={styles.container}>
      {/* Initial state: Display message, logo, and Start button */}
      <Image source={require('../assets/loading.jpg')} style={styles.logo} />
      <Text style={styles.title}>Ready to get to know me?</Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleStartNow}
      >
        <Text style={styles.buttonText}>Start Now</Text>
      </TouchableOpacity>

      {/* Magnifying glasses animation */}
      <View style={styles.magnifyingContainer}>
        {magnifyingState.map((show, index) => {
          if (show) {
            return (
              <Animated.View key={index} style={styles.magnifyingGlass}>
                <Text style={styles.magnifyingText}>🔍</Text>
              </Animated.View>
            );
          }
          return null; 
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0F7FA', // Light blue background
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 20,
    color: '#00796B', // Dark teal color for title
    textAlign: 'center',
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 20,
    resizeMode: 'contain', // Keeps the image aspect ratio
  },
  button: {
    backgroundColor: '#00796B', // Dark teal background for the button
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    width: 220,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000', // Adding shadow for button effect
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5, // For Android shadow
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '700',
  },
  magnifyingContainer: {
    position: 'absolute',
    bottom: 20, 
    flexDirection: 'row-reverse', 
  },
  magnifyingGlass: {
    marginHorizontal: 5,
    opacity: 0.7,
  },
  magnifyingText: {
    fontSize: 25,
  },
});
