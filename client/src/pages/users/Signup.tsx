import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../redux/authSlice';
import { AppDispatch, RootState } from '../../redux/store';
import '../../styles/signup.css';
import { useNavigate } from 'react-router-dom';

const SignInPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate()
  
  const dispatch =useDispatch<AppDispatch>();
  const { user, token, isLoading, error } = useSelector((state: RootState) => state.auth);
  const handleSubmit = async (e: React.FormEvent) => {
    console.log('submited');
    
     e.preventDefault();
    const signinAction = await dispatch(signup({ email, password, name }));
     navigate('/')
   
  }
    
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-4xl w-full">
        <div className="flex flex-col md:flex-row">
          {/* Left side - Orange section */}
          <div className="bg-gradient-to-b from-orange-400 to-orange-500 text-white p-12 md:w-1/2">
            <h1 className="text-4xl font-bold mb-6">Securely Access Your E-Commerce Account</h1>
            <p className="mb-8">Sign in to manage your orders, track your sales, and keep your store running smoothly. Your secure login ensures easy access to all your essential business tools.</p>
            <img src="/path-to-people-image.png" alt="People using dashboard" className="mt-4" />
          </div>

          {/* Right side - Login form */}
          <div className="p-12 md:w-1/2">
            <div className="flex items-center mb-8">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold mr-4">E</div>
              <h2 className="text-2xl font-semibold">E-Store</h2>
            </div>
            <h3 className="text-2xl font-bold mb-6">Welcome to E-Store</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <input type="text" onChange={(e) => setName(e.target.value)} placeholder="Username" className="w-full px-4 py-3 rounded-lg bg-gray-100 border-gray-300 focus:border-orange-500 focus:bg-white focus:outline-none" />
              </div>
              <div className="mb-6">
                <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email address" className="w-full px-4 py-3 rounded-lg bg-gray-100 border-gray-300 focus:border-orange-500 focus:bg-white focus:outline-none" />
              </div>
              <div className="mb-6">
                <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full px-4 py-3 rounded-lg bg-gray-100 border-gray-300 focus:border-orange-500 focus:bg-white focus:outline-none" />
              </div>
              <button type="submit" className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 focus:outline-none">SignIn</button>
            </form>
            <div className="mt-4 text-center">
              <a href="#" className="text-sm text-orange-500 hover:underline">Forgot Password?</a>
            </div>
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <img className="h-5 w-5 mr-2" src="/path-to-google-icon.png" alt="Google" />
                  Google
                </button>
                <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <img className="h-5 w-5 mr-2" src="/path-to-facebook-icon.png" alt="Facebook" />
                  Facebook
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;