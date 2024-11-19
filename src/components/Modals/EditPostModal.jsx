'use client'
import React, { useState, useEffect } from 'react';

const EditPostModal = ({ post, onUpdate, onClose }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);

  // Set initial values when post is selected
  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
    }
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !body) return;

    setLoading(true);

    try {
      await onUpdate(post.id, { title, body });
      setTitle('');
      setBody('');
      onClose();
    } catch (err) {
      alert('Error al actualizar el post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Editar Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Título
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Ingrese el título"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="body" className="block text-sm font-medium text-gray-700">
              Descripción
            </label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Ingrese la descripción"
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? 'Cargando...' : 'Actualizar Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPostModal;
