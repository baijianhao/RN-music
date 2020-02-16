import React, { Component } from 'react';
import ViewPager from '@react-native-community/viewpager';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Dimensions,
  FlatList,
  TouchableWithoutFeedback
} from 'react-native';
import Songs from './Songs'
import Singers from './Singers'
import AudioPlayer from '../../components/AudioPlayer/Player'

const CONSTANTS = {
  PAGE_TYPE: ['song', 'singer', 'album', 'mv']
}

const { width: screenWidth } = Dimensions.get('window')

export default class Pages extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pageType: '',
      selectedPage: 'song',
      selected: 0
    }
    this.pageHeaders = [
      { key: 'song', title: '单曲', tab: 0 },
      { key: 'singer', title: '歌手', tab: 9 },
      { key: 'album', title: '专辑', tab: 8 },
      { key: 'mv', title: '视频', tab: 12 },
      { key: 'lyric', title: '歌词', tab: 7 }
    ]
    this.viewableHeaders = [0, 1, 2]
    this.viewabilityConfig = {
      itemVisiblePercentThreshold: 100
    }
    this.onViewableItemsChanged = this._onViewableItemsChanged.bind(this)
  }

  _onViewableItemsChanged(item) {
    const viewableHeaders = []
    item.viewableItems.forEach(item => {
      viewableHeaders.push(CONSTANTS.PAGE_TYPE.indexOf(item.key))
    });
    this.viewableHeaders = viewableHeaders
  }

  selectHeader(item) {
    if (item.key === this.state.selectedPage) {
      return
    }
    this.setState({ selectedPage: item.key })
    this._viewPager.setPage(CONSTANTS.PAGE_TYPE.indexOf(item.key))
  }

  _renderHeader() {
    return (
      <FlatList
        style={{ height: 40, flexGrow: 0 }}
        ref={(ref) => { this._menuList = ref }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={this.pageHeaders}
        viewabilityConfig={this.viewabilityConfig}
        onViewableItemsChanged={this.onViewableItemsChanged}
        renderItem={({ item }) => (
          <View style={{ height: 40, width: screenWidth / 3, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableHighlight
              underlayColor='#eee'
              onPress={() => { this.selectHeader(item) }}>
              {
                (this.state.selectedPage === item.key) ? (
                  <View style={[styles.header, styles.selectedHeader]}>
                    <Text style={{ fontSize: 16, color: '#30c27c' }}>{item.title}</Text>
                  </View>
                ) : (
                    <View style={styles.header}>
                      <Text style={{ fontSize: 16, color: '#bbb' }}>{item.title}</Text>
                    </View>
                  )
              }
            </TouchableHighlight>
          </View>)
        }
      />
    )
  }

  componentDidUpdate() {
    console.info('update')
  }

  _pageSelected(e) {
    const { position } = e.nativeEvent
    if (!this.viewableHeaders.includes(position)) {
      const firstViewableHeader = this.viewableHeaders[0]
      const lastViewableHeader = this.viewableHeaders[this.viewableHeaders.length - 1]
      if (firstViewableHeader > position) {
        this.viewableHeaders.pop()
        this.viewableHeaders.unshift(position)
        this._menuList.scrollToIndex({
          index: position,
          viewOffset: 5,
          viewPosition: 0
        })
      }
      if (lastViewableHeader < position) {
        this.viewableHeaders.shift()
        this.viewableHeaders.push(position)
        this._menuList.scrollToIndex({
          index: position,
          viewOffset: 5,
          viewPosition: 1
        })
      }
    }
    this.setState({ selectedPage: CONSTANTS.PAGE_TYPE[position] })
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        {this._renderHeader()}
        <ViewPager
          ref={(ref) => this._viewPager = ref}
          style={{ flex: 1, backgroundColor: '#f5f5f5' }}
          initialPage={CONSTANTS.PAGE_TYPE.indexOf(this.state.selectedPage)}
          onPageSelected={(e) => { this._pageSelected(e) }}>
          <View>
            <Songs searchText={this.props.searchText} />
          </View>
          <View>
            <AudioPlayer
              poster="https://y.gtimg.cn/music/photo_new/T002R800x800M00000410U1W0T6sGw.jpg"
              source="http://ws.stream.qqmusic.qq.com/C400001PLl3C4gPSCI.m4a?guid=3359952310&vkey=EAE2E2E61741134B94C1B8D65249BF4B00568490C6B08953B727672EEAE190CD6BEB33BE8932203E2CA8B11EE44700214304F9E9F5060804&uin=0&fromtag=66"
            />
            {/* <Singers /> */}
          </View>
          <View>
            <Text>album</Text>
          </View>
          <View>
            <Text>mv</Text>
          </View>
        </ViewPager>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  category: {
    height: 40,
    justifyContent: 'center',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  categoryText: {
    fontWeight: 'bold',
  },
  header: {
    flex: 1,
    borderBottomColor: 'transparent',
    borderBottomWidth: 4,
    justifyContent: 'center'
  },
  selectedHeader: {
    borderBottomColor: '#30c27c',
  }
})
