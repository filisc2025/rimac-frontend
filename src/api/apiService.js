// src/api/apiService.js

const API_BASE_URL = 'https://rimac-front-end-challenge.netlify.app/api';

/**
 * Función genérica para consumir cualquier endpoint de la API
 */
export async function fetchData(endpoint) {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    if (!response.ok) {
      throw new Error(`Error al cargar datos: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fallo en fetchData:", error);
    throw error;
  }
}

// Funciones específicas para el reto
export const fetchUser = () => fetchData('user.json');
export const fetchPlans = () => fetchData('plans.json');