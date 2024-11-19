"use client";
import React, { useEffect, useState } from "react";
import { get, remove, post, put } from "../api/api";
import DataTable from "@/components/DataTable/DataTable";
import NotificationModal from "@/components/Modals/NotificationModal";
import CreatePostModal from "@/components/Modals/CreatePostModal";
import EditPostModal from "@/components/Modals/EditPostModal";

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [typeMessage, setTypeMessage] = useState("success");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await get("posts");
        setPosts(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPosts();
  }, []);

  const handleDeletePost = async (id) => {
    try {
      await remove(`posts/${id}`);
      setPosts(posts.filter((post) => post.id !== id));
      setNotification("Post eliminado exitosamente");
      setShowModal(true);
    } catch (err) {
      setNotification("Error al eliminar el post");
      setShowModal(true);
    }
  };

  const handleCreatePost = async (newPost) => {
    try {
      await post("posts", newPost);
      setPosts([newPost, ...posts]);
      setNotification("Post creado exitosamente");
      setShowCreateModal(false);
      setShowModal(true);
    } catch (err) {
      setNotification("Error al crear el post");
      setShowModal(true);
    }
  };

  const handleEditPost = async (id) => {
    const postToEdit = posts.find((post) => post.id === id);
    setCurrentPost(postToEdit);
    setShowEditModal(true);
  };

  const handleUpdatePost = async (id, updatedPost) => {
    try {
      await put(`posts/${id}`, updatedPost);
      setPosts(
        posts.map((post) =>
          post.id === id ? { ...post, ...updatedPost } : post
        )
      );
      setNotification("Post actualizado exitosamente");
      setShowEditModal(false);
      setTypeMessage("success");
      setShowModal(true);
    } catch (err) {
      setNotification("Error al actualizar el post");
      setTypeMessage("error");
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTypeMessage("success");
    setNotification("");
  };

  const columns = [
    { label: "ID", accessor: "id" },
    { label: "Título", accessor: "title" },
    { label: "Descripción", accessor: "body" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lista de Posts</h1>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-green-600 text-white rounded transform hover:bg-green-700 hover:-translate-y-1 hover:scale-105 transition-transform duration-300"
        >
          Nuevo Post
        </button>
      </div>

      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <DataTable
          data={posts}
          columns={columns}
          itemsPerPage={7}
          onDelete={handleDeletePost}
          onEdit={handleEditPost}
        />
      )}

      {showModal && (
        <NotificationModal message={notification} onClose={handleCloseModal} type={typeMessage} />
      )}

      {showCreateModal && (
        <CreatePostModal
          onCreate={handleCreatePost}
          onClose={() => setShowCreateModal(false)}
        />
      )}

      {showEditModal && (
        <EditPostModal
          post={currentPost}
          onUpdate={handleUpdatePost}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
};
export default PostsPage;
