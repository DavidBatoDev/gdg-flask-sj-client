import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faLock, faPlus } from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal.jsx';

const GeneratePassword = ({ addPassword }) => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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
    <div className="relative">
      <button 
        onClick={() => setIsDrawerOpen(!isDrawerOpen)} 
        className="px-4 py-2 bg-blue-500 flex text-white rounded-md absolute top-3 right-2 z-10"
      >
        <FontAwesomeIcon icon={faLock} />
      </button>
      {isDrawerOpen && (
        <div className='p-4 bg-white shadow-md rounded-md flex flex-col top-0 right-0 z-10'>
          <h2 className="text-xl font-bold mb-4">Generate Password</h2>
          <div className="mb-4">
            <label className="block mb-2">Length:</label>
            <input 
              type="number" 
              value={length} 
              onChange={(e) => setLength(e.target.value)} 
              className="px-2 py-1 border rounded-md"
              min="1"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">
              <input 
                type="checkbox" 
                checked={includeUppercase} 
                onChange={(e) => setIncludeUppercase(e.target.checked)} 
                className="mr-2"
              />
              Include Uppercase Letters
            </label>
          </div>
          <div className="mb-4">
            <label className="block mb-2">
              <input 
                type="checkbox" 
                checked={includeNumbers} 
                onChange={(e) => setIncludeNumbers(e.target.checked)} 
                className="mr-2"
              />
              Include Numbers
            </label>
          </div>
          <div className="mb-4">
            <label className="block mb-2">
              <input 
                type="checkbox" 
                checked={includeSpecialChars} 
                onChange={(e) => setIncludeSpecialChars(e.target.checked)} 
                className="mr-2"
              />
              Include Special Characters
            </label>
          </div>
          <button 
            onClick={generatePassword} 
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Generate
          </button>
          {password && (
            <div className="mt-4 p-2 bg-gray-200 rounded-md relative">
              <p className="font-mono">{password}</p>
              <div className='absolute top-1 right-0 flex gap-2 p-2'>
                <FontAwesomeIcon icon={faPlus} className='cursor-pointer' onClick={() => {setIsModalOpen(true);}}/>
                <FontAwesomeIcon icon={faCopy} className='cursor-pointer' onClick={copyToClipboard}/>
              </div>
            </div>
          )}
        </div>
      )}
      {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} addPassword={addPassword} genPassword={password} />}
    </div>
  );
};

export default GeneratePassword;