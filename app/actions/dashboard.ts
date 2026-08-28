import dbConnect from "@/lib/mongodb";
import Project from "@/model/Project";
import Task from "@/model/Task";

export async function getDashboardStats() {
  await dbConnect();
  const totalProjects = await Project.countDocuments();
  const totalTasks = await Task.countDocuments();
  const inProgressTasks = await Task.countDocuments({
    status: { $in: ["todo", "in_progress", "in_review"] },
  });
  const recentProjects = await Project.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();
  const recentTasks = await Task.find().sort({ createdAt: -1 }).limit(5).populate("projectId","name")
  const completedTasks = await Task.countDocuments({ status: "done" });
  return { totalProjects, totalTasks, inProgressTasks, completedTasks ,recentProjects,recentTasks};
}
