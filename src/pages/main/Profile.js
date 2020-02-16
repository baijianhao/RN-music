import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
export default class Login extends Component {
  render() {
    return (
      <View style={styles.bodyView}>
        <Text>Profile</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  bodyView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
})
