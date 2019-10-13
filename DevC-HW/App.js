import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image } from 'react-native';

const CHOICES = [
  {
    name: 'rock',
    imgSource: 'http://pngimg.com/uploads/stone/stone_PNG13622.png',
    uri: require('./assets/1.png')
  },
  {
    name: 'paper',
    imgSource: 'https://www.stickpng.com/assets/images/5887c26cbc2fc2ef3a186046.png',
    uri: require('./assets/2.png')
  },
  {
    name: 'scissors',
    imgSource:'http://pluspng.com/img-png/png-hairdressing-scissors-beauty-salon-scissors-clipart-4704.png',
    uri: require('./assets/3.png')
  }
];

const Button = (props) => {
  return(
    <View>
    {
      CHOICES.map(choice=>{
        return(
          <TouchableOpacity 
          onPress={()=>props.onButtonPress(choice.name)}
          style= {styles.buttonStyle} 
          key = {choice.name}>
          <Text style = {styles.buttonText}>{choice.name}</Text>
          </TouchableOpacity>
          )
      })
    }
    </View>
    )
};
const ChoiceCard = (props) =>{
  return(
    <View style = {styles.choiceContainer}>
    <Text style = {styles.choiceCardTitle}>{props.playerName}</Text>
    <Image style = {styles.choiceImage} source = {props.choice.uri}/>
    <Text style = {styles.choiceDescription}>{props.choice.name}</Text>
    </View>
  )
}
const getColor=(result)=>{
  if(result === "You win!")
    return 'green'
  if(result === "You lose!")
    return 'red'
  return 'black'
}
const getWin=(result, winCount)=>{
   let a = winCount;
   return a;
}
const Header = (props) =>{
  
  return(
  <View style = {{flexDirection: 'column'}}>
    <Text style ={{fontSize: 25, fontWeight: 'bold', paddingTop: 30}}>Win rate: {props.winRate}%</Text>
    <Text style ={{fontSize: 25, fontWeight: 'bold', color: getColor(props.result), paddingTop: 30}}>{props.result}</Text>  
  </View>
  )
}
const getResult = (userChoice,computerChoice)=>{
  let result;
  if(userChoice === computerChoice){
    result = "Tie Game!";
    return result
  }
  if(userChoice === "scissors")
    result = computerChoice === "rock"?"You lose!":"You win!";
  if(userChoice === "rock")
    result = computerChoice === "paper"?"You lose!":"You win!";
  if(userChoice === "paper")
    result = computerChoice === "scissors"?"You lose!":"You win!";
  return result
}

export default class App extends React.Component {
  constructor(props) {
  super(props)
  this.state = {
    userChoice: {},
    computerChoice: {},
    result: "Make your choice",
    winCount: 0,
    game: 1,
    winRate: 0
  }
}
  onChoicePress = (choice)=>{
    const userChoice = CHOICES.find(item => item.name === choice)
    const computerChoice = CHOICES[Math.floor(Math.random()*3)]
    const result = getResult(userChoice.name, computerChoice.name)
    this.setState({userChoice, computerChoice, result, game: this.state.game+1})
    this.setState({winCount:result==="You win!"? this.state.winCount+1 : this.state.winCount})
    this.setState({winRate:result==="You win!"? ((this.state.winCount+1)/this.state.game).toFixed(2)*100 : (this.state.winCount/this.state.game).toFixed(2)*100})
  }
  render() {
    return(
     <View style = {styles.container}>
     <View style = {styles.header}>
     <Header result = {this.state.result}
     winCount = {this.state.winCount}
     game = {this.state.game}
     winRate = {this.state.winRate}/>
     </View>
     <View style = {styles.playArea}>
      <View style = {styles.choicesContainer}>
        <ChoiceCard 
        playerName = "You"
        choice = {this.state.userChoice}/>
          <Text style ={{fontWeight: 'bold', fontSize:20}}>VS</Text>
        <ChoiceCard
        playerName= "Computer"
        choice = {this.state.computerChoice}/>
      </View>
     </View>
     <View style = {styles.choiceButton}>
     <Button onButtonPress = {this.onChoicePress}/>
     </View>
     </View>
     );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9ebee',
  },
  header:{
    flex: 0.15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playArea:{
    flex: 0.55,
    backgroundColor: 'aqua'
  },
  choiceButton:{
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    width: 200,
    margin: 10,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#640D14',
  },
  buttonText: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  },
  choicesContainer: {
    margin: 10,
    borderWidth: 2,
    paddingTop: 100,
    shadowRadius: 5,
    paddingBottom: 100,
    borderColor: 'grey',
    shadowOpacity: 0.90,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-around',
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: { height: 5, width: 5 },
  },
  choiceContainer: {
    flex: 1,
    alignItems: 'center',
  },
  choiceDescription: {
    fontSize: 25,
    color: '#250902',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  choiceCardTitle: {
    fontSize: 30,
    color: '#250902',
  },
  choiceImage: {
    width: 150,
    height: 150,
    padding: 10,
  }
});
