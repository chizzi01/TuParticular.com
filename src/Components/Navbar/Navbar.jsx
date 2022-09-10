import './Navbar.css'
import logoNav from '../../img/Tu Particular2.png';
import Login from '../Login/Login';

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
                    <a href={Login}><li>Iniciar sesión</li></a>
                </ul>
            </div>

        );
    }

export default Navbar;