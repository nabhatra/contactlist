import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Create an instance of Axios Mock Adapter
const mock = new MockAdapter(axios);

// Mock the login endpoint
mock.onPost('/login').reply((config) => {
  const { username, password } = JSON.parse(config.data as string);

  // Check if the provided credentials are correct
  if (username === 'admin' && password === 'password123') {
    return [200, { message: 'Login successful' }];
  } else {
    return [401, { message: 'Login failed. Invalid credentials' }];
  }
});

// Your application code can go here as well if desired
// Define functions, components, etc., and use the mock API as needed.
