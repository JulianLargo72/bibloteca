import { useEffect, useState } from "react";
import { librosApi, personasApi, prestamosApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import LibrosSection from "@/features/libros/LibrosSection";
import LibroDialog from "@/features/libros/LibroDialog";
import PersonasSection from "@/features/personas/PersonasSection";
import PersonaDialog from "@/features/personas/PersonaDialog";
import PrestamosSection from "@/features/prestamos/PrestamosSection";
import PrestamoDialog from "@/features/prestamos/PrestamoDialog";

const sections = [
  { id: "libros", label: "Libros" },
  { id: "personas", label: "Personas" },
  { id: "prestamos", label: "Prestamos" },
];

const emptyLibro = { titulo: "", autor: "", isbn: "", stock: 1 };
const emptyPersona = { nombre: "", apellido: "", email: "", telefono: "" };
const emptyPrestamo = {
  libro_id: "",
  persona_id: "",
  fecha_prestamo: "",
  fecha_devolucion: "",
  estado: "prestado",
};

function App() {
  const [active, setActive] = useState("libros");
  const [libros, setLibros] = useState([]);
  const [personas, setPersonas] = useState([]);
  const [prestamos, setPrestamos] = useState([]);
  const [error, setError] = useState("");

  const [libroDialog, setLibroDialog] = useState(false);
  const [personaDialog, setPersonaDialog] = useState(false);
  const [prestamoDialog, setPrestamoDialog] = useState(false);

  const [libroForm, setLibroForm] = useState(emptyLibro);
  const [personaForm, setPersonaForm] = useState(emptyPersona);
  const [prestamoForm, setPrestamoForm] = useState(emptyPrestamo);

  const [editingLibroId, setEditingLibroId] = useState(null);
  const [editingPersonaId, setEditingPersonaId] = useState(null);
  const [editingPrestamoId, setEditingPrestamoId] = useState(null);

  const refreshAll = async () => {
    try {
      const [librosData, personasData, prestamosData] = await Promise.all([
        librosApi.list(),
        personasApi.list(),
        prestamosApi.list(),
      ]);
      setLibros(librosData);
      setPersonas(personasData);
      setPrestamos(prestamosData);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    refreshAll();
  }, []);

  const handleLibroSave = async () => {
    try {
      if (editingLibroId) {
        await librosApi.update(editingLibroId, libroForm);
      } else {
        await librosApi.create(libroForm);
      }
      setLibroDialog(false);
      setLibroForm(emptyLibro);
      setEditingLibroId(null);
      refreshAll();
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePersonaSave = async () => {
    try {
      if (editingPersonaId) {
        await personasApi.update(editingPersonaId, personaForm);
      } else {
        await personasApi.create(personaForm);
      }
      setPersonaDialog(false);
      setPersonaForm(emptyPersona);
      setEditingPersonaId(null);
      refreshAll();
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePrestamoSave = async () => {
    try {
      const payload = {
        ...prestamoForm,
        libro_id: Number(prestamoForm.libro_id),
        persona_id: Number(prestamoForm.persona_id),
      };
      if (editingPrestamoId) {
        await prestamosApi.update(editingPrestamoId, payload);
      } else {
        await prestamosApi.create(payload);
      }
      setPrestamoDialog(false);
      setPrestamoForm(emptyPrestamo);
      setEditingPrestamoId(null);
      refreshAll();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (type, id) => {
    try {
      if (type === "libro") {
        await librosApi.remove(id);
      }
      if (type === "persona") {
        await personasApi.remove(id);
      }
      if (type === "prestamo") {
        await prestamosApi.remove(id);
      }
      refreshAll();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLibroChange = (field, value) => {
    setLibroForm((prev) => ({ ...prev, [field]: value }));
  };

  const handlePersonaChange = (field, value) => {
    setPersonaForm((prev) => ({ ...prev, [field]: value }));
  };

  const handlePrestamoChange = (field, value) => {
    setPrestamoForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="theme min-h-screen">
      <header className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 pt-10">
        <div className="rounded-2xl border border-clay/60 bg-paper/90 p-8 shadow-float">
          <div className="flex flex-col gap-3">
            <span className="text-sm uppercase tracking-[0.2em] text-bronze">
              Sistema de gestion
            </span>
            <h1 className="font-display text-4xl text-ink sm:text-5xl">
              Biblioteca Municipal
            </h1>
            <p className="max-w-2xl text-sm text-ink/70">
              Administra libros, personas y prestamos con un flujo rapido. Todos los
              cambios se sincronizan en tiempo real.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {sections.map((section) => (
              <Button
                key={section.id}
                variant={active === section.id ? "default" : "outline"}
                className={
                  active === section.id
                    ? "bg-ink text-paper hover:bg-ink/90"
                    : "border-clay text-ink hover:bg-clay/40"
                }
                onClick={() => setActive(section.id)}>
                {section.label}
              </Button>
            ))}
          </div>
        </div>
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 pb-16 pt-8">
        {active === "libros" && (
          <LibrosSection
            libros={libros}
            onCreate={() => {
              setLibroForm(emptyLibro);
              setEditingLibroId(null);
              setLibroDialog(true);
            }}
            onEdit={(libro) => {
              setLibroForm({
                titulo: libro.titulo,
                autor: libro.autor,
                isbn: libro.isbn,
                stock: libro.stock,
              });
              setEditingLibroId(libro.id);
              setLibroDialog(true);
            }}
            onDelete={(id) => handleDelete("libro", id)}
          />
        )}

        {active === "personas" && (
          <PersonasSection
            personas={personas}
            onCreate={() => {
              setPersonaForm(emptyPersona);
              setEditingPersonaId(null);
              setPersonaDialog(true);
            }}
            onEdit={(persona) => {
              setPersonaForm({
                nombre: persona.nombre,
                apellido: persona.apellido,
                email: persona.email,
                telefono: persona.telefono,
              });
              setEditingPersonaId(persona.id);
              setPersonaDialog(true);
            }}
            onDelete={(id) => handleDelete("persona", id)}
          />
        )}

        {active === "prestamos" && (
          <PrestamosSection
            prestamos={prestamos}
            onCreate={() => {
              setPrestamoForm(emptyPrestamo);
              setEditingPrestamoId(null);
              setPrestamoDialog(true);
            }}
            onEdit={(prestamo) => {
              setPrestamoForm({
                libro_id: String(prestamo.libro_id),
                persona_id: String(prestamo.persona_id),
                fecha_prestamo: prestamo.fecha_prestamo,
                fecha_devolucion: prestamo.fecha_devolucion || "",
                estado: prestamo.estado,
              });
              setEditingPrestamoId(prestamo.id);
              setPrestamoDialog(true);
            }}
            onDelete={(id) => handleDelete("prestamo", id)}
          />
        )}
      </main>

      <LibroDialog
        open={libroDialog}
        onOpenChange={setLibroDialog}
        isEditing={Boolean(editingLibroId)}
        form={libroForm}
        onChange={handleLibroChange}
        onSave={handleLibroSave}
      />

      <PersonaDialog
        open={personaDialog}
        onOpenChange={setPersonaDialog}
        isEditing={Boolean(editingPersonaId)}
        form={personaForm}
        onChange={handlePersonaChange}
        onSave={handlePersonaSave}
      />

      <PrestamoDialog
        open={prestamoDialog}
        onOpenChange={setPrestamoDialog}
        isEditing={Boolean(editingPrestamoId)}
        form={prestamoForm}
        libros={libros}
        personas={personas}
        onChange={handlePrestamoChange}
        onSave={handlePrestamoSave}
      />
    </div>
  );
}

export default App;
