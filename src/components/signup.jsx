import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ Email: "", username: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const savePassword = async () => {
    if (!form.Email || !form.username || !form.password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/signup', {
        Email: form.Email,
        username: form.username,
        password: form.password
      });

      console.log('User saved successfully:', response.data);
      navigate("/");
    } catch (error) {
      if (error.response) {
        alert(`Error: ${error.response.data.error}`);
      } else {
        alert(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="container mx-auto max-w-md py-8">
      <div><div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div></div>
      <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>
      <form>
        <input
          onChange={handleChange}
          name='Email'
          value={form.Email}
          type="text"
          placeholder="Email"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
        />
        <input
          onChange={handleChange}
          name="username"
          value={form.username}
          type="text"
          placeholder="Username"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
        />
        <input
          onChange={handleChange}
          name='password'
          value={form.password}
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
        />
        <button
          onClick={(e) => {
            e.preventDefault();  // Prevent default button behavior
            savePassword();
          }}
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
