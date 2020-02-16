import React, { useState, useReducer } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native'
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/FontAwesome';
import reducer, { defaultState } from '../../store/AudioPlayer'

function _getMinutesFromSeconds(duration) {
  const minutes = duration >= 60 ? Math.floor(duration / 60) : 0;
  const seconds = Math.floor(duration - minutes * 60);

  return `${minutes >= 10 ? minutes : '0' + minutes}:${
    seconds >= 10 ? seconds : '0' + seconds
    }`;
}

const { width: screenWidth } = Dimensions.get('window')

export default function Controls(props) {
  // TODO:
  // sourceList
  // type: 单曲，循环
  const [state, dispatch] = useReducer(reducer, defaultState)
  let player = null
  function _audioOnload(e) {
    dispatch({
      type: 'onloaded',
      state: {
        playing: true,
        duration: e.duration
      }
    })
  }
  function _audioOnProgress(e) {
    if (state.isSliding) {
      return
    }
    dispatch({
      type: 'updateCurrentTime',
      state: {
        currentTime: e.currentTime
      }
    })
  }
  function _playHandler() {
    if (state.isEnding) {
      player.seek(0)
      dispatch({
        type: 'repeat',
        state: {
          isEnding: false,
          playing: true,
        }
      })
      return
    }
    dispatch({
      type: 'change_playing_status',
    })
  }
  function _onSlidingComplete(currentTime) {
    dispatch({
      type: 'change_sliding_status',
    })
    player && player.seek(currentTime)
  }
  function _onValueChange(currentTime) {
    dispatch({
      state: {
        currentTime: currentTime
      }
    })
  }
  function _onSlidingStart() {
    dispatch({
      type: 'change_sliding_status',
    })
  }
  function _onEnd() {
    dispatch({
      state: {
        currentTime: 0,
        playing: false,
        isEnding: true
      }
    })
  }
  return (
    <View style={{ flex: 1 }}>
      <Video
        style={styles.video}
        source={{ uri: state.source }}
        ref={(ref) => {
          player = ref
        }}
        onLoad={(e) => { _audioOnload(e) }}
        onProgress={(e) => { _audioOnProgress(e) }}
        paused={!state.playing}
        onEnd={() => _onEnd()}
      />
      <View style={styles.controlWrapper}>
        <Slider
          value={state.currentTime}
          minimumValue={0}
          step={1}
          maximumValue={state.duration}
          minimumTrackTintColor={'#fff'}
          onSlidingComplete={(val) => _onSlidingComplete(val)}
          onValueChange={(v) => _onValueChange(v)}
          onSlidingStart={() => _onSlidingStart()}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.durationText}>
            {_getMinutesFromSeconds(state.currentTime)}
          </Text>
          <Text style={styles.durationText}>
            {_getMinutesFromSeconds(state.duration)}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
          <Icon name="step-backward" size={30} color="#fff" />
          <TouchableWithoutFeedback onPress={() => _playHandler()}>
            <View style={{ paddingLeft: 28, paddingRight: 28 }}>
              {
                state.playing ? (<Icon name="pause-circle" size={60} color={'#fff'} />) :
                  (<Icon name="play-circle" size={60} color={'#fff'} />)
              }
            </View>
          </TouchableWithoutFeedback>
          <Icon name="step-forward" size={30} color="#fff" />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  video: {
    width: Dimensions.get('window').width,
    height: 100,
  },
  durationText: {
    color: '#fff',
    opacity: 0.5
  },
  controlWrapper: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    padding: 16,
  }
});