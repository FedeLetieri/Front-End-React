import './Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'

export const Footer = () => {
    return (
        <footer className="footer">
            <h1>
                <FontAwesomeIcon className="footer_icon" icon={faFacebook} />
                WorldCApp
                <span className="footer_year"> / 2023</span>
            </h1>
        </footer>
    )
}

export default Footer