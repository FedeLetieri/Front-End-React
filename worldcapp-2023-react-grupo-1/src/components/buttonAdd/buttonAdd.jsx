import './buttonAdd.css'
import PropTypes from 'prop-types'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom'

export const ButtonAdd = (props) => {

  const handleChange = () => { if(props.handleChange) props.handleChange() } 

  return (
    <NavLink to={props.path}>
      <button onClick={() => handleChange()} className="plus-button__container" data-testid="boton-agregar">
        <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
      </button>
    </NavLink>
  )
}

ButtonAdd.propTypes = {
  path: PropTypes.string.isRequired,
  handleChange: PropTypes.func
}
