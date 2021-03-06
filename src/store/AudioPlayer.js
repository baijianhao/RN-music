
export const defaultState = {
  player: null,
  songId: '',
  source: '',
  poster: '',
  duration: 0,
  playing: false,
  currentTime: 0,
  isSliding: false,
  isEnding: false,
  isFullScreen: false,
  lyric: '',
  songName: ''
}
export default reducer = (state = defaultState, action) => {
  let newState = {}
  switch (action.type) {
    case 'change_song':
      newState = { ...defaultState, ...action.state }
      break;
    case 'change_playing_status':
      newState = { ...state, playing: !state.playing }
      break;
    case 'change_sliding_status':
      newState = { ...state, isSliding: !state.isSliding }
      break;
    case 'change_ending_status':
      newState = { ...state, isEnding: !state.isEnding }
      break;
    case 'change_full_screen_status':
      newState = { ...state, isFullScreen: !state.isFullScreen }
      break;
    case 'updateCurrentTime':
      if (state.isSliding) {
        return state;
      }
      newState = { ...state, ...action.state }
      break;
    case 'sliderValueChnage':
      newState = { ...state, ...action.state }
      break;
    default:
      newState = { ...state, ...action.state }
      break;
  }
  return newState
}