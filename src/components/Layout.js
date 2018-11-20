import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Header from './Header'
import Page404 from './404'
import routes from '../routes'

class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Welcome to EventBox!'
    }
  }

  render() {
    return (
      <div>
        <h1>{ this.state.title }</h1>
        <Header />
        <Switch>
          { routes.map(route => <Route key={ route.path } { ...route } />) }
          <Route
            key='404'
            component={Page404}
          />
        </Switch>
      </div>
    )
  }
}

export default Layout
