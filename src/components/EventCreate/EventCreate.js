import React from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Redirect } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'

class EventCreate extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      event: {
        title: '',
        notes: '',
        date: ''
      },
      createdEventId: ''
    }
  }

  handleChange = (event) => {
    // get value the user typed in
    const userInput = event.target.value
    // get the name of the input they typed in
    const eventKey = event.target.name
    // make a copy of the state
    const eventCopy = Object.assign({}, this.state.event)
    // updating the key in our copy with what the user typed
    eventCopy[eventKey] = userInput
    // updating the state with our new copy
    this.setState({ event: eventCopy })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const handleEvent = this.state.event
    // make POST request to API /games route with book data
    axios({
      url: `${apiUrl}/events`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        event: handleEvent
      }
    })
      .then((response) => {
        this.setState({ createdEventId: response.data.event._id })
        this.props.msgAlert({
          heading: 'Successfully Created',
          message: messages.createEventSuccess,
          variant: 'success'
        })
      })
      .catch(console.error)
  }

  render () {
    if (this.state.createdEventId !== '') {
      return <Redirect to="/" />
    }

    return (
      <div className='create'>
        <h2>Event Create</h2>
        <form onSubmit={this.handleSubmit}>
          <input name="title" type="text" placeholder="Title" value={this.state.event.title} onChange={this.handleChange}/>
          <input name="notes" type="text" placeholder="Notes" value={this.state.event.notes} onChange={this.handleChange} />
          <input name="date" type="text" placeholder="Date" value={this.state.event.date} onChange={this.handleChange} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default EventCreate
