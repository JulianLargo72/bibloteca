import { UserRound } from "lucide-react";
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
import { uiText } from "@/config/uiText";

function PersonaDialog({
  open,
  onOpenChange,
  isEditing,
  form,
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
              <UserRound className="size-5" />
            </div>
            <div>
              <DialogTitle>
                {isEditing
                  ? uiText.dialogs.persona.titleEdit
                  : uiText.dialogs.persona.titleNew}
              </DialogTitle>
              <DialogDescription>{uiText.dialogs.persona.description}</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="nombre">Nombre</Label>
            <Input
              id="nombre"
              value={form.nombre}
              onChange={(event) => onChange("nombre", event.target.value)}
              className={fieldClass("nombre")}
            />
            {errors?.nombre && (
              <p className="text-xs text-destructive">{errors.nombre}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="apellido">Apellido</Label>
            <Input
              id="apellido"
              value={form.apellido}
              onChange={(event) => onChange("apellido", event.target.value)}
              className={fieldClass("apellido")}
            />
            {errors?.apellido && (
              <p className="text-xs text-destructive">{errors.apellido}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(event) => onChange("email", event.target.value)}
              className={fieldClass("email")}
            />
            {errors?.email && (
              <p className="text-xs text-destructive">{errors.email}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="telefono">Telefono</Label>
            <Input
              id="telefono"
              value={form.telefono}
              onChange={(event) => onChange("telefono", event.target.value)}
              className={fieldClass("telefono")}
            />
            {errors?.telefono && (
              <p className="text-xs text-destructive">{errors.telefono}</p>
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

export default PersonaDialog;
