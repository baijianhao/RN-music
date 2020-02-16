export const defaultState = {
  source: 'http://ws.stream.qqmusic.qq.com/C400001PLl3C4gPSCI.m4a?guid=3359952310&vkey=F0B2ECFEDC5FC806378F9C15C7B3757B7D60A0E9B0EBABD451C2E4CDF2821E86C3AA9ABFB89D47EE80634DE2285E77CA25B17A3DBE2686EE&uin=0&fromtag=66',
  poster: 'https://y.gtimg.cn/music/photo_new/T002R800x800M00000410U1W0T6sGw.jpg',
  duration: 0,
  playing: false,
  currentTime: 0,
  isSliding: false,
  isEnding: false
}
export default reducer = (state = defaultState, action) => {
  let newState = {}
  switch (action.type) {
    case 'change_playing_status':
      newState = { ...state, playing: !state.playing }
      break;
    case 'change_sliding_status':
      newState = { ...state, isSliding: !state.isSliding }
      break;
    case 'change_ending_status':
      newState = { ...state, isEnding: !state.isEnding }
      break;
    default:
      newState = { ...state, ...action.state }
      break;
  }
  return newState
}