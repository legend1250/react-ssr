import React from 'react'
import { inject, observer } from 'mobx-react'

const About = inject('stores')(observer(props => {
  console.log('props: ' ,props)
  return(
    <h2>This is the about page</h2>
  )
}))

export default About
