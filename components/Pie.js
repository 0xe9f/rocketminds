import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Switch,
  TextInput
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Icon from 'react-native-vector-icons/Feather'

import ExtendedDoubleTap from '../components/ExtendedDoubleTap'
import { complTodo, delTodo, retitleTask } from '../actions/TodoActions'
import { styles } from '../utils/styles'

// <Text style={styles.pieDescription}>{this.props.description}</Text>
const mapStateToProps = (state) => {
  const { todos } = state
  return { todos }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    complTodo,
    delTodo,
    retitleTask
  }, dispatch)
);

class Chekr extends React.Component {
  render () {
    return (
      <TouchableOpacity onPress={ this.props.onPress }>
        <View style={{ backgroundColor: this.props.value ? 'white' : 'transparent', margin: 1, borderRadius: 999, width: 24, height: 24, borderColor: 'white', borderWidth: 1 }}>
          { this.props.value ? <Icon style={{ padding: 2.5}} color={ this.props.color } name='check' size={18}/> : null}
        </View>
      </TouchableOpacity>
    )
  }
}

class Pie extends React.Component {
  constructor (props) {
    super(props)
  }
  state = {
    checked: false,
    editMode: false,
    newTitle: '',
  }
  toggleEditTitle = () => {
    this.setState({...this.state, editMode: !this.state.editMode })
  }
  onPress () {
    this.props.complTodo(this.props.ofType, this.props.id)
    // this.props.dispatch({type: 'COMPLETE_TODO', taskType: this.props.ofType, taskId: this.props.id})
  }
  onSubmitEditTitle = () => {
    if ( this.state.newTitle.replace(/\s+/g, '') !== '') {
      this.props.retitleTask(this.props.ofType, this.props.id, this.state.newTitle)
    } else {
      this.props.retitleTask(this.props.ofType, this.props.id, this.props.title)
    }
    this.setState({...this.state, editMode: false, newTitle: ''})
  }
  removeTask = () => {
    this.props.delTodo(this.props.ofType, this.props.id)
  }
  types = {'wild': '🌲', 'innovation': '🚀', 'happy': '🎉', 'love': '❤️', 'flame': '🔥', 'magic': '🦄'}
  render() {
    return (
          <View style={styles.pie}>
            <View style={{flex: 6}}>
              <ExtendedDoubleTap onLongPress={this.toggleEditTitle} delayTime={200}>
                { this.state.editMode ? <TextInput
                  maxLength={64}
                  style={styles.pieTitle}
                  returnKeyType='done'
                  multiline={true}
                  placeholderTextColor='white'
                  placeholder={this.props.title ? this.props.title : 'Enter new task title'}
                  onSubmitEditing={ this.onSubmitEditTitle }
                  value={this.state.newTitle}
                  onChangeText={(text) => { this.setState({...this.state, newTitle: text}) }}
                  /> : <Text style={styles.pieTitle}>{this.props.title}</Text> }
              </ExtendedDoubleTap>
            </View>
            {
              this.state.editMode ?
              <TouchableOpacity onPress={ () => this.removeTask() }>
                <Icon style={{padding: 2}} size={22} color='white' name='x'></Icon>
              </TouchableOpacity>
            : <Chekr style={{flex: 0}} value={ this.props.completed }  onPress={() => this.onPress() } color={ this.props.checkColor } />

            }
          </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pie)
