"use server";

import { projectSchema } from "@/schemas/project.schema";

type ErrorObject = {
  name?: string;
  key?: string;
  description?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
};
type ProjectActionState = {
  success: boolean;
  message: string;
  errors?: ErrorObject;
};
export const createProject = async (
  prevState: ProjectActionState,
  formData: FormData,
): Promise<ProjectActionState> => {
  const data = {
    name: formData.get("name"),
    key: formData.get("key"),
    description: formData.get("description"),
    status: formData.get("status"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
  };
  const result = projectSchema.safeParse(data);

  if (!result.success) {
    const errors: ErrorObject = {};
    result.error.issues.forEach((issue) => {
      const field = issue.path[0];
      if (typeof field === "string") {
        errors[field as keyof ErrorObject] = issue.message;
      }
    });
    return {
      success: false,
      message: "Please fix the errors",
      errors,
    };
  }
  return {
    success: true,
    message: "Project received successfully",
  };
};
