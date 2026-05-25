import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function LibrosSection({ libros, onCreate, onEdit, onDelete }) {
  return (
    <section className="rounded-2xl border border-clay/70 bg-white/80 p-6 shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h2 className="font-display text-2xl text-ink">Catalogo de libros</h2>
            <span className="rounded-full bg-clay/40 px-3 py-1 text-xs text-ink/70">
              {libros.length} registros
            </span>
          </div>
          <p className="text-sm text-ink/60">Gestiona existencias y autores.</p>
        </div>
        <Button className="bg-copper text-paper hover:bg-bronze" onClick={onCreate}>
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
                    <Button size="sm" variant="outline" onClick={() => onEdit(libro)}>
                      Editar
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => onDelete(libro.id)}>
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
  );
}

export default LibrosSection;
