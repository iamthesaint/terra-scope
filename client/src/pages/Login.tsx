import { useState, FormEvent, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import Auth from "../utils/auth";
import { login } from "../api/authAPI";
import { UserLogin } from "../interfaces/UserLogin";

const Login = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState<UserLogin>({
    username: "",
    password: "",
  });

  // state to manage error messages
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // handle changes in the input fields
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  // handle form submission for login
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      // call login api endpoint
      const data = await login(loginData);
      // if login is successful, store the token in local storage
      Auth.login(data.token);
      navigate("/"); // redirect to the home page after successful login
    } catch (err) {
      setErrorMessage("Failed to login. Please check your credentials."); // set an error message if login fails
      console.error("Failed to login", err); // log any errors that occur during login
    }
  };
    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter username"
                        value={loginData.username || ''}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={loginData.password || ''}
                        onChange={handleChange}
                    />
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                </div>
                <div className="form-footer">
                    <p>Don't have an account? <Link to='/signup' className='signup-link'>Sign up</Link></p>
                </div>
                    <button className='loginBtn' type="submit">Log in</button>
            </form>
        </div>
    );
}

export default Login;