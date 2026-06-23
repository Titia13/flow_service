import axios from 'axios';

const base_url = "http://localhost:8000";

const fetchUsers = async () => {
    const response = await axios.get('http://localhost:8000/users');
    return response.data; 
};

export const apiFetch = async (endpoint: string, options?: RequestInit) => {
    const response = await fetch(`${base_url}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });
    if (!response.ok) {
      console.log("response api",response)

      const errorData = await response.json().catch(() => ({}));
      console.log("errorData===",errorData)

      throw new Error(errorData.detail || `Erreur : ${errorData.message}`  || `Erreur HTTP: ${response.status}`);
    }
    return response.json();
  };