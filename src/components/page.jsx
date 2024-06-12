import React from 'react';
import { useNavigate } from 'react-router-dom';

const Log = () => {
    const navigate = useNavigate();

    const handleSignUp = () => {
        navigate('/signup');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <>
            <div className="absolute inset-0 z-0" style={{ backgroundImage: 'url(https://img.freepik.com/premium-vector/illustrated-stealing-data-concept_23-2148536251.jpg?w=996)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>
            <nav className='flex justify-between items-center fixed top-0 left-0 right-0 z-10 px-4 bg-transparent'>
                <div className="flex items-center">
                    <span className="font-bold text-green-200 text-lg mt-5">&lt;</span>
                    <span className="font-bold text-lg text-white mt-5">Pass</span>
                    <span className="font-bold text-green-200 text-lg mt-5">/OP&gt;</span>
                </div>
                <ul className="flex gap-4">
                    <li>
                        <button className='bg-green-400 text-white hover:font-bold text-sm rounded-full px-3 py-2 border-white border-2 mt-5' onClick={handleSignUp}>SignUp</button>
                    </li>
                    <li>
                        <button className='hover:font-bold text-sm rounded-full px-3 py-2 border-white border-2 text-white mt-5' onClick={handleLogin}>LogIn</button>
                    </li>
                </ul>
            </nav>

            <div className="text-green-500 text-white text-4xl flex justify-center mt-20 h-screen mb-0 relative z-10 font-mono">YOUR OWN PASSWORD MANAGER IS HERE</div>
        </>
    );
}

export default Log;
