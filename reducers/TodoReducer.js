import { combineReducers } from 'redux'
import { nameFinder } from '../utils/utils'

const INITIAL_STATE = {
  tasks: {
    work: {
      type: 'work',
      title: 'Work',
      color: '#2099FF',
      list: [
        {
          id: 0,
          title: 'Buy conference tickets',
          completed: true
        },
        {
          id: 1,
          title: 'Book plane tickets',
          description: 'innovation instrument for designers',
          completed: false
        },
        {
          id: 2,
          title: 'Prepare workshop',
          description: 'innovation instrument for designers',
          completed: false
        }
      ]
    },
    meets: {
      type: 'meets',
      title: 'Meetings',
      color: '#0076FF',
      list: [
        {
          id: 0,
          title: 'Dinner with Tom',
          description: 'innovation instrument for designers',
          completed: false
        },
        {
          id: 1,
          title: 'Book plane tickets',
          description: 'innovation instrument for designers',
          completed: false
        }
      ]
    },
    admin: {
      type: 'admin',
      title: 'Administration',
      color: '#0955FE',
      list: [
        {
          id: 0,
          title: 'Pay bills',
          description: 'innovation instrument for designers',
          completed: false
        }
      ]
    }
  }
}

const todoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      state.tasks[action.taskType].list.push({ ...action.task, id: state.tasks[action.taskType].list.length })
      return { ...state, tasks: state.tasks }
    case 'DEL_TODO':
      Object.assign(state.tasks[action.taskType], { ...state.tasks[action.taskType], list: [...state.tasks[action.taskType].list.filter(task => task.id !== action.taskId)] })
      return { ...state }
    case 'COMPLETE_TODO':
      Object.assign(state.tasks[action.taskType], { ...state.tasks[action.taskType], list: [...state.tasks[action.taskType].list.map(task => task.id === action.taskId ? { ...task, completed: !task.completed } : { ...task })] })
      return { ...state }
    case 'CHANGE_COLOR':
      Object.assign(state.tasks[action.taskType], { ...state.tasks[action.taskType], color: action.color })
      return { ...state }
    case 'CREATE_FLUP': {
      const validatedTitle = nameFinder(state.tasks, action.params.title)
      if (!Object.keys(state.tasks).includes(validatedTitle)) {
        Object.assign(state.tasks, { ...state.tasks, [`${validatedTitle}`]: { title: action.params.title, color: action.params.color, type: validatedTitle, list: [] } })
        return { ...state }
      }
      break
    }
    case 'CHANGE_TITLE':
    {
      const validatedTitle = nameFinder(state.tasks, action.newTitle)
      if (!Object.keys(state.tasks).includes(validatedTitle)) {
        const renameProp = (obj, oldName, newName) => {
          if (oldName === newName) {
            return obj
          }
          if (Object.prototype.hasOwnProperty.call(obj, oldName)) {
            obj[newName] = obj[oldName]
            delete obj[oldName]
          }
          return obj
        }
        Object.assign(state.tasks[action.taskType], { ...state.tasks[action.taskType], title: action.newTitle, type: validatedTitle })
        renameProp(state.tasks, action.taskType, validatedTitle)
        return { ...state }
      }
      break
    }
    case 'CHANGE_PIE_TITLE': {
      Object.assign(state.tasks[action.taskType], { ...state.tasks[action.taskType], list: [...state.tasks[action.taskType].list.map(task => { return task.id === action.params.id ? { ...task, title: action.params.newTitle } : { ...task } })] })
      // console.log({ ...state })
      return { ...state }
    }
    default:
      return state
  }
}

export default combineReducers({
  todos: todoReducer
})
