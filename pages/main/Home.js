import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native';
import Search from '../search/Modal'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false
    }
    this.modalHandler = this._modalHandler.bind(this)
  }
  _modalHandler(visiable) {
    this.setState({ showModal: visiable })
  }
  render() {
    return (
      <View style={styles.bodyView}>
        <Button title="Go Detail" onPress={() => { this.props.navigation.navigate('Detail') }} />
        <Button title="Go Search" onPress={() => { this.setState({ showModal: true }) }} />
        {
          this.state.showModal ? <Search visibleHandler={this.modalHandler} /> : null
        }
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
