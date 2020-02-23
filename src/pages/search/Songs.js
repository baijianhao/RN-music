import React, { Component } from 'react'
import { View, FlatList, TouchableWithoutFeedback, Text, StyleSheet } from 'react-native'
import BasePage from './BasePage'
import store from '../../store'
import { connect } from 'react-redux';

class Songs extends BasePage {
  componentDidMount() {
    const { searchText } = this.props
  }

  async _formatItems() {
    const responseJson = await this._fetch(0)
    if (responseJson) {
      const { list } = responseJson.data.song
      if (list.length) {
        this.setState((preState) => {
          return { items: [...preState.items, ...list] }
        })
      } else {
        this.setState({ hasMore: false })
      }
    }
  }

  _keyExtractor = (item) => item.mid

  _onSelectedItem = (item, index) => {
    if (item.mid === this.props.songId) {
      this.props.dispatch({
        type: 'play_continue',
        state: {
          playing: true
        }
      })
      return;
    }
    const url = `https://u.y.qq.com/cgi-bin/musicu.fcg?format=json&inCharset=utf8&outCharset=utf-8&data={"req":{"module":"CDN.SrfCdnDispatchServer","method":"GetCdnDispatch","param":{"guid":"3359952310","calltype":0}},"req_0":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"guid":"3359952310","songmid":["${item.mid}"],"songtype":[0],"uin":"0","platform":"20"}},"comm":{"uin":"0","format":"json","ct":24,"cv":0}}`
    fetch(url).then((response) => response.json())
      .then((rspJson) => {
        const sips = rspJson.req.data.sip
        const midurlinfo = rspJson.req_0.data.midurlinfo[0]
        this.props.dispatch({
          type: 'change_song',
          state: {
            songId: item.mid,
            source: `${sips[0]}${midurlinfo.purl}`,
            poster: `https://y.gtimg.cn/music/photo_new/T002R800x800M000${item.album.mid}.jpg`
          }
        })
      })
      .catch((err) => console.error(err))
  }

  _renderItem(item, index) {
    const itemSelected = item.mid === this.props.songId
    return (
      <TouchableWithoutFeedback onPress={() => { this._onSelectedItem(item, index) }}>
        <View style={[styles.item, itemSelected ? styles.highlightBorder : null]}>
          <Text style={[{ fontSize: 16, color: '#222' }, itemSelected ? styles.highlightText : null]}>{item.title}</Text>
          <Text style={[{ fontSize: 14, color: '#555' }, itemSelected ? styles.highlightText : null]}>{item.singer[0].name + '·' + item.album.name}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    borderBottomColor: '#efefef',
    borderBottomWidth: 1,
    borderLeftColor: 'transparent',
    borderLeftWidth: 4,
  },
  highlightBorder: {
    borderLeftColor: '#30c27c',
  },
  highlightText: {
    color: '#30c27c'
  }
})

const mapStateToProps = (state) => {
  return {
    songId: state.songId
  }
}

export default connect(mapStateToProps)(Songs);