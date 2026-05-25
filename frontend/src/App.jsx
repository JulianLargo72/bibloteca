import { useEffect, useState } from "react";
import { librosApi, personasApi, prestamosApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
                onClick={() => setActive(section.id)}
              >
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
          <section className="rounded-2xl border border-clay/70 bg-white/80 p-6 shadow-lg">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl text-ink">Catalogo de libros</h2>
                <p className="text-sm text-ink/60">Gestiona existencias y autores.</p>
              </div>
              <Button
                className="bg-copper text-paper hover:bg-bronze"
                onClick={() => {
                  setLibroForm(emptyLibro);
                  setEditingLibroId(null);
                  setLibroDialog(true);
                }}
              >
                Nuevo libro
              </Button>
            </div>

            <div className="mt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Titulo</TableHead>
                    <TableHead>Autor</TableHead>
                    <TableHead>ISBN</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {libros.map((libro) => (
                    <TableRow key={libro.id}>
                      <TableCell className="font-medium text-ink">
                        {libro.titulo}
                      </TableCell>
                      <TableCell>{libro.autor}</TableCell>
                      <TableCell>{libro.isbn}</TableCell>
                      <TableCell>{libro.stock}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setLibroForm({
                                titulo: libro.titulo,
                                autor: libro.autor,
                                isbn: libro.isbn,
                                stock: libro.stock,
                              });
                              setEditingLibroId(libro.id);
                              setLibroDialog(true);
                            }}
                          >
                            Editar
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete("libro", libro.id)}
                          >
                            Eliminar
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {!libros.length && (
                <p className="mt-6 text-center text-sm text-ink/60">
                  Aun no hay libros registrados.
                </p>
              )}
            </div>
          </section>
        )}

        {active === "personas" && (
          <section className="rounded-2xl border border-clay/70 bg-white/80 p-6 shadow-lg">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl text-ink">Personas</h2>
                <p className="text-sm text-ink/60">Controla lectores y contactos.</p>
              </div>
              <Button
                className="bg-copper text-paper hover:bg-bronze"
                onClick={() => {
                  setPersonaForm(emptyPersona);
                  setEditingPersonaId(null);
                  setPersonaDialog(true);
                }}
              >
                Nueva persona
              </Button>
            </div>

            <div className="mt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Apellido</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Telefono</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {personas.map((persona) => (
                    <TableRow key={persona.id}>
                      <TableCell className="font-medium text-ink">
                        {persona.nombre}
                      </TableCell>
                      <TableCell>{persona.apellido}</TableCell>
                      <TableCell>{persona.email}</TableCell>
                      <TableCell>{persona.telefono}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setPersonaForm({
                                nombre: persona.nombre,
                                apellido: persona.apellido,
                                email: persona.email,
                                telefono: persona.telefono,
                              });
                              setEditingPersonaId(persona.id);
                              setPersonaDialog(true);
                            }}
                          >
                            Editar
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete("persona", persona.id)}
                          >
                            Eliminar
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {!personas.length && (
                <p className="mt-6 text-center text-sm text-ink/60">
                  Aun no hay personas registradas.
                </p>
              )}
            </div>
          </section>
        )}

        {active === "prestamos" && (
          <section className="rounded-2xl border border-clay/70 bg-white/80 p-6 shadow-lg">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl text-ink">Prestamos</h2>
                <p className="text-sm text-ink/60">Coordina salidas y devoluciones.</p>
              </div>
              <Button
                className="bg-copper text-paper hover:bg-bronze"
                onClick={() => {
                  setPrestamoForm(emptyPrestamo);
                  setEditingPrestamoId(null);
                  setPrestamoDialog(true);
                }}
              >
                Nuevo prestamo
              </Button>
            </div>

            <div className="mt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Libro</TableHead>
                    <TableHead>Persona</TableHead>
                    <TableHead>Fecha prestamo</TableHead>
                    <TableHead>Fecha devolucion</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {prestamos.map((prestamo) => (
                    <TableRow key={prestamo.id}>
                      <TableCell className="font-medium text-ink">
                        {prestamo.libro_titulo}
                      </TableCell>
                      <TableCell>{prestamo.persona_nombre}</TableCell>
                      <TableCell>{prestamo.fecha_prestamo}</TableCell>
                      <TableCell>{prestamo.fecha_devolucion || "-"}</TableCell>
                      <TableCell className="capitalize">{prestamo.estado}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
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
                          >
                            Editar
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete("prestamo", prestamo.id)}
                          >
                            Eliminar
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {!prestamos.length && (
                <p className="mt-6 text-center text-sm text-ink/60">
                  Aun no hay prestamos registrados.
                </p>
              )}
            </div>
          </section>
        )}
      </main>

      <Dialog open={libroDialog} onOpenChange={setLibroDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingLibroId ? "Editar libro" : "Nuevo libro"}
            </DialogTitle>
            <DialogDescription>
              Completa la informacion para el catalogo.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="titulo">Titulo</Label>
              <Input
                id="titulo"
                value={libroForm.titulo}
                onChange={(event) =>
                  setLibroForm({ ...libroForm, titulo: event.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="autor">Autor</Label>
              <Input
                id="autor"
                value={libroForm.autor}
                onChange={(event) =>
                  setLibroForm({ ...libroForm, autor: event.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="isbn">ISBN</Label>
              <Input
                id="isbn"
                value={libroForm.isbn}
                onChange={(event) =>
                  setLibroForm({ ...libroForm, isbn: event.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                min="0"
                value={libroForm.stock}
                onChange={(event) =>
                  setLibroForm({
                    ...libroForm,
                    stock: Number(event.target.value),
                  })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setLibroDialog(false)}>
              Cancelar
            </Button>
            <Button className="bg-ink text-paper" onClick={handleLibroSave}>
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={personaDialog} onOpenChange={setPersonaDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingPersonaId ? "Editar persona" : "Nueva persona"}
            </DialogTitle>
            <DialogDescription>
              Agrega o actualiza datos de contacto.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="nombre">Nombre</Label>
              <Input
                id="nombre"
                value={personaForm.nombre}
                onChange={(event) =>
                  setPersonaForm({ ...personaForm, nombre: event.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="apellido">Apellido</Label>
              <Input
                id="apellido"
                value={personaForm.apellido}
                onChange={(event) =>
                  setPersonaForm({ ...personaForm, apellido: event.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={personaForm.email}
                onChange={(event) =>
                  setPersonaForm({ ...personaForm, email: event.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="telefono">Telefono</Label>
              <Input
                id="telefono"
                value={personaForm.telefono}
                onChange={(event) =>
                  setPersonaForm({ ...personaForm, telefono: event.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPersonaDialog(false)}>
              Cancelar
            </Button>
            <Button className="bg-ink text-paper" onClick={handlePersonaSave}>
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={prestamoDialog} onOpenChange={setPrestamoDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingPrestamoId ? "Editar prestamo" : "Nuevo prestamo"}
            </DialogTitle>
            <DialogDescription>
              Selecciona libro, persona y fechas.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label>Libro</Label>
              <Select
                value={prestamoForm.libro_id}
                onValueChange={(value) =>
                  setPrestamoForm({ ...prestamoForm, libro_id: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona un libro" />
                </SelectTrigger>
                <SelectContent>
                  {libros.map((libro) => (
                    <SelectItem key={libro.id} value={String(libro.id)}>
                      {libro.titulo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Persona</Label>
              <Select
                value={prestamoForm.persona_id}
                onValueChange={(value) =>
                  setPrestamoForm({ ...prestamoForm, persona_id: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona una persona" />
                </SelectTrigger>
                <SelectContent>
                  {personas.map((persona) => (
                    <SelectItem key={persona.id} value={String(persona.id)}>
                      {persona.nombre} {persona.apellido}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="fecha_prestamo">Fecha prestamo</Label>
              <Input
                id="fecha_prestamo"
                type="date"
                value={prestamoForm.fecha_prestamo}
                onChange={(event) =>
                  setPrestamoForm({
                    ...prestamoForm,
                    fecha_prestamo: event.target.value,
                  })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="fecha_devolucion">Fecha devolucion</Label>
              <Input
                id="fecha_devolucion"
                type="date"
                value={prestamoForm.fecha_devolucion}
                onChange={(event) =>
                  setPrestamoForm({
                    ...prestamoForm,
                    fecha_devolucion: event.target.value,
                  })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label>Estado</Label>
              <Select
                value={prestamoForm.estado}
                onValueChange={(value) =>
                  setPrestamoForm({ ...prestamoForm, estado: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="prestado">Prestado</SelectItem>
                  <SelectItem value="devuelto">Devuelto</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPrestamoDialog(false)}>
              Cancelar
            </Button>
            <Button className="bg-ink text-paper" onClick={handlePrestamoSave}>
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
