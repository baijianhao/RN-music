import React from 'react';
import Video from 'react-native-video';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return { state }
}
const mapDispatchToProps = (dispatch) => {
  return {
    _audioOnload(e, player) {
      dispatch({
        type: 'onloaded',
        state: {
          playing: true,
          duration: e.duration,
          player,
        }
      })
    },
    _audioOnProgress(currentTime) {
      dispatch({
        type: 'updateCurrentTime',
        state: {
          currentTime
        }
      })
    },
    changePlayingStatus() {
      dispatch({
        type: 'change_playing_status',
      })
    },
    _onEnd() {
      dispatch({
        type: 'onEnd',
        state: {
          currentTime: 0,
          playing: false,
          isEnding: true
        }
      })
    }
  }
}
let player = null

const BasePlayer = (props) => {
  const state = props.state

  function _audioOnProgress(e) {
    if (state.isSliding) {
      return
    }
    props._audioOnProgress(e.currentTime)
  }
  return (
    state.source ? <Video
      source={{ uri: state.source }}
      ref={(ref) => {
        player = ref
      }}
      onLoad={(e) => { props._audioOnload(e, player) }}
      onProgress={(e) => { _audioOnProgress(e) }}
      paused={!state.playing}
      onEnd={() => props._onEnd()}
    /> : null
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(BasePlayer);