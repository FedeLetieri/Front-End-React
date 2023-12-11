import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import './Header.css'

export const Header = (props) => {
  const [title, setTitle] = useState(props.title)

  const updateTitle = () => {
    setTitle(props.title)
  }

  useEffect(() => {
    updateTitle(props.title)
  })

  return (
    <header className="header center--flex">
      <img className="header__icon" src="../../src\assets\img\logo.png" alt="Logo" />
      <span className="rectangle rtg-1"></span>
      <span className="rectangle rtg-2"></span>
      <h1 className="header__title">{title}</h1>
    </header>
  )
}

Header.propTypes = {
  title: PropTypes.string,
}

export default Header
