import { Folder, ListCheck, LoaderCircle, type LucideIcon } from "lucide-react";
import FeatureCard from "./feature-card";

export type FeatureTypes = {
  title: string;
  description: string;
  icon: LucideIcon;
};
export default function LandingFeatures() {
  const featuresInfo: FeatureTypes[] = [
    {
      title: "Projects",
      description:
        "Organize your work into separate projects and keep everything in one place.",
      icon: Folder,
    },
    {
      title: "Tasks",
      description:
        "Create, manage, and track tasks so you always know what needs to be done.",
      icon: ListCheck,
    },
    {
      title: "Progress",
      description:
        "Keep track of your work and see how your projects are progressing.",
      icon: LoaderCircle,
    },
  ];
  return (
    <section className="border-t bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Everything you need to stay organized
          </h2>

          <p className="mt-3 text-gray-600">
            Keep your projects and tasks organized in one simple workspace.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuresInfo.map((feature) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
