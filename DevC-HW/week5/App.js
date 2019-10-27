import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import moment from 'moment';
import { Card, Button, Icon } from 'react-native-elements';
import { Linking } from 'react-native';
const API1 = '59dc1054fb4f4cfb9e6ab4b55a154d87'
const API2 = '6eec2f7fe6cd4c40a3fef8f33f5778fe'
let num = 0;
const filterForUniqueArticles = (arr) => {
  const cleaned = [];
  arr.forEach(itm => {
    let unique = true;
    cleaned.forEach(itm2 => {
      const isEqual = JSON.stringify(itm) === JSON.stringify(itm2);
      if (isEqual) unique = false;
    });
    if (unique){ 
      cleaned.push(itm);
    }
  });
  return cleaned;
};
export default function App() {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [country, setCountry] = useState('us')
  const [hasErrored, setHasApiError] = useState(false);
  const [lastPageReached, setLastPageReached] = useState(false);
  const onPress = url => {
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url);
    } else {
      console.log(`Don't know how to open URL: ${url}`);
    }
  });
};
  
  const getNews = async () =>{
    console.log('triggered')
    if (lastPageReached){
      setLoading(false);
      return;
    }
    try {
    if(country === 'us')
      setCountry('au')
    const response = await fetch(
      'https://newsapi.org/v2/top-headlines?country='+country+'&apiKey='+API1);
    console.log('API', country)
    const jsonData  = await response.json();
    const hasMoreArticles = num===40;
    console.log(jsonData.articles.length)
    if(!hasMoreArticles){
    const newArticleList = filterForUniqueArticles(
    articles.concat(jsonData.articles)
  );
    setArticles(newArticleList);
    setPageNumber(pageNumber+1);
    num = num + 20;
  }
  else
    setLastPageReached(true);
  }
  catch(error){
    setHasApiError(true);
  }
    setLoading(false);
  }
const renderArticleItem = ({item}) => {
      return(
        <Card title={item.title} image={{uri: item.urlToImage}}>
        <View style={styles.row}>
          <Text style={styles.label}>Source</Text>
          <Text style={styles.info}>{item.source.name}</Text>
        </View>
        <Text>{item.content}</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Published</Text>
          <Text style={styles.info}>
            {moment(item.publishedAt).format('LLL')}
          </Text>
        </View>
        <Button icon={<Icon />} title="Read more" backgroundColor="#03A9F4" onPress={() => onPress(item.url)}/>
      </Card>
        );
    };

  useEffect(() => {
    getNews()
  }, [])
  if (loading) {
  return (
    <View style = {styles.container}>
      <ActivityIndicator size="large" loading={loading}/>
    </View>
  );
}
if (hasErrored) {
  return (
    <View style={styles.container}>
      <Text>Error =(</Text>
    </View>
  );
}
  return (
    <View style={styles.container}>
    <View style={styles.row}>
    <Text style={styles.label}>Articles Count:</Text>
    <Text style={styles.info}>{articles.length}</Text>
    </View>
    <FlatList
    data = {articles}
    onEndReached={getNews}
    onEndReachedThreshold={1}
    renderItem={renderArticleItem}
    keyExtractor = {item => item.title}
    ListFooterComponent={lastPageReached ?<Text>No more Article</Text>:<ActivityIndicator size="large" loading={loading}/>}>
    </FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  containerFlex: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    marginTop: 40,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  header: {
    height: 30,
    width: '100%',
    backgroundColor: 'pink'
  },
  row: {
    flexDirection: 'row'
  },
  label: {
    fontSize: 16,
    color: 'black',
    marginRight: 10,
    fontWeight: 'bold'
  },
  info: {
    fontSize: 16,
    color: 'grey'
  }
});
//59dc1054fb4f4cfb9e6ab4b55a154d87