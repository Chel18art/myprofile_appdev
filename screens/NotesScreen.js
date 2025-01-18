import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Add icon library
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NotesScreen() {
  const [noteText, setNoteText] = useState('');
  const [notes, setNotes] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    // Load notes from AsyncStorage when the component mounts
    const loadNotes = async () => {
      try {
        const savedNotes = await AsyncStorage.getItem('notes');
        if (savedNotes !== null) {
          setNotes(JSON.parse(savedNotes));
        }
      } catch (error) {
        console.error('Failed to load notes:', error);
      }
    };

    loadNotes();
  }, []);

  const saveNotes = async (updatedNotes) => {
    try {
      await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
    } catch (error) {
      console.error('Failed to save notes:', error);
    }
  };

  const handleAddNote = () => {
    if (noteText.trim() === '') return;

    const newNote = { text: noteText, done: false };

    if (editIndex !== null) {
      // Edit the existing note
      const updatedNotes = [...notes];
      updatedNotes[editIndex] = newNote;
      setNotes(updatedNotes);
      saveNotes(updatedNotes);
      setEditIndex(null);
    } else {
      // Add new note
      const updatedNotes = [...notes, newNote];
      setNotes(updatedNotes);
      saveNotes(updatedNotes);
    }
    setNoteText('');
  };

  const handleDeleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
  };

  const handleEditNote = (index) => {
    setNoteText(notes[index].text);
    setEditIndex(index);
  };

  const handleMarkAsDone = (index) => {
    const updatedNotes = [...notes];
    updatedNotes[index].done = !updatedNotes[index].done;
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notes</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your note"
        value={noteText}
        onChangeText={setNoteText}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddNote}
      >
        <MaterialIcons name={editIndex !== null ? "update" : "add"} size={24} color="white" />
        <Text style={styles.addButtonText}>{editIndex !== null ? "Update Note" : "Add Note"}</Text>
      </TouchableOpacity>

      <FlatList
        data={notes}
        renderItem={({ item, index }) => (
          <View style={[styles.noteContainer, item.done && styles.doneNote]}>
            <Text style={[styles.noteText, item.done && styles.strikeThrough]}>
              {item.text}
            </Text>
            <View style={styles.noteActions}>
              <TouchableOpacity onPress={() => handleEditNote(index)} style={styles.actionButton}>
                <MaterialIcons name="edit" size={24} color="#4caf50" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleMarkAsDone(index)} style={styles.actionButton}>
                <MaterialIcons name={item.done ? "check-box" : "check-box-outline-blank"} size={24} color="#00796B" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteNote(index)} style={styles.actionButton}>
                <MaterialIcons name="delete" size={24} color="#f44336" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E0F7FA', // Light blue background
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#00796B', // Dark blue color for header text
  },
  input: {
    width: '100%',
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#00796B',
    borderRadius: 5,
    fontSize: 18,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00796B',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
    justifyContent: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
  },
  noteContainer: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  doneNote: {
    backgroundColor: '#E8F5E9', // Light green background for done notes
  },
  noteText: {
    fontSize: 18,
    flex: 1,
  },
  strikeThrough: {
    textDecorationLine: 'line-through', // Strikethrough for done notes
    color: '#9E9E9E', // Gray color for strikethrough
  },
  noteActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 10,
    marginLeft: 10,
  },
});
