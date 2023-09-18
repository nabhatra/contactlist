
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const axiosInstance = axios.create();
const mock = new MockAdapter(axiosInstance);

// Mock the login endpoint
mock.onPost('/login').reply(200, { message: 'Login successful' });

export default axiosInstance;
