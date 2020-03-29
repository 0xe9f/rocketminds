import React from 'react'
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

import { styles } from '../utils/styles'

export default class Header extends React.Component {
  constructor (props) {
    super()
  }

  render () {
    return (
      <View style={{ flexDirection: 'row', margin: 25, marginBottom: 0, marginTop: 0 }}>
        <Text style={styles.header}>Tasks</Text>
        <Text style={{ color: 'gray', flex: 0 }}>test v0.5_fix3</Text>
        <TouchableOpacity onPress={this.props.onPress}>
          <Icon style={{ marginTop: 32 }} color='black' name='plus' size={24} />
        </TouchableOpacity>
        {/* <Image
          style={{width: 45, height: 45, borderRadius: 999, flex: 0, marginTop: 22}}
          source={{uri: this.props.imageUrl }} /> */}
      </View>
    )
  }
}
