import React from 'react';
import { Link } from 'react-router-dom'
import Dropdown from '../../components/utilities/dropdown';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">YourStore</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#" className="text-gray-600 hover:text-gray-800">Home</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">Products</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">About</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">Contact</a></li>
              <Dropdown />
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-600 text-white">
        <div className="container mx-auto px-4 py-32 flex flex-col items-center">
          <h2 className="text-4xl font-bold mb-4">Welcome to YourStore</h2>
          <p className="text-xl mb-8">Discover amazing products at great prices!</p>
          <a href="#" className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-100 transition duration-300">Shop Now</a>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-2xl font-bold mb-8">Featured Products</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Repeat this product card structure for each featured product */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="https://via.placeholder.com/300x200" alt="Product" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h4 className="font-semibold mb-2">Product Name</h4>
              <p className="text-gray-600 mb-2">$19.99</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300">Add to Cart</button>
            </div>
          </div>
          {/* Repeat product card 3 more times */}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h5 className="font-semibold mb-4">About Us</h5>
              <p>YourStore is your one-stop shop for all your needs. We offer high-quality products at competitive prices.</p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Quick Links</h5>
              <ul>
                <li><a href="#" className="hover:text-gray-300">FAQs</a></li>
                <li><a href="#" className="hover:text-gray-300">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-gray-300">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Contact Us</h5>
              <p>Email: info@yourstore.com</p>
              <p>Phone: (123) 456-7890</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;