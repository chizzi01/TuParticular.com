import './Navbar.css'
import logoNav from '../../img/Tu Particular2.png';

function Navbar() {
    return (
        <div className='navBar'>
            <div className='logoNavbar'>
            <img src={logoNav} alt="Tu particular" srcset="" />
            </div>
            <ul>
                <li>Inicio</li>
                <li>Clases</li>
                <li>Contacto</li>
                <li className='log'>Iniciar sesión</li>
            </ul>
        </div>

    );
}

export default Navbar;