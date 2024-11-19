import React from "react";

const NotificationModal = ({ message, onClose, type = "success" }) => {
  const titleColors = {
    success: "text-green-600",
    error: "text-red-600",
    info: "text-blue-600",
    warning: "text-yellow-600",
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md transform scale-90 animate-bounce-in w-2/6">
        <h3
          className={`text-lg font-semibold mb-4 ${
            titleColors[type] || "text-gray-600"
          }`}
        >
          {type === "success" && "¡Éxito!"}
          {type === "error" && "¡Error!"}
        </h3>
        <p className="text-gray-700 mb-4">{message}</p>
        <button
          onClick={onClose}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default NotificationModal;
