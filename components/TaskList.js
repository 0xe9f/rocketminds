import React from 'react'
import {
  Text,
  View,
  FlatList
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Swipeable from 'react-native-gesture-handler/Swipeable'

import Pie from './Pie'
import { addTodo, delTodo } from '../actions/TodoActions'

const mapStateToProps = (state) => {
  const { todos } = state
  return { todos }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addTodo,
    delTodo
  }, dispatch)
)

class List extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      gestureName: 'none'
    }
  }
  editTaskTitle () {
    console.log('hello')
  }

  render () {
    // this.props.todos.tasks.forEach(obj => this.props.type === obj.type ? obj.list : null)
    // console.log(this.props.todos.tasks[this.props.type], '[DEBUG]' )
    //   ListEmptyComponent={<Text style={{ color: 'white' }}>List is empty. Want to add new thing?</Text> }
    return (
      <View>
        <FlatList
          style={{ flex: 1 }}
          data={this.props.todos.tasks[this.props.type].list}
          renderItem={({ item, index }) => (
            (
              <Pie key={index + this.props.type} ofType={this.props.type} checkColor={this.props.todos.tasks[this.props.type].color} id={item.id} title={item.title} completed={item.completed} />
            )
          )}
          horizontal={false}
          fillViewPort='true'
        />
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
