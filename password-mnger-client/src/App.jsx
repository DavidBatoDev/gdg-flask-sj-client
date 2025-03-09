import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './components/Welcome.jsx';
import Passwords from './components/Password.jsx';
import PasswordListText from './components/PasswordListText.jsx';
import Footer from './components/Footer.jsx';

const App = () => {
  const [passwords, setPasswords] = useState([]);
  const BASE_URL = 'http://127.0.0.1:5000';

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
