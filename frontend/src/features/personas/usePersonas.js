import { useCallback, useEffect, useState } from "react";
import { personasApi } from "@/lib/api";

export function usePersonas() {
  const [personas, setPersonas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const refresh = useCallback(async (options = {}) => {
    const { skipLoading = false } = options;
    if (!skipLoading) {
      setLoading(true);
    }
    try {
      const data = await personasApi.list();
      setPersonas(data);
      setError("");
    } catch (err) {
      setError(err.message || "No se pudo cargar personas");
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
        const data = await personasApi.list();
        if (!active) {
          return;
        }
        setPersonas(data);
        setError("");
      } catch (err) {
        if (!active) {
          return;
        }
        setError(err.message || "No se pudo cargar personas");
      }
    };

    void load();

    return () => {
      active = false;
    };
  }, []);

  const createPersona = useCallback(async (payload) => {
    setLoading(true);
    try {
      await personasApi.create(payload);
      await refresh();
    } catch (err) {
      setError(err.message || "No se pudo crear la persona");
    } finally {
      setLoading(false);
    }
  }, [refresh]);

  const updatePersona = useCallback(async (id, payload) => {
    setLoading(true);
    try {
      await personasApi.update(id, payload);
      await refresh();
    } catch (err) {
      setError(err.message || "No se pudo actualizar la persona");
    } finally {
      setLoading(false);
    }
  }, [refresh]);

  const removePersona = useCallback(async (id) => {
    setLoading(true);
    try {
      await personasApi.remove(id);
      await refresh();
    } catch (err) {
      setError(err.message || "No se pudo eliminar la persona");
    } finally {
      setLoading(false);
    }
  }, [refresh]);

  const clearError = useCallback(() => setError(""), []);

  return {
    personas,
    loading,
    error,
    refresh,
    createPersona,
    updatePersona,
    removePersona,
    clearError,
  };
}
