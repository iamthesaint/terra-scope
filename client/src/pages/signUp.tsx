import { useState, FormEvent, ChangeEvent } from "react";
import Auth from '../utils/auth';  
import { signUp } from "../api/authAPI"; 
import { UserLogin } from "../interfaces/UserLogin"; 
import "../styles/signupPage.css";

export default function SignUp() {
  const [signUpData, setSignUpData] = useState<UserLogin>({
    username: '',
    password: '',
  });

     // Handle changes in the input fields
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSignUpData({
      ...signUpData,
      [name]: value
    });
  };

  // Handle form submission for login
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // Call the sign up API endpoint with signUpData
      const data = await signUp(signUpData);
      // If sign up is successful, call Auth.login to store the token in localStorage
      Auth.login(data.token);
    } catch (err) {
      console.error('Failed to login', err);  // Log any errors that occur during sign up
    }
    
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={signUpData.username || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={signUpData.password || ""}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );

}