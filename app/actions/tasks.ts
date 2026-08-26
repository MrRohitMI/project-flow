"use server";

import dbConnect from "@/lib/mongodb";
import Project from "@/model/Project";
import Task from "@/model/Task";
import { taskSchema } from "@/schemas/task.schema";
import mongoose from "mongoose";

type ErrorObject = {
  title?: string;
  description?: string;
  projectId?: string;
  status?: string;
  priority?: string;
  dueDate?: string;
};
type TaskActionState = {
  success: boolean;
  message: string;
  errors?: ErrorObject;
  values?: {
    title: string;
    description: string;
    projectId: string;
    status: string;
    priority: string;
    dueDate: string;
  };
};
export async function createTask(
  prevState: TaskActionState,
  formData: FormData,
): Promise<TaskActionState> {
  const data = {
    title: formData.get("title"),
    description: formData.get("description"),
    projectId: formData.get("projectId"),
    status: formData.get("status"),
    priority: formData.get("priority"),
    dueDate: formData.get("dueDate"),
  };
  const result = taskSchema.safeParse(data);
  if (!result.success) {
    const errors: ErrorObject = {};

    result.error?.issues.map((issue) => {
      const field = issue.path[0];
      errors[field as keyof ErrorObject] = issue.message;
    });
    return {
      success: false,
      message: "Please fix the errors.",
      errors,
      values: {
        title: String(formData.get("title") ?? ""),
        description: String(formData.get("description") ?? ""),
        projectId: String(formData.get("projectId") ?? ""),
        status: String(formData.get("status") ?? ""),
        priority: String(formData.get("priority") ?? ""),
        dueDate: String(formData.get("dueDate") ?? ""),
      },
    };
  }
  await dbConnect();
  if (!mongoose.Types.ObjectId.isValid(result.data.projectId)) {
    return {
      success: false,
      message: "Invalid projectId.",
      errors: {
        projectId: "Invalid project selected.",
      },
    };
  }
  const project = await Project.findById(result.data.projectId);
  if (!project) {
    return {
      success: false,
      message: "Project not found.",
      errors: {
        projectId: "Selected project does not exist.",
      },
    };
  }
  try {
    await Task.create({ ...result.data, projectId: project._id });
    return {
      success: true,
      message: "Task has been created successfully.",
    };
  } catch (error) {
    console.error("Failed to create task:", error);
    return {
      success: false,
      message: "Failed to create task. Please try again.",
    };
  }
}
export async function getTasks(
  search?: string,
  status?: string,
  priority?: string,
  project?: string,
) {
  await dbConnect();
  const query: any = {};
  if (search) {
    query.title = {
      $regex: search,
      $options: "i",
    };
  }
  if (status) {
    query.status = status;
  }
  if (priority) {
    query.priority = priority;
  }
  if (project) {
    query.projectId = project;
  }
  const tasks = await Task.find(query).populate("projectId", "name");
  return tasks;
}
export async function updateTask(
  prevState: TaskActionState,
  formData: FormData,
): Promise<TaskActionState> {
  const taskId = formData.get("taskId");

  if (!taskId || typeof taskId !== "string") {
    return {
      success: false,
      message: "Task ID is required.",
    };
  }

  const data = {
    title: formData.get("title"),
    description: formData.get("description"),
    projectId: formData.get("projectId"),
    status: formData.get("status"),
    priority: formData.get("priority"),
    dueDate: formData.get("dueDate"),
  };

  const result = taskSchema.safeParse(data);

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
      message: "Please fix the errors.",
      errors,
      values: {
        title: String(formData.get("title") ?? ""),
        description: String(formData.get("description") ?? ""),
        projectId: String(formData.get("projectId") ?? ""),
        status: String(formData.get("status") ?? ""),
        priority: String(formData.get("priority") ?? ""),
        dueDate: String(formData.get("dueDate") ?? ""),
      },
    };
  }
  if (!mongoose.Types.ObjectId.isValid(result.data.projectId)) {
    return {
      success: false,
      message: "Invalid projectId.",
      errors: {
        projectId: "Invalid project selected.",
      },
    };
  }
  await dbConnect();
  const project = await Project.findById(result.data.projectId);

  if (!project) {
    return {
      success: false,
      message: "Project not found.",
      errors: {
        projectId: "Selected project does not exist.",
      },
    };
  }

  try {
    const task = await Task.findByIdAndUpdate(
      taskId,
      {
        ...result.data,
        projectId: project._id,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!task) {
      return {
        success: false,
        message: "Task not found.",
      };
    }

    return {
      success: true,
      message: "Task updated successfully.",
    };
  } catch (error) {
    console.error("Failed to update task:", error);

    return {
      success: false,
      message: "Failed to update task.",
    };
  }
}
export async function deleteTask(taskId: string) {
  await dbConnect();

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    return {
      success: false,
      message: "Invalid task.",
    };
  }

  try {
    const task = await Task.findByIdAndDelete(taskId);

    if (!task) {
      return {
        success: false,
        message: "Task not found.",
      };
    }

    return {
      success: true,
      message: "Task deleted successfully.",
    };
  } catch (error) {
    console.error("Failed to delete task:", error);

    return {
      success: false,
      message: "Failed to delete task. Please try again.",
    };
  }
}
