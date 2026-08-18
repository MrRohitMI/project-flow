import { createProject } from "@/app/actions/project";
import Button from "./ui/button";

export default function ProjectForm() {
    
  return (
    <form action={createProject}>
      <div>
        <label className="text-md text-gray-600">Project Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter project name"
          className="w-full rounded-md border border-gray-300 px-3 py-2
               outline-none focus:border-blue-500 focus:ring-2
               focus:ring-blue-100 mb-2"
        />
      </div>

      <div>
        <label className="text-md text-gray-600">Project Key</label>
        <input
          type="text"
          id="key"
          name="key"
          placeholder="e.g. FLOW"
          className="w-full rounded-md border border-gray-300 px-3 py-2
               outline-none focus:border-blue-500 focus:ring-2
               focus:ring-blue-100 mb-2"
        />
      </div>

      <div>
        <label className="text-md text-gray-600">Description</label>
        <textarea
          id="description"
          name="description"
          placeholder="Enter project description"
          rows={4}
          className="w-full rounded-md border border-gray-300 px-3 py-2
               outline-none focus:border-blue-500 focus:ring-2
               focus:ring-blue-100 mb-2"
        />
      </div>

      <div>
        <label className="text-md text-gray-600">Status</label>
        <select
          id="status"
          name="status"
          className="w-full rounded-md border border-gray-300 px-3 py-2
               outline-none focus:border-blue-500 focus:ring-2
               focus:ring-blue-100 mb-2"
        >
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      <div>
        <label className="text-md text-gray-600">Start Date</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          className="w-full rounded-md border border-gray-300 px-3 py-2
               outline-none focus:border-blue-500 focus:ring-2
               focus:ring-blue-100 mb-2"
        />
      </div>

      <div>
        <label className="text-md text-gray-600">End Date</label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          className="w-full rounded-md border border-gray-300 px-3 py-2
               outline-none focus:border-blue-500 focus:ring-2
               focus:ring-blue-100 mb-2"
        />
      </div>

      <div className="flex justify-end gap-4 mt-4">
        <Button>Submit</Button>
        <Button variant="secondary" type="button">Cancel</Button>
      </div>
    </form>
  );
}
