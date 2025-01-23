import React from 'react';
import { View, Text, StyleSheet, Linking, Image, TouchableOpacity } from 'react-native';

export default function ContactMeScreen() {
  return (
    <View style={styles.container}>
      {/* Heading */}
      <Text style={styles.heading}>Richelle Mae M. Arat</Text>

      {/* Profile Image */}
      <Image
        source={require('../assets/profile.jpg')} 
        style={styles.profileImage}
      />

      {/* Instructions */}
      <Text style={styles.instructions}>Feel free to connect with me through the following:</Text>

      {/* Social Media Icons */}
      <View style={styles.socialIconsContainer}>
        {/* Facebook */}
        <TouchableOpacity
          onPress={() => Linking.openURL('https://web.facebook.com/chelmaeee18')}
          style={styles.iconWrapper}
        >
          <Image source={require('../assets/facebook.jpg')} style={styles.socialIcon} />
          <Text style={styles.iconLabel}>Facebook</Text>
        </TouchableOpacity>

        {/* Instagram */}
        <TouchableOpacity
          onPress={() => Linking.openURL('https://www.instagram.com/xrx.chl_18')}
          style={styles.iconWrapper}
        >
          <Image source={require('../assets/IG.png')} style={styles.socialIcon} />
          <Text style={styles.iconLabel}>Instagram</Text>
        </TouchableOpacity>

        {/* Gmail */}
        <TouchableOpacity
          onPress={() => Linking.openURL('mailto:arat.richellemae@gmail.com')}
          style={styles.iconWrapper}
        >
          <Image source={require('../assets/gmail.png')} style={styles.socialIcon} />
          <Text style={styles.iconLabel}>Email</Text>
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
    backgroundColor: '#f0f0f0', 
  },
  heading: {
    fontSize: 32, // Bigger heading for prominence
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 4,
    borderColor: '#ddd',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  instructions: {
    fontSize: 16,
    color: '#555',
    marginBottom: 40,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    flexWrap: 'wrap',
    marginBottom: 20, 
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    transition: 'transform 0.2s', // Smooth transition for hover effect
  },
  socialIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#ddd',
    transition: 'transform 0.2s', // Add scaling effect on touch
  },
  iconLabel: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});
