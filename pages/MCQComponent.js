import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as service from '../network/service';

const MCQComponent = ({ questionData }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctAnswerId, setCorrectAnswerId] = useState(null);

  useEffect(() => {
    service.getRevealAnswers(questionData.id)
      .then(response => {
        setCorrectAnswerId(response.correct_options[0].id)
      })
      .catch(error => console.error(error))
  }, [questionData]);

  const renderOption = (option) => {
    let backgroundColor = 'rgba(255, 255, 255, 0.50)';
    let icon = null;

    if (selectedOption === option.id) {
      if (option.id === correctAnswerId) {
        backgroundColor = 'rgba(40, 177, 143, 0.70)';
        icon = (
          <Image
            source={require('../images/correct.png')}
            style={{ width: 24, height: 24 }}
          />
        );
      } else {
        backgroundColor = 'rgba(220, 95, 95, 0.70)';
        icon = icon = (
          <Image
            source={require('../images/incorrect.png')}
            style={{ width: 24, height: 24 }}
          />
        );;
      }
    }

    return (
      <TouchableOpacity
        key={option.id}
        style={[styles.option, { backgroundColor }]}
        onPress={() => setSelectedOption(option.id)}
      >
        <Text style={styles.optionText}>{option.answer}</Text>
        {icon}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{questionData.question}</Text>
      {questionData.options.map(renderOption)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginRight : 60,
  },
  question: {
    fontSize: 22,
    marginBottom: 100,
    fontWeight: '500',
    color: 'white',
    backgroundColor: 'black',
    borderRadius: 8,
    padding: 6,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
  },
  optionText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
  },
});

export default MCQComponent;
