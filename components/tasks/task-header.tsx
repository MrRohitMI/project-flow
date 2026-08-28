"use client";
import { Plus, RotateCcw } from "lucide-react";
import Button from "../ui/button";
import Modal from "../ui/modal";
import { useEffect, useState } from "react";
import TaskForm from "./task-form";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearMessages } from "@/store/slices/uiSlice";
import Input from "../ui/form/input";
import { useRouter } from "next/navigation";
import Select from "../ui/form/select";
import { priorityOptions, statusOptions } from "./tasks-options-constant";
type OptionProps = {
  label: string;
  value: string;
};
export default function TaskHeader({
  projectOptions,
}: {
  projectOptions: OptionProps[];
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [project, setProject] = useState("");
  const [limit, setLimit] = useState("10");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const successMessage = useAppSelector((store) => store.ui.successMessage);
  const errorMessage = useAppSelector((store) => store.ui.errorMessage);
  const handleReset = () => {
    setStatus("");
    setPriority("");
    setProject("");
  };
  useEffect(() => {
    if (!successMessage && !errorMessage) {
      return;
    }
    const timer = setTimeout(() => {
      dispatch(clearMessages());
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [successMessage, errorMessage, dispatch]);
  const updateParams = (
    params: URLSearchParams,
    key: string,
    value: string,
  ) => {
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
  };
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    updateParams(params, "search", search);
    params.set("page", "1");
    const timer = setTimeout(() => {
      router.push(params.toString() ? `?${params.toString()}` : "/tasks");
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [search, router]);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    updateParams(params, "status", status);
    updateParams(params, "priority", priority);
    updateParams(params, "project", project);
    updateParams(params, "limit", limit);
    params.set("page", "1");
    router.push(params.toString() ? `?${params.toString()}` : "/tasks");
  }, [router, status, priority, project, limit]);
  return (
    <>
      <div className="flex items-center justify-between px-2">
        <section id="project-title" className="mb-4 px-3 pt-3">
          <h2 className="text-3xl font-bold text-gray-800">Tasks</h2>
          <h4 className="text-lg font-medium text-gray-500">
            Manage your tasks.
          </h4>
        </section>
        <Button onClick={() => setOpen(true)}>
          <Plus size={18} /> Task
        </Button>
      </div>
      {successMessage && (
        <div className="p-3 bg-green-300 mx-3 mb-2 rounded-lg">
          <p className="text-md text-green-900">{successMessage}</p>
        </div>
      )}
      {errorMessage && (
        <div className="p-3 bg-red-300 mx-3 mb-2 rounded-lg">
          <p className="text-md text-red-900">{errorMessage}</p>
        </div>
      )}
      <div className="flex gap-2 mx-3 bg-gray-200 p-3 mb-3 rounded-md items-center">
        <Select
          placeholder="- Select Project -"
          options={projectOptions}
          wrapperClassName="w-1/3"
          value={project}
          onChange={(e) => setProject(e.target.value)}
          className="bg-white"
        />
        <Select
          placeholder="- Select Status -"
          wrapperClassName="w-1/3"
          value={status}
          options={statusOptions}
          onChange={(e) => setStatus(e.target.value)}
          className="bg-white"
        />
        <Select
          placeholder="- Select Priority -"
          wrapperClassName="w-1/3"
          value={priority}
          options={priorityOptions}
          onChange={(e) => setPriority(e.target.value)}
          className="bg-white"
        />
        <div className="mb-2">
          <Button variant="danger" onClick={handleReset}>
            <RotateCcw />
          </Button>
        </div>
      </div>
      <div className="flex justify-between mx-3 px-3 bg-gray-100 
      items-center py-2 rounded-lg border border-gray-200">
        <Select
          options={[10, 20, 50, 100]}
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          className="bg-white"
        />
        <Input
          placeholder="Search..."
          wrapperClassName="w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white"
        />
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        className="w-full max-w-2xl"
      >
        <TaskForm
          projectOptions={projectOptions}
          onClose={() => {
            setOpen(false);
          }}
        />
      </Modal>
    </>
  );
}
