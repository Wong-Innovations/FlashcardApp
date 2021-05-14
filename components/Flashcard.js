import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Icon } from 'react-native';

const Flashcard = (props) => {

  const [cardNumber, setCardNumber] = useState(0);

  const handleCycleFlashcard = () => {
    if (cardNumber < props.main.length-1)
      setCardNumber(cardNumber+1);
    else
      setCardNumber(0);
  }

  useEffect(() => setCardNumber(0), [props.main]);

  return (
    <TouchableOpacity
      onPress={props.onPress? props.onPress : handleCycleFlashcard}
      onLongPress={props.onLongPress}
    >
      <View style={styles.flashcard}>
        <Text style={styles.main}>{props.main[cardNumber]}</Text>
        <Text style={styles.secondary}>{props.secondary[cardNumber]}</Text>
      </View>
    </TouchableOpacity>
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
  main: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  secondary: {
    marginTop: 10,
  },
});

export default Flashcard;