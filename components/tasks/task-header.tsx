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
    router.push(params.toString() ? `?${params.toString()}` : "/tasks");
  }, [router, status, priority, project]);
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
      <div className="flex justify-end pe-3">
        <Input
          placeholder="Search..."
          wrapperClassName="w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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
