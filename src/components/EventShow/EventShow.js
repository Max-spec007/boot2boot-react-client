import React from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { withRouter } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'

class EventShow extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      event: {},
      isLoaded: false,
      deleted: false
    }
  }
  componentDidMount () {
    axios.get(apiUrl + '/events/' + this.props.match.params.id)
      .then(response => {
        // troubleshoot step 1 - are we getting a response from the API?
        this.setState({
          isLoaded: true,
          event: response.data.event
        })
      })
      .catch(console.error)
  }
  destroy = (event) => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/events/${this.props.match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(() => {
        this.props.msgAlert({
          heading: 'Successfully Deleted',
          message: messages.deleteEventSuccess,
          variant: 'success'
        })
        this.props.history.push('/')
      })
      // don't need the deleted state, instead just gonna redirect home
      // right after the axios call success
      .catch(console.error)
  }
  rsvp = (event) => {
    event.preventDefault()
    console.log('CONSOLE HERE', this.props.user._id)
    console.log('SECOND CONSOLE', this.state.event.rsvps)
    if (this.state.event.rsvps.every(rsvp => rsvp.owner._id !== this.props.user._id)) {
      axios({
        url: `${apiUrl}/rsvps`,
        method: 'POST',
        headers: {
          'Authorization': `Token token=${this.props.user.token}`
        },
        data: {
          eventId: this.props.match.params.id
        }
      })
        .then(() => {
          axios.get(apiUrl + '/events/' + this.props.match.params.id)
            .then(response => {
              // troubleshoot step 1 - are we getting a response from the API?
              this.setState({
                isLoaded: true,
                event: response.data.event
              })
            })
            .catch(console.error)
        })
    } else {
      this.props.msgAlert({
        heading: 'YOU ALREADY HAVE AN RSVP',
        message: 'RSVP UNSUCCESSFUL',
        variant: 'danger'
      })
    }
  }
  destroyRSVP = (event) => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/rsvps/${this.props.match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(() => {
        this.props.msgAlert({
          heading: 'Successfully Deleted RSVP',
          message: messages.deleteEventSuccess,
          variant: 'success'
        })
        this.props.history.push('/')
      })
      // don't need the deleted state, instead just gonna redirect home
      // right after the axios call success
      .catch(console.error)
  }
  render () {
    // troubleshoot step 2 - is the render for BookShow.js being called?
    let jsx
    // while the book is loading
    if (this.state.isLoaded === false) {
      jsx = <p>Loading...</p>
    } else {
      jsx = (
        <div>
          <ul>
            <li>{this.state.event._id}</li>
            <li>{this.state.event.title}</li>
            <li>{this.state.event.notes}</li>
            <li>{this.state.event.date}</li>
          </ul>
          <button onClick={this.destroy}>Delete Event</button>
          <button onClick={this.rsvp}>RSVP TO EVENT</button>
          <button onClick={this.destroyRSVP}>DELETE RSVP</button>
          <ul>
            {this.state.event.rsvps.map(rsvp => (
              <li key={rsvp.owner._id}>{rsvp.owner.email}</li>
            ))}
          </ul>
        </div>
      )
    }
    return (
      <div>
        <h2>Event Page</h2>
        {jsx}
      </div>
    )
  }
}
export default withRouter(EventShow)
// withRouter we can get access to this.props.history
