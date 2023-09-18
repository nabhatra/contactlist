// import axiosInstance from './mockApi';

// const handleLogin = async (email: string, password: string) => {
//   try {
//     const response = await axiosInstance.post('/Auth', {
//       username: email,
//       password: password,
//     });

//     if (response.status === 200) {
//       console.log(response.data.message); // 'Login successful'
//       // Perform actions like storing tokens, setting user state, or redirecting the user
//     } else {
//       console.error(response.data.message); // 'Login failed. Invalid credentials'
//       // Display an error message to the user
//     }
//   } catch (error) {
//     console.error('An error occurred while logging in:', error);
//     // Display an error message to the user
//   }
// };

// // Usage
// handleLogin('admin', 'password123');

import axiosInstance from "./mockApi";

const handleLogin = async (email: string, password: string): Promise<void> => {
  try {
    const response = await axiosInstance.post("/Auth", {
      username: email,
      password: password,
    });

    if (response.status === 200) {
      console.log(response.data.message); // Display a success message
      // Perform actions like storing tokens, setting user state, or redirecting the user
    } else {
      console.error(response.data.message); // Display an error message from the server
      // Display an error message to the user
    }
  } catch (error) {
    console.error("An error occurred while logging in:", error);
    // Display an error message to the user
  }
};

// Example usage with user input (replace with your actual input retrieval logic)
// const email: string = document.getElementById("email").value;
// const password: string = document.getElementById("password").value;


// handleLogin(emailInput, passwordInput);
handleLogin("admin", "password123");
