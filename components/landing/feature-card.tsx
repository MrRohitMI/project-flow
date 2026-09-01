import { FeatureTypes } from "./landing-features";

export default function FeatureCard({
  title,
  description,
  icon,
}: FeatureTypes) {
  const Icon = icon;
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
        <Icon />
      </div>

      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-gray-600">{description}</p>
    </div>
  );
}
