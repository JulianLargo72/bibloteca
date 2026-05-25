import { useState } from "react";
import { Button } from "@/components/ui/button";
import LibrosSection from "@/features/libros/LibrosSection";
import LibroDialog from "@/features/libros/LibroDialog";
import PersonasSection from "@/features/personas/PersonasSection";
import PersonaDialog from "@/features/personas/PersonaDialog";
import PrestamosSection from "@/features/prestamos/PrestamosSection";
import PrestamoDialog from "@/features/prestamos/PrestamoDialog";
import { useLibros } from "@/features/libros/useLibros";
import { usePersonas } from "@/features/personas/usePersonas";
import { usePrestamos } from "@/features/prestamos/usePrestamos";

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
  const {
    libros,
    loading: librosLoading,
    error: librosError,
    createLibro,
    updateLibro,
    removeLibro,
    clearError: clearLibrosError,
  } = useLibros();
  const {
    personas,
    loading: personasLoading,
    error: personasError,
    createPersona,
    updatePersona,
    removePersona,
    clearError: clearPersonasError,
  } = usePersonas();
  const {
    prestamos,
    loading: prestamosLoading,
    error: prestamosError,
    createPrestamo,
    updatePrestamo,
    removePrestamo,
    clearError: clearPrestamosError,
  } = usePrestamos();

  const [libroDialog, setLibroDialog] = useState(false);
  const [personaDialog, setPersonaDialog] = useState(false);
  const [prestamoDialog, setPrestamoDialog] = useState(false);

  const [libroForm, setLibroForm] = useState(emptyLibro);
  const [personaForm, setPersonaForm] = useState(emptyPersona);
  const [prestamoForm, setPrestamoForm] = useState(emptyPrestamo);

  const [editingLibroId, setEditingLibroId] = useState(null);
  const [editingPersonaId, setEditingPersonaId] = useState(null);
  const [editingPrestamoId, setEditingPrestamoId] = useState(null);

  const error = librosError || personasError || prestamosError;
  const isLoading = librosLoading || personasLoading || prestamosLoading;

  const handleLibroSave = async () => {
    if (editingLibroId) {
      await updateLibro(editingLibroId, libroForm);
    } else {
      await createLibro(libroForm);
    }
    setLibroDialog(false);
    setLibroForm(emptyLibro);
    setEditingLibroId(null);
  };

  const handlePersonaSave = async () => {
    if (editingPersonaId) {
      await updatePersona(editingPersonaId, personaForm);
    } else {
      await createPersona(personaForm);
    }
    setPersonaDialog(false);
    setPersonaForm(emptyPersona);
    setEditingPersonaId(null);
  };

  const handlePrestamoSave = async () => {
    const payload = {
      ...prestamoForm,
      libro_id: Number(prestamoForm.libro_id),
      persona_id: Number(prestamoForm.persona_id),
    };
    if (editingPrestamoId) {
      await updatePrestamo(editingPrestamoId, payload);
    } else {
      await createPrestamo(payload);
    }
    setPrestamoDialog(false);
    setPrestamoForm(emptyPrestamo);
    setEditingPrestamoId(null);
  };

  const handleDelete = async (type, id) => {
    if (type === "libro") {
      await removeLibro(id);
    }
    if (type === "persona") {
      await removePersona(id);
    }
    if (type === "prestamo") {
      await removePrestamo(id);
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
            {isLoading && (
              <span className="ml-auto flex items-center gap-2 rounded-full border border-clay/70 bg-white/70 px-3 py-1 text-xs text-ink/70">
                <span className="inline-flex size-2 animate-pulse rounded-full bg-copper" />
                Sincronizando
              </span>
            )}
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
        onOpenChange={(value) => {
          if (!value) {
            clearLibrosError();
          }
          setLibroDialog(value);
        }}
        isEditing={Boolean(editingLibroId)}
        form={libroForm}
        onChange={handleLibroChange}
        onSave={handleLibroSave}
      />

      <PersonaDialog
        open={personaDialog}
        onOpenChange={(value) => {
          if (!value) {
            clearPersonasError();
          }
          setPersonaDialog(value);
        }}
        isEditing={Boolean(editingPersonaId)}
        form={personaForm}
        onChange={handlePersonaChange}
        onSave={handlePersonaSave}
      />

      <PrestamoDialog
        open={prestamoDialog}
        onOpenChange={(value) => {
          if (!value) {
            clearPrestamosError();
          }
          setPrestamoDialog(value);
        }}
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
