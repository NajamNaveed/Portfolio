import { useEffect, useState } from "react";
import { Briefcase } from "lucide-react";
import PageHeader from "../../components/ui/PageHeader.jsx";
import Card from "../../components/ui/Card.jsx";
import Input from "../../components/ui/Input.jsx";
import Textarea from "../../components/ui/Textarea.jsx";
import Switch from "../../components/ui/Switch.jsx";
import Modal from "../../components/ui/Modal.jsx";
import Badge from "../../components/ui/Badge.jsx";
import CrudTable from "../../components/admin/CrudTable.jsx";
import CrudToolbar from "../../components/admin/CrudToolbar.jsx";
import Pagination from "../../components/admin/Pagination.jsx";
import ConfirmDialog from "../../components/admin/ConfirmDialog.jsx";
import FormActions from "../../components/admin/FormActions.jsx";
import useCollectionCrud from "../../hooks/useCollectionCrud.js";
import experienceService from "../../services/cms/experienceService.js";

const toDateInput = (value) => (value ? new Date(value).toISOString().slice(0, 10) : "");

const EMPTY_EXPERIENCE = {
  company: "",
  position: "",
  description: "",
  startDate: "",
  endDate: "",
  current: false,
  location: "",
  technologies: "",
  order: 0,
  isVisible: true,
};

const ExperiencePage = () => {
  const {
    items,
    pagination,
    isLoading,
    hasError,
    goToPage,
    isFormOpen,
    editingItem,
    isSaving,
    formErrors,
    openCreate,
    openEdit,
    closeForm,
    submitForm,
    deleteTarget,
    isDeleting,
    requestDelete,
    cancelDelete,
    confirmDelete,
  } = useCollectionCrud(experienceService, { resourceLabel: "Experience entry" });

  const [form, setForm] = useState(EMPTY_EXPERIENCE);

  useEffect(() => {
    if (editingItem) {
      setForm({
        ...EMPTY_EXPERIENCE,
        ...editingItem,
        startDate: toDateInput(editingItem.startDate),
        endDate: toDateInput(editingItem.endDate),
        technologies: (editingItem.technologies || []).join(", "),
      });
    } else {
      setForm(EMPTY_EXPERIENCE);
    }
  }, [editingItem, isFormOpen]);

  const handleChange = (field) => (event) => {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      ...form,
      technologies: form.technologies
        .split(",")
        .map((tech) => tech.trim())
        .filter(Boolean),
      endDate: form.current ? null : form.endDate || null,
    };
    await submitForm(payload);
  };

  const columns = [
    { key: "position", label: "Position" },
    { key: "company", label: "Company" },
    {
      key: "period",
      label: "Period",
      render: (item) => {
        const start = item.startDate ? new Date(item.startDate).getFullYear() : "—";
        const end = item.current ? "Present" : item.endDate ? new Date(item.endDate).getFullYear() : "—";
        return `${start} – ${end}`;
      },
    },
    {
      key: "isVisible",
      label: "Status",
      render: (item) => <Badge variant={item.isVisible ? "success" : "neutral"}>{item.isVisible ? "Visible" : "Hidden"}</Badge>,
    },
  ];

  return (
    <div>
      <PageHeader title="Experience" description="Your work history shown on the public portfolio." />

      <Card className="p-5">
        <CrudToolbar onAddClick={openCreate} addLabel="Add Experience" />

        {hasError ? (
          <p className="rounded-lg border border-red-900/50 bg-red-950/30 p-4 text-sm text-red-300">
            Unable to load experience entries right now.
          </p>
        ) : (
          <>
            <CrudTable
              columns={columns}
              items={items}
              isLoading={isLoading}
              emptyIcon={Briefcase}
              emptyTitle="No experience entries yet"
              emptyDescription="Add your first role to show it on the public portfolio."
              onEdit={openEdit}
              onDelete={requestDelete}
              getItemLabel={(item) => `${item.position} at ${item.company}`}
            />
            <Pagination pagination={pagination} onPageChange={goToPage} />
          </>
        )}
      </Card>

      <Modal isOpen={isFormOpen} onClose={closeForm} title={editingItem ? "Edit Experience" : "Add Experience"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          {formErrors.length > 0 && (
            <div className="rounded-lg border border-red-900/50 bg-red-950/30 p-3 text-sm text-red-300">
              <ul className="list-inside list-disc space-y-1">
                {formErrors.map((message) => (
                  <li key={message}>{message}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input label="Company" value={form.company} onChange={handleChange("company")} disabled={isSaving} required maxLength={120} />
            <Input label="Position" value={form.position} onChange={handleChange("position")} disabled={isSaving} required maxLength={120} />
          </div>
          <Input label="Location" value={form.location} onChange={handleChange("location")} disabled={isSaving} maxLength={150} />
          <Textarea label="Description" value={form.description} onChange={handleChange("description")} disabled={isSaving} maxLength={2000} rows={3} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input label="Start Date" type="date" value={form.startDate} onChange={handleChange("startDate")} disabled={isSaving} required />
            <Input label="End Date" type="date" value={form.endDate} onChange={handleChange("endDate")} disabled={isSaving || form.current} hint={form.current ? "Cleared while 'Current role' is on." : undefined} />
          </div>
          <Switch id="experience-current" label="Current role" checked={form.current} onChange={(value) => setForm((prev) => ({ ...prev, current: value }))} disabled={isSaving} />
          <Input label="Technologies (comma-separated)" value={form.technologies} onChange={handleChange("technologies")} disabled={isSaving} placeholder="React, Node.js, MongoDB" />
          <Input label="Order" type="number" value={form.order} onChange={handleChange("order")} disabled={isSaving} />
          <Switch id="experience-visible" label="Visible" checked={form.isVisible} onChange={(value) => setForm((prev) => ({ ...prev, isVisible: value }))} disabled={isSaving} />
          <FormActions onCancel={closeForm} isSaving={isSaving} saveLabel={editingItem ? "Save Changes" : "Add Experience"} />
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        isConfirming={isDeleting}
        title="Delete Experience?"
        description={deleteTarget ? `Are you sure you want to delete "${deleteTarget.position} at ${deleteTarget.company}"? This action cannot be undone.` : ""}
      />
    </div>
  );
};

export default ExperiencePage;
