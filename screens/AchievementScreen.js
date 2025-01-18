import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

export default function AchievementScreen({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '', // Removes the title
      headerLeft: () => null, // Removes the back button
    });
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Image */}
      <Image source={require('../assets/profile.jpg')} style={styles.profileImage} />

      {/* Achievements Content */}
      <View style={styles.contentContainer}>
        <Text style={styles.heading}>Achievements</Text>

        {/* Achievement Data */}
        <TouchableOpacity style={styles.achievementCard}>
          <Text style={styles.achievementTitle}>Kinder</Text>
          <Text style={styles.text}>First Honor</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.achievementCard}>
          <Text style={styles.achievementTitle}>Elementary</Text>
          <Text style={styles.text}>With Honor</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.achievementCard}>
          <Text style={styles.achievementTitle}>High School</Text>
          <Text style={styles.text}>With Honor</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.achievementCard}>
          <Text style={styles.achievementTitle}>SHS</Text>
          <Text style={styles.text}>With Honor</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.achievementCard}>
          <Text style={styles.achievementTitle}>College</Text>
          <Text style={styles.text}>TES Scholarship</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start', 
    padding: 20,
    backgroundColor: '#f8f9fa', 
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#fff',
  },
  contentContainer: {
    width: '90%',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  achievementCard: {
    width: '100%',
    padding: 15,
    backgroundColor: '#e3f2fd',  // Light blue card for achievements
    borderRadius: 8,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  achievementTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e88e5', // Blue color for the titles
    marginBottom: 5,
  },
  text: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
});
