// src/services/api.js

import { API_URL } from "@/utils/Constants";

/**
 * Realiza una petición GET a la API.
 * @param {string} endpoint - El endpoint de la API.
 * @returns {Promise} - La respuesta de la API.
 */
export const get = async (endpoint) => {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`);
    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`GET ${endpoint} - ${error.message}`);
    throw error;
  }
};

/**
 * Realiza una petición POST a la API.
 * @param {string} endpoint - El endpoint de la API.
 * @param {object} body - Los datos a enviar en el cuerpo de la petición.
 * @returns {Promise} - La respuesta de la API.
 */
export const post = async (endpoint, body) => {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`POST ${endpoint} - ${error.message}`);
    throw error;
  }
};

/**
 * Realiza una petición PUT a la API.
 * @param {string} endpoint - El endpoint de la API.
 * @param {object} body - Los datos a enviar en el cuerpo de la petición.
 * @returns {Promise} - La respuesta de la API.
 */
export const put = async (endpoint, body) => {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`PUT ${endpoint} - ${error.message}`);
    throw error;
  }
};

/**
 * Realiza una petición DELETE a la API.
 * @param {string} endpoint - El endpoint de la API.
 * @returns {Promise} - La respuesta de la API.
 */
export const remove = async (endpoint) => {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`, { method: 'DELETE' });
    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`DELETE ${endpoint} - ${error.message}`);
    throw error;
  }
};
