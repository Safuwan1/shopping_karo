import React from 'react';
import logo from '../Assests/logo.png'; // Adjust the path according to your project structure

export default function Footer() {
  return (
    <footer className=" bg-gray-800 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between mb-8">
          {/* Logo and Company Info */}
          <div className="mb-6 md:mb-0 flex flex-col items-center md:items-start">
            <img src={logo} alt="Company Logo" className="w-32 h-auto mb-2" /> {/* Logo Image */}
          </div>
          {/* Links */}
          <div className="flex flex-col md:flex-row md:space-x-12">
            <div className="mb-6 md:mb-0 flex flex-col items-center md:items-start">
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-400 transition">Home</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">About</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Services</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Contact</a></li>
              </ul>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-blue-400 transition">Facebook</a>
                <a href="#" className="hover:text-blue-400 transition">Twitter</a>
                <a href="#" className="hover:text-blue-400 transition">Instagram</a>
                <a href="#" className="hover:text-blue-400 transition">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} YourCompany. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

