import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Modal,
  Dimensions,
  SafeAreaView,
  ImageBackground,
  Image,
  Text,
} from 'react-native';
import Controls from './Controls'
import { connect } from 'react-redux';
import { Buffer } from 'buffer'
import LyricWrapper from './LyricWrapper'

const { width: screenWidth } = Dimensions.get('window')

const mapStateToProps = (state) => {
  return { state }
}
const getLyricTime = (timeStr) => {
  const reg = /(\d+):(\d+)\.(\d+)/
  const [input, min, seconds, millseconds] = timeStr.match(reg)
  return 60 * min + Number(seconds) + millseconds / 100
}


const BasePlayer = (props) => {
  const state = props.state

  return (
    <View style={{ height: 60, borderColor: '#eee', borderWidth: 2, backgroundColor: '#fff', width: screenWidth }}>
      <TouchableWithoutFeedback onPress={() => state.source && props.dispatch({ type: 'change_full_screen_status' })}>
        <View style={{ flex: 1, padding: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
          {
            state.source ? (
              <>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={{ uri: state.poster }}
                    style={{ width: 66, height: 66, borderRadius: 33 }}
                    resizeMode={'cover'}
                  />
                  <Text style={{ color: '#30c27c', paddingLeft: 10 }} >{state.songName}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableWithoutFeedback onPress={(e) => { e.stopPropagation() }}>
                    <Icon name="md-play-circle" size={30} color={'#30c27c'} />
                  </TouchableWithoutFeedback>
                  <Icon name="md-list" size={34} color="#30c27c" style={{ paddingLeft: 10 }} />
                </View>
              </>
            ) : (
                <>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name="md-disc" size={66} color="#ddd" style={{ marginTop: -24 }} />
                    <Text style={{ color: '#d5d5d5', paddingLeft: 10 }} >{'让生活充满音乐'}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableWithoutFeedback onPress={(e) => { e.stopPropagation() }}>
                      <Icon name="md-play-circle" size={30} color={'#ddd'} />
                    </TouchableWithoutFeedback>
                    <Icon name="md-list" size={34} color="#ddd" style={{ paddingLeft: 10 }} />
                  </View>
                </>
              )
          }

          <Modal
            animationType="slide"
            visible={state.isFullScreen}
            onRequestClose={() => {
              props.dispatch({ type: 'change_full_screen_status' })
            }}
          >
            <SafeAreaView style={{ flex: 1 }}>
              <View style={{ flex: 1 }}>
                <ImageBackground style={styles.background}
                  source={{ uri: state.poster }}
                  blurRadius={60}
                />
                <View style={styles.header}>
                  <TouchableWithoutFeedback
                    onPress={() => props.dispatch({ type: 'change_full_screen_status' })}
                  >
                    <Icon name='md-arrow-back' size={28} color='#fff' />
                  </TouchableWithoutFeedback>
                </View>
                <View style={styles.poster}>
                  <Image
                    source={{ uri: state.poster }}
                    style={{ width: 300, height: 300 }}
                    resizeMode={'cover'}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  {
                    <LyricWrapper />
                  }
                </View>
                <Controls />
              </View>
            </SafeAreaView>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    width: screenWidth,
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    padding: 10
  },
  poster: {
    width: screenWidth,
    height: 400,
    alignItems: 'center',
    justifyContent: 'center'
  },
  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  }
})

export default connect(mapStateToProps)(BasePlayer);