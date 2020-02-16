import React, { useReducer } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Modal,
  Dimensions,
  SafeAreaView,
  ImageBackground,
  Image
} from 'react-native';
import Controls from './Controls'
import reducer, { defaultState } from '../../store/AudioPlayer'

const { width: screenWidth } = Dimensions.get('window')
export default function BasePlayer(props) {
  const { visibleHandler, poster: image } = props
  const [state, dispatch] = useReducer(reducer, defaultState)
  return (
    <Modal
      animationType="slide"
      onRequestClose={() => {
        visibleHandler(false)
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
              onPress={() => { visibleHandler(false) }}
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
          <Controls />
        </View>
      </SafeAreaView>
    </Modal>
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
  },
})