import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Video from 'react-native-video'
import VideoPlayer from 'react-native-video-controls';
import CryptoJS from 'crypto-js'
// import Buffer from 'buffer'
import { Buffer } from 'buffer'

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
  onBuffer = (e) => {
    console.info('buffer', e)
  }
  videoError = (e) => {
    console.info('video error', e)
  }
  render() {
    return (
      <Video source={{ uri: "http://ws.stream.qqmusic.qq.com/C400001swcGb03K4Gr.m4a?guid=3359952310&vkey=79F0ED17D05832F739F53EEF901B51BF44F2CFDEFBCD1E556E3A3FFF7B5BD105E56D5A6B135E3F09C8B9C474FECE707BEB31FFFB500B2685&uin=0&fromtag=66" }}   // Can be a URL or a local file.
        ref={(ref) => {
          this.player = ref
        }}                                      // Store reference
        onLoad={this.onBuffer}                // Callback when remote video is buffering
        onTimedMetadata={this.videoError}               // Callback when video cannot be loaded
        style={styles.backgroundVideo}
        controls={true}
        fullscreen={true}
        playInBackground={false}
        resizeMode='cover'
      />

    )
  }
}

const styles = StyleSheet.create({
  backgroundVideo: {
    backgroundColor: 'black'
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
  },
});