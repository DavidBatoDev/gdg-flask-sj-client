import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
const ConfirmationModal = ({ message, passwordToDelete, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        
      <div className="bg-white p-6 rounded-lg shadow-lg text-center flex flex-col justify-center items-center">
        <div className=" w-16 h-16 p-2 rounded-full bg-red-100 flex items-center justify-center">
            <FontAwesomeIcon icon={faTriangleExclamation} size="2xl" className="text-red-600 -mt-1"/>
        </div>
        <p className="font-bold text-2xl my-5">Delete {passwordToDelete?.title} Password?</p>
        <p className="mb-4">{message}</p>
        <div className="flex w-full justify-center gap-4">

            <button
                className="px-4 py-2 w-full font-semibold bg-gray-300 text-black rounded-xl hover:bg-gray-400 transition duration-300"
                onClick={onCancel}
            >
                No, Keep It.
            </button>

            <button
                className="px-4 py-2 w-full font-semibold bg-red-500  text-white rounded-xl hover:bg-red-600 transition duration-300"
                onClick={onConfirm}
            >
                Yes, Delete it.
            </button>

        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
