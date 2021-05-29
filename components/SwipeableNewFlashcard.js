import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Flashcard = (props) => {

  const [currentCard, setCurrentCard] = useState(0);
  
  return (
    <View style={styles.flashcard}>
      <TextInput
        style={styles.name}
        placeholder={'New Card'} 
        value={props.value.main[currentCard]}
        onChangeText={text => {
          let temp = props.value.main;
          temp.splice(currentCard, 1, text);
          props.onChangeText({
            main: temp,
            secondary: props.value.secondary,
            answer: props.value.answer
          });
        }}
      />
      <TextInput
        style={styles.description}
        placeholder={'Click to Edit'}
        value={props.value.secondary[currentCard]}
        onChangeText={text => {
          let temp = props.value.secondary;
          temp.splice(currentCard, 1, text);
          props.onChangeText({
            main: props.value.main,
            secondary: temp,
            answer: props.value.answer
          });
        }}
      />
      {/* card footer */}
      <View style={styles.footer}>
        {(currentCard != 0)?
        <TouchableOpacity onPress={() => setCurrentCard(currentCard-1)}>
          <Icon
            name={'chevron-left'}
            type={'font-awesome'}
          />
        </TouchableOpacity> : <Icon
          name={'chevron-left'}
          type={'font-awesome'}
          color={'#a3a3a3'}
        />}
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            style={styles.answerInput}
            value={props.value.answer}
            onChangeText={text => props.onChangeText({
              main: props.value.main,
              secondary: props.value.secondary,
              answer: text
            })}
            placeholder='Answer'
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            if (props.value.main[currentCard+1] === undefined)
              setCurrentCard({
                main: [...props.value.main,''],
                secondary: [...props.value.secondary,''],
                answer: props.value.answer
              });
              setCurrentCard(currentCard+1);
          }}
        >
          <Icon
            name={'chevron-right'}
            type={'font-awesome'}
          />
        </TouchableOpacity>
      </View>
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
    paddingBottom: 0,
  },
  name: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 10,
  },
  footer: {
    width: 385,
    flexDirection: 'row',
    marginTop: 40,
    padding: 20,
    alignContent: 'space-between',
    justifyContent: 'space-between',
  },
  answer: {
    fontWeight: 'bold',
    marginTop: 4,
  },
  answerInput: {
    borderBottomColor: '#000',
    marginBottom: 4,
  },
});

export default Flashcard;