import { LucideIcon } from "lucide-react";

type Card = {
  label: string;
  count: number;
  icon: LucideIcon;
};
export default function StatCard({ card }: { card: Card }) {
  const Icon = card.icon;
  return (
    <div
      className="rounded-2xl border
           border-gray-400 p-3 shadow-sm hover:shadow-md"
    >
      <div className="flex gap-3">
        <Icon />
        <h3 className="font-bold text-xl">{card.label}</h3>
      </div>

      <p className="font-bold text-gray-500">{card.count}</p>
    </div>
  );
}
