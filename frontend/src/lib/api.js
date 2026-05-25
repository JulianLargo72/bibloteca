const API_URL = import.meta.env.VITE_API_URL || "http://localhost/bibloteca/backend/public/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (response.status === 204) {
    return null;
  }

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Error en la solicitud");
  }

  return data;
}

export const librosApi = {
  list: () => request("/libros"),
  create: (payload) => request("/libros", { method: "POST", body: JSON.stringify(payload) }),
  update: (id, payload) =>
    request(`/libros/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  remove: (id) => request(`/libros/${id}`, { method: "DELETE" }),
};

export const personasApi = {
  list: () => request("/personas"),
  create: (payload) => request("/personas", { method: "POST", body: JSON.stringify(payload) }),
  update: (id, payload) =>
    request(`/personas/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  remove: (id) => request(`/personas/${id}`, { method: "DELETE" }),
};

export const prestamosApi = {
  list: () => request("/prestamos"),
  create: (payload) => request("/prestamos", { method: "POST", body: JSON.stringify(payload) }),
  update: (id, payload) =>
    request(`/prestamos/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  remove: (id) => request(`/prestamos/${id}`, { method: "DELETE" }),
};
