import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput, Alert, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import icons

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState({});
  const [newEvent, setNewEvent] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null); // For tracking the event being edited

  // Get stored events from AsyncStorage on app load
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const storedEvents = await AsyncStorage.getItem('events');
        if (storedEvents) {
          setEvents(JSON.parse(storedEvents));
        }
      } catch (error) {
        console.log('Error loading events:', error);
      }
    };

    loadEvents();

    // Keyboard visibility listener
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  // Save events to AsyncStorage
  const saveEvents = async (newEvents) => {
    try {
      await AsyncStorage.setItem('events', JSON.stringify(newEvents));
    } catch (error) {
      console.log('Error saving events:', error);
    }
  };

  // Handle selecting a date
  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
    setEditingEvent(null); // Reset editing when selecting a new date
  };

  // Add an event to the selected date
  const addEvent = () => {
    if (!newEvent) {
      Alert.alert('Error', 'Please enter an event description');
      return;
    }

    const updatedEvents = { ...events, [selectedDate]: [...(events[selectedDate] || []), newEvent] };
    setEvents(updatedEvents);
    saveEvents(updatedEvents);
    setNewEvent(''); // Clear the input field after adding
  };

  // Edit an event
  const editEvent = (index) => {
    setEditingEvent({ index, value: events[selectedDate][index] });
    setNewEvent(events[selectedDate][index]);
  };

  // Save edited event
  const saveEditedEvent = () => {
    if (!newEvent) {
      Alert.alert('Error', 'Please enter an event description');
      return;
    }

    const updatedEvents = { ...events };
    updatedEvents[selectedDate][editingEvent.index] = newEvent;
    setEvents(updatedEvents);
    saveEvents(updatedEvents);
    setNewEvent('');
    setEditingEvent(null);
  };

  // Delete an event
  const deleteEvent = (index) => {
    const updatedEvents = { ...events };
    updatedEvents[selectedDate].splice(index, 1);

    if (updatedEvents[selectedDate].length === 0) {
      delete updatedEvents[selectedDate]; // Remove the date if no events left
    }

    setEvents(updatedEvents);
    saveEvents(updatedEvents);
  };

  // Get the marked dates for the calendar
  const getMarkedDates = () => {
    const marked = {};
    for (const date in events) {
      marked[date] = {
        selected: true,
        selectedColor: 'lightblue', // Light blue for event dates
        selectedTextColor: 'white',
      };
    }
    return marked;
  };

  // Highlight the current date
  const getCurrentDateMarked = () => {
    const currentDate = moment().format('YYYY-MM-DD');
    return {
      [currentDate]: {
        selected: true,
        selectedColor: 'green', // Green for current date
        selectedTextColor: 'white',
      },
    };
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.header}>Calendar</Text>

          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}
          >
            <Calendar
              current={moment().format('YYYY-MM-DD')}
              markedDates={{
                ...getMarkedDates(),
                ...getCurrentDateMarked(),
              }}
              onDayPress={onDayPress}
              theme={{
                selectedDayBackgroundColor: '#00796B',
                todayTextColor: '#00796B',
                arrowColor: '#00796B',
                todayBackgroundColor: '#E0F7FA',
              }}
              style={[styles.calendar, { marginBottom: keyboardVisible ? 150 : 20 }]}
            />

            {selectedDate && (
              <View style={styles.eventSection}>
                <Text style={styles.selectedDateText}>Selected Date: {selectedDate}</Text>

                <TextInput
                  style={styles.eventInput}
                  placeholder="Add or Edit Event"
                  value={newEvent}
                  onChangeText={setNewEvent}
                  autoCapitalize="sentences"
                />

                <TouchableOpacity
                  style={styles.addEventButton}
                  onPress={editingEvent ? saveEditedEvent : addEvent}
                >
                  <Text style={styles.addEventText}>{editingEvent ? 'Save Event' : 'Add Event'}</Text>
                </TouchableOpacity>

                <View style={styles.eventList}>
                  {events[selectedDate]?.map((event, index) => (
                    <View key={index} style={styles.eventItemContainer}>
                      <Text style={styles.eventItem}>{event}</Text>
                      <View style={styles.eventActions}>
                        <TouchableOpacity onPress={() => editEvent(index)}>
                          <Icon name="edit" size={20} color="#00796B" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => deleteEvent(index)}>
                          <Icon name="delete" size={20} color="#D32F2F" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7FA',
    padding: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#00796B',
  },
  calendar: {
    width: '100%',
    height: Dimensions.get('window').height * 0.4, // Adjusted to take up more space
    borderRadius: 10,
  },
  eventSection: {
    marginTop: 20,
    alignItems: 'center',
  },
  selectedDateText: {
    fontSize: 18,
    color: '#00796B',
    marginBottom: 10,
  },
  eventInput: {
    height: 40,
    width: '80%',
    borderColor: '#00796B',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  addEventButton: {
    backgroundColor: '#00796B',
    padding: 10,
    borderRadius: 5,
    marginBottom: 50,
  },
  addEventText: {
    color: 'white',
    fontSize: 18,
  },
  eventList: {
    marginTop: 10,
    width: '80%',
  },
  eventItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  eventItem: {
    fontSize: 16,
    color: '#00796B',
    flex: 1,
  },
  eventActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
