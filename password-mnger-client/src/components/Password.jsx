import { useState } from 'react';
import SearchBar from "./SearchBar.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal.jsx';
import AddButton from './AddButton.jsx';

const Passwords = ({ addPassword, passwords }) => {
  const [visiblePasswordIds, setVisiblePasswordIds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleShowPassword = (id) => {
    setVisiblePasswordIds((prevIds) =>
      prevIds.includes(id) ? prevIds.filter((visibleId) => visibleId !== id) : [...prevIds, id]
    );
  };

  const getFirstLetter = (title) => {
    return title.charAt(0).toUpperCase();
  };

  return (
    <div className="bg-gray-500 p-5 m-10 rounded-2xl">
      {/* Header Part */}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-bold text-white">Passwords ({passwords.length})</h1>
        {/* Search Bar */}

          <SearchBar />

        {/* Add Button */}
        <div className="h-full w-[125px] flex items-center justify-end rounded-lg">
          <AddButton setIsModalOpen={setIsModalOpen} /> 
        </div>
      </div>
      {/* Grid Part */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-black">
        {passwords.map((password) => (
          <div key={password.id} className="bg-white flex p-4 rounded-xl gap-4">
            <div className="flex items-center">
              <div className="w-20 h-20 bg-blue-500 flex items-center justify-center rounded-lg text-white">
                <span className="text-3xl font-bold">{getFirstLetter(password.title)}</span>
              </div>
            </div>
              <div className="flex flex-col w-full py-2">
                <h2 className="text-xl font-bold">{password.title}</h2>
                <p>{password.username}</p>
                <div className="flex items-center justify-between">
                  <p className='font-semibold'>{visiblePasswordIds.includes(password.id) ? password.password : '••••••••'}</p>
                  <button onClick={() => toggleShowPassword(password.id)} className="text-blue-500 flex items-center justify-center">
                    {visiblePasswordIds.includes(password.id) ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                  </button>
                </div>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} addPassword={addPassword} />}
    </div>
  );
}

export default Passwords;