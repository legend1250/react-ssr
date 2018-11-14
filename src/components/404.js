import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

@inject('stores')
@observer
class Page404 extends Component{

  componentDidMount = () => {
    const { network } = this.props.stores
    network.requestError = null
  }
  
  render() {
    return (
      <div>
        Error 404
      </div>
    )
  }
}

export default Page404