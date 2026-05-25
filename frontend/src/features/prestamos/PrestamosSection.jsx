import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function PrestamosSection({ prestamos, onCreate, onEdit, onDelete }) {
  return (
    <section className="rounded-2xl border border-clay/70 bg-white/80 p-6 shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h2 className="font-display text-2xl text-ink">Prestamos</h2>
            <span className="rounded-full bg-clay/40 px-3 py-1 text-xs text-ink/70">
              {prestamos.length} registros
            </span>
          </div>
          <p className="text-sm text-ink/60">Coordina salidas y devoluciones.</p>
        </div>
        <Button className="bg-copper text-paper hover:bg-bronze" onClick={onCreate}>
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
                    <Button size="sm" variant="outline" onClick={() => onEdit(prestamo)}>
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onDelete(prestamo.id)}>
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
  );
}

export default PrestamosSection;
