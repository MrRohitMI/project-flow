import { X } from "lucide-react";
import Button from "./button";

export default function Modal({ open, onClose, children,className = "" }) {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center transition-colors 
        ${open ? "visible bg-black/20" : "invisible"}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative bg-white rounded-xl shadow p-6 transition-all 
            ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"} ${className}`}
      >
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2"
          onClick={onClose}
        >
          <X />
        </Button>
        {children}
      </div>
    </div>
  );
}
