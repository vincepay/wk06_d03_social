import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './components/Home'
import NoMatch from './components/NoMatch'
import FetchUsers from './components/FetchUsers'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/users" component={FetchUsers} />
    <Route component={NoMatch} />
  </Switch>
)

export default App
