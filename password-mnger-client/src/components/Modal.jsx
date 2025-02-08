import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faArrowsRotate } from '@fortawesome/free-solid-svg-icons';

const Modal = ({ setIsModalOpen, addPassword }) => {
  const [title, setTitle] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(true);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    addPassword({ title, username, password });
    setIsModalOpen(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add New Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" 
            placeholder="Title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="w-full p-2 border border-gray-300 rounded-lg" 
            required 
          />
          <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            className="w-full p-2 border border-gray-300 rounded-lg" 
            required 
          />

          <div className='flex gap-2 w-full justify-between'>
            <div className="relative w-full">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full p-2 border border-gray-300 rounded-lg" 
                required 
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)} 
                className="absolute inset-y-1 right-1 px-2 bg-white z-10 flex items-center text-gray-500"
              >
                {showPassword ?  <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye}/>}
              </button>
            </div>
            <button 
              type="button"
              className="px-4 py-2 bg-blue-500 w-60 text-white rounded-xl font-bold shadow-md hover:bg-blue-600 transition duration-300"
              onClick={generatePassword}
            >
              <FontAwesomeIcon icon={faArrowsRotate} size='lg' className='mr-2'/> Generate
            </button>
          </div>

          <div className="space-y-3 border border-[#D1D5DB] p-3 rounded-lg">
            <div className="flex flex-col items-start">
              <label>Length: {length}</label>
              <input 
                type="range" 
                value={length} 
                onChange={(e) => setLength(Number(e.target.value))} 
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
                className="form-checkbox cursor-pointer"
              />
              <label>Include Uppercase Letters</label>
            </div>
            <div className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                checked={includeNumbers} 
                onChange={(e) => setIncludeNumbers(e.target.checked)} 
                className="form-checkbox cursor-pointer"
              />
              <label>Include Numbers</label>
            </div>
            <div className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                checked={includeSpecialChars} 
                onChange={(e) => setIncludeSpecialChars(e.target.checked)} 
                className="form-checkbox cursor-pointer"
              />
              <label>Include Special Characters</label>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button 
              type="button" 
              onClick={() => setIsModalOpen(false)} 
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 active:bg-gray-700">
              Cancel
            </button>
            <button 
              type="submit" 
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 active:bg-blue-700">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
