import { Pencil, Trash2 } from "lucide-react";
import Skeleton from "../ui/Skeleton.jsx";
import EmptyState from "../ui/EmptyState.jsx";
import Button from "../ui/Button.jsx";

/**
 * Generic list renderer used by every collection CMS page.
 *
 * columns: [{ key, label, render?(item) }]
 * items: array of records (each must have `_id`)
 * On desktop this renders a table; on mobile it renders stacked cards
 * built from the same column config, so no data shape is duplicated.
 */
const CrudTable = ({
  columns,
  items,
  isLoading,
  emptyIcon,
  emptyTitle = "Nothing here yet",
  emptyDescription,
  onEdit,
  onDelete,
  getItemLabel = (item) => item.title || item.name || "this item",
}) => {
  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-14 w-full" />
        ))}
      </div>
    );
  }

  if (!items || items.length === 0) {
    return <EmptyState icon={emptyIcon} title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div>
      {/* Desktop table */}
      <div className="hidden overflow-x-auto rounded-xl border border-slate-800 md:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/60 text-xs uppercase tracking-wide text-slate-500">
              {columns.map((column) => (
                <th key={column.key} className="px-4 py-3 font-medium">
                  {column.label}
                </th>
              ))}
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id} className="border-b border-slate-800/60 last:border-0 hover:bg-slate-900/40">
                {columns.map((column) => (
                  <td key={column.key} className="px-4 py-3 align-middle text-slate-300">
                    {column.render ? column.render(item) : item[column.key]}
                  </td>
                ))}
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="ghost" size="sm" onClick={() => onEdit(item)} aria-label={`Edit ${getItemLabel(item)}`}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(item)}
                      className="text-red-400 hover:bg-red-950/40 hover:text-red-300"
                      aria-label={`Delete ${getItemLabel(item)}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile stacked cards */}
      <div className="space-y-3 md:hidden">
        {items.map((item) => (
          <div key={item._id} className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
            <dl className="space-y-1.5">
              {columns.map((column) => (
                <div key={column.key} className="flex items-start justify-between gap-3 text-sm">
                  <dt className="shrink-0 text-xs font-medium uppercase tracking-wide text-slate-500">
                    {column.label}
                  </dt>
                  <dd className="text-right text-slate-300">
                    {column.render ? column.render(item) : item[column.key]}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-3 flex justify-end gap-2 border-t border-slate-800 pt-3">
              <Button type="button" variant="outline" size="sm" onClick={() => onEdit(item)}>
                <Pencil className="h-3.5 w-3.5" />
                Edit
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onDelete(item)}
                className="border-red-900/50 text-red-400 hover:border-red-700 hover:bg-red-950/40"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CrudTable;
