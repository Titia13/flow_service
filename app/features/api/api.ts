export const base_url = "http://localhost:8000";

export const apiFetch = async (endpoint: string, options?: RequestInit) => {
    const response = await fetch(`${base_url}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Erreur : ${errorData.detail.message}` ||  errorData.detail || `Erreur : ${errorData.message}`  || `Erreur HTTP: ${response.status}`);
    }
    return response.json();
  };

  