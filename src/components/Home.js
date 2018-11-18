import React from 'react'
import { Helmet } from 'react-helmet'
import EventList from './event/EventList'

class Home extends React.Component {

  render() {
    
    return (
      <div>
        <Helmet>
          <title>EventBox</title>
          <meta name="description" content="EventBox" />
        </Helmet>
        <EventList />
      </div>
    )
  }
}

export default Home