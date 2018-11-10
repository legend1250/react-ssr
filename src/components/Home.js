import React from 'react'
import { inject, observer } from 'mobx-react'

@inject('stores')
@observer
class Home extends React.Component {


  render() {
    const { event } = this.props.stores

    return (
      <div>
        <table border="1">
          <thead>
            <tr>
              <th>Month</th>
              <th>Savings</th>
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