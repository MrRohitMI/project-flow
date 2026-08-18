"use server";
export const createProject = async (formData: FormData) => {
  const name = formData.get("name");
  const key = formData.get("key");
  const description = formData.get("description");
  const status = formData.get("status");
  const startDate = formData.get("startDate");
  const endDate = formData.get("endDate");
  console.log(name, key, description, status, startDate, endDate);
  return {
    success: true,
    message: "Project received successfully",
  };
};
