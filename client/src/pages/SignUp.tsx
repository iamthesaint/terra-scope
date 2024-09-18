import '../styles/signupPage.css'
import { useState, FormEvent, ChangeEvent } from "react";
import axios from 'axios';
import { UserLogin } from '../interfaces/UserLogin';

const Signup = () => {

    const [signUpData, setSignUpData] = useState<UserLogin>({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

        const { name, value } = e.target;
        setSignUpData({
          ...signUpData,
          [name]: value
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            
            const response = await axios.post('http://localhost:3001/api/users', signUpData);
            console.log('User signed up successfully:', response.data);
        } catch (error) {
            console.error('Error signing up user:', error);
        }       
    };

    return (
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="usernameSignup">Username</label>
                    <input type="text" id="usernameSignup" placeholder='Enter a username' name='username' value={signUpData.username || ''} onChange={handleChange}/>
                </div>
                <div className='form-group'>
                    <label htmlFor="emailSignup">Email</label>
                    <input type="text" id="emailSignup" placeholder='Enter an email' name="email" value={signUpData.email || ''} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="passwordSignup">Password</label>
                    <input type="password" id="passwordSignup" placeholder='Enter a password' name='password' value={signUpData.password || ''} onChange={handleChange}/>
                </div>
                <div className='form-footer'>
                    <button className='signupBtn' type='submit'>Sign Up</button>
                </div>
            </form>
        </div>
    )
}

export default Signup;