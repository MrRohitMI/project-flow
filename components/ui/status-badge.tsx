type Status = "TODO" | "IN_PROGRESS" | "IN_REVIEW" | "DONE";
export default function StatusBadge({ status }: { status: Status }) {
  const statusStyle = {
    TODO: "bg-gray-300",
    IN_PROGRESS: "bg-blue-300",
    IN_REVIEW: "bg-orange-300",
    DONE: "bg-green-300",
  };
  return (
    <span
      className={`${statusStyle[status]} rounded-full px-2 py-1 text-xs font-medium`}
    >
      {status}
    </span>
  );
}
