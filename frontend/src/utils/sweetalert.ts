import Swal from "sweetalert2";

// Base custom classes for SweetAlert2 matching the project's styling
const baseCustomClass = {
  popup: "rounded-2xl border border-border-color shadow-xl bg-white text-text-primary p-6 font-semibold select-none",
  title: "text-base font-black text-text-primary mb-2",
  htmlContainer: "text-xs text-text-secondary leading-relaxed font-semibold",
  confirmButton: "bg-navy-blue text-white px-5 py-2.5 rounded-xl font-black text-xs shadow-sm hover:bg-navy-blue/90 cursor-pointer focus:outline-none transition-all mr-1.5 min-w-[100px]",
  cancelButton: "bg-gray-100 text-text-secondary border border-border-color px-5 py-2.5 rounded-xl font-black text-xs shadow-sm hover:bg-gray-50 cursor-pointer focus:outline-none transition-all ml-1.5 min-w-[100px]",
  denyButton: "bg-red-500 text-white px-5 py-2.5 rounded-xl font-black text-xs shadow-sm hover:bg-red-600 cursor-pointer focus:outline-none transition-all mr-1.5",
};

export const swalAlert = Swal.mixin({
  customClass: baseCustomClass,
  buttonsStyling: false,
});

export const alerts = {
  // Confirm Delete Dialog
  confirmDelete: async (title: string, text: string) => {
    return swalAlert.fire({
      title,
      text,
      icon: "warning",
      iconColor: "#EF4444", // Red warning color
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
      customClass: {
        ...baseCustomClass,
        confirmButton: "bg-red-500 text-white px-5 py-2.5 rounded-xl font-black text-xs shadow-sm hover:bg-red-600 cursor-pointer focus:outline-none transition-all mr-1.5 min-w-[100px]",
      }
    });
  },

  // Confirm Generic Dialog (Activar / Desactivar / Guardar)
  confirmAction: async (title: string, text: string, confirmText = "Confirmar", cancelText = "Cancelar", isWarning = false) => {
    return swalAlert.fire({
      title,
      text,
      icon: isWarning ? "warning" : "question",
      iconColor: isWarning ? "#EAB308" : "#0F172A",
      showCancelButton: true,
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
      reverseButtons: true,
    });
  },

  // Informative/Success dialogs
  success: (title: string, text: string) => {
    return swalAlert.fire({
      title,
      text,
      icon: "success",
      iconColor: "#22C55E", // green
      confirmButtonText: "Entendido",
    });
  },

  error: (title: string, text: string) => {
    return swalAlert.fire({
      title,
      text,
      icon: "error",
      iconColor: "#EF4444", // red
      confirmButtonText: "Cerrar",
    });
  },
};
export default alerts;
