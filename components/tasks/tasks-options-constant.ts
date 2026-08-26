export type OptionsTypes = {
  label: string;
  value: string;
};

export const statusOptions: OptionsTypes[] = [
  { label: "TODO", value: "todo" },
  { label: "IN_PROGRESS", value: "in_progress" },
  { label: "IN_REVIEW", value: "in_review" },
  { label: "DONE", value: "done" },
];
export const priorityOptions: OptionsTypes[] = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
];