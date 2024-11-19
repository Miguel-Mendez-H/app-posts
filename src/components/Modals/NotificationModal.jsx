import React from "react";

const NotificationModal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-green-600 mb-4">
          Notification
        </h3>
        <p className="text-gray-700 mb-4">{message}</p>
        <button
          onClick={onClose}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default NotificationModal;
