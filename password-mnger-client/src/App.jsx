import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar.jsx';
import Welcome from './components/Welcome.jsx';
import Passwords from './components/Password.jsx';
import GeneratePassword from './components/GeneratePassword.jsx';
import PasswordGeneratorText from './components/PasswordGeneratorText.jsx';
import PasswordListText from './components/PasswordListText.jsx';
import Footer from './components/Footer.jsx';

const App = () => {
  const [passwords, setPasswords] = useState([]);

  // Fetch passwords from Flask backend
  useEffect(() => {
    axios.get('http://127.0.0.1:5000/passwords')
      .then(response => setPasswords(response.data))
      .catch(error => console.error('Error fetching passwords:', error));
  }, []);

  // Add a new password
  const addPassword = (newPassword) => {
    axios.post('http://127.0.0.1:5000/passwords', newPassword)
      .then(() => {
        // Fetch the updated list of passwords
        return axios.get('http://127.0.0.1:5000/passwords');
      })
      .then(response => {
        setPasswords(response.data); // Update the state with the new list of passwords
      })
      .catch(error => console.error('Error adding password:', error));
  };

  // Delete a password
  const deletePassword = (id) => {
    axios.delete(`http://127.0.0.1:5000/passwords/${id}`)
      .then(() => {
        setPasswords(passwords.filter(password => password.id !== id));
      })
      .catch(error => console.error('Error deleting password:', error));
  };

  // Update a password
  const updatePassword = (id, updatedPassword) => {
    axios.put(`http://127.0.0.1:5000/passwords/${id}`, updatedPassword)
      .then(() => {
        setPasswords(
          passwords.map(password => 
            password.id === id ? { ...password, ...updatedPassword } : password
          )
        );
      })
      .catch(error => console.error('Error updating password:', error));
  };


  return (
    <div className="h-full w-full bg-white">

      <Welcome/>
      <PasswordGeneratorText/>
      <GeneratePassword addPassword={addPassword} password={passwords} />
      <PasswordListText/>
      <Passwords 
        addPassword={addPassword} 
        deletePassword={deletePassword} 
        passwords={passwords} 
        updatePassword={updatePassword} 
      />
      <Footer/>

    </div>
  );
}

export default App;