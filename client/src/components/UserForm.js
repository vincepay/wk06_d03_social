import React from 'react'
import { connect } from 'react-redux'
import { updateApp, addApp } from '../reducers/apps'
import { Form, Dropdown } from 'semantic-ui-react'

class UserForm extends React.Component {
  initialState = {
    name: '',
    avatar: '',
  }

  state = {...this.initialState}

  static getDerivedStateFromProps(props, state) {
    if (props.id !== state.id)
      return {...props}
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { closeForm, dispatch } = this.props
    const func = this.state.id ? updateUser : addUser
    dispatch(func(this.state))
    closeForm()
  }

  catOptions = () => {
    const { categories } = this.props
    return categories.map( c => ( { key: c, text: c, value: c  } ) )
  }

  render() {
    const { name, avatar} = this.state
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input
          name="name"
          required
          value={name}
          onChange={this.handleChange}
          label="Name"
        />
        <Form.Input
          name="avatar"
          value={description}
          onChange={this.handleChange}
          label="avatar"
        />
        <Form.Button>Save</Form.Button>
      </Form>
    )
  }
}

const mapStateToProps = (state) => {
  const { users } = state
  const categories = [...new Set(users.map( u => u.category ))]
  return { 
    categories,
  }
}


export default connect(mapStateToProps)(UserForm)

