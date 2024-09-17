import '../styles/loginPage.css';

import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className="login-container">
            <form className="login-form">
                <div className="form-group">
                    <label htmlFor="usernameOrEmail">Username or Email</label>
                    <input type="text" id="usernameOrEmail" placeholder='Please enter username or email'/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder='Please enter password'/>
                </div>
                <div className="form-footer">
                    <p>Don't have an account? <Link to='/signup' className='signup-link'>Sign up</Link></p>
                    <button className='loginBtn'>Log in</button>
                </div>
            </form>
        </div>
    )
}

export default Login;