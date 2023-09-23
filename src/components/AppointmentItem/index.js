// Write your code here

import './index.css'

const AppointmentItem = props => {
  const {eachAppointment, togglingStarElement} = props
  const {id, nameInput, dateInput, isStarred} = eachAppointment

  const starButton = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStarElement = () => {
    togglingStarElement(id)
  }

  return (
    <li className="each-list">
      <div className="name-container">
        <p className="name">{nameInput}</p>
        <button type="button" onClick={onClickStarElement} data-testid="star">
          <img className="star-image" src={starButton} alt="star" />
        </button>
      </div>
      <p>Date: {dateInput}</p>
    </li>
  )
}

export default AppointmentItem
