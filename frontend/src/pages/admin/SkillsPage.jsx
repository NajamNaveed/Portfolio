import { useEffect, useState } from "react";
import { Star } from "lucide-react";
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
import skillService from "../../services/cms/skillService.js";

const EMPTY_SKILL = { name: "", category: "", icon: "", description: "", proficiency: 0, order: 0, isVisible: true };

const SkillsPage = () => {
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
  } = useCollectionCrud(skillService, { resourceLabel: "Skill" });

  const [form, setForm] = useState(EMPTY_SKILL);

  useEffect(() => {
    setForm(editingItem ? { ...EMPTY_SKILL, ...editingItem } : EMPTY_SKILL);
  }, [editingItem, isFormOpen]);

  const handleChange = (field) => (event) => {
    const value = event.target.type === "number" ? Number(event.target.value) : event.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await submitForm(form);
  };

  const columns = [
    { key: "name", label: "Name" },
    { key: "category", label: "Category", render: (item) => item.category || "—" },
    { key: "proficiency", label: "Proficiency", render: (item) => `${item.proficiency}%` },
    {
      key: "isVisible",
      label: "Status",
      render: (item) => <Badge variant={item.isVisible ? "success" : "neutral"}>{item.isVisible ? "Visible" : "Hidden"}</Badge>,
    },
  ];

  return (
    <div>
      <PageHeader title="Skills" description="Skills displayed on your public portfolio." />

      <Card className="p-5">
        <CrudToolbar onAddClick={openCreate} addLabel="Add Skill" />

        {hasError ? (
          <p className="rounded-lg border border-red-900/50 bg-red-950/30 p-4 text-sm text-red-300">
            Unable to load skills right now.
          </p>
        ) : (
          <>
            <CrudTable
              columns={columns}
              items={items}
              isLoading={isLoading}
              emptyIcon={Star}
              emptyTitle="No skills yet"
              emptyDescription="Add your first skill to show it on the public portfolio."
              onEdit={openEdit}
              onDelete={requestDelete}
              getItemLabel={(item) => item.name}
            />
            <Pagination pagination={pagination} onPageChange={goToPage} />
          </>
        )}
      </Card>

      <Modal isOpen={isFormOpen} onClose={closeForm} title={editingItem ? "Edit Skill" : "Add Skill"}>
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
          <Input label="Name" value={form.name} onChange={handleChange("name")} disabled={isSaving} required maxLength={80} />
          <Input label="Category" value={form.category} onChange={handleChange("category")} disabled={isSaving} maxLength={80} />
          <Input label="Icon (URL or identifier)" value={form.icon} onChange={handleChange("icon")} disabled={isSaving} />
          <Textarea label="Description" value={form.description} onChange={handleChange("description")} disabled={isSaving} maxLength={300} rows={3} />
          <Input
            label="Proficiency (0-100)"
            type="number"
            min={0}
            max={100}
            value={form.proficiency}
            onChange={handleChange("proficiency")}
            disabled={isSaving}
          />
          <Input label="Order" type="number" value={form.order} onChange={handleChange("order")} disabled={isSaving} />
          <Switch id="skill-visible" label="Visible" checked={form.isVisible} onChange={(value) => setForm((prev) => ({ ...prev, isVisible: value }))} disabled={isSaving} />
          <FormActions onCancel={closeForm} isSaving={isSaving} saveLabel={editingItem ? "Save Changes" : "Add Skill"} />
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        isConfirming={isDeleting}
        title="Delete Skill?"
        description={deleteTarget ? `Are you sure you want to delete "${deleteTarget.name}"? This action cannot be undone.` : ""}
      />
    </div>
  );
};

export default SkillsPage;
