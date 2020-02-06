import React, { Component } from 'react'
import { View, FlatList, TouchableWithoutFeedback, Text, StyleSheet } from 'react-native'
import BasePage from './BasePage'

export default class Songs extends BasePage {
  // constructor(props) {
  //   super(props)
  //   console.info('songs init')
  //   this._formatItems()
  //   this.state.items = []
  // }

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

  _renderItem(item, index) {
    const itemSelected = index === this.state.selected
    return (
      <TouchableWithoutFeedback onPress={() => { this.setState({ selected: index }) }}>
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