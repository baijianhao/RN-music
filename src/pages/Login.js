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
        <Icon.Button
          name="wechat"
          backgroundColor="#fff"
          color="#62b900"
          iconStyle={{
            marginRight: 20
          }}
          style={{ borderWidth: 1, borderColor: '#efefef' }}
          onPress={() => { this.props.navigation.navigate('Main') }}
        >
          <Text>Login with Wechat</Text>
        </Icon.Button>
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
