import { useCallback, useEffect, useState } from "react";
import { prestamosApi } from "@/lib/api";

export function usePrestamos() {
  const [prestamos, setPrestamos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const refresh = useCallback(async (options = {}) => {
    const { skipLoading = false } = options;
    if (!skipLoading) {
      setLoading(true);
    }
    try {
      const data = await prestamosApi.list();
      setPrestamos(data);
      setError("");
    } catch (err) {
      setError(err.message || "No se pudo cargar prestamos");
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
        const data = await prestamosApi.list();
        if (!active) {
          return;
        }
        setPrestamos(data);
        setError("");
      } catch (err) {
        if (!active) {
          return;
        }
        setError(err.message || "No se pudo cargar prestamos");
      }
    };

    void load();

    return () => {
      active = false;
    };
  }, []);

  const createPrestamo = useCallback(async (payload) => {
    setLoading(true);
    try {
      await prestamosApi.create(payload);
      await refresh();
    } catch (err) {
      setError(err.message || "No se pudo crear el prestamo");
    } finally {
      setLoading(false);
    }
  }, [refresh]);

  const updatePrestamo = useCallback(async (id, payload) => {
    setLoading(true);
    try {
      await prestamosApi.update(id, payload);
      await refresh();
    } catch (err) {
      setError(err.message || "No se pudo actualizar el prestamo");
    } finally {
      setLoading(false);
    }
  }, [refresh]);

  const removePrestamo = useCallback(async (id) => {
    setLoading(true);
    try {
      await prestamosApi.remove(id);
      await refresh();
    } catch (err) {
      setError(err.message || "No se pudo eliminar el prestamo");
    } finally {
      setLoading(false);
    }
  }, [refresh]);

  const clearError = useCallback(() => setError(""), []);

  return {
    prestamos,
    loading,
    error,
    refresh,
    createPrestamo,
    updatePrestamo,
    removePrestamo,
    clearError,
  };
}
