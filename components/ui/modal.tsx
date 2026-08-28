import { X } from "lucide-react";
import Button from "./button";
import { ReactNode } from "react";
type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
};
export default function Modal({
  open,
  onClose,
  children,
  className = "",
}: ModalProps) {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex items-center justify-center p-2 transition-colors
        ${open ? "visible bg-black/20" : "invisible"}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl bg-white p-4 shadow transition-all sm:p-6
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
