import React from 'react';
import { StyleSheet, Text, View, Image,TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';

const imgData = [
  { id: 1, imgSource: require('./assets/1.jpg') },
  { id: 2, imgSource: require('./assets/2.jpg') },
  { id: 3, imgSource: require('./assets/3.jpg') },
  { id: 4, imgSource: require('./assets/4.jpg') },
  { id: 5, imgSource: require('./assets/5.jpg') },
  { id: 6, imgSource: require('./assets/6.jpg') }
];


export default function App() {
  const centerImage = Math.floor(imgData.length/2);
  return (
    <View style={styles.container}>
      <View style = {styles.heading}>
      <View style = {styles.Wrapper}>
       <Image
          style={styles.Avatar}
          source={require('./image/512x512bb.jpg')}
        />
        </View>
        <View style = {styles.Info}>
        <Text style = {styles.name}>Nguyen Viet Khoa</Text>
        <Text style = {styles.job,{color: 'grey'}}>Computer Engineering Student</Text>
        <View style = {styles.btnWrapper}>
        <TouchableOpacity>
        <View style = {[styles.btn, styles.followBtn]}><Text style = {{color: 'white'}}>Follow</Text></View>
        </TouchableOpacity>
        <TouchableOpacity>
        <View style = {[styles.btn, styles.sendBtn]}>
        <Image
          style={{width: 20, height: 20}}
          source={require('./image/telegram.png')}
          resizeMode="contain"
        /></View>
        </TouchableOpacity>
        </View>  
        </View>
      </View>
      <View style = {styles.numberCount}>
      <View style = {styles.Photos}>
        <Text style={{color: 'black', fontSize: 20, padding: 10, fontWeight: 'bold'}}>300</Text>
        <Text style={{color: 'grey', fontSize: 15}}>Photos</Text>
      </View>
      <View style = {styles.Follower}>
        <Text style={{color: 'black', fontSize: 20, padding: 10, fontWeight: 'bold'}}>1K</Text>
        <Text style={{color: 'grey', fontSize: 15}}>Follower</Text>
      </View>
      <View style = {styles.Following}>
      <Text style={{color: 'black', fontSize: 20, padding: 10, fontWeight: 'bold'}}>300</Text>
        <Text style={{color: 'grey', fontSize: 15}}>Following</Text>
      </View>
      </View>
      <ScrollView style = {styles.imageArea}> 
      <View style={{flexDirection: 'column'}}>
        {imgData.slice(0, centerImage).map(item=>{
          return <Image source={item.imgSource} style={styles.scrollimg} key={item.id}/>;
        })}
        </View>
        <View style={{flexDirection: 'column'}}>
        {imgData.slice(centerImage).map(item=>{
          return <Image source={item.imgSource} style={styles.scrollimg} key={item.id}/>;
        })}
      </View>
      </ScrollView>
      <View style = {styles.bottomTab}>
      <TouchableOpacity>
      <Feather name="inbox" size={27} color="black" />
      </TouchableOpacity>
      <TouchableOpacity>
      <Feather name="plus-circle" size={27} color="black" />
      </TouchableOpacity>
      <TouchableOpacity>
      <Feather name="user-plus" size={27} color="black" />
      </TouchableOpacity>
      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  heading: {
    flex: 0.22,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Wrapper:{
    marginTop:30,
    flex: 0.4,
    width: 110,
    height: 110,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Avatar:
  {
    flex: 1,
    width: 120,
    height: 120,
    borderRadius: 60,
    resizeMode: 'contain',
  },
  Info:
  {
    marginTop: 40,
    flex: 0.6,
    flexDirection: 'column',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 15,
  },
  job: {
    
  },
  btnWrapper:{
    flexDirection: 'row',
    marginTop: 50,
  },
  btn: {
    height: 30,
    borderRadius:15,
  },
  followBtn:{
    width:100,
    fontSize: 15,
    color: 'white',
    backgroundColor: 'deepskyblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendBtn:{
    width:50,
    backgroundColor: 'aqua',
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberCount: {
    flex: 0.15,
    flexDirection: 'row',
  
  },
  Photos:{
    flex: 0.33,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Follower:{
    flex:0.33,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Following: {
    flex:0.33,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageArea: {
    flex: 0.6,
    backgroundColor: 'snow',
    resizeMode: 'contain',
  },
  bottomTab: {
    flex: 0.1,
    backgroundColor: 'snow',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

});
