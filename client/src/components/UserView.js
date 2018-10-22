import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Divider,
  Header,
  Image,
  Container, 
  Table,
  Button,
} from 'semantic-ui-react'
import UserForm from './UserForm'

class UserView extends React.Component {
  state = { showForm: false }

  toggleForm = () => {
    this.setState({ showForm: !this.state.showForm })
  }

  render() {
    const { showForm } = this.state
    const { user } = this.props
    return (
      <Container>
        <Link to="/users">View All Users</Link>
        <Button onClick={this.toggleForm}>
          { showForm ? 'Cancel' : 'Edit' }
        </Button>
        { showForm ?
            <UserForm {...user} closeForm={this.toggleForm} />
            :
            <Fragment>
              <Header as="h3" textAlign="center">{user.name}</Header>
              <Image src={user.logo} />
              <Table definition>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell />
                    <Table.HeaderCell />
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row>
                    <Table.Cell>Avatar</Table.Cell>
                    <Table.Cell>{user.Avatar}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Fragment>
          }
      </Container>
    )
  }
}


const mapStateToProps = (state, props) => {
  //"1"
  const { id } = props.match.params
  const { users } = state
  const user = users.find( a => a.id === parseInt(id, 10) )
  return { user }
}

export default connect(mapStateToProps)(UserView);


