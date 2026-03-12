import toast, { Toaster } from "react-hot-toast";
import { X } from "lucide-react";

export const atelierToast = (message, type = "success") => {
  toast.custom(
    (t) => (
      <div
        className={`${
          t.visible
            ? "animate-in fade-in slide-in-from-top-4 duration-500"
            : "animate-out fade-out slide-out-to-top-2 duration-300"
        } max-w-md w-full bg-atelier-paper border border-atelier-ink/10 shadow-xl pointer-events-auto flex items-center justify-between p-6`}
      >
        <div className="flex-1">
          <p className="text-[10px] tracking-[0.3em] uppercase font-bold opacity-40 mb-1">
            {type === "success" ? "System Confirmation" : "Atelier Notice"}
          </p>
          <p className="text-sm font-serif italic text-atelier-ink">
            {message}
          </p>
        </div>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="ml-4 opacity-40 hover:opacity-100 transition-opacity"
        >
          <X size={14} strokeWidth={1.5} />
        </button>
      </div>
    ),
    {
      duration: 4000,
      position: "top-center",
    },
  );
};
