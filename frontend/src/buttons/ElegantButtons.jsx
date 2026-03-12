import { FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const ElegantButton = ({ label, state }) => {
  const isSubmitting = state === true;

  return (
    <button
      type="submit"
      className={`
        group relative overflow-hidden
        flex items-center justify-start
        bg-atelier-ink
        text-atelier-paper
        rounded-full
        transition-all duration-500 ease-out
        px-2 py-2 pr-6
        ${isSubmitting ? "opacity-70 pointer-events-none" : "hover:bg-atelier-tan"}
      `}
    >
      {/* Icon Circle */}
      <span
        className="
          relative z-10 flex items-center justify-center
          w-10 h-10
          bg-atelier-paper
          text-atelier-ink
          rounded-full
          transition-all duration-500
          group-hover:scale-95
        "
      >
        <FaArrowRight
          className={`
            transition-transform duration-500 text-[12px]
            ${isSubmitting ? "animate-spin" : "rotate-[-45deg] group-hover:rotate-0"}
          `}
        />
      </span>

      {/* Label */}
      <span
        className="
          relative z-10
          ml-4
          whitespace-nowrap
          text-[10px] tracking-[0.2em] uppercase font-sans font-bold
          transition-all duration-500
        "
      >
        {label}
      </span>
    </button>
  );
};

export default ElegantButton;
