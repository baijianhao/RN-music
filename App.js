import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import MainRoutes from './pages/main/routes';
import Login from './pages/Login';

const AppRoutes = createSwitchNavigator(
  {
    Main: MainRoutes,
    Login,
  },
  {
    initialRouteName: 'Login',
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Icon;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'music'
        } else if (routeName === 'Profile') {
          iconName = 'user-circle-o';
        }
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
  }
)

const AppWithNavigationState = createAppContainer(AppRoutes)

const AppContainer = () => (
  <SafeAreaView style={{ flex: 1 }}>
    <AppWithNavigationState />
  </SafeAreaView>
);
export default AppContainer

