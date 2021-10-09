import React, {useState} from 'react';
import {Button, View, Alert, TextInput, StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function Detail() {
  const [text, setText] = useState('');
  const [integer, setInteger] = useState('');
  const [result, setResult] = useState('');

  const postData = () => {
    fetch('http://192.168.1.12:8000/api/goods', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: text,
        integer:integer,
      }),
    })
      .then(navigation.navigate('Home'))
  };

  const navigation = useNavigation();

  return (
    <View style={style.viewForm}>
      <TextInput
        style={style.textInput}
        placeholder="Masukkan Text"
        value={text}
        onChangeText={text => setText(text)}></TextInput>
      <TextInput
        style={style.textInput}
        keyboardType="numeric"
        placeholder="Masukkan Integer"
        value={integer}
        onChangeText={text => setInteger(text)}></TextInput>
      <View style={style.button}>
        <Button title="Masukkan Data" onPress={() => postData()}></Button>
      </View>
    </View>
  );
}
export const style = StyleSheet.create({
  viewForm: {
    flex: 2,
    padding: 10,
    justifyContent: 'center',
  },
  textInput: {
    padding: 10,
    fontSize: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    marginBottom: 10,
    backgroundColor: '#dedede',
  },
  button: {
    paddingRight: 60,
    paddingLeft: 60,
  },
});
