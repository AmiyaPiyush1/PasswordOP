import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ Email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const login = async () => {
    try {
      if (!form.Email || !form.password) {
        alert("Please fill in all fields.");
        return;
      }

      const response = await axios.post('http://localhost:3000/login', form);

      if (response.status === 200) {
        const { email } = response.data.user;
        navigate('/PassOP');
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error('Error during login:', error);

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
        alert("Login failed. Please check your credentials.");
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Request data:', error.request);
        alert("No response received from the server. Please try again later.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
        alert("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="container mx-auto max-w-md py-8">
      <div><div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div></div>
      <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
      <form>
        <input
          name='Email'
          value={form.Email}
          onChange={handleChange}
          type="text"
          placeholder="Email"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
          name='password'
          value={form.password}
          onChange={handleChange}
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            login();
          }}
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
