import Modal from "../ui/Modal.jsx";
import Button from "../ui/Button.jsx";

const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description,
  confirmLabel = "Delete",
  isConfirming = false,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      {description && <p className="text-sm text-slate-400">{description}</p>}
      <div className="mt-6 flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onClose} disabled={isConfirming}>
          Cancel
        </Button>
        <Button type="button" variant="danger" onClick={onConfirm} isLoading={isConfirming}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
