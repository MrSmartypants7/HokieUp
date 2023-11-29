import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useMutation, gql } from '@apollo/client';
import EventSuccessScreen from './EventSuccessScreen';


const ADD_EVENT = gql`
  mutation AddEvent($title: String!, $date: timestamptz!) {
    insert_Event(objects: [{ title: $title, date: $date }]) {
      affected_rows
      returning {
        date
        id
        title
      }
    }
  }
`;

const Stack = createStackNavigator();

const AddEventForm = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [addEvent] = useMutation(ADD_EVENT);

  const handleAddEvent = async () => {
    try {

      console.log('Input values:', { title, date, time, location });

      const formattedTime = time.substring(0, 5);
      const dateTimeString = `${date}T${formattedTime}:00.000Z`;

      // Construct the date
      const eventDate = new Date(dateTimeString);
      console.log('Parsed date:', eventDate);
      if (isNaN(eventDate)) {
        console.log(eventDate);
        console.error('Invalid date');
        return;
      }
      const result = await addEvent({
        variables: {
          title,
          date: eventDate.toISOString(),
        },
      });  
    
    navigation.navigate('EventSuccess');
    // Implement your logic to add the event
    //console.log('Event added:', result.data.insert_YourTableName.returning);
    //console.log('Event added:', { title, date });
    setTitle('');
    setDescription('');
    setDate('');
    setTime('');
    setLocation('');

    
    } catch (error) {
      console.error('Error adding event:', error);

    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Title"
        value={title}
        placeholder="Enter event title"
        onChangeText={(text) => setTitle(text)}
        style={styles.input}
      />
      <TextInput
        label="Description"
        value={description}
        placeholder="Enter event description"
        onChangeText={(text) => setDescription(text)}
        style={styles.input}
      />

      <TextInput
        label="Date"
        value={date}
        placeholder="Select event date in yyyy-mm-dd"
        onChangeText={(text) => setDate(text)}
        style={styles.input}
      />
      <TextInput
        label="Time"
        value={time}
        placeholder="Select event time in hh:mm:ss"
        onChangeText={(text) => setTime(text)}
        style={styles.input}
      />
      <TextInput
        label="Location"
        value={location}
        placeholder="Enter event location"
        onChangeText={(text) => setLocation(text)}
        style={styles.input}
      />
      <Button mode="contained" onPress={handleAddEvent} style={styles.button}>
        Add Event
      </Button>
    </View>
  );
};

const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="AddEvent">
      <Stack.Screen name="AddEvent" component={AddEventForm} />
      <Stack.Screen name="EventSuccess" component={EventSuccessScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    marginVertical: 8,
  },
  button: {
    marginTop: 16,
  },
  successText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AddEventForm;