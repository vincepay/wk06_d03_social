import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { getUsers } from '../reducers/users'
import {
  Loader, 
  Segment,
  Dimmer,
} from 'semantic-ui-react'
import { Route } from 'react-router-dom'
import Users from './Users'
import UserView from './UserView'

class FetchUsers extends React.Component {
  state = { loaded: false }

  componentDidMount() {
    this.props.dispatch(getUsers(this.setLoaded))
  }

  setLoaded = () => {
    this.setState({ loaded: true })
  }

  render() {
    const { loaded } = this.state
    if (loaded) {
      return (
        <Fragment>
          <Route exact path="/users" component={Users} />
          <Route exact path="/users/:id" component={UserView} />
        </Fragment>
      )
    } else {
      return (
        <Segment>
          <Dimmer active>
            <Loader />
          </Dimmer>
        </Segment>
      )
    }
  }
}

export default connect()(FetchUsers)


