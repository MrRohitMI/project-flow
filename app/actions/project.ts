"use server";
type ErrorObject = {
  name? : string,
  key? : string,
  description? :string,
  status? :string
}
type ProjectActionState = {
  success: boolean;
  message: string;
  errors?: ErrorObject;
};
export const createProject = async (
  prevState: ProjectActionState,
  formData: FormData,
): Promise<ProjectActionState> => {
  const name = formData.get("name");
  const key = formData.get("key");
  const description = formData.get("description");
  const status = formData.get("status");
  const startDate = formData.get("startDate");
  const endDate = formData.get("endDate");
  const errors:ErrorObject = {};
  if (!name || typeof name !== "string" || name.trim() === "") {
    errors.name ="Project name is required.";
  }
  if (!key || typeof key !== "string" || key.trim() === "") {
    errors.key = "Project key is required.";
  }
  if (
    !description ||
    typeof description !== "string" ||
    description.trim() === ""
  ) {
    errors.description = "Project description is required.";
  }
  if (!status || typeof status !== "string" || status.trim() === "") {
    errors.status = "Project status is required.";
  }
  if (Object.keys(errors).length >= 1) {
    return {
      success: false,
      message: "Please fix the errors",
      errors: errors,
    };
  }
  console.log(name, key, description, status, startDate, endDate);
  return {
    success: true,
    message: "Project received successfully",
  };
};
