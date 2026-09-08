import { PackageSearch } from "lucide-react";

export default function EmptyState({ title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-md border border-dashed border-border px-6 py-16 text-center">
      <PackageSearch size={30} strokeWidth={1.5} className="text-muted" />
      <h3 className="mt-4 font-serif text-lg text-ink">{title}</h3>
      {description && (
        <p className="mt-1.5 max-w-sm text-[14px] text-muted">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
