import { Save } from "lucide-react";
import Button from "../ui/Button.jsx";

const FormActions = ({ onCancel, isSaving, saveLabel = "Save", cancelLabel = "Cancel" }) => {
  return (
    <div className="flex justify-end gap-3 border-t border-slate-800 pt-5">
      {onCancel && (
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSaving}>
          {cancelLabel}
        </Button>
      )}
      <Button type="submit" isLoading={isSaving} disabled={isSaving}>
        <Save className="h-4 w-4" />
        {saveLabel}
      </Button>
    </div>
  );
};

export default FormActions;
