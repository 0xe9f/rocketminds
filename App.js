import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  FlatList,
  ScrollView
} from 'react-native'
import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'
import todoReducer from './reducers/TodoReducer'

import { styles } from './utils/styles'
import Header from './components/Header'
import Flup from './components/Flup'
import Tasks from './pages/Tasks'

const store = createStore(todoReducer)

class App extends React.Component {
  constructor (props) {
    super(props)
  }
  state = {
    tasks: store.getState().todos.tasks
  }
  onCreateFlup () {
    store.dispatch({ type: 'CREATE_FLUP', params: {title: 'New container', color: '#2194FF'}})
    this.setState({...this.state, tasks: store.getState().todos.tasks })
  }
  render() {
    return (
      <Provider store={ store }>
        <SafeAreaView style={styles.body}>
          <Header
            imageUrl='https://sun9-44.userapi.com/impg/c857528/v857528974/1990a9/oI5fLt1t7yI.jpg?size=200x0&quality=90&sign=02afb4a8208292b98f497fcc7edd5c78'
            onPress={ () =>  this.onCreateFlup() } />
            <Tasks />
        </SafeAreaView>
      </Provider>
    )
  }
}

export default App
// AppRegistry.registerComponent('Project', () => Project);
