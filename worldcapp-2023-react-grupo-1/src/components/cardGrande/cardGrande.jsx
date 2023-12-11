import './cardGrande.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PropTypes from 'prop-types'

export const CardGrande = ({cantidad,tituloInferior,icon}) => {
    return (
        <article className="pack hover-shadow container__cardGrande home-cards__card">
            <FontAwesomeIcon icon={icon} className="cardGrande-icon"/>
           
            <h1 className="cardGrande-title">{cantidad}</h1>

            <p className="cardGrande-bottomTitle">{tituloInferior}</p>

        </article>
    )
}
CardGrande.propTypes = {
    cantidad: PropTypes.number, 
    tituloInferior: PropTypes.string,
    icon: PropTypes.object
  }
