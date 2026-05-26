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
import { uiText } from "@/config/uiText";

function PrestamoDialog({
  open,
  onOpenChange,
  isEditing,
  form,
  libros,
  personas,
  errors,
  saving,
  onChange,
  onSave,
}) {
  const fieldClass = (field) =>
    errors?.[field]
      ? "border-destructive focus-visible:ring-destructive/40"
      : "";
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
                {isEditing
                  ? uiText.dialogs.prestamo.titleEdit
                  : uiText.dialogs.prestamo.titleNew}
              </DialogTitle>
              <DialogDescription>{uiText.dialogs.prestamo.description}</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label>Libro</Label>
            <Select
              value={form.libro_id}
              onValueChange={(value) => onChange("libro_id", value)}>
              <SelectTrigger className={`w-full ${fieldClass("libro_id")}`}>
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
            {errors?.libro_id && (
              <p className="text-xs text-destructive">{errors.libro_id}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label>Persona</Label>
            <Select
              value={form.persona_id}
              onValueChange={(value) => onChange("persona_id", value)}>
              <SelectTrigger className={`w-full ${fieldClass("persona_id")}`}>
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
            {errors?.persona_id && (
              <p className="text-xs text-destructive">{errors.persona_id}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="fecha_prestamo">Fecha prestamo</Label>
            <Input
              id="fecha_prestamo"
              type="date"
              value={form.fecha_prestamo}
              onChange={(event) => onChange("fecha_prestamo", event.target.value)}
              className={fieldClass("fecha_prestamo")}
            />
            {errors?.fecha_prestamo && (
              <p className="text-xs text-destructive">{errors.fecha_prestamo}</p>
            )}
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
            <Select
              value={form.estado}
              onValueChange={(value) => onChange("estado", value)}>
              <SelectTrigger className={`w-full ${fieldClass("estado")}`}>
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="prestado">Prestado</SelectItem>
                <SelectItem value="devuelto">Devuelto</SelectItem>
              </SelectContent>
            </Select>
            {errors?.estado && (
              <p className="text-xs text-destructive">{errors.estado}</p>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={saving}
          >
            {uiText.actions.cancel}
          </Button>
          <Button className="bg-ink text-paper" onClick={onSave} disabled={saving}>
            {uiText.actions.save}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default PrestamoDialog;
