import React, { Component, PureComponent } from 'react'
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Dimensions,
  Text,
  FlatList
} from 'react-native';
import { connect } from 'react-redux';
import { Buffer } from 'buffer';

const getLyricTime = (timeStr) => {
  const reg = /(\d+):(\d+)\.(\d+)/
  const [input, min, seconds, millseconds] = timeStr.match(reg)
  return 60 * min + Number(seconds) + millseconds / 100
}

class LyricWrapper extends PureComponent {
  constructor(props) {
    super(props)
  }
  _wrapper = null
  _line = null
  _isDraging = false
  fetchLyrc = () => {
    const url = `https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg?-=MusicJsonCallback_lrc&pcachetime=1580964410494&songmid=${this.props.songId}&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0`
    fetch(url, {
      headers: {
        referer: 'https://c.y.qq.com/',
        host: 'c.y.qq.com',
      }
    }).then(response => response.json())
      .then(responseJsoon => {
        if (responseJsoon.lyric) {
          const lyricStr = Buffer.from(responseJsoon.lyric, 'base64').toString()
          if (!lyricStr) {
            return
          }
          let isHeader = true
          const lineRegx = /(\[(\d{2}:\d{2}\.\d+)\])(.+)/
          const lyric = []
          lyricStr.split('\n').map((line, index) => {
            if (line.indexOf('[00:00.00]')) {
              isHeader = false
            }
            if (!isHeader) {
              const matches = line.match(lineRegx)
              if (matches) {
                lyric.push({
                  time: getLyricTime(matches[2]),
                  text: matches[3]
                })
              }
            }
          })
          this.props.dispatch({
            type: 'init_lyrc',
            state: {
              lyric
            }
          })
        }
      })
      .catch(err => console.error(err))
  }

  componentDidMount() {
    this.fetchLyrc()
  }

  componentDidUpdate() {
    !this._isDraging && this._wrapper && this._wrapper.scrollToItem({
      item: this._line,
      viewPosition: 0.5
    })
  }

  _renderItem = (item, index, currentTime, lyric) => {
    if (currentTime >= item.time && ((lyric[index + 1] && currentTime < lyric[index + 1].time) || (index === lyric.length - 1))) {
      this._line = item
      return <Text style={{ fontSize: 22, color: '#fff', textAlign: 'center' }}>{item.text}</Text>
    }
    return (<Text style={{ color: '#fff', textAlign: 'center' }}>{item.text}</Text>)
  }
  render() {
    const { lyric, currentTime } = this.props
    return lyric ? (
      <FlatList
        ref={(ref) => { this._wrapper = ref }}
        data={lyric}
        showsVerticalScrollIndicator={false}
        onScrollBeginDrag={() => this._isDraging = true}
        onScrollEndDrag={() => this._isDraging = false}
        renderItem={({ item, index }) => (
          <View style={{ height: 40 }}>
            {
              this._renderItem(item, index, currentTime, lyric)
            }
          </View>
        )}
        keyExtractor={(item) => item.time + ''}
        getItemLayout={(data, index) => (
          { length: 40, offset: 40 * index, index }
        )}
      />
    ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 24, color: '#fff', opacity: 0.4 }}>无匹配歌词</Text>
        </View>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    lyric: state.lyric,
    currentTime: state.currentTime,
    songId: state.songId
  }
}

export default connect(mapStateToProps)(LyricWrapper);