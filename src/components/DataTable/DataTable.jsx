"use client";
import React, { useState } from "react";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";

const DataTable = ({
  data,
  columns,
  initialItemsPerPage = 5,
  onDelete,
  onEdit,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getPageNumbers = () => {
    const pages = [];
    const visiblePages = 5;
    const start = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    const end = Math.min(totalPages, start + visiblePages - 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div>
      <table className="min-w-full border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b"
              >
                {col.label}
              </th>
            ))}
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">
              Acción
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row) => (
            <tr key={row.id} className="h-20 hover:bg-gray-50">
              {columns.map((col) => (
                <td
                  key={`${row.id}-${col.accessor}`}
                  className="px-4 py-2 text-sm text-gray-800 border-b"
                >
                  {row[col.accessor]}
                </td>
              ))}
              <td className="px-4 py-2 text-sm text-gray-800 border-b">
                <div className="flex items-center">
                  <button
                    onClick={() => onEdit(row.id)}
                    aria-label={`Edit ${row.title}`}
                    className="text-white bg-blue-500 hover:bg-blue-600 hover:-translate-y-1 hover:shadow-lg transition-transform duration-300 mr-2 px-2 py-1 rounded"
                  >
                    <AiOutlineEdit size={20} />
                  </button>
                  <button
                    onClick={() => onDelete(row.id)}
                    aria-label={`Delete ${row.title}`}
                    className="text-white bg-red-500 hover:bg-red-600 hover:-translate-y-1 hover:shadow-lg transition-transform duration-300 px-2 py-1 rounded"
                  >
                    <AiOutlineDelete size={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <div>
          <label htmlFor="itemsPerPage" className="mr-2 text-sm text-gray-600">
            Items por página:
          </label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            aria-label="Items per page"
            onChange={handleItemsPerPageChange}
            className="px-2 py-1 border border-gray-300 rounded text-sm"
          >
            {[5, 10, 15, 20].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            aria-label="Previous Page"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="text-gray-600 hover:text-gray-800 disabled:opacity-50"
          >
            <AiOutlineLeft size={20} />
          </button>

          {getPageNumbers().map((num) => (
            <button
              key={num}
              onClick={() => handlePageChange(num)}
              className={`px-2 py-1 text-sm rounded ${
                num === currentPage
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              {num}
            </button>
          ))}

          <button
            aria-label="Next Page"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="text-gray-600 hover:text-gray-800 disabled:opacity-50"
          >
            <AiOutlineRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
