import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';  // Importing icons

export default function Dashboard({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',  // This will remove the header title
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image source={require('../assets/profile.jpg')} style={styles.image} />
        <Text style={styles.welcomeText}>Welcome Back!</Text>
      </View>

      {/* Dashboard Buttons Section */}
      <View style={styles.buttonsSection}>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('AboutMeScreen')}>
          <Ionicons name="person-outline" size={24} color="#333" style={styles.icon} />
          <Text style={styles.cardText}>About Me</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('EducationScreen')}>
          <Ionicons name="school-outline" size={24} color="#333" style={styles.icon} />
          <Text style={styles.cardText}>Education</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('AchievementScreen')}>
          <Ionicons name="trophy-outline" size={24} color="#333" style={styles.icon} />
          <Text style={styles.cardText}>Achievements</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ContactMeScreen')}>
          <Ionicons name="mail-outline" size={24} color="#333" style={styles.icon} />
          <Text style={styles.cardText}>Contact Me</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('AppsScreen')}>
          <Ionicons name="apps-outline" size={24} color="#333" style={styles.icon} />
          <Text style={styles.cardText}>Apps</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Button Section */}
      <View style={styles.logoutSection}>
        <TouchableOpacity style={styles.logoutCard} onPress={() => navigation.replace('LoginScreen')}>
          <Ionicons name="log-out-outline" size={24} color="#fff" style={styles.icon} />
          <Text style={styles.cardText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E0F7FA', // Background color
    padding: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#fff', // White border
  },
  buttonsSection: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#B2EBF2', // Light blue shade
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    flexDirection: 'row',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  logoutSection: {
    marginTop: 20,
  },
  logoutCard: {
    backgroundColor: '#4DD0E1', // Darker blue for logout
    padding: 20,
    marginVertical: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    flexDirection: 'row',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
});
