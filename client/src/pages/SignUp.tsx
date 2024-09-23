// import '../styles/signupPage.css'

// import Auth from '../utils/auth.js';
// import { useState, FormEvent, ChangeEvent } from "react";
// import { UserLogin } from '../interfaces/UserLogin';
// import { signUp } from '../api/authAPI';

// const Signup = () => {

//     const [signUpData, setSignUpData] = useState<UserLogin>({
//         username: '',
//         email: '',
//         password: ''
//     });

//     const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

//         const { name, value } = e.target;
//         setSignUpData({
//           ...signUpData,
//           [name]: value
//         });
//     };

//     const handleSubmit = async (e: FormEvent) => {
//         e.preventDefault();
//         try {
//           // Call the sign up API endpoint with signUpData
//           const data = await signUp(signUpData);
//           // If sign up is successful, call Auth.login to store the token in localStorage
//           Auth.login(data.token);
//           console.log('YAY IT WORKED')
//         } catch (err) {
//           console.error('Failed to login', err);  // Log any errors that occur during sign up
//         }
//       };

//     return (
//         <div className="signup-container">
//             <form className="signup-form" onSubmit={handleSubmit}>
//                 <div className="form-group">
//                     <label>Username</label>
//                     <input type="text" placeholder='Enter a username' name='username' value={signUpData.username || ''} onChange={handleChange}/>
//                 </div>
//                 <div className='form-group'>
//                     <label>Email</label>
//                     <input type="text" placeholder='Enter an email' name="email" value={signUpData.email || ''} onChange={handleChange}/>
//                 </div>
//                 <div className="form-group">
//                     <label>Password</label>
//                     <input type="password" placeholder='Enter a password' name='password' value={signUpData.password || ''} onChange={handleChange}/>
//                 </div>
//                 <div className='form-footer'>
//                     <button className='signupBtn' type='submit'>Sign Up</button>
//                 </div>
//             </form>
//         </div>
//     )
// }

// export default Signup;