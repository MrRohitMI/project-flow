"use server";

import { taskSchema } from "@/schemas/task.schema";

type ErrorObject = {
  title?: string;
  description?: string;
  projectId?: string;
  status?: string;
  priority?: string;
};
type TaskActionState = {
  success: boolean;
  message: string;
  errors?: ErrorObject;
};
export default async function createTask(
  prevState: TaskActionState,
  formData: FormData,
): Promise<TaskActionState> {
  const data = {
    title: formData.get("title"),
    description: formData.get("description"),
    projectId: formData.get("projectId"),
    status: formData.get("status"),
    priority: formData.get("priority"),
  };
  const result = taskSchema.safeParse(data);
  if (!result.success) {
    const errors: ErrorObject = {};
    console.log(result.error?.issues);
    result.error?.issues.map((issue) => {
      const field = issue.path[0];
      errors[field as keyof ErrorObject] = issue.message;
    });
    return {
      success: false,
      message: "Please fix the errors.",
      errors,
    };
  }
  return {
    success: true,
    message: "Task has been created successfully.",
  };
}
