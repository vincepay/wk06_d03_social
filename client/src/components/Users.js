import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Container, 
  Header,
  Card,
  Image,
  Dropdown,
  Divider,
  Button,
} from 'semantic-ui-react'
import UserForm from './UserForm'

class Users extends React.Component {
  state = { category: '', showForm: false }

  toggleForm = () => {
    this.setState({ showForm: !this.state.showForm }) 
  }

  categoryOptions = () => {
    const { categories } = this.props
    return categories.map( (c) => { return { key: c, text: c, value: c } } )
  }

  users = () => {
    const { users } = this.props
    const { category } = this.state

    let visible = users

    if (category) 
      visible = users.filter( a => a.category === category )

    return visible.map( user => {
      const { name, id, category, author, logo } = user
      return (
        <Card key={id}>
          <Image src={logo} />
          <Card.Content>
            <Card.Header>
              {name}
            </Card.Header>
            <Card.Meta>
              <span>{author}</span>
            </Card.Meta>
            <Card.Description>
              {category}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Link to={`/users/${user.id}`}>
              View User
            </Link>
          </Card.Content>
        </Card>
      )
    })
  }

  handleChange = (_, { value }) => {
    this.setState({ category: value })
  }

  render() {
    const { category, showForm } = this.state

    return (
      <Container>
        <Header as="h3" textAlign="center">Users</Header>
        <Button onClick={this.toggleForm}>
          { showForm ? 'Hide Form' : 'Show Form' }
        </Button>
        { showForm ?
            <UserForm closeForm={this.toggleForm} />
            :
            <Fragment>
              <Divider />
              <Card.Group itemsPerRow={4} stackable>
                { this.users() }
              </Card.Group>
            </Fragment>
          }
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  const { users } = state
  const categories = [...new Set(users.map( a => a.category ))]
  return { users, categories }
}

export default connect(mapStateToProps)(Users)

