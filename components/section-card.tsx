import type { ReactNode } from "react";

type SectionCardProps = {
  id: string;
  title: string;
  children: ReactNode;
};
export default function SectionCard({ id, title, children }: SectionCardProps) {
  return (
    <section
      id={id}
      className="mx-3 mb-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
    >
      <h3 className="border-b border-gray-200 px-4 py-3 text-lg font-bold">
        {title}
      </h3>
      {children}
    </section>
  );
}
