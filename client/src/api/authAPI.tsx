import { UserLogin } from "../interfaces/UserLogin";  // Import the UserLogin interface for consistent typing

// Function to log in a user by sending a POST request to the '/auth/login' endpoint
const login = async (userInfo: UserLogin) => {
  try {
    // Send login data as JSON in a POST request
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Specify the request format
      },
      body: JSON.stringify(userInfo) // Convert user information to JSON
    });

    // Check if the request was successful (status code 200-299)
    if (!response.ok) {
      const errorData = await response.json(); // Get the error details from the response
      throw new Error(`Error: ${errorData.message}`); // Throw an error with the server's message
    }

    // Parse and return the JSON response from the server
    const data = await response.json();
    return data;
  } catch (err) {
    console.log('Login Error: ', err); // Log any errors during the request
    return Promise.reject('Unable to log in'); // Return a rejected promise with an error message
  }
}

// Function to sign up a new user by sending a POST request to the '/auth/signup' endpoint
const signUp = async (userInfo: UserLogin) => {
  try {
    // Send sign-up data as JSON in a POST request
    const response = await fetch('/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Specify the request format
      },
      body: JSON.stringify(userInfo) // Convert user information to JSON
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorData = await response.json(); // Get the error details from the response
      throw new Error(`Error: ${errorData.message}`); // Throw an error with the server's message
    }

    // Parse and return the JSON response from the server
    const data = await response.json();
    return data;
  } catch (err) {
    console.log('Sign-Up Error: ', err); // Log any errors during the request
    return Promise.reject('Unable to sign up'); // Return a rejected promise with an error message
  }
}

export { login, signUp };  // Export the functions for use in other parts of the app
