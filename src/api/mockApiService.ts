import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const axiosInstance = axios.create();
const mock = new MockAdapter(axiosInstance);

// Mock the login endpoint
mock.onPost('/login').reply(200, { message: 'Login successful' });

// Mock the register endpoint
mock.onPost('/register').reply(200, { message: 'Registration successful' });

export default axiosInstance;
