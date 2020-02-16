import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native';
import Search from '../search/Modal'
import Singer from '../search/Singers'
import Player from '../../components/AudioPlayer/Player'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      showPlayer: false
    }
    this.modalHandler = this._modalHandler.bind(this)
    this.playerHandler = this._playerHandler.bind(this)
  }
  _modalHandler(visiable) {
    this.setState({ showModal: visiable })
  }
  _playerHandler(visiable) {
    this.setState({ showPlayer: visiable })
  }
  render() {
    return (
      <View style={styles.bodyView}>
        <Button title="Go Detail" onPress={() => { this.props.navigation.navigate('Detail') }} />
        <Button title="Go Search" onPress={() => { this.setState({ showModal: true }) }} />
        <Button title="Go Player" onPress={() => { this.setState({ showPlayer: true }) }} />
        {
          this.state.showModal ? <Search visibleHandler={this.modalHandler} /> : null
        }
        {
          this.state.showPlayer ? (
            <Player
              visibleHandler={this.playerHandler}
              poster="https://y.gtimg.cn/music/photo_new/T002R800x800M00000410U1W0T6sGw.jpg"
              source="http://ws.stream.qqmusic.qq.com/C400001PLl3C4gPSCI.m4a?guid=3359952310&vkey=EAE2E2E61741134B94C1B8D65249BF4B00568490C6B08953B727672EEAE190CD6BEB33BE8932203E2CA8B11EE44700214304F9E9F5060804&uin=0&fromtag=66"
            />

          ) : null
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
