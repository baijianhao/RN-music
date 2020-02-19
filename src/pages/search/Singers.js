import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native'
// import Buffer from 'buffer'
import { Buffer } from 'buffer';
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

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>singer</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({

});