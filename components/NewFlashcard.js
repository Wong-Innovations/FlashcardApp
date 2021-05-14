import React from 'react';
import { View, TextInput, StyleSheet, Icon } from 'react-native';

const Flashcard = (props) => {

  return (
    <View style={styles.flashcard}>
      <TextInput
        style={styles.name}
        placeholder={'My Flashcards'} 
        value={props.value.name}
        onChangeText={text => props.onChangeText({
          name: text,
          description: props.value.description
        })}
      />
      <TextInput
        style={styles.description}
        placeholder={'Click to Edit'}
        value={props.value.description}
        onChangeText={text => props.onChangeText({
          name: props.value.name,
          description: text
        })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flashcard: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 100,
  },
  name: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 10,
  },
});

export default Flashcard;