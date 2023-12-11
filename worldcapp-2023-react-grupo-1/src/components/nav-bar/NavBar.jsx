import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faIdBadge,
  faPersonWalking,
  faStore,
  faRightFromBracket,
  faFlag,
  faHouseChimney,
} from '@fortawesome/free-solid-svg-icons'
import './NavBar.css'

export const NavBar = (props) => {
  useEffect(() => {
    props.changeFun()
  })

  const checkActive = ({ isActive }) =>
    isActive ? 'nav-link nav-link--focused' : 'nav-link'

  const navLinks = () => {
    const navPaths = [
      '/home',
      '/figuritas',
      '/jugadores',
      '/puntos-de-venta',
      '/selecciones',
      '/login',
    ]
    const navIcons = [
      faHouseChimney,
      faIdBadge,
      faPersonWalking,
      faStore,
      faFlag,
      faRightFromBracket,
    ]
    return navPaths.map((navPath, index) => {
      return (
        <div key={'navBarLinkWrapper' + index} className="nav-link-wrapper">
          <NavLink
            key={'navBarLink' + index}
            to={navPath}
            className={({ isActive }) => checkActive({ isActive })}
          >
            <FontAwesomeIcon className="nav-bar__item" icon={navIcons[index]} />
          </NavLink>
          <span key={'navBarLinkBg' + index} className="nav-link-bg"></span>
        </div>
      )
    })
  }

  const IsNotLogin = () => useLocation().pathname != '/login'

  return (
    <>
      {IsNotLogin() ? (
        <>
          <nav
            data-testid="nav-bar"
            className="nav-bar navbar fixed-bottom d-flex justify-content-around"
          >
            {navLinks()}
          </nav>
          <Outlet />
        </>
      ) : (
        <></>
      )}
    </>
  )
}

NavBar.propTypes = {
  changeFun: PropTypes.func,
}

export default NavBar
