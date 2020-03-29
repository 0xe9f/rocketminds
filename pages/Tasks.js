import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  FlatList,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native'
import { Provider, connect } from 'react-redux'
import { createStore, bindActionCreators } from 'redux'

import todoReducer from '../reducers/TodoReducer'
import { styles } from '../utils/styles'
import Header from '../components/Header'
import Flup from '../components/Flup'
import { complTodo } from '../actions/TodoActions'

function mapStateToProps(state) {
  const { todos } = state
  return { todos }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    complTodo
  }, dispatch)
);

class Tasks extends React.Component {
  state = {
    tasks: this.props.todos.tasks
  }
  render() {
    return (
      <View>
        <KeyboardAvoidingView behavior="padding" style={{ justifyContent: 'space-between' }}>
          <FlatList
            useInteraction={false}
            style={{ height: '100%', padding: 25, paddingTop: 10, paddingBottom: 0, marginBottom: 4}}
            data={ Object.keys(this.state.tasks) }
            contentContainerStyle={{
                paddingBottom: 100
              }}
            renderItem={ ({ item, index }) => (
              (
                <Flup key={index + this.state.tasks[item].type} title={this.state.tasks[item].title} color={this.state.tasks[item].color} type={this.state.tasks[item].type}/>
              )
            )}
            horizontal={false}
            />
        </KeyboardAvoidingView>
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks)
