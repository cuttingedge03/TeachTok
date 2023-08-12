import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const QuestionComponent = ({ response }) => {
  const [showText, setShowText] = useState(false);


  const handlePress = () => {
    setShowText(!showText);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>{response === null ? '' : response.flashcard_front}</Text>
      </TouchableOpacity>
      {showText && <View>
        <View style={styles.underline} />
        <Text style={styles.greenText}>Answer</Text>
        <Text style={styles.text}>{response === null ? '' : response.flashcard_back}</Text>

        <Text style={styles.wellText}>How well did you know this?</Text>
        <View style={styles.rowContainer}>
          <View style={styles.textBox} backgroundColor='#F17D23'>
            <Text style={styles.textBox2}>1</Text>
          </View>
          <View style={styles.textBox} backgroundColor='#FBB668'>
            <Text style={styles.textBox2}>2</Text>
          </View>
          <View style={styles.textBox} backgroundColor='#FFD449'>
            <Text style={styles.textBox2}>3</Text>
          </View>
          <View style={styles.textBox} backgroundColor='#16624F'>
            <Text style={styles.textBox2}>4</Text>
          </View>
          <View style={styles.textBox} backgroundColor='#1F8A70'>
            <Text style={styles.textBox2}> 5</Text>
          </View>
        </View>

      </View>
      }

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'start',
    marginRight: 60,
    padding: 8,

  },
  rowContainer: {
    marginTop: 4,
    flexDirection: 'row', // Stack children horizontally
    justifyContent: 'center', // Add space between boxes
    alignItems: 'center',
    gap: 10,
  },
  textBox: {
    borderRadius: 10, // Rounded edges
    padding: 8, // Padding inside the box
    width: 52, // Width of the box
    height: 52,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBox2: {
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 17,
    fontWeight: 600,
  },
  button: {
    padding: 15,
    borderRadius: 5,
    marginBottom: 24,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 21,
  },
  wellText:{
    marginTop: 24,
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 15,
  },
  text: {
    fontSize: 21,
    color: 'rgba(255, 255, 255, 0.70)',
    fontWeight: '400',
  },
  greenText: {
    fontSize: 13,
    color: '#2DC59F',
    fontWeight: '800',
  },
  underline: {
    backgroundColor: 'rgba(255, 255, 255, 0.20)',
    height: 2,
    alignItems: 'stretch',
    marginBottom: 24,
  },
});

export default QuestionComponent;