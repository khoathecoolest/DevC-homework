import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import CompleteScreen from '../screens/CompleteScreen';
import AllScreen from '../screens/AllScreen';
import ActiveScreen from '../screens/ActiveScreen';
import DetailScreen from '../screens/DetailScreen';
const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const CompleteStack = createStackNavigator(
  {
    Complete: CompleteScreen,
  },
  config
);

CompleteStack.navigationOptions = {
  tabBarLabel: 'Complete',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? 'ios-checkmark'
          : 'md-information-circle'
      }
    />
  ),
};

CompleteStack.path = '';

const AllStack = createStackNavigator(
  {
    All: AllScreen,
    Detail: DetailScreen,
  },
  config
);

AllStack.navigationOptions = {
  tabBarLabel: 'All',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-list' : 'md-link'} />
  ),
};

AllStack.path = '';

const ActiveStack = createStackNavigator(
  {
    Acive: ActiveScreen,
  },
  config
);

ActiveStack.navigationOptions = {
  tabBarLabel: 'Active',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-code-working' : 'md-options'} />
  ),
};

ActiveStack.path = '';

const tabNavigator = createBottomTabNavigator({
  CompleteStack,
  AllStack,
  ActiveStack,
});

tabNavigator.path = '';

export default tabNavigator;
