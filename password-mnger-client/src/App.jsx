import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './components/Welcome.jsx';
import Passwords from './components/Password.jsx';
import PasswordListText from './components/PasswordListText.jsx';
import Footer from './components/Footer.jsx';

const App = () => {
  const [passwords, setPasswords] = useState([]);
  const BASE_URL = '';

  // Fetch passwords from Flask backend using async/await
  useEffect(() => {
    const fetchPasswords = async () => {
      try {
        const response = await fetch(BASE_URL + '/passwords');
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        setPasswords(data);
      } catch (error) {
        console.error('Error fetching passwords:', error);
      }
    };

    fetchPasswords();
  }, []);

  // Add a new password using async/await
  const addPassword = async (newPassword) => {
    try {
      const response = await fetch(BASE_URL + '/passwords', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPassword)
      });

      if (!response.ok) throw new Error('Error adding password');

      // Fetch the updated list of passwords
      const updatedResponse = await fetch(BASE_URL + '/passwords');
      if (!updatedResponse.ok) throw new Error('Error fetching passwords');

      const data = await updatedResponse.json();
      setPasswords(data);
    } catch (error) {
      console.error('Error adding password:', error);
    }
  };

  // Delete a password using async/await
  const deletePassword = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/passwords/${id}`, { method: 'DELETE' });

      if (!response.ok) throw new Error('Error deleting password');

      // Update the local state by filtering out the deleted password
      setPasswords(prevPasswords => prevPasswords.filter(password => password.id !== id));
    } catch (error) {
      console.error('Error deleting password:', error);
    }
  };

  // Update a password using async/await
  const updatePassword = async (id, updatedPassword) => {
    try {
      const response = await fetch(`${BASE_URL}/passwords/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPassword)
      });

      if (!response.ok) throw new Error('Error updating password');

      // Update local state with the updated password information
      setPasswords(prevPasswords =>
        prevPasswords.map(password =>
          password.id === id ? { ...password, ...updatedPassword } : password
        )
      );
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };

  return (
    <Router>
      <div className="h-screen w-full bg-white">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/main" element={
            <>
              <PasswordListText />
              <Passwords 
                addPassword={addPassword} 
                deletePassword={deletePassword} 
                passwords={passwords} 
                updatePassword={updatePassword} 
              />
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
