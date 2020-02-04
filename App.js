import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
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
        // return <Icon name="facebook" size={30} color="#900" />
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

// class App extends Component {
//   render() {
//     return (
//       <View style={styles.bodyView}>
//         <Icon.Button
//           name="music"
//           backgroundColor="#fff"
//           color="#62b900"
//           iconStyle={{
//             marginRight: 20
//           }}
//           style={{ borderWidth: 1, borderColor: '#efefef' }}
//         >
//           <Text>Login with Wechat</Text>
//         </Icon.Button>
//       </View>
//     )
//   }
// }

// const styles = StyleSheet.create({
//   bodyView: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   }
// })

export default createAppContainer(AppRoutes);
