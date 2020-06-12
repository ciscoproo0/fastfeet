import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { createStackNavigator } from 'react-navigation-stack';
import Login from './pages/Login';

import Dashboard from './pages/Deliveries/Dashboard';
import Details from './pages/Deliveries/Details';
import ListProblem from './pages/Deliveries/ListProblem';
import RegisterProblem from './pages/Deliveries/RegisterProblem';
import ConfirmDelivery from './pages/Deliveries/ConfirmDelivery';

import Profile from './pages/Profile';

export default (signed = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          Login,
        }),
        App: createBottomTabNavigator(
          {
            Order: {
              screen: createStackNavigator(
                {
                  Dashboard,
                  Details,
                  ListProblem,
                  RegisterProblem,
                  ConfirmDelivery,
                },
                {
                  defaultNavigationOptions: {
                    headerTransparent: true,
                    headerTintColor: '#fff',
                    headerLeftContainerStyle: {
                      marginLeft: 20,
                    },
                  },
                }
              ),
              navigationOptions: {
                tabBarVisible: true,
                tabBarLabel: 'Entregas',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="reorder" size={20} color={tintColor} />
                ),
              },
            },
            Profile,
          },
          {
            resetOnBlur: true,
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#7d40e7',
              inactiveTintColor: 'rgba(0,0,0, 0.4)',
              style: {
                backgroundColor: '#fff',
              },
            },
          }
        ),
      },
      {
        initialRouteName: signed ? 'App' : 'Sign',
      }
    )
  );
