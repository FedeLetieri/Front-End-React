import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import './barraBusqueda.css'
import PropTypes from 'prop-types'

export const BarraBusqueda = ({ buscarElemento }) => {
  return (
    <section className="search-bar center--flex">
      <form onSubmit={(e) => { e.preventDefault() }} className="search-form" action="">
        <input
          name="search-bar__input"
          data-testid="searchInput"
          type="text"
          className="input-nav"
          placeholder="Buscar"
          onChange={(event) => buscarElemento(event.target.value)}
        />
        <button data-testid="searchButton" type="submit" className="button-nav">
          <i className="fas fa-search"></i>
          <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
        </button>
      </form>
    </section>
  )
}

BarraBusqueda.propTypes = {
  buscarElemento: PropTypes.func,
}
