import React from 'react';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack'
import Detail from './Detail';
import Home from './Home';
import Profile from './Profile'
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = createStackNavigator(
  {
    Home: Home,
    Detail: Detail,
  }, {
    initialRouteName: 'Home',
    headerMode: 'none',
  }
)
const TabRoutes = createBottomTabNavigator(
  {
    Main: HomeScreen,
    Profile
  },
  {
    initialRouteName: 'Main',
    backBehavior: 'order',
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Icon;
        let iconName;
        if (routeName === 'Main') {
          iconName = 'music'
        } else if (routeName === 'Profile') {
          iconName = 'user';
        }
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      showLabel: false,
      showIcon: true,
      activeTintColor: '#62b900',
      inactiveTintColor: 'gray',
    }
  }
)

export default TabRoutes;
