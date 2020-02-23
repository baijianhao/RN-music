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
    <View style={{ height: 100, backgroundColor: 'red', width: screenWidth }}>
      <TouchableWithoutFeedback onPress={() => state.source && props.dispatch({ type: 'change_full_screen_status' })}>
        <View style={{ flex: 1 }}>
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