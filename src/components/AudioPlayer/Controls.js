import React, { useState } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native'
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/FontAwesome';

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
  const [currentTime, setCurrentTime] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [isSliding, setSliding] = useState(false)
  const [isEnding, setEnding] = useState(false)
  const { poster: uri, source } = props
  let player = null
  function _audioOnload(e) {
    setPlaying(true)
    setDuration(e.duration)
  }
  function _audioOnProgress(e) {
    if (isSliding) {
      return
    }
    setCurrentTime(e.currentTime)
  }
  function _playHandler() {
    if (isEnding) {
      player.seek(0)
      setEnding(false)
      setPlaying(true)
      return
    }
    setPlaying(!playing)
  }
  function _onSlidingComplete(currentTime) {
    setSliding(false)
    player && player.seek(currentTime)
  }
  function _onValueChange(currentTime) {
    setCurrentTime(currentTime)
  }
  function _onSlidingStart() {
    setSliding(true)
  }
  function _onEnd() {
    setCurrentTime(0)
    setPlaying(false)
    setEnding(true)
  }
  return (
    <View style={{ flex: 1 }}>
      <Video
        style={styles.video}
        source={{ uri: source }}
        ref={(ref) => {
          player = ref
        }}
        onLoad={(e) => { _audioOnload(e) }}
        onProgress={(e) => { _audioOnProgress(e) }}
        paused={!playing}
        onEnd={() => _onEnd()}
      />
      <View style={styles.controlWrapper}>
        <Slider
          value={currentTime}
          minimumValue={0}
          step={1}
          maximumValue={duration}
          minimumTrackTintColor={'#fff'}
          onSlidingComplete={(val) => _onSlidingComplete(val)}
          onValueChange={(v) => _onValueChange(v)}
          onSlidingStart={() => _onSlidingStart()}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.durationText}>
            {_getMinutesFromSeconds(currentTime)}
          </Text>
          <Text style={styles.durationText}>
            {_getMinutesFromSeconds(duration)}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
          <Icon name="step-backward" size={30} color="#fff" />
          <TouchableWithoutFeedback onPress={() => _playHandler()}>
            <View style={{ paddingLeft: 28, paddingRight: 28 }}>
              {
                playing ? (<Icon name="pause-circle" size={60} color={'#fff'} />) :
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