class AuthService { 
  
  // Check if the user is logged in by checking if a token exists in localStorage
  loggedIn() {
    const token = this.getToken();  // Get the token from localStorage
    return token;  // Return the token (truthy if logged in, falsy if not)
  }

  // Retrieve the JWT token from localStorage
  getToken(): string {
    const loggedUser = localStorage.getItem('id_token') || '';  // Get the token or return an empty string if not found
    return loggedUser;  // Return the token or an empty string
  }

  // Save the JWT token in localStorage and redirect the user to the home page
  login(idToken: string) {
    localStorage.setItem('id_token', idToken);  // Save the token under 'id_token'
    window.location.assign('/');  // Redirect to the home page
  }

  // Remove the JWT token from localStorage and log the user out, then redirect to the home page
  logout() {
    localStorage.removeItem('id_token');  // Remove the stored token
    window.location.assign('/');  // Redirect to the home page
  }
}

// Export an instance of AuthService to be used throughout the app
export default new AuthService();
