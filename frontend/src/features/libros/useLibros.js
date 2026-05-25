import { useCallback, useEffect, useState } from "react";
import { librosApi } from "@/lib/api";

export function useLibros() {
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const refresh = useCallback(async (options = {}) => {
    const { skipLoading = false } = options;
    if (!skipLoading) {
      setLoading(true);
    }
    try {
      const data = await librosApi.list();
      setLibros(data);
      setError("");
    } catch (err) {
      setError(err.message || "No se pudo cargar libros");
    } finally {
      if (!skipLoading) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const data = await librosApi.list();
        if (!active) {
          return;
        }
        setLibros(data);
        setError("");
      } catch (err) {
        if (!active) {
          return;
        }
        setError(err.message || "No se pudo cargar libros");
      }
    };

    void load();

    return () => {
      active = false;
    };
  }, []);

  const createLibro = useCallback(async (payload) => {
    setLoading(true);
    try {
      await librosApi.create(payload);
      await refresh();
    } catch (err) {
      setError(err.message || "No se pudo crear el libro");
    } finally {
      setLoading(false);
    }
  }, [refresh]);

  const updateLibro = useCallback(async (id, payload) => {
    setLoading(true);
    try {
      await librosApi.update(id, payload);
      await refresh();
    } catch (err) {
      setError(err.message || "No se pudo actualizar el libro");
    } finally {
      setLoading(false);
    }
  }, [refresh]);

  const removeLibro = useCallback(async (id) => {
    setLoading(true);
    try {
      await librosApi.remove(id);
      await refresh();
    } catch (err) {
      setError(err.message || "No se pudo eliminar el libro");
    } finally {
      setLoading(false);
    }
  }, [refresh]);

  const clearError = useCallback(() => setError(""), []);

  return {
    libros,
    loading,
    error,
    refresh,
    createLibro,
    updateLibro,
    removeLibro,
    clearError,
  };
}
