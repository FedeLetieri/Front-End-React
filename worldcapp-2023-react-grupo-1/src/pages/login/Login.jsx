import './Login.css'
import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons'
import { Footer } from '../../components/footer/Footer'
import { authService } from '../../services/authService'
import PropTypes from 'prop-types'

export const Login = (props) => {
    const navigate = useNavigate()
    const logoURL = "src/assets/img/logo-blue.png"
    const [user, setUser] = useState()
    const [password, setPassword] = useState()
    const [formInputsValidity, setFormInputsValidity] = useState({
        user: true,
        password: true
    })

    useEffect(() => {
        localStorage.removeItem('userId')
    })

    const formInputsValidityRef = useRef(formInputsValidity)

    const authenticate = async () => {
        let validity = validateInput(user, 'user', true)
        validity = validateInput(password, 'password', true)
       if(validity){
            await props.doThenShowMsg(async () => {
                try{
                    const msg = await authService.authenticate({username: user, password: password})
                    localStorage.setItem('userId', msg.data)
                    navigate('/home')
                }catch(error){
                    changeValidity('user', false)
                    changeValidity('password', false)
                    throw error
                }
            },
            '',
            'Usuario y/o contraseña incorrectos.'
            )
       }
       else{
            showErrPopUp('Asegúrese de completar todos los campos.')
       }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        authenticate()
    }

    const showErrPopUp = (msg) => {
        setMsgErrorPopUp(msg)
        setShowErrorPopUp(true)
    }

    const validateInput = (content, nameRef, undefinedCheck = false) => {
        const pttrn = /^[\s]*$/
        const validity = !pttrn.test(content) && (undefinedCheck? !(content == undefined) : true)
        changeValidity(nameRef, validity)
        return validity
    }

    const changeValidity = (nameRef, validity) => {
        setFormInputsValidity((prevVals) => ({...prevVals, [nameRef] : validity}))
        formInputsValidityRef.current[nameRef] = validity
    }

    return (
        <>
            <section className="center--flex section__main_login">
                <div className="login-form">
                    <h1 className="form__text--title center--flex">
                        <img src={logoURL} alt="Logo" className="worldcapp-logo__login" />
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <label className={`${!formInputsValidity.user ? 'form__input--subtitle_error' : ''} form__input--subtitle`}>Usuario</label>
                        <div className="form__input--container">
                            <FontAwesomeIcon className={`${!formInputsValidity.user ? 'form__input--icon_error' : ''} form__input--icon center--flex`} icon={faUser}></FontAwesomeIcon>
                            <input
                            type="text"
                            id="usuario"
                            name="usuario"
                            className={`${!formInputsValidity.user ? 'form__input--input_error' : ''} form__input--input`}
                            value={user || ''}
                            onChange={(event) => {validateInput(event.target.value, 'user');setUser(event.target.value)}}/>
                        </div>
                        <label className={`${!formInputsValidity.password ? 'form__input--subtitle_error' : ''} form__input--subtitle`}>Contraseña</label>
                        <div className="form__input--container">
                            <FontAwesomeIcon className={`${!formInputsValidity.password ? 'form__input--icon_error' : ''} form__input--icon center--flex`} icon={faKey}></FontAwesomeIcon>
                            <input
                            type="password"
                            id="contraseña"
                            name="contraseña"
                            className={`${!formInputsValidity.password ? 'form__input--input_error' : ''} form__input--input`}
                            value={password || ''}
                            onChange={(event) => {validateInput(event.target.value, 'password'); setPassword(event.target.value)}}/>
                        </div>
                        <button
                            type="submit"
                            value="Ingresar"
                            className="primary-button form__button--login">
                            <span>Ingresar</span><i></i>
                        </button>
                        <p className="password-forgotten-sign"><a href="#">¿Olvidaste tu contraseña?</a></p>
                        <p className="sign-up-sign">¿No tenés cuenta? <a>Registrate</a></p>
                    </form>
                </div>
            </section>
            <Footer/>
        </>
    )
}

Login.propTypes = {
    doThenShowMsg: PropTypes.func,
}