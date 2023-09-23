// Write your code here
import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    nameInput: '',
    dateInput: '',
    isShortlisted: false,
  }

  togglingStarElement = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachList => {
        if (id === eachList.id) {
          return {...eachList, isStarred: !eachList.isStarred}
        }
        return eachList
      }),
    }))
  }

  onShortlistedItems = () => {
    this.setState(prevState => ({isShortlisted: !prevState.isShortlisted}))
  }

  getTheArray = event => {
    event.preventDefault()
    const {nameInput, dateInput} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), `dd MMMM yyyy, EEEE`)
      : ''

    const newList = {
      id: uuidv4(),
      nameInput,
      dateInput: formattedDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newList],
      nameInput: '',
      dateInput: '',
    }))
  }

  onChangeName = event => {
    this.setState({nameInput: event.target.value})
  }

  onChangeDate = event => {
    this.setState({dateInput: event.target.value})
  }

  getFilteredAppointmentsList = () => {
    const {appointmentsList, isShortlisted} = this.state

    if (isShortlisted) {
      return appointmentsList.filter(eachList => eachList.isStarred === true)
    }
    return appointmentsList
  }

  render() {
    const {nameInput, dateInput, appointmentsList, isShortlisted} = this.state

    const stylingStarred = isShortlisted ? 'styled-button' : 'non-styled-button'

    const filtedAppointmentsList = this.getFilteredAppointmentsList()

    return (
      <div className="main-container">
        <div className="bg-container">
          <div className="card">
            <div className="top-container">
              <form className="form left-container" onSubmit={this.getTheArray}>
                <h1 className="heading">Add Appointment</h1>
                <label htmlFor="titleelement" className="title">
                  TITLE
                </label>
                <input
                  id="titleelement"
                  type="text"
                  className="title-input"
                  placeholder="Title"
                  onChange={this.onChangeName}
                  value={nameInput}
                />
                <label htmlFor="dateelement" className="title">
                  DATE
                </label>
                <input
                  id="dateelement"
                  type="date"
                  className="title-input"
                  onChange={this.onChangeDate}
                  value={dateInput}
                />
                <button type="submit" className="button">
                  Add
                </button>
              </form>
              <div className="right-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                  className="image"
                  alt="appointments"
                />
              </div>
            </div>
            <hr />
            <div className="appointment-container">
              <h1 className="appointment">Appointments</h1>
              <button
                type="button"
                className={stylingStarred}
                onClick={this.onShortlistedItems}
              >
                Starred
              </button>
            </div>
            <ul className="list-container">
              {filtedAppointmentsList.map(eachAppointment => (
                <AppointmentItem
                  eachAppointment={eachAppointment}
                  key={eachAppointment.id}
                  togglingStarElement={this.togglingStarElement}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
