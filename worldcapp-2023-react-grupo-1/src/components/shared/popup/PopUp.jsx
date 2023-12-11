import PropTypes from 'prop-types'
import { useEffect } from 'react'
import './PopUp.css'

export const PopUp = (props) => {
  const show = props.show
  const message = props.message
  const color = props.color
  const setShow = props.setShow

  const showAlert = () => {
    if (show) {
      const cartel = document.getElementById('alert')
      cartel.querySelector('p').innerHTML = message
      cartel.style.backgroundColor = color
      cartel.style.opacity = '1'
      cartel.style.display = 'block'
      setTimeout(function () {
        cartel.style.opacity = '0'
        cartel.style.display = 'none'
      }, 1500)
      setShow(false)
    }
  }

  useEffect(() => {
    showAlert()
  })

  return (
    <div style={{ backgroundColor: color }} id="alert">
      <p>{message}</p>
    </div>
  )
}

PopUp.propTypes = {
  message: PropTypes.string,
  color: PropTypes.string,
  show: PropTypes.bool,
  setShow: PropTypes.func,
}
