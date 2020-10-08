import React from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'

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
      .then(() => this.setState({ deleted: true }))
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
export default EventShow
