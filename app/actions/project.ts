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
  values?: {
    name?: string;
    key?: string;
    description?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
  };
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
      values: {
        name: String(formData.get("name") ?? ""),
        key: String(formData.get("key") ?? ""),
        description: String(formData.get("description") ?? ""),
        status: String(formData.get("status") ?? ""),
        startDate: String(formData.get("startDate") ?? ""),
        endDate: String(formData.get("endDate") ?? ""),
      },
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
export const getProjects = async () => {
  await dbConnect();
  const projects = await Project.find().lean();
  return projects;
};

export const updateProject = async (
  prevState: ProjectActionState,
  formData: FormData,
): Promise<ProjectActionState> => {
  const projectId = formData.get("projectId");

  if (!projectId || typeof projectId !== "string") {
    return {
      success: false,
      message: "Project ID is required.",
    };
  }

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
      values: {
        name: String(formData.get("name") ?? ""),
        key: String(formData.get("key") ?? ""),
        description: String(formData.get("description") ?? ""),
        status: String(formData.get("status") ?? ""),
        startDate: String(formData.get("startDate") ?? ""),
        endDate: String(formData.get("endDate") ?? ""),
      },
    };
  }

  await dbConnect();

  try {
    const project = await Project.findByIdAndUpdate(projectId, result.data, {
      new: true,
      runValidators: true,
    });

    if (!project) {
      return {
        success: false,
        message: "Project not found.",
      };
    }

    return {
      success: true,
      message: "Project updated successfully.",
    };
  } catch (error) {
    console.error("Failed to update project:", error);

    return {
      success: false,
      message: "Failed to update project.",
    };
  }
};
export const deleteProject = async (
  projectId: string,
): Promise<ProjectActionState> => {
  if (!projectId) {
    return {
      success: false,
      message: "Project Id is required.",
    };
  }
  await dbConnect();
  try {
    const project = await Project.findByIdAndDelete(projectId);
    if (!project) {
      return {
        success: false,
        message: "Project not found.",
      };
    }
    return {
      success: true,
      message: "Project deleted successfully.",
    };
  } catch (error) {
    console.error("Failed to delete project :", error);
    return {
      success: false,
      message: "Failed to delete project.",
    };
  }
};
