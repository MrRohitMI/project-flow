"use server";

import dbConnect from "@/lib/mongodb";
import { projectSchema } from "@/schemas/project.schema";
import Project from "@/model/Project";

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
  await dbConnect();
  try {
    const project = await Project.create(result.data);
    console.log("Project Created", project);
    return {
      success: true,
      message: "Project received successfully",
    };
  } catch (error) {
    console.error("Failed to create project:", error);

    return {
      success: false,
      message: "Failed to create project. Please try again.",
    };
  }
};
