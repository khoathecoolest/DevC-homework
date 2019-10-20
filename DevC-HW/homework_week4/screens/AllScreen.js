import React from 'react';
import { useState } from 'react';
import { Text, View, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import {ScrollView, ImageBackground, KeyboardAvoidingView} from 'react-native';
import { TODOS } from '../utils/data.js';
import { TextInput } from 'react-native';
const TodoItem = (props) => {
  const statusStyle = {
    backgroundColor: props.todo.status === 'Done' ? 'blue' : 'green'
  };
  const onLongPress = todo => {
  const prompt = `"${todo.body}"`;
  Alert.alert(
    'Delete your todo?',
    prompt,
    [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      },
      { text: 'OK', onPress: () => props.onDeleteTodo(todo.id) }
    ],
    { cancelable: true }
  );
};

  return (
    <TouchableOpacity
      key={props.todo.body}
      style={[styles.todoItem, statusStyle]}
      onPress={() => props.onToggleTodo(props.todo.id)}
      onLongPress={() => onLongPress(props.todo)}
    >
      <Text style={styles.todoText}>
        {props.idx + 1}: {props.todo.body}
      </Text>
    </TouchableOpacity>
  );
};


export default function AllScreen(props) {
  console.log('Todos', TODOS)

  const [todoList, setTodoList] = useState(TODOS);

  const [todoBody, setTodoBody] = useState('');

  const onToggleTodo = id => {
    const todo = todoList.find(todo => todo.id === id);
      todo.status = todo.status === 'Done' ? 'Active' : 'Done';
    const foundIndex = todoList.findIndex(todo => todo.id === id);
      todoList[foundIndex] = todo;
    const newTodoList = [...todoList];
      setTodoList(newTodoList);

      setTimeout(() => {
    props.navigation.navigate('Detail', {
    updatedTodo: todo
  });
}, 1000);
    
};

const onDeleteTodo = id => {
  const newTodoList = todoList.filter(todo => todo.id !== id);
  setTodoList(newTodoList);
};

const onSubmitTodo = () => {
  const newTodo = {
    body: todoBody,
    status: 'Active',
    id: todoList.length + 1
  };
  const newTodoList = [...todoList, newTodo];
  setTodoList(newTodoList);
  setTodoBody('');
};
  return (
    <ImageBackground
    style = {{flex:1, alignItems: 'center', justifyContent: 'center'}}
    source ={{uri: "https://images.unsplash.com/photo-1554166693-4518329faec1?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"}} >
    <KeyboardAvoidingView enabled behavior="padding" style={styles.keyboard}>
    <ScrollView style={{flex: 1}}>
    <View style={styles.container}>
  {todoList.map((todo, idx) => {
    return (
      <TodoItem
        idx={idx}
        todo={todo}
        key={todo.body}
        onToggleTodo={onToggleTodo}
        onDeleteTodo={onDeleteTodo}
      />
    );
  })}
  <View style={styles.inputContainer}>
  <TextInput
    value={todoBody}
    style={styles.todoInput}
    textAlign="center"
    placeholder="Add Todo here!"
    placeholderTextColor="red"
    color="red"
    onChangeText={text => setTodoBody(text)}
  />
  <TouchableOpacity style={styles.button} onPress={onSubmitTodo}>
    <Text style={styles.buttonText}>Submit</Text>
  </TouchableOpacity>
</View>
</View>
</ScrollView>
</KeyboardAvoidingView>
</ImageBackground>
  );
}

AllScreen.navigationOptions = {
  title: 'All Todos'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
    justifyContent: 'center'
  },
  todoItem: {
    margin: 5,
    padding: 10,
    width: '95%',
    minHeight: 20,
    color: 'white',
    borderRadius: 5,
    flexWrap: 'wrap'
  },
  todoText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  },
  todoInput: {
    width: '95%',
    minHeight: 30,
    color: 'white',
    borderWidth: 1,
    marginTop: '20%',
    marginBottom: '5%',
    borderColor: 'grey'
  },
  inputContainer: {
    flex: 1,
    width: '90%',
    marginTop: 20,
    marginBottom: '10%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    height: 50,
    width: '50%',
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'blue',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  keyboard:{
    flex:1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
});

