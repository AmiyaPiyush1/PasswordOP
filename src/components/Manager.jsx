import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';



const Manager = () => {
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    alert("Show Your Password");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const savePassword = async () => {
    if (!form.site || !form.username || !form.password) {
      alert("Please fill in all fields.");
    } else {
      const newPassword = { ...form, id: uuidv4() };
      const updatedPasswords = [...passwordArray, newPassword];
      setPasswordArray(updatedPasswords);
      localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
      setForm({ site: "", username: "", password: "" });

      
    }
  };

  const editPassword = (id) => {
    if (window.confirm("Are you sure you want to edit this credentials?")) {
      setForm(passwordArray.filter(i => i.id === id)[0]);
      setPasswordArray(passwordArray.filter(item => item.id !== id));
    }
  };

  const deletePassword = (id) => {
    if (window.confirm("Are you sure you want to delete this password?")) {
      const updatedPasswords = passwordArray.filter(item => item.id !== id);
      setPasswordArray(updatedPasswords);
      localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
      alert("Password Deleted Successfully");
    }
  };
  return (
    
      <div>
        
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
        </div>
        <div className='md:myContainer md:px-0 text-center p-4'>
          <h1>
            <span className="font-bold text-green-700 text-4xl">&lt;</span>
            <span className="font-bold text-4xl">Pass</span>
            <span className="font-bold text-green-700 text-4xl">/OP&gt;</span>
          </h1>
        </div>
        <div className="paragraph text-green-700 text-sm text-center">Your Own Password Manager</div>
        <div className="container mx-auto md:w-1/2 gap-3">
          <div className="main flex flex-col p-4 mx-auto max-w-3xl rounded-full">
            <input onChange={handleChange} name='site' value={form.site} placeholder='Enter URL' type='text' className='rounded-full border border-green-300 w-full p-4 py-1'></input>
          </div>
          <div className="other flex justify-center space-x-4">
            <input name='username' value={form.username} placeholder='Enter Username' type='text' className='rounded-full border border-green-300 w-1/4 p-4 py-1' onChange={handleChange}></input>
            <div className="relative">
              <input name='password' onChange={handleChange} value={form.password} placeholder='Enter Password' type='text' className='rounded-full border border-green-300 w-full p-4 py-1'></input>
              <span className="absolute right-1" onClick={showPassword}>
                <lord-icon src="https://cdn.lordicon.com/vfczflna.json" trigger="hover"></lord-icon>
              </span>
            </div>
          </div>
        </div>
        <div className="button flex justify-center mt-4">
          <lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover"></lord-icon>
          <button onClick={savePassword} className="ml-2 bg-green-700 rounded-full px-4 py-2 hover:bg-green-500 text-white">Add Password</button>
        </div>
        <div className="flex justify-center items-center p-10">
          <div className="overflow-x-auto w-full">
            <h2 className="text-center mb-4 text-lg font-semibold">Your Passwords</h2>
            {passwordArray.length === 0 ? (
              <div className="text-center text-gray-500">No passwords to show</div>
            ) : (
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                  <tr className='bg-green-700'>
                    <th scope="col" className="px-6 py-3 rounded-l-lg text-white">
                      Site
                    </th>
                    <th scope="col" className="px-6 py-3 text-white">
                      Username
                    </th>
                    <th scope="col" className="px-6 py-3 text-white">
                      Password
                    </th>
                    <th scope="col" className='px-6 py-3 rounded-r-lg text-white'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {passwordArray.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {item.site ? (
                          <a href={item.site}>{item.site}</a>
                        ) : (
                          <span>Nothing to Save</span>
                        )}
                        <span className='size-7 cursor-pointer' onClick={() => copyText(item.site)}>
                          <lord-icon style={{"width":"20px","height":"20px","padding":"6px"}} className="ml-[40px]"
                            src="https://cdn.lordicon.com/uecgmesg.json"
                            trigger="hover"
                          ></lord-icon>
                        </span>
                      </td>
                      <td className="px-6 py-4">{item.username}</td>
                      <td className="px-6 py-4">{item.password}</td>
                      <td className="px-6 py-4">
                        <span onClick={() => { editPassword(item.id) }}>
                          <lord-icon
                            style={{"width":"25px","height":"25px"}}
                            src="https://cdn.lordicon.com/wuvorxbv.json"
                            trigger="hover"
                          ></lord-icon>
                        </span>
                        <span onClick={() => { deletePassword(item.id) }}>
                          <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            style={{"width":"25px","height":"25px"}}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
  );
}
export default Manager