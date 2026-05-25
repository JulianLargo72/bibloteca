import { BookOpen } from "lucide-react";
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

function LibroDialog({
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
              <BookOpen className="size-5" />
            </div>
            <div>
              <DialogTitle>
                {isEditing ? uiText.dialogs.libro.titleEdit : uiText.dialogs.libro.titleNew}
              </DialogTitle>
              <DialogDescription>{uiText.dialogs.libro.description}</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="titulo">Titulo</Label>
            <Input
              id="titulo"
              value={form.titulo}
              onChange={(event) => onChange("titulo", event.target.value)}
              className={fieldClass("titulo")}
            />
            {errors?.titulo && (
              <p className="text-xs text-destructive">{errors.titulo}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="autor">Autor</Label>
            <Input
              id="autor"
              value={form.autor}
              onChange={(event) => onChange("autor", event.target.value)}
              className={fieldClass("autor")}
            />
            {errors?.autor && (
              <p className="text-xs text-destructive">{errors.autor}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="isbn">ISBN</Label>
            <Input
              id="isbn"
              value={form.isbn}
              onChange={(event) => onChange("isbn", event.target.value)}
              className={fieldClass("isbn")}
            />
            {errors?.isbn && (
              <p className="text-xs text-destructive">{errors.isbn}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              type="number"
              min="0"
              value={form.stock}
              onChange={(event) => onChange("stock", Number(event.target.value))}
              className={fieldClass("stock")}
            />
            {errors?.stock && (
              <p className="text-xs text-destructive">{errors.stock}</p>
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

export default LibroDialog;
