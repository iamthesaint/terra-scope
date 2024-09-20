import Auth from '../utils/auth'; // Import the authentication utility for managing tokens

// Function to fetch a list of users by sending a GET request to '/api/users'
const retrieveUsers = async () => {
  try {
    // Make the request, including the authentication token in the headers
    const response = await fetch('/api/users', {
      headers: {
        'Content-Type': 'application/json', // Specify the request format
        Authorization: `Bearer ${Auth.getToken()}` // Include the token for authorization
      }
    });

    // Parse the JSON response from the server
    const data = await response.json();

    // Check if the request was successful
    if (!response.ok) {
      throw new Error('Invalid response from the user API.'); // Throw an error if the request failed
    }

    // Return the list of users
    return data;
  } catch (err) {
    console.log('Error retrieving users:', err); // Log any errors during the request
    return []; // Return an empty array if there's an error
  }
}

export { retrieveUsers }; // Export the function for use in other parts of the app
