import { getCurrentUser } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Project from "@/model/Project";
import Task from "@/model/Task";
import { redirect } from "next/navigation";

export async function getDashboardStats() {
  await dbConnect();
  const currentUser = await getCurrentUser();

  if (!currentUser) {
      redirect("/login");
  }
  const totalProjects = await Project.countDocuments({
    userId: currentUser.userId,
  });
  const userProjectIds = await Project.find({
    userId: currentUser.userId,
  }).distinct("_id");
  const totalTasks = await Task.countDocuments({
    projectId: { $in: userProjectIds },
  });
  const inProgressTasks = await Task.countDocuments({
    projectId: { $in: userProjectIds },
    status: { $in: ["todo", "in_progress", "in_review"] },
  });
  const completedTasks = await Task.countDocuments({
    projectId: { $in: userProjectIds },
    status: "done",
  });
  const recentProjects = await Project.find({ userId: currentUser.userId })
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();
  const recentTasks = await Task.find({ projectId: { $in: userProjectIds } })
    .sort({ createdAt: -1 })
    .limit(5)
    .populate("projectId", "name");
  return {
    totalProjects,
    totalTasks,
    inProgressTasks,
    completedTasks,
    recentProjects,
    recentTasks,
  };
}
