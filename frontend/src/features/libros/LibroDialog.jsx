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

function LibroDialog({ open, onOpenChange, isEditing, form, onChange, onSave }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-copper/10 text-copper">
              <BookOpen className="size-5" />
            </div>
            <div>
              <DialogTitle>{isEditing ? "Editar libro" : "Nuevo libro"}</DialogTitle>
              <DialogDescription>
                Completa la informacion para el catalogo.
              </DialogDescription>
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
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="autor">Autor</Label>
            <Input
              id="autor"
              value={form.autor}
              onChange={(event) => onChange("autor", event.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="isbn">ISBN</Label>
            <Input
              id="isbn"
              value={form.isbn}
              onChange={(event) => onChange("isbn", event.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              type="number"
              min="0"
              value={form.stock}
              onChange={(event) => onChange("stock", Number(event.target.value))}
            />
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

export default LibroDialog;
