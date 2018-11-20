import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Helmet } from 'react-helmet'
import { Redirect } from 'react-router-dom'
import { Editor as EditorWysiwyg } from 'react-draft-wysiwyg'
import { convertFromRaw, EditorState } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import './styles.scss'

@inject('stores')
@observer
class EventDetail extends Component {

  getEventDetail = () => {
    const { network, event } = this.props.stores
    const { requestError } = network 
    if(requestError && requestError.code){
      return({requestError})
    }
    
    return ({event: event.event})
  }

  render() {
    const { requestError, event } = this.getEventDetail()
    if(requestError){
      // console.log('return 404')
      return (<Redirect to={requestError.url} />)
    }

    const contentEditor = event.description &&
      EditorState.createWithContent(convertFromRaw(JSON.parse(event.description)))
      

    return (
      <div className='title-event-detail' >
        <Helmet>
          <title>{event.title}</title>
        </Helmet>
        <h3>{event.userId}</h3>
        <div>
          <span>
            Title: <label>{event.title}</label>
          </span>
        </div>
        <div>
          <EditorWysiwyg
            editorState={contentEditor}
            readOnly
            toolbarHidden
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
          />
        </div>
        {/* <div>{JSON.stringify(message)}</div> */}
        <div>
          <small>
            Created at: {new Date(Number(event.createdAt)).toLocaleString()}
          </small>
        </div>
      </div>
    )
  }
}

export default EventDetail