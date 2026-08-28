type BadgeValue =
  | "TODO"
  | "IN_PROGRESS"
  | "IN_REVIEW"
  | "DONE"
  | "ACTIVE"
  | "ARCHIVED"
  | "COMPLETED"
  | "LOW"
  | "MEDIUM"
  | "HIGH";
export default function Badge({ status }: { status: BadgeValue }) {
  const statusStyle: Record<BadgeValue, string> = {
    // Task status
    TODO: "bg-gray-100 text-gray-700",
    IN_PROGRESS: "bg-blue-100 text-blue-700",
    IN_REVIEW: "bg-orange-100 text-orange-700",
    DONE: "bg-green-100 text-green-700",

    // Project status
    ACTIVE: "bg-blue-100 text-blue-700",
    ARCHIVED: "bg-gray-200 text-gray-600",
    COMPLETED: "bg-green-100 text-green-700",

    // Priority
    LOW: "bg-gray-100 text-gray-600",
    MEDIUM: "bg-yellow-100 text-yellow-700",
    HIGH: "bg-red-100 text-red-700",
  };
  return (
    <span
      className={`${statusStyle[status]} rounded-full px-2 py-1 text-xs font-medium`}
    >
      {status}
    </span>
  );
}
