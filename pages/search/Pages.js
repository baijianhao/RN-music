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
      songs: [],
      hasMore: true,
      selected: 0
    }
    this.pageHeaders = [
      { key: 'song', title: '单曲', tab: 0 },
      { key: 'singer', title: '歌手', tab: 9 },
      { key: 'album', title: '专辑', tab: 8 },
      { key: 'mv', title: '视频', tab: 12 },
      { key: 'lyric', title: '歌词', tab: 7 }
    ]
    this.pagenation = {
      currentPage: 1,
      pageCount: 10,
      totalnum: 0
    }
    this.viewableHeaders = [0, 1, 2]
    this.viewabilityConfig = {
      itemVisiblePercentThreshold: 100
    }
    this.onViewableItemsChanged = this._onViewableItemsChanged.bind(this)
  }

  componentDidMount() {
    this._fetch()
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

  _fetch() {
    if (!this.state.hasMore) {
      return
    }
    const baseUrl = 'https://c.y.qq.com/soso/fcgi-bin/client_search_cp?aggr=1&new_json=1&cr=1&catZhida=1&lossless=0&flag_qc=0&format=json&inCharset=utf8&outCharset=utf-8&platform=yqq.json'
    const searchUrl = `${baseUrl}t=${0}&&p=${this.pagenation.currentPage}&n=${this.pagenation.pageCount}&w=${this.props.searchText}`
    fetch(searchUrl)
      .then(response => response.json())
      .then(responseJson => {
        const { list } = responseJson.data.song
        console.info(list)
        if (list.length) {
          this.setState((preState) => {
            return { songs: preState.songs.concat(list) }
          })
        } else {
          this.setState({ hasMore: false })
        }
      })
  }

  render() {
    // const {searchText, updatePageState} = this.props
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        {this._renderHeader()}
        <ViewPager
          ref={(ref) => this._viewPager = ref}
          style={{ flex: 1, backgroundColor: '#f5f5f5' }}
          initialPage={CONSTANTS.PAGE_TYPE.indexOf(this.state.selectedPage)}
          onPageSelected={(e) => { this._pageSelected(e) }}>
          <View>
            <FlatList
              data={this.state.songs}
              keyExtractor={(item) => item.mid}
              renderItem={({ item, index }) => (
                <TouchableWithoutFeedback onPress={() => { this.setState({ selected: index }) }}>
                  <View style={{ padding: 10, borderBottomColor: '#efefef', borderBottomWidth: 1 }}>
                    {
                      this.state.selected === index ? (
                        <>
                          <Text style={{ fontSize: 16, color: '#30c27c' }}>{item.title}</Text>
                          <Text style={{ fontSize: 14, color: '#30c27c' }}>{item.singer[0].name + '·' + item.album.name}</Text>
                        </>
                      ) : (
                          <>
                            <Text style={{ fontSize: 16, color: '#222' }}>{item.title}</Text>
                            <Text style={{ fontSize: 14, color: '#555' }}>{item.singer[0].name + '·' + item.album.name}</Text>
                          </>
                        )
                    }

                  </View>
                </TouchableWithoutFeedback>
              )}
            />
          </View>
          <View>
            <Text>singer</Text>
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
