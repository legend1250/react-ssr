import React from 'react'
import { Helmet } from 'react-helmet'
import EventList from './event/EventList'

class Home extends React.Component {

  render() {
    
    return (
      <div>
        <Helmet>
          <title>React SSR</title>
          <meta name="description" content="This is a proof of concept for React SSR" />
        </Helmet>
        <EventList />
      </div>
    )
  }
}

export default Home