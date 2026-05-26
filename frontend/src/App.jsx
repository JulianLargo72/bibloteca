import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LibrosSection, LibroDialog, useLibros } from "@/modules/libros";
import { PersonasSection, PersonaDialog, usePersonas } from "@/modules/personas";
import { PrestamosSection, PrestamoDialog, usePrestamos } from "@/modules/prestamos";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { uiText } from "@/config/uiText";

const sections = [
  { id: "libros", label: uiText.sections.libros.label },
  { id: "personas", label: uiText.sections.personas.label },
  { id: "prestamos", label: uiText.sections.prestamos.label },
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

  const [libroErrors, setLibroErrors] = useState({});
  const [personaErrors, setPersonaErrors] = useState({});
  const [prestamoErrors, setPrestamoErrors] = useState({});

  const [editingLibroId, setEditingLibroId] = useState(null);
  const [editingPersonaId, setEditingPersonaId] = useState(null);
  const [editingPrestamoId, setEditingPrestamoId] = useState(null);

  const [confirmState, setConfirmState] = useState({
    open: false,
    type: null,
    id: null,
  });

  const error = librosError || personasError || prestamosError;
  const isLoading = librosLoading || personasLoading || prestamosLoading;

  const handleLibroSave = async () => {
    const errors = {};
    if (!libroForm.titulo.trim()) {
      errors.titulo = uiText.validation.required;
    }
    if (!libroForm.autor.trim()) {
      errors.autor = uiText.validation.required;
    }
    if (!libroForm.isbn.trim()) {
      errors.isbn = uiText.validation.required;
    }
    if (Number.isNaN(libroForm.stock) || libroForm.stock < 0) {
      errors.stock = uiText.validation.required;
    }
    setLibroErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }
    if (editingLibroId) {
      await updateLibro(editingLibroId, libroForm);
    } else {
      await createLibro(libroForm);
    }
    setLibroDialog(false);
    setLibroForm(emptyLibro);
    setEditingLibroId(null);
    setLibroErrors({});
  };

  const handlePersonaSave = async () => {
    const errors = {};
    if (!personaForm.nombre.trim()) {
      errors.nombre = uiText.validation.required;
    }
    if (!personaForm.apellido.trim()) {
      errors.apellido = uiText.validation.required;
    }
    if (!personaForm.email.trim()) {
      errors.email = uiText.validation.required;
    }
    if (!personaForm.telefono.trim()) {
      errors.telefono = uiText.validation.required;
    }
    setPersonaErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }
    if (editingPersonaId) {
      await updatePersona(editingPersonaId, personaForm);
    } else {
      await createPersona(personaForm);
    }
    setPersonaDialog(false);
    setPersonaForm(emptyPersona);
    setEditingPersonaId(null);
    setPersonaErrors({});
  };

  const handlePrestamoSave = async () => {
    const payload = {
      ...prestamoForm,
      libro_id: Number(prestamoForm.libro_id),
      persona_id: Number(prestamoForm.persona_id),
    };
    const errors = {};
    if (!prestamoForm.libro_id) {
      errors.libro_id = uiText.validation.required;
    }
    if (!prestamoForm.persona_id) {
      errors.persona_id = uiText.validation.required;
    }
    if (!prestamoForm.fecha_prestamo) {
      errors.fecha_prestamo = uiText.validation.required;
    }
    if (!prestamoForm.estado) {
      errors.estado = uiText.validation.required;
    }
    setPrestamoErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }
    if (editingPrestamoId) {
      await updatePrestamo(editingPrestamoId, payload);
    } else {
      await createPrestamo(payload);
    }
    setPrestamoDialog(false);
    setPrestamoForm(emptyPrestamo);
    setEditingPrestamoId(null);
    setPrestamoErrors({});
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

  const requestDelete = (type, id) => {
    setConfirmState({ open: true, type, id });
  };

  const confirmDelete = async () => {
    await handleDelete(confirmState.type, confirmState.id);
    setConfirmState({ open: false, type: null, id: null });
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
              {uiText.header.eyebrow}
            </span>
            <h1 className="font-display text-4xl text-ink sm:text-5xl">
              {uiText.header.title}
            </h1>
            <p className="max-w-2xl text-sm text-ink/70">
              {uiText.header.subtitle}
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
                {uiText.status.syncing}
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
              setLibroErrors({});
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
              setLibroErrors({});
              setEditingLibroId(libro.id);
              setLibroDialog(true);
            }}
            onDelete={(id) => requestDelete("libro", id)}
          />
        )}

        {active === "personas" && (
          <PersonasSection
            personas={personas}
            onCreate={() => {
              setPersonaForm(emptyPersona);
              setPersonaErrors({});
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
              setPersonaErrors({});
              setEditingPersonaId(persona.id);
              setPersonaDialog(true);
            }}
            onDelete={(id) => requestDelete("persona", id)}
          />
        )}

        {active === "prestamos" && (
          <PrestamosSection
            prestamos={prestamos}
            onCreate={() => {
              setPrestamoForm(emptyPrestamo);
              setPrestamoErrors({});
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
              setPrestamoErrors({});
              setEditingPrestamoId(prestamo.id);
              setPrestamoDialog(true);
            }}
            onDelete={(id) => requestDelete("prestamo", id)}
          />
        )}
      </main>

      <LibroDialog
        open={libroDialog}
        onOpenChange={(value) => {
          if (!value) {
            clearLibrosError();
            setLibroErrors({});
          }
          setLibroDialog(value);
        }}
        isEditing={Boolean(editingLibroId)}
        form={libroForm}
        errors={libroErrors}
        saving={librosLoading}
        onChange={handleLibroChange}
        onSave={handleLibroSave}
      />

      <PersonaDialog
        open={personaDialog}
        onOpenChange={(value) => {
          if (!value) {
            clearPersonasError();
            setPersonaErrors({});
          }
          setPersonaDialog(value);
        }}
        isEditing={Boolean(editingPersonaId)}
        form={personaForm}
        errors={personaErrors}
        saving={personasLoading}
        onChange={handlePersonaChange}
        onSave={handlePersonaSave}
      />

      <PrestamoDialog
        open={prestamoDialog}
        onOpenChange={(value) => {
          if (!value) {
            clearPrestamosError();
            setPrestamoErrors({});
          }
          setPrestamoDialog(value);
        }}
        isEditing={Boolean(editingPrestamoId)}
        form={prestamoForm}
        libros={libros}
        personas={personas}
        errors={prestamoErrors}
        saving={prestamosLoading}
        onChange={handlePrestamoChange}
        onSave={handlePrestamoSave}
      />

      <ConfirmDialog
        open={confirmState.open}
        onOpenChange={(value) =>
          setConfirmState((prev) => ({ ...prev, open: value }))
        }
        title={uiText.dialogs.confirmDelete.title}
        description={uiText.dialogs.confirmDelete.description}
        onConfirm={confirmDelete}
        loading={isLoading}
      />
    </div>
  );
}

export default App;
