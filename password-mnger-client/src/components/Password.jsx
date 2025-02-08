import { useState } from 'react';
import SearchBar from "./SearchBar.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faCirclePlus, faSliders, faTrash, faPenToSquare, faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal.jsx';
import PasswordListText from './PasswordListText.jsx';

import ConfirmationModal from './ConfirmationModal.jsx';
import EditModal from './EditModal.jsx';

const Passwords = ({ addPassword, deletePassword, passwords, updatePassword }) => {
  const [visiblePasswordIds, setVisiblePasswordIds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [passwordToDelete, setPasswordToDelete] = useState(null);
  const [passwordToEdit, setPasswordToEdit] = useState(null);

  const toggleShowPassword = (id) => {
    setVisiblePasswordIds((prevIds) =>
      prevIds.includes(id) ? prevIds.filter((visibleId) => visibleId !== id) : [...prevIds, id]
    );
  };

  const getFirstLetter = (title) => {
    return title ? title.charAt(0).toUpperCase() : '';
  };

  const handleDeleteClick = (password) => {
    setPasswordToDelete(password);
  };

  const confirmDelete = () => {
    if (passwordToDelete) {
      deletePassword(passwordToDelete.id);
      setPasswordToDelete(null);
    }
  };

  const handleEditClick = (password) => {
    setPasswordToEdit(password);
    setIsEditModalOpen(true);
  };

  return (
    
    <div className="bg-gray-400 p-5 m-10 min-h-full rounded-2xl shadow-xl">

      {/* <PasswordListText  /> */}

      {/* Header Part */}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-bold text-white">Passwords ({passwords.length})</h1>
        {/* Search Bar */}
        <SearchBar />
        <div className='flex gap-2'>

          {/* Edit Button
          <button className={`px-4 py-2 text-white rounded-xl font-bold shadow-md transition duration-300 
                ${editMode ? 'bg-rose-700' : 'bg-rose-500'} 
                 hover:outline hover:outline-1 hover:duration-300 hover:transition-all active:transform active:scale-90`}
                onClick={() => setEditMode(!editMode)}>
            <FontAwesomeIcon icon={faSliders} size='lg' className='text-white'/>
          </button> */}

          {/* Generate Password Button
          <button className="px-4 py-2 bg-blue-500 text-white rounded-xl font-bold shadow-md hover:bg-blue-600 transition duration-300"
            onClick={() => setIsModalOpen(true)}>
              <FontAwesomeIcon icon={faArrowsRotate} size='lg' className='mr-2'/> Generate
          </button> */}

          {/* Add Button */}
          <button className="px-4 py-2 bg-blue-500 text-white rounded-xl font-bold shadow-md hover:bg-blue-600 transition duration-300"
            onClick={() => setIsModalOpen(true)}>
              <FontAwesomeIcon icon={faCirclePlus} size='lg' className='mr-2'/> Add
          </button>
        </div>
      </div>
      {/* Grid Part */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-black ">
        {passwords.length === 0 ? (
          <p className="text-black text-center col-span-full p-10 font-bold">No passwords saved. Add new passwords.</p>
        ) : (
          passwords.map((password) => (
            <div key={password.id} className={`bg-white flex p-4 rounded-xl gap-4 border-2 border-blue-500  hover:border-black transition duration-300 relative`}>

              <div className="absolute top-2 right-3 flex gap-2 ">   
                <button className="text-blue-500 hover:text-rose-700 active:scale-90 transition-all duration-200" 
                  onClick={() => handleEditClick(password)}>
                  <FontAwesomeIcon icon={faPenToSquare} size='lg'/>
                </button>
                <button className="text-blue-500 hover:text-rose-700 active:scale-90 transition-all duration-200" 
                  onClick={() => handleDeleteClick(password)}>
                  <FontAwesomeIcon icon={faTrash} size='lg'/>
                </button>
              </div>
              <div className="flex items-center ">
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
          ))
        )}
      </div>
      {isModalOpen && (
        <Modal 
          setIsModalOpen={setIsModalOpen} 
          addPassword={addPassword} 
          updatePassword={updatePassword} 
          passwordToEdit={passwordToEdit} 
        />
      )}

      {passwordToEdit && (
        <EditModal 
          setIsEditModalOpen={(state) => {
            setIsEditModalOpen(state);
            if (!state) setPasswordToEdit(null); // Reset after closing
          }} 
          updatePassword={updatePassword} 
          passwordToEdit={passwordToEdit} 
        />
      )}


      {passwordToDelete && (
        <ConfirmationModal
          message="Are you sure you want to delete this password?"
          passwordToDelete={passwordToDelete}
          onConfirm={confirmDelete}
          onCancel={() => setPasswordToDelete(null)}
        />
      )}
    </div>
  );
}

export default Passwords;