export const addTodo = (taskType, title, description, type) => (
  {
    type: 'ADD_TODO',
    taskType,
    task: { title, description, type }
  }
)

export const complTodo = (taskType, id) => (
  {
    type: 'COMPLETE_TODO',
    taskType,
    taskId: id
  }
)

export const delTodo = (taskType, id) => (
  {
    type: 'DEL_TODO',
    taskType,
    taskId: id
  }
)

export const createFlup = (title, color) => (
  {
    type: 'CREATE_FLUP',
    params: { title, color }
  }
)

export const changeColor = (taskType, color) => (
  {
    type: 'CHANGE_COLOR',
    taskType,
    color
  }
)

export const changeTitle = (taskType, newTitle) => (
  {
    type: 'CHANGE_TITLE',
    taskType,
    newTitle
  }
)

export const retitleTask = (taskType, id, newTitle) => (
  {
    type: 'CHANGE_PIE_TITLE',
    taskType,
    params: { id, newTitle }
  }
)
