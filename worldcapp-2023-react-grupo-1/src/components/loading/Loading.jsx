import PropTypes from 'prop-types'
import { useState, useEffect, useMemo } from 'react'
import './Loading.css'
import { NoElementMessage } from '../../components/shared/noElementMessage/noElementMessage'

export const Loading = (props) => {
    const LoadingStateTemplate = useMemo(() => {
        return {
                loading: 
                    <div className="loading-wrapper center--flex">
                                <div className="loading">
                            <div className="square p-top p-left p-br"></div>
                            <div className="square p-top p-right p-bl"></div>
                            <div className="square square--static"></div>
                            <div className="square p-bot p-left p-tl"></div>
                            <div className="square p-bot p-right p-tr"></div>
                        </div>
                    </div>,
                notFound: 
                    <div className="loading-wrapper no-elements center--flex">
                        <NoElementMessage message={props.itemsName}></NoElementMessage>
                    </div>,
                loaded: <></>
        }
    }, [props.itemsName])
    const [template, setTemplate] = useState(LoadingStateTemplate['loading'])

    useEffect(() => {
        setTemplate(LoadingStateTemplate[props.state])
    }, [setTemplate, props.state, LoadingStateTemplate])

    return template
}

Loading.propTypes = {
    state: PropTypes.string,
    itemsName: PropTypes.string,
}

export default Loading