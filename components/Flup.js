import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { changeColor, changeTitle, addTodo } from '../actions/TodoActions'
import TaskList from './TaskList'
import ExtendedDoubleTap from '../components/ExtendedDoubleTap'

class SelectableColor extends React.Component {
  render () {
    return (
      <TouchableOpacity onPress={ this.props.onPress }>
        <View style={{ marginRight: 10, borderWidth: this.props.flupColor === this.props.color ? 4 : 0, borderColor: '#F6F6F6', backgroundColor: this.props.color, borderRadius: 999, width: 25, height: 25}}></View>
      </TouchableOpacity>
    )
  }
}

class ColorPalette extends React.Component {
  flupColors = ['#0955FE', '#2099FF', '#0076FF', '#66DD0E', '#F6CC00', '#FB9900', '#F93234', '#BB00FF', '#6600FF']
  state = {
    selectedColor: this.props.flupColor
  }
  render () {
    return (
      <ScrollView horizontal={true}>
        {
          this.flupColors.map((color, index) => {
            return <SelectableColor key={index} onPress={ () => { this.props.onSelect(color); this.setState({selectedColor: color})} } color={color} flupColor={ this.state.selectedColor }/>
          })
        }
      </ScrollView>
    )
  }
}

class TitleEditor extends React.Component {
  constructor (props){
    super(props)
  }
  state = {
    newTitle: ''
  }
  render () {
    return (
      <View style={{flexDirection: 'row'}}>
        <TextInput
          autoCapitalize={true}
          maxLength={18}
          style={{ flex: 5, fontSize: 16}}
          value={this.state.newTitle}
          onChangeText={(text) => { this.setState({...this.state, newTitle: text});}}
          returnKeyType='done'
          onSubmitEditing={ () => this.props.onSubmit(this.state.newTitle.replace(/\s+/g, '') !== '' ? this.state.newTitle : null) }
          placeholder='New title..'
          placeholderTextColor='#A7A7A7'
          autoCapitalize='words'/>
        <Icon style={{ padding: 0, flex: 0}} color='#0955FE' name='edit-2' size={20}/>
      </View>
    )
  }
}

class PieCreator extends React.Component {
  constructor (props) {
    super(props)
  }
  state = {
    pieTitle: ''
  }

  render () {
    return (
      <View style={{flexDirection: 'row'}}>
        <TextInput
          maxLength={64}
          style={{ flex: 5, fontSize: 16}}
          value={this.state.pieTitle}
          onChangeText={(text) => { this.setState({...this.state, pieTitle: text}) }}
          returnKeyType='done'
          onSubmitEditing={ () => this.props.onSubmit(this.state.pieTitle, 'task', 'magic') }
          placeholder='Enter task title..'
          placeholderTextColor='#A7A7A7'
          autoCapitalize='words'/>
          <Icon color='#0955FE' name='check' size={20}/>
      </View>
    )
  }
}

class Flup extends React.Component {
  state = {
    color: this.props.color,
    type: this.props.type,
    editMode: false,
    editModeParams: {
      title: false,
      color: false,
      pieCreate: false,
    }
  }
  toggleTitleEditing () {
    this.setState({...this.state, editMode: !this.state.editMode, editModeParams: { ...this.state.editModeParams, title: !this.state.editMode, color: false, pieCreate: false}})
  }
  toggleColorPalette () {
    this.setState({...this.state, editMode: !this.state.editMode, editModeParams: { ...this.state.editModeParams, color: !this.state.editMode, title: false, pieCreate: false}})
  }
  togglePieCreator () {
    this.setState({...this.state, editMode: !this.state.editMode, editModeParams: { ...this.state.editModeParams, pieCreate: !this.state.editMode, title: false, color: false}})
  }
  _onSubmitTitleEditing = (newTitle) => {
    this.toggleTitleEditing()
    this.props.changeTitle(this.props.type, newTitle ?? this.props.title)
  }
  _createNewPie = (title, desc, _type) => {
    this.togglePieCreator()
    this.props.addTodo(this.props.type, title, desc, _type)
  }
  _changeColor = (color) => {
    // this.setState({...this.state, color: color})
    this.props.changeColor(this.props.type, color)
  }

  render () {
    return (
      <View style={{backgroundColor: '#F6F6F6', flex: 1, borderRadius: 20, marginBottom: 25,}}>
        <ExtendedDoubleTap onLongPress={ this.toggleColorPalette.bind(this) } delay={200} doubleTap={ this.togglePieCreator.bind(this) }>
            <View
              style={{flex: 1, backgroundColor: this.props.todos.tasks[this.props.type].color ?? 'black', padding: 30, borderRadius: 20,
                      shadowColor: '#EFEFEF', shadowOffest: { width: 4, height: 4}, shadowOpacity: 1, shadowRadius: 8.00,
                      elevation: 8}}>
              <TouchableOpacity onLongPress={ () => this.toggleTitleEditing()}>
                <Text style={{ fontWeight: '700', color: '#FFFFFF', marginBottom: 20, fontSize: this.props.big ? 150 : 18 }}>{this.props.title}</Text>
              </TouchableOpacity>
              <TaskList type={ this.props.type } />
            </View>
        </ExtendedDoubleTap>
        <View backgroundColor='#F6F6F6' style={{ padding: this.state.editMode ? 25 : 0, flex: 1, borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}>
          { this.state.editModeParams.title ? <TitleEditor onSubmit={ this._onSubmitTitleEditing }/> : this.state.editModeParams.color ? <ColorPalette onSelect={ this._changeColor } flupColor={ this.props.color } /> : this.state.editModeParams.pieCreate ? <PieCreator onSubmit={ this._createNewPie } /> : null }
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const { todos } = state
  return { todos }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    changeColor,
    changeTitle,
    addTodo
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Flup)
