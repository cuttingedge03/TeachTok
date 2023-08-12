import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const QuestionComponent = ({ question, options, correctIndex }) => {
  const [selected, setSelected] = useState(null);

  const handlePress = (index) => {
    setSelected(index);
  };

  return (
    <View>
      <Text style={styles.question}>{question}</Text>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.option,
            selected === index && {
              backgroundColor: index === correctIndex ? 'green' : 'red',
            },
          ]}
          onPress={() => handlePress(index)}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  option: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
  },
  optionText: {
    fontSize: 18,
  },
});

export default QuestionComponent;
