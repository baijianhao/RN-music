import React, { Component, PureComponent } from 'react'
import { View, FlatList, TouchableWithoutFeedback, Text, ActivityIndicator } from 'react-native'

export default class BasePage extends PureComponent {
  constructor(props) {
    super(props)
    this._formatItems()
    this.state.items = []
  }

  pagenation = {
    page: 1,
    count: 15
  }

  hasMore = true
  items = []
  loading = true

  state = {
    selected: -1,
    items: [],
    hasMore: true
  }

  _fetch(tab) {
    const baseUrl = 'https://c.y.qq.com/soso/fcgi-bin/client_search_cp?aggr=1&new_json=1&cr=1&format=json&inCharset=utf8&outCharset=utf-8&platform=yqq.json'
    const searchUrl = `${baseUrl}t=${tab}&p=${this.pagenation.page++}&n=${this.pagenation.count}&w=${this.props.searchText}`
    return new Promise((resolve, reject) => {
      if (!this.state.hasMore) {
        return resolve(null)
      }
      fetch(searchUrl)
        .then(response => response.json())
        .then(responseJson => {
          resolve(responseJson)
        })
        .catch(error => reject(error))
    })
  }

  render() {
    return (
      <FlatList
        data={this.state.items}
        keyExtractor={(item) => this._keyExtractor(item)}
        renderItem={({ item, index }) => this._renderItem(item, index)}
        onEndReached={({ distanceFromEnd }) => {
          if (distanceFromEnd > 0) {
            // 数据初次渲染时，distanceFromEnd < 0 ?
            this._formatItems()
          }
        }}
        onEndReachedThreshold={0.1}
      />
    )
  }
}