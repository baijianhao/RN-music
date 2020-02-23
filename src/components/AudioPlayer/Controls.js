import React from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native'
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return { state }
}
const mapDispatchToProps = (dispatch) => {
  return {
    changePlayingStatus() {
      dispatch({
        type: 'change_playing_status',
      })
    },
    replay() {
      dispatch({
        type: 'repeat',
        state: {
          isEnding: false,
          playing: true,
        }
      })
    },
    _onSlidingComplete(currentTime) {
      dispatch({
        type: 'change_sliding_status',
      })
    },
    _onValueChange(currentTime) {
      setTimeout(() => {
        dispatch({
          type: 'sliderValueChnage',
          state: {
            currentTime: currentTime
          }
        })
      }, 100)
    },
    _onSlidingStart() {
      dispatch({
        type: 'change_sliding_status',
      })
    },
  }
}

function _getMinutesFromSeconds(duration) {
  const minutes = duration >= 60 ? Math.floor(duration / 60) : 0;
  const seconds = Math.floor(duration - minutes * 60);

  return `${minutes >= 10 ? minutes : '0' + minutes}:${
    seconds >= 10 ? seconds : '0' + seconds
    }`;
}

const { width: screenWidth } = Dimensions.get('window')

function Controls(props) {
  // console.info('controls', props.state)
  // TODO:
  // sourceList
  // type: 单曲，循环
  const state = props.state
  function _playHandler() {
    if (state.isEnding) {
      state.player.seek(0)
      props.replay()
      return
    }
    props.changePlayingStatus()
  }
  function _onSlidingComplete(currentTime) {
    props._onSlidingComplete(currentTime)
    state.player && state.player.seek(currentTime)
  }
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.controlWrapper}>
        <Slider
          value={state.currentTime}
          minimumValue={0}
          step={1}
          maximumValue={state.duration}
          minimumTrackTintColor={'#fff'}
          onSlidingComplete={(val) => _onSlidingComplete(val)}
          onValueChange={(v) => props._onValueChange(v)}
          onSlidingStart={() => props._onSlidingStart()}
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

export default connect(mapStateToProps, mapDispatchToProps)(Controls);