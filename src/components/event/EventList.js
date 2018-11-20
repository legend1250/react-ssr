import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Card, Icon, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

@inject('stores')
@observer
class EventList extends Component{

  render(){
    const { events } = this.props.stores.event
    const { edges } = events

    return(
      edges && edges.map(item => (
        <EventItem key={item.id} event={item}  />
      ))
    )
  }
}

export default EventList

const EventItem = ({event}) => (
  <Card>
    <Image src={event.images.thumbnail} />
    <Card.Content>
      <Card.Header>
        <Link to={`/event/${event.slug}-${event.id}`} target="_blank">
          {event.title}
        </Link>
      </Card.Header>
      <Card.Meta>
        <span className='date'>CreatedAt: {new Date(Number(event.createdAt)).toLocaleString()}</span>
      </Card.Meta>
      <Card.Description>Matthew is a musician living in Nashville.</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
        {event.user.username}
      </a>
    </Card.Content>
  </Card>
)