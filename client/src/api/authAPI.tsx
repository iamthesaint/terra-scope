import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  try {

    const response = await fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.message}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.log('Login Error: ', err);
    return Promise.reject('Unable to log in');
  }
}

const signUp = async (userInfo: UserLogin) => {
  try {

    const response = await fetch('http://localhost:3001/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.message}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.log('Sign-Up Error: ', err);
    return Promise.reject('Unable to sign up'); 
  }
}

export { login, signUp };
