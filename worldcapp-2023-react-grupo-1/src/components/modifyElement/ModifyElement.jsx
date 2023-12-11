import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'


import './ModifyElement.css'
import { GenericBtn } from '../shared/buttons/genericBtn/GenericBtn'
import PropTypes from 'prop-types'
import { useState } from 'react'

export const ModifyElement = (props) => {
    const [enabled, setEnabled] = useState(false)

    const handleBlur = (e) => {
        if (!e.relatedTarget || !e.currentTarget.contains(e.relatedTarget)) {
            setEnabled(false)
        }
    }

    return (
        <span tabIndex={0} onBlur={handleBlur} className="modify">
            <button data-testid='modify-btn' onClick={() => { setEnabled(!enabled) }} className='modify__btn'><FontAwesomeIcon icon={faEllipsis}/></button>
            {(() => enabled?
                <span className='modify__options'>
                    <GenericBtn data-testid="edit" operation='edit' btnIcon={faEdit} handleOperation={() => { props.edit() }}/>
                    <GenericBtn operation='remove' btnIcon={faTrash} handleOperation={() => { props.remove(); setEnabled(false) }}/>
                </span>   
                :
                <></>)()
            }
        </span>
    )
}

ModifyElement.propTypes = {
    edit: PropTypes.func,
    remove: PropTypes.func
}

export default ModifyElement