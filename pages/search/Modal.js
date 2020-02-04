import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  TextInput,
  Modal,
  SectionList,
  Dimensions,
} from 'react-native';
import Pages from './Pages'

const CONSTANTS = {
  PAGE_TYPE: ['song', 'singer', 'album', 'mv']
}
const { width: screenWidth } = Dimensions.get('window')

export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchText: '',
      smartBox: [],
      showSmartBox: true,
      pageType: '',
    }
  }

  onChangeText(text) {
    this.setState({ searchText: text })
    this._fetch(text)
  }

  _fetch(text) {
    const url = `https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg?key=${text}`
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this._getSectionsData(responseJson.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  _getSectionsData(responseData) {
    const smartBox = []
    for (const key in responseData) {
      if (responseData.hasOwnProperty(key)) {
        const item = responseData[key]
        if (!item.count) {
          continue
        }
        const { name, count, order, itemlist: data, type } = item
        smartBox.push({
          name, count, order, data,
          type: type - 1
        })
      }
    }

    smartBox.sort((pre, cur) => {
      return pre.order - cur.order
    })

    this.setState({
      smartBox
    })
  }

  _renderSmartBox() {
    return (
      <SectionList
        sections={this.state.smartBox}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index, section, separators }) => (
          <TouchableWithoutFeedback
            onPress={() => { this.setState({ showSmartBox: false, pageType: section.type }) }}
            onShowUnderlay={separators.highlight}
            onHideUnderlay={separators.unhighlight}>
            <View style={{ flexDirection: 'row', backgroundColor: 'white', height: 40, borderBottomWidth: 1, borderBottomColor: '#efefef', alignItems: 'center', padding: 10 }}>
              <Icon name='md-search' size={18} color='#eee' style={{ marginRight: 10 }} />
              <Text>{item.name}</Text>
            </View>
          </TouchableWithoutFeedback>
        )}
      />
    )
  }

  _renderContent() {
    if (this.state.showSmartBox) {
      return this._renderSmartBox()
    }
    return <Pages />
  }

  render() {
    const { visibleHandler } = this.props
    return (
      <Modal
        animationType="slide"
        transparent={false}
        onRequestClose={() => {
          visibleHandler(false)
        }}
      >
        <View style={styles.header}>
          <TouchableWithoutFeedback
            onPress={() => { visibleHandler(false) }}
          >
            <Icon name='md-arrow-back' size={28} color='#555' />
          </TouchableWithoutFeedback>
          <View style={styles.searchBar}>
            <Icon name='md-search' size={18} color='#eee' style={{ marginLeft: 10, marginRight: 10 }} />
            <TextInput
              style={{ flex: 1, height: 30, padding: 0 }}
              onChangeText={(text) => { this.onChangeText(text) }}
              value={this.state.searchText}
              autoFocus={true}
              onFocus={() => { this.setState({ showSmartBox: true }) }}
            />
            <TouchableWithoutFeedback
              onPress={() => { this.state.searchText && this.setState({ searchText: '' }) }}
            >
              <Icon name='md-close' size={18} color={this.state.searchText ? '#eee' : 'transparent'} style={{ marginLeft: 10, marginRight: 10 }} />
            </TouchableWithoutFeedback>
          </View>
        </View>
        {
          this._renderContent()
        }
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    width: screenWidth,
    flexDirection: 'row',
    height: 60,
    borderWidth: 2,
    borderColor: '#efefef',
    alignItems: 'center',
    padding: 10
  },
  searchBar: {
    flex: 1,
    marginLeft: 16,
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  }
})
