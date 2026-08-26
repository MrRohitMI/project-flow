"use client";
import { useEffect, useState } from "react";
import Button from "../ui/button";
import { Plus } from "lucide-react";
import Modal from "../ui/modal";
import ProjectForm from "./project-form";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearMessages } from "@/store/slices/uiSlice";
import Input from "../ui/form/input";
import { useRouter } from "next/navigation";
import Select from "../ui/form/select";
import { statusOptions } from "./projects-options-constant";

export default function ProjectHeader() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const successMessage = useAppSelector((store) => store.ui.successMessage);
  const errorMessage = useAppSelector((store) => store.ui.errorMessage);
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
      router.push(params.toString() ? `?${params.toString()}` : "/projects");
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [search, router]);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    updateParams(params, "status", status);
    router.push(params.toString() ? `?${params.toString()}` : "/projects");
  }, [router, status]);
  return (
    <>
      <div className="flex items-center justify-between px-2">
        <section id="project-title" className="mb-4 px-3 pt-3">
          <h2 className="text-3xl font-bold text-gray-800">Projects</h2>
          <h4 className="text-lg font-medium text-gray-500">
            Manage your projects.
          </h4>
        </section>
        <Button onClick={() => setOpen(true)}>
          <Plus size={18} /> Project
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
          placeholder="- Select Status -"
          options={statusOptions}
          wrapperClassName="w-1/3"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="bg-white"
        />
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
        <div>
          <ProjectForm
            onClose={() => {
              setOpen(false);
            }}
          />
        </div>
      </Modal>
    </>
  );
}
