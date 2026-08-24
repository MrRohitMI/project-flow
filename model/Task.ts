import mongoose, {Schema,Document,Types} from "mongoose";

type StatusTypes = "todo" | "in-progress" | "in-review" | "done";

type PriorityTypes = "low" | "medium" | "high";

interface Task extends Document {
    title: string;
    description? : string;
    status: StatusTypes;
    priority: PriorityTypes;
    projectId: Types.ObjectId;
    dueDate? : Date
}

const TaskSchema: Schema<Task> = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: [3,"Title must be min 3 characters"],
        maxLength: [100, "Title must be upto 100 characters"]
    },
    description: {
        type: String,
        trim: true,
        minLength: [1,"Description must be min 1 character"],
        maxLength: [255, "Description must be upto 255 characters"],
    },
    status: {
        type:String,
        enum: ["todo","in-progress","in-review","done"],
        default: "todo"
    },
    priority: {
        type:String,
        enum: ["low","medium","high"],
        default: "low"
    },
    projectId: {
        type: Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },
    dueDate: {
        type:Date
    }

})

const Task = mongoose.models.Task || mongoose.model<Task>("Task",TaskSchema);

export default Task;