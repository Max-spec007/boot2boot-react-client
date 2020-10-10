import React from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Redirect } from 'react-router-dom'

class EventUpdate extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      event: {
        title: '',
        notes: '',
        date: ''
      },
      isLoaded: false,
      isUpdated: false
    }
  }
  componentDidMount () {
    axios.get(apiUrl + '/events/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          isLoaded: true,
          event: response.data.event
        })
      })
      .catch(console.error)
  }
  handleChange = (event) => {
    // get value the user typed in
    const userInput = event.target.value
    // get the name of the input they typed in
    const eventKey = event.target.name // "title" or "author"
    // make a copy of the state (copy this javascript object)
    const eventCopy = Object.assign({}, this.state.event)
    // updating the key in our copy with what the user typed
    eventCopy[eventKey] = userInput
    // updating the state with our new copy
    this.setState({ event: eventCopy })
  }
  handleSubmit = (event) => {
    event.preventDefault()
    const newEvent = this.state.event
    // make POST request to API /games route with book data
    axios({
      url: `${apiUrl}/events/${this.props.match.params.id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        event: newEvent
      }
    })
      .then((response) => this.setState({ isUpdated: true }))
      .catch(console.error)
  }
  render () {
    if (this.state.isUpdated !== false) {
      return <Redirect to="/" />
    }
    return (
      <div>
        <h2>Event Update</h2>
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
export default EventUpdate
