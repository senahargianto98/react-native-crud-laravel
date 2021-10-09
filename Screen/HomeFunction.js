import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  StyleSheet,
  Button,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';

function Home() {
  const [isLoading, setLoading] = useState(true);
  const [text, setText] = useState('');
  const [data, setData] = useState([]);
  const [arrayholder, setArrayholder] = useState([]);
  const [currentpage, setCurrentPage] = useState('');
  const [lastpage, setLastPage] = useState('');
  const [uri, setUri] = useState(
    'http://192.168.1.12:8000/api/goods/paginate?page=',
  );
  const [next, setNext] = useState('');
  const [prev, setPrev] = useState('');

  const searchData = text => {
    if (text) {
      const newData = arrayholder.filter(item => {
        const itemData = item.text.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setData(newData);
    } else {
      getPaginate();
    }
    setText(text);
  };

  const getData = async () => {
    try {
      const response = await fetch('http://192.168.1.12:8000/api/goods/');
      const json = await response.json();
      setArrayholder(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getPaginate = async () => {
    try {
      const response = await fetch(uri);
      const json = await response.json();
      setData(json.data);
      setCurrentPage(json.current_page);
      setLastPage(json.last_page);
      setNext(json.next_page_url);
      setPrev(json.prev_page_url);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadmore = () => {
    setUri(next);
  };

  const Delete = (id) => {
    // console.log(id)
    fetch('http://192.168.1.12:8000/api/goods/delete/' + id, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(getPaginate());
  }

  const previous = () => {
    setUri(prev);
  };

  const navigation = useNavigation();

  useEffect(() => {
    getPaginate();
    getData();
    const willFocusSubscription = navigation.addListener('focus', () => {
      getPaginate();
    });
    return willFocusSubscription;
  }, [uri]);

  if (text != 0) {
    return (
      <View style={{flex: 1, padding: 14}}>
        <SearchBar
          lightTheme
          clearIcon
          style={styles.textInput}
          onChangeText={text => searchData(text)}
          value={text}
          placeholder="Search Here"
        />
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            keyExtractor={({id}, index) => id}
            renderItem={({item}) => (
              <View
                style={{
                  flexDirection: 'row',
                  padding: 5,
                  borderBottomWidth: 1,
                  borderBottomColor: '#dedede',
                }}>
                <Text style={{color: 'black'}}>{item.text}</Text>
                <View style={styles.edit}>
                  <Button
                    title="Edit"
                    onPress={() => {
                      navigation.navigate('Other', {
                        itemId: item.id,
                        itemTitle: item.text,
                        itemInteger: item.integer,
                      });
                    }}
                  />
                  <View style={styles.delete}>
                    <Button color="red" onPress={()=>Delete(item.id)} title="Delete" />
                  </View>
                </View>
              </View>
            )}
          />
        )}
      </View>
    );
  } else {
    return (
      <View style={{flex: 1, padding: 14}}>
        <SearchBar
          lightTheme
          style={styles.textInput}
          onChangeText={text => searchData(text)}
          value={text}
          placeholder="Search Here"
        />
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            keyExtractor={({id}, index) => id}
            renderItem={({item}) => (
              <View
                style={{
                  flexDirection: 'row',
                  padding: 5,
                  borderBottomWidth: 1,
                  borderBottomColor: '#dedede',
                }}>
                <Text style={{color: 'black'}}>{item.text}</Text>
                <View style={styles.edit}>
                  <Button
                    title="Edit"
                    onPress={() => {
                      navigation.navigate('Other', {
                        itemId: item.id,
                        itemTitle: item.text,
                        itemInteger: item.integer,
                      });
                    }}
                  />
                  <View style={styles.delete}>
                    <Button color="red" onPress={()=>Delete(item.id)} title="Delete" />
                  </View>
                </View>
              </View>
            )}
          />
        )}
        {currentpage === lastpage ? (
          <View style={styles.button1}>
            <Button
              color="#ff5c5c"
              title="Next"
              disabled={true}
              onPress={() => handleLoadmore()}></Button>
          </View>
        ) : (
          <View style={styles.button1}>
            <Button title="Next" onPress={() => handleLoadmore()}></Button>
          </View>
        )}
        {currentpage === 1 ? (
          <View style={styles.button}>
            <Button
              color="#ff5c5c"
              title="Prev"
              disabled={true}
              onPress={() => previous()}></Button>
          </View>
        ) : (
          <View style={styles.button}>
            <Button title="Prev" onPress={() => previous()}></Button>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    paddingRight: 30,
    paddingLeft: 30,
  },
  button1: {
    paddingRight: 30,
    paddingLeft: 30,
    marginBottom: 10,
  },
  edit: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  delete:{
    marginLeft:10
  }
});

export default Home;
