export const uiText = {
  header: {
    eyebrow: "Sistema de gestion",
    title: "Biblioteca Municipal",
    subtitle:
      "Administra libros, personas y prestamos con un flujo rapido. Todos los cambios se sincronizan en tiempo real.",
  },
  sections: {
    libros: {
      label: "Libros",
      title: "Catalogo de libros",
      subtitle: "Gestiona existencias y autores.",
      empty: "Aun no hay libros registrados.",
      create: "Nuevo libro",
    },
    personas: {
      label: "Personas",
      title: "Personas",
      subtitle: "Controla lectores y contactos.",
      empty: "Aun no hay personas registradas.",
      create: "Nueva persona",
    },
    prestamos: {
      label: "Prestamos",
      title: "Prestamos",
      subtitle: "Coordina salidas y devoluciones.",
      empty: "Aun no hay prestamos registrados.",
      create: "Nuevo prestamo",
    },
  },
  dialogs: {
    libro: {
      titleNew: "Nuevo libro",
      titleEdit: "Editar libro",
      description: "Completa la informacion para el catalogo.",
    },
    persona: {
      titleNew: "Nueva persona",
      titleEdit: "Editar persona",
      description: "Agrega o actualiza datos de contacto.",
    },
    prestamo: {
      titleNew: "Nuevo prestamo",
      titleEdit: "Editar prestamo",
      description: "Selecciona libro, persona y fechas.",
    },
    confirmDelete: {
      title: "Confirmar eliminacion",
      description:
        "Esta accion no se puede deshacer. Confirma si deseas continuar.",
      confirm: "Eliminar",
      cancel: "Cancelar",
    },
  },
  actions: {
    edit: "Editar",
    delete: "Eliminar",
    cancel: "Cancelar",
    save: "Guardar",
  },
  validation: {
    required: "Este campo es obligatorio.",
  },
  status: {
    syncing: "Sincronizando",
  },
};
