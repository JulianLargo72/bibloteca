import { Handshake } from "lucide-react";
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

function PrestamoDialog({
  open,
  onOpenChange,
  isEditing,
  form,
  libros,
  personas,
  onChange,
  onSave,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-copper/10 text-copper">
              <Handshake className="size-5" />
            </div>
            <div>
              <DialogTitle>
                {isEditing ? "Editar prestamo" : "Nuevo prestamo"}
              </DialogTitle>
              <DialogDescription>
                Selecciona libro, persona y fechas.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label>Libro</Label>
            <Select
              value={form.libro_id}
              onValueChange={(value) => onChange("libro_id", value)}>
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
              value={form.persona_id}
              onValueChange={(value) => onChange("persona_id", value)}>
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
              value={form.fecha_prestamo}
              onChange={(event) => onChange("fecha_prestamo", event.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="fecha_devolucion">Fecha devolucion</Label>
            <Input
              id="fecha_devolucion"
              type="date"
              value={form.fecha_devolucion}
              onChange={(event) => onChange("fecha_devolucion", event.target.value)}
            />
          </div>
          <div className="grid gap-2 sm:col-span-2">
            <Label>Estado</Label>
            <Select value={form.estado} onValueChange={(value) => onChange("estado", value)}>
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button className="bg-ink text-paper" onClick={onSave}>
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default PrestamoDialog;
