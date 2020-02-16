import React, { Component } from 'react'
import { View, Text, Image, ImageBackground, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native'
import Video from 'react-native-video'
import VideoPlayer from 'react-native-video-controls';
import CryptoJS from 'crypto-js'
// import Buffer from 'buffer'
import { Buffer } from 'buffer';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/FontAwesome'

export default class Singers extends Component {
  // componentDidMount() {
  //   fetch('https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg?-=MusicJsonCallback_lrc&pcachetime=1580964410494&songmid=000XjV962NmxXJ&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0', {
  //     headers: {
  //       referer: 'https://c.y.qq.com/',
  //       host: 'c.y.qq.com',
  //     }
  //   }).then(response => response.json())
  //     .then(responseJsoon => {
  //       if (responseJsoon.lyric) {
  //         console.info(Buffer.from(responseJsoon.lyric, 'base64').toString())
  //       }
  //     })
  //     .catch(err => console.error(err))
  // }
  state = {
    duration: 1,
    currentTime: 0,
    isPlaying: false
  }
  isSliding = false
  audioOnload = (e) => {
    console.info('audio loaded', e)
    this.setState((preState, preProps) => ({
      duration: e.duration,
      isPlaying: true
    }))
  }
  _audioOnProgress = (e) => {
    if (this.isSliding) {
      return
    }
    this.setState((preState, preProps) => ({
      currentTime: e.currentTime
    }))
  }
  _getMinutesFromSeconds(duration) {
    const minutes = duration >= 60 ? Math.floor(duration / 60) : 0;
    const seconds = Math.floor(duration - minutes * 60);

    return `${minutes >= 10 ? minutes : '0' + minutes}:${
      seconds >= 10 ? seconds : '0' + seconds
      }`;
  }
  _playHandler() {
    this.setState((preState) => ({ isPlaying: !preState.isPlaying }))
  }
  _onSlidingComplete(currentTime) {
    this.isSliding = false;
    this.player && this.player.seek(currentTime)
  }
  _onValueChange(currentTime) {
    this.setState({ currentTime })
  }
  _onSlidingStart() {
    this.isSliding = true
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: 'black' }}>
          <ImageBackground style={styles.absolute}
            source={{ uri: 'https://y.gtimg.cn/music/photo_new/T002R800x800M00000410U1W0T6sGw.jpg' }}
            blurRadius={100}
          />
          <View style={{ width: Dimensions.get('window').width, height: 400, alignItems: 'center', justifyContent: 'center' }}>
            <Image
              source={{ uri: 'https://y.gtimg.cn/music/photo_new/T002R800x800M00000410U1W0T6sGw.jpg' }}
              style={{ width: 300, height: 300 }}
              resizeMode={'cover'}
            />
          </View>
          <Video
            style={styles.video}
            source={{ uri: "http://ws.stream.qqmusic.qq.com/C400001PLl3C4gPSCI.m4a?guid=3359952310&vkey=EAE2E2E61741134B94C1B8D65249BF4B00568490C6B08953B727672EEAE190CD6BEB33BE8932203E2CA8B11EE44700214304F9E9F5060804&uin=0&fromtag=66" }}
            ref={(ref) => {
              this.player = ref
            }}
            playInBackground={false}
            onLoad={(e) => { this.audioOnload(e) }}
            onProgress={(e) => { this._audioOnProgress(e) }}
            paused={!this.state.isPlaying}
          />
          <View style={styles.controlWrapper}>
            <Slider
              value={this.state.currentTime}
              minimumValue={0}
              step={1}
              maximumValue={this.state.duration ? this.state.duration : 0}
              minimumTrackTintColor={'#FFF'}
              onSlidingComplete={(val) => this._onSlidingComplete(val)}
              onValueChange={(v) => this._onValueChange(v)}
              onSlidingStart={() => this._onSlidingStart()}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.durationText}>
                {this._getMinutesFromSeconds(this.state.currentTime)}
              </Text>
              <Text style={styles.durationText}>
                {this._getMinutesFromSeconds(this.state.duration)}
              </Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
              <Icon name="step-backward" size={30} color="#fff" />
              <TouchableWithoutFeedback onPress={() => this._playHandler()}>
                <View style={{ paddingLeft: 28, paddingRight: 28 }}>
                  {
                    this.state.isPlaying ? (<Icon name="pause-circle" size={60} color={'#fff'} />) :
                      (<Icon name="play-circle" size={60} color={'#fff'} />)
                  }
                </View>
              </TouchableWithoutFeedback>
              <Icon name="step-forward" size={30} color="#fff" />
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebebeb',
  },
  video: {
    width: Dimensions.get('window').width,
    height: 100,
  },
  absolute: {
    position: 'absolute',
    opacity: 0.6,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  durationText: {
    color: '#fff',
    opacity: 0.5
  },
  controlWrapper: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    padding: 16,
  }
});