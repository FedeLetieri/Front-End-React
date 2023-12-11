import PropTypes from 'prop-types'
import './noElementMessage.css'

export const NoElementMessage = (props) => {
    const message = props.message

    return (
        <div className='no-elements-message-container'>
            <p className='pack hover-shadow no-elements-message-p'>{`No se encuentran ${message} en el sistema`}</p>
        </div>
        
    )
}

NoElementMessage.propTypes = {
    message: PropTypes.string,
}