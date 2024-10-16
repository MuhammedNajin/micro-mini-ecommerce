import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { createAxios } from '../../api/createAxios';
import { USER_URL } from '../../api/urls/url';
import { Axios } from 'axios';
import { RootState } from '@reduxjs/toolkit/query';

const ProfilePage = () => {
     
interface User {
    id: string,
    name: string,
    email: string,
    address: string,
    isBlocked: boolean,
    image:string
}
   const axios: Axios = createAxios(USER_URL) as Axios
 const { user } = useSelector((state: RootState) => state.auth);
 const [ state, setUser ] = useState<User>({
    id: "12345abcde",
    name: "John Doe",
    email: "john.doe@example.com",
    address: "123 Main Street, Springfield, USA",
    isBlocked: false,
    image: "https://example.com/path/to/image.jpg"
  });
 console.log('user', user );

    useEffect(() => {
         async function fetch() {
            const response = await axios.get('/profile', {
                params: {
                    id: user.id
                }
            });

            console.log('data', response.data);
            if(response.status === 200) {
                setUser(response.data.user);
            }
         }

         fetch()
    },[]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* User Info Section */}
          <div className="md:col-span-1">
            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="flex flex-col items-center">
                <img 
                  src={state?.image} 
                  alt="Profile" 
                  className="w-32 h-32 rounded-full mb-4"
                />
                <input 
                    id="profileImageInput"
                    type="file"
                    accept="image/*"
                    
                    // onChange={handleImageChange}
                  />
                <h2 className="text-xl font-semibold">{state.name}</h2>
                <p className="text-gray-600">{state?.email}</p>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Account Details</h3>
                <p className="text-gray-600">Member since: Jan 1, 2023</p>
                <p className="text-gray-600">Orders: 15</p>
                
              </div>
            </div>
          </div>

          {/* Main Content Section */}
          <div className="md:col-span-2">
            {/* Order History */}
           

            {/* Account Settings */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Account Settings</h3>
              <form>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full p-2 border rounded-md"
                    defaultValue="John Doe"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full p-2 border rounded-md"
                    defaultValue="john.doe@example.com"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">New Password</label>
                  <input 
                    type="password" 
                    id="password" 
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <button 
                  type="submit" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Update Profile
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;