import React, {useState,useEffect} from 'react';
import {View, StyleSheet, TextInput, Button, Alert, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

function OtherScreen({route}) {
  const {itemId, itemTitle, itemInteger} = route.params;
  const [text, setText] = useState('');
  const [integer, setInteger] = useState('');
  const [textout, setTextOut] = useState('');
  const [IntegerOut, setIntegerOut] = useState('')

  const save = () => {
    fetch('http://192.168.1.12:8000/api/goods/edit', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: itemId,
        text: text,
        integer: integer,
      }),
    })
      .then(response => response.json())
      .then(json => {
        Alert.alert(
          'Data yang di masukkan: ' +
            json.text +
            ' ' +
            'Dan' +
            ' ' +
            json.integer,
        );
        setTextOut(json.text)
        setIntegerOut(json.integer)
      });
  };

  const navigation = useNavigation();


  useEffect(() => {
    const willFocusSubscription = navigation.addListener('focus', () => {
      setTextOut(itemTitle);
      setIntegerOut(itemInteger);
    });
    return willFocusSubscription;
  }, [])

  return (
    <View style={style.viewForm}>
      <View>
        <Text style={{ color:"black" }}>{ textout }</Text>
        <Text style={{color:"black"}}>{IntegerOut}</Text>
      </View>
      <View>
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
          <Button title="Masukkan Data" onPress={() => save()}></Button>
        </View>
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

export default OtherScreen;
