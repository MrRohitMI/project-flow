import mongoose, { Schema, Document } from "mongoose";

type StatusTypes = "active" | "completed" | "archived";
export interface Project extends Document {
  name: string;
  key: string;
  description: string;
  status: StatusTypes;
  startDate?: Date;
  endDate?: Date;
}

const ProjectSchema: Schema<Project> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Project name is required"],
      trim: true,
      minlength: [2, "Project name must be at least 2 characters"],
      maxlength: [100, "Project name cannot exceed 100 characters"],
    },

    key: {
      type: String,
      required: [true, "Project key is required"],
      trim: true,
      uppercase: true,
      minlength: [1, "Project key must be at least 1 character"],
      maxlength: [10, "Project key cannot exceed 10 characters"],
    },

    description: {
      type: String,
      required: [true, "Project description is required"],
      trim: true,
      minlength: [2, "Project description must be at least 2 characters"],
      maxlength: [1000, "Project description cannot exceed 1000 characters"],
    },

    status: {
      type: String,
      enum: ["active", "completed", "archived"],
      default: "active",
    },

    startDate: {
      type: Date,
    },

    endDate: {
      type: Date,
    },
  },
  { timestamps: true },
);

const Project =
  mongoose.models.Project || mongoose.model<Project>("Project", ProjectSchema);

export default Project;
