import { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Welcome from './components/Welcome.jsx';
import Passwords from './components/Password.jsx';
import GeneratePassword from './components/GeneratePassword.jsx';

const App = () => {
  const [passwords, setPasswords] = useState([
    { id: 1, title: 'Email', username: 'user@example.com', password: 'password123' },
    { id: 2, title: 'Bank', username: 'user@bank.com', password: 'securepassword' },
    { id: 3, title: 'Social Media', username: 'user@social.com', password: 'mypassword' },
    { id: 4, title: 'Work', username: 'user@user.com', password: 'workpassword' },
    { id: 5, title: 'Shopping', username: 'user@shop.com', password: 'shoppingpassword' },
    { id: 6, title: 'Gaming', username: 'user@gaming.com', password: 'gamingpassword' },
    { id: 7, title: 'Streaming', username: 'user@stream.com', password: 'streampassword' },
    { id: 8, title: 'Travel', username: 'user@travel.com', password: 'travelpassword' },
    { id: 9, title: 'Utilities', username: 'user@utilities.com', password: 'utilitiespassword' },
    { id: 10, title: 'Education', username: 'user@edu.com', password: 'educationpassword' },
  ]);

  const addPassword = (newPassword) => {
    setPasswords([...passwords, { id: passwords.length + 1, ...newPassword }]);
  };

  return (
    <div className="h-full w-full bg-gray-100">
      <div className='flex'>
        <Welcome/>
        <GeneratePassword addPassword={addPassword} password={passwords} />
      </div>
      <Passwords addPassword={addPassword} passwords={passwords} />
    </div>
  );
}

export default App;