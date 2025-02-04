import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faLock, faPlus, faRotate } from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal.jsx';

const GeneratePassword = ({ addPassword }) => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const generatePassword = () => {
    let chars = 'abcdefghijklmnopqrstuvwxyz';
    if (includeUppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) chars += '0123456789';
    if (includeSpecialChars) chars += '!@#$%^&*()_+';

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(newPassword);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(() => {
      alert('Password copied to clipboard!');
    });
  };

  return (
    <div className="flex flex-col items-center space-y-6 mt-10 mb-20 p-5 ">

      <div className="flex justify-between w-full sm:w-96 h-16 py-5 pl-3 bg-gray-100 border-b-4 border-blue-500 rounded-t-xl text-start shadow-inner relative overflow-hidden">
        <div className="flex items-center ">
          <p className="font-semibold text-xl ">{password}</p>
        </div>
        
        <div className="flex items-center gap-3 absolute px-2 bg-gray-100 right-0 z-10">
        <div className="absolute inset-y-0 -left-5 w-5 bg-gradient-to-r from-transparent to-gray-100  pointer-events-none"></div>
          <FontAwesomeIcon icon={faPlus} size='xl' className="cursor-pointer hover:text-blue-500 transition duration-300" onClick={() => setIsModalOpen(true)} />
          <FontAwesomeIcon icon={faCopy} size='xl' className="cursor-pointer hover:text-blue-500 transition duration-300" onClick={copyToClipboard} />
          <FontAwesomeIcon icon={faRotate} size='xl' className='cursor-pointer hover:text-blue-500 transition duration-300' onClick={generatePassword}  />
        </div>
      </div>

      <div className="p-6 bg-white shadow-md rounded-xl w-full sm:w-96 border backdrop-filter backdrop-blur-xl bg-opacity-10">
        <h2 className="text-3xl font-semibold text-center mb-4">Generate Password</h2>
        
        <div className="space-y-3">
          <div className="flex flex-col items-start">
            <label>Length: {length}</label>
            <input 
              type="range" 
              value={length} 
              onChange={(e) => setLength(e.target.value)} 
              className="slider w-full" 
              min="8" 
              max="50" 
            />

          </div>
          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              checked={includeUppercase} 
              onChange={(e) => setIncludeUppercase(e.target.checked)} 
              className="form-checkbox"
            />
            <label>Include Uppercase Letters</label>
          </div>
          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              checked={includeNumbers} 
              onChange={(e) => setIncludeNumbers(e.target.checked)} 
              className="form-checkbox"
            />
            <label>Include Numbers</label>
          </div>
          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              checked={includeSpecialChars} 
              onChange={(e) => setIncludeSpecialChars(e.target.checked)} 
              className="form-checkbox"
            />
            <label>Include Special Characters</label>
          </div>

        </div>
      </div>


      
      
      {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} addPassword={addPassword} genPassword={password} />}
    </div>
  );
};

export default GeneratePassword;
