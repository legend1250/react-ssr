import React from 'react'
import { inject, observer } from 'mobx-react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

@inject('stores')
@observer
class Home extends React.Component {

  render() {
    const { events } = this.props.stores.event
    const { edges } = events
    
    return (
      <div>
        <Helmet>
          <title>React SSR</title>
          <meta name="description" content="This is a proof of concept for React SSR" />
        </Helmet>
        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Last updated</th>
            </tr>
          </thead>
          <tbody>
            {edges &&
              edges.toJS().map(item => <EventRow key={item.id} event={item} />)}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Home

const EventRow = ({ event }) => (
  <tr>
    <td>{event.id}</td>
    <td>
      <Link to={`/event/${event.slug}-${event.id}`} target="_blank">
        {event.title}
      </Link>
    </td>
    <td>{new Date(Number(event.createdAt)).toLocaleString()}</td>
  </tr>
)