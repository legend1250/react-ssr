import React from 'react'
import { inject, observer } from 'mobx-react'
import { Helmet } from 'react-helmet'

@inject('stores')
@observer
class Home extends React.Component {

  componentDidMount = () => {
    // console.log('stores: ' ,this.props.stores)
  }

  handleMoreUsers = () => {
    this.props.stores.event.getMoreUsers()
  }

  render() {
    const { event } = this.props.stores

    return (
      <div>
        <Helmet>
          <title>React SSR</title>
          <meta name="description" content="This is a proof of concept for React SSR" />
        </Helmet>
        <button onClick={this.handleMoreUsers} >More users</button>
        <table border="1">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Picture</th>
            </tr>
          </thead>
          <tbody>
            {event.users && event.users.map(user => (
              <UserRow user={user} key={user.phone} />
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Home

const UserRow = ({user}) => (
  <tr>
    <td>{`${user.name.title} ${user.name.first} ${user.name.last}`}</td>
    <td>{user.email}</td>
    <td>{user.phone}</td>
    <td><img src={user.picture.large} /></td>
  </tr>
)