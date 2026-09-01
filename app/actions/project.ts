"use server";

import dbConnect from "@/lib/mongodb";
import { projectSchema } from "@/schemas/project.schema";
import Project from "@/model/Project";
import { getCurrentUser } from "@/lib/auth";

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
  _prevState: ProjectActionState,
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
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return {
      success: false,
      message: "Unauthorized. Please login.",
    };
  }
  try {
    await Project.create({ ...result.data, userId: currentUser.userId });
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
export const getProjects = async (
  search?: string,
  status?: string,
  page: number = 1,
  limit: number = 10,
) => {
  await dbConnect();
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return {
      projects: [],
      total: 0,
    };
  }
  const query: any = { userId: currentUser.userId };

  if (search) {
    query.$or = [
      {
        name: {
          $regex: search,
          $options: "i",
        },
      },
      { key: { $regex: search, $options: "i" } },
    ];
  }
  if (status) {
    query.status = status;
  }
  const total = await Project.countDocuments(query);
  const skip = (page - 1) * limit;
  const projects = await Project.find(query).skip(skip).limit(limit);
  return { projects, total };
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
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return {
      success: false,
      message: "Unauthorized. Please login.",
    };
  }
  try {
    const project = await Project.findOneAndUpdate(
      { _id: projectId, userId: currentUser.userId },
      result.data,
      {
        new: true,
        runValidators: true,
      },
    );

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
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return {
      success: false,
      message: "Unauthorized. Please login.",
    };
  }
  try {
    const project = await Project.findOneAndDelete({
      _id: projectId,
      userId: currentUser.userId,
    });
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
