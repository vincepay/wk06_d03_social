import axios from 'axios'

const USERS = 'USERS'
const ADD_USER = 'ADD_USER'
const UPDATE_USER = 'UPDATE_USER'
const DELETE_USER = 'DELETE_USER' 

//Index
export const getUsers = (cb) => {
  return (dispatch) => {
    axios.get('/api/users')
      .then( res => { 
        dispatch({ type: USERS, users: res.data }) 
        cb()
      })
  }
}

//Create
export const addUser = (user) => {
  return (dispatch) => {
    axios.post('/api/users', { user })
      .then( res => dispatch({ type: ADD_USER, user: res.data }) )
  }
}

export const updateUser = (user) => {
  return (dispatch) => {
    axios.put(`/api/users/${user.id}`, { user })
      .then( res => dispatch({ type: UPDATE_USER, user: res.data }) )
  }
}

//Destroy
export const deleteUser = (id) => {
  return (dispatch) => {
    axios.delete(`/api/users/${id}`)
      .then( () => dispatch({ type: DELETE_USER, id }) )
  }
}

export default (state = [], action) => {
  switch(action.type) {
    case USERS:
      //{ type: USERS, users: [] }
      return action.users
    case ADD_USER:
      //{ type: ADD_USER, user: { id: 1, name: 'Fornite' } }
      return [action.user, ...state]
    case UPDATE_USER:
      // { type: UPDATE_USER, user: { id: 1, name: 'Fortnite2' }
      return state.map( a => {
        if (a.id === action.user.id)
          return action.user
        return a
      })
    case DELETE_USER:
      // { type: DELETE_USER, id: 1 }
      return state.filter( a => a.id !== action.id )
    default:
      return state
  }
}






