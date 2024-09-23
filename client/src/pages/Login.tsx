import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="container form-container">
      <form className="form login-form" onSubmit={handleSubmit}>
        <h1>Login to Kanban</h1>
        {/* Username input field */}
        <div className="form">
          <label>Username</label>
          <input
            className="form-input"
            type="text"
            name="username"
            value={loginData.username || ""}
            onChange={handleChange}
          />
        </div>
        {/* Password input field */}
        <div className="form">
          <label>Password</label>
          <input
            className="form-input"
            type="password"
            name="password"
            value={loginData.password || ""}
            onChange={handleChange}
          />
          {/* error message */}
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>

        {/* submit button for the login form */}
        <div className="form-button">
          <button className="button" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
