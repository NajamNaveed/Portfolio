import { Plus, X } from "lucide-react";
import Input from "../ui/Input.jsx";
import Button from "../ui/Button.jsx";
import SafeImage from "../ui/SafeImage.jsx";

/**
 * Manages an array of image URLs (e.g. Project.images[]) with a small
 * live preview per row, individual remove buttons, and an "Add Image"
 * action - replaces the old comma-separated single text field, which
 * worked but made previewing/removing a single image awkward.
 * Empty rows are allowed while editing (so a newly-added row isn't
 * immediately deleted) but are filtered out on submit by the caller.
 */
const ImageListEditor = ({ label = "Images", images, onChange, disabled }) => {
  const list = images || [];

  const updateAt = (index, value) => {
    const next = list.slice();
    next[index] = value;
    onChange(next);
  };

  const removeAt = (index) => {
    onChange(list.filter((_, i) => i !== index));
  };

  const addRow = () => {
    onChange([...list, ""]);
  };

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-sm font-medium text-slate-300">{label}</span>
        <Button type="button" variant="ghost" size="sm" onClick={addRow} disabled={disabled}>
          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
          Add Image
        </Button>
      </div>

      {list.length === 0 && (
        <p className="text-xs text-slate-500">No gallery images yet. Add one above.</p>
      )}

      <div className="space-y-2">
        {list.map((url, index) => (
        <div key={index} className="flex items-center gap-2">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-800 bg-slate-950/60">
              {url ? (
                <SafeImage src={url} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full bg-slate-800/60" />
              )}
            </div>
            <div className="flex-1">
              <Input
                value={url}
                onChange={(event) => updateAt(index, event.target.value)}
                disabled={disabled}
                placeholder="https://..."
              />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeAt(index)}
              disabled={disabled}
              aria-label={`Remove image ${index + 1}`}
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageListEditor;
