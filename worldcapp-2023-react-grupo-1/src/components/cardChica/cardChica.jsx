import './cardChica.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import ModifyElement from '../modifyElement/ModifyElement'

export const CardChica = ({
  titulo,
  tituloInferior,
  valorTituloInferior,
  icon,
  taglist,
  eliminarElemento,
  editarElemento,
}) => {
  return (
    <article className="pack hover-shadow container__cardChica">
      <div className="header_cardChica">
        <FontAwesomeIcon
          icon={icon}
          className="cardChica-icon primary-icon"
          style={{ color: 'var(--color-primario)' }}
        />
        <h1 className="cardChica-title">{titulo}</h1>
        <div className="action_icons_cardChica">
          <ModifyElement
            edit={editarElemento}
            remove={eliminarElemento}
          ></ModifyElement>
        </div>
      </div>
      <div className="separador"></div>

      <div className="tags-container-cardChica" onClick={editarElemento}>
        {taglist.map((item, index) => (
          <div key={index} className="tag-info">
            {item.icon && <p>{item.icon}</p>}
            <p className="tag-text" data-testid={item.texto}>{item.texto}</p>
            {index < taglist.length - 1 && (
              <span className="tag-divider">|</span>
            )}
          </div>
        ))}
      </div>
      <div className="container-bottomElements" onClick={editarElemento}>
        <p className="cardChica-bottomTitle">{tituloInferior}</p>
        <p className="cardChica-bottomTitle">{valorTituloInferior}</p>
      </div>
    </article>
  )
}

CardChica.propTypes = {
  titulo: PropTypes.string,
  tituloInferior: PropTypes.string,
  valorTituloInferior: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  color: PropTypes.string,
  icon: PropTypes.object,
  taglist: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.object || null,
      texto: PropTypes.node, // Permite mandarle etiquetas html como span y tambien incluye strings.
    }),
  ),
  eliminarElemento: PropTypes.func,
  editarElemento: PropTypes.func,
}
