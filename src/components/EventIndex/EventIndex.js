import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

class EventIndex extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      events: [],
      isLoaded: false
    }
  }
  componentDidMount () {
    axios.get(apiUrl + '/events')
      .then(response => {
        this.setState({
          isLoaded: true,
          events: response.data.events
        })
      })
      .catch(console.error)
  }
  render () {
    let jsx
    // while the books are loading
    if (this.state.isLoaded === false) {
      jsx = <p>Loading...</p>
    // if no books
    } else if (this.state.events.length === 0) {
      jsx = <p>No Scheduled Events available, please add one.</p>
    // if there are books
    } else {
      jsx = (
        <ul>
          {this.state.events.map(event => {
            return <li key={event._id}><Link to={`/events/${event._id}`}>{event.title}</Link></li>
          })}
        </ul>
      )
    }
    return (
      <div>
        <h2>Events Page</h2>
        {jsx}
      </div>
    )
  }
}
export default EventIndex
