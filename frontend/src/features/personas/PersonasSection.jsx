import { Button } from "@/components/ui/button";
import { uiText } from "@/config/uiText";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function PersonasSection({ personas, onCreate, onEdit, onDelete }) {
  return (
    <section className="rounded-2xl border border-clay/70 bg-white/80 p-6 shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h2 className="font-display text-2xl text-ink">
              {uiText.sections.personas.title}
            </h2>
            <span className="rounded-full bg-clay/40 px-3 py-1 text-xs text-ink/70">
              {personas.length} registros
            </span>
          </div>
          <p className="text-sm text-ink/60">{uiText.sections.personas.subtitle}</p>
        </div>
        <Button className="bg-copper text-paper hover:bg-bronze" onClick={onCreate}>
          {uiText.sections.personas.create}
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
                    <Button size="sm" variant="outline" onClick={() => onEdit(persona)}>
                      {uiText.actions.edit}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onDelete(persona.id)}>
                      {uiText.actions.delete}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {!personas.length && (
          <p className="mt-6 text-center text-sm text-ink/60">
            {uiText.sections.personas.empty}
          </p>
        )}
      </div>
    </section>
  );
}

export default PersonasSection;
