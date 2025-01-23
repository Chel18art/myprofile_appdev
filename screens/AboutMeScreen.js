import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function AboutMeScreen({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '', 
      headerLeft: () => null,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Profile Image */}
      <Image source={require('../assets/profile.jpg')} style={styles.image} />

      {/* Personal Information */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.info}>Richelle Mae M. Arat</Text>

        <Text style={styles.label}>Program:</Text>
        <Text style={styles.info}>BSIT</Text>

        <Text style={styles.label}>Sex:</Text>
        <Text style={styles.info}>Female</Text>

        <Text style={styles.label}>Present Address:</Text>
        <Text style={styles.info}>NHA KAUSWAGAN</Text>

        <Text style={styles.label}>Contact Number:</Text>
        <Text style={styles.info}>09451406355</Text>
      </View>

      {/* Button to Navigate Back */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f8ff',
    padding: 20,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#333', // Adding a border to the image
  },
  infoContainer: {
    width: '80%',
    alignItems: 'center', // Centering the content inside the container
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#555',
    textAlign: 'center', // Center text horizontally
  },
  info: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center', // Center text horizontally
  },
  button: {
    backgroundColor: '#4DD0E1', // Consistent color with the dashboard
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
