import './style.css'
import students from '../../img/students.mp4';

function Login() {
    return (
        <div className='login'>
            <video src={students} muted autoPlay loop></video>
            <h1>Iniciar Sesión</h1>
            <form>
                <div className='loginForm'>
                    <input type='text' placeholder='Usuario' />
                    <input type='password' placeholder='Contraseña' />
                    <input type='submit' value='Iniciar Sesión' />
                    <label htmlFor="">O</label>
                    <input type='button' value='Registrarse' />
                </div>
            </form>

        </div>

    );
}

export default Login;