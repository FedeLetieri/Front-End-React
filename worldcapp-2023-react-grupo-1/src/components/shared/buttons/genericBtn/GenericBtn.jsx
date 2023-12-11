import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PropTypes from 'prop-types'

import './GenericBtn.css'

export const GenericBtn = (props) => {
    return (
        <button
            className={`generic-button btn-${props.operation}`}
            data-testid = {props.operation}
            title="Eliminar Elemento"
            onClick={() => props.handleOperation()}>
                <FontAwesomeIcon icon={props.btnIcon}></FontAwesomeIcon>
        </button>
    )
}

GenericBtn.propTypes = {
    btnIcon: PropTypes.object,
    handleOperation: PropTypes.func,
    operation: PropTypes.string
}

export default GenericBtn