import '../styles/loginPage.css';
import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const location = useLocation();
    const message = location.state?.message;

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/users/login', loginData);
            if (response.data.success) {
                alert('Login successful!');
                // Redirect to another page or perform other actions
            } else {
                alert('Invalid email or password.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('An error occurred during login. Please try again.');
        }
    };

    useEffect(() => {
        if (message) {
            alert(message);
        }
    }, [message]);

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Enter email"
                        value={loginData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter password"
                        value={loginData.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-footer">
                    <p>Don't have an account? <Link to='/signup' className='signup-link'>Sign up</Link></p>
                    <button className='loginBtn' type="submit">Log in</button>
                </div>
            </form>
        </div>
    );
};

export default Login;