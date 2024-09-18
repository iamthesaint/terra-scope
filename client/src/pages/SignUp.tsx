import '../styles/signupPage.css'

const Signup = () => {
    return (
        <div className="signup-container">
            <form className="signup-form">
                <div className="form-group">
                    <label htmlFor="usernameOrEmail">Username</label>
                    <input type="text" id="usernameSignup" placeholder='Enter a username'/>
                </div>
                <div className='form-group'>
                    <label htmlFor="emailSignup">Email</label>
                    <input type="text" id="emailSignup" placeholder='Enter a email'/>
                </div>
                <div className="form-group">
                    <label htmlFor="passwordSignup">Password</label>
                    <input type="password" id="passwordSignup" placeholder='Enter a password'/>
                </div>
                <div className='form-footer'>
                    <button className='signupBtn'>Sign Up</button>
                </div>
            </form>
        </div>
    )
}

export default Signup;