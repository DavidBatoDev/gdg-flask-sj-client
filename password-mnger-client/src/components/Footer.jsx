import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full fixed bottom-0 bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Password Manager. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;