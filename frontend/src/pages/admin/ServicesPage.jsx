import { useEffect, useState } from "react";
import { Layers } from "lucide-react";
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
import serviceService from "../../services/cms/serviceService.js";

const EMPTY_SERVICE = { title: "", description: "", icon: "", features: "", order: 0, isVisible: true };

const ServicesPage = () => {
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
  } = useCollectionCrud(serviceService, { resourceLabel: "Service" });

  const [form, setForm] = useState(EMPTY_SERVICE);

  useEffect(() => {
    if (editingItem) {
      setForm({ ...EMPTY_SERVICE, ...editingItem, features: (editingItem.features || []).join(", ") });
    } else {
      setForm(EMPTY_SERVICE);
    }
  }, [editingItem, isFormOpen]);

  const handleChange = (field) => (event) => {
    const value = event.target.type === "number" ? Number(event.target.value) : event.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      ...form,
      features: form.features
        .split(",")
        .map((feature) => feature.trim())
        .filter(Boolean),
    };
    await submitForm(payload);
  };

  const columns = [
    { key: "title", label: "Title" },
    { key: "features", label: "Features", render: (item) => (item.features?.length ? item.features.join(", ") : "—") },
    {
      key: "isVisible",
      label: "Status",
      render: (item) => <Badge variant={item.isVisible ? "success" : "neutral"}>{item.isVisible ? "Visible" : "Hidden"}</Badge>,
    },
  ];

  return (
    <div>
      <PageHeader title="Services" description="Services you offer, shown on the public portfolio." />

      <Card className="p-5">
        <CrudToolbar onAddClick={openCreate} addLabel="Add Service" />

        {hasError ? (
          <p className="rounded-lg border border-red-900/50 bg-red-950/30 p-4 text-sm text-red-300">
            Unable to load services right now.
          </p>
        ) : (
          <>
            <CrudTable
              columns={columns}
              items={items}
              isLoading={isLoading}
              emptyIcon={Layers}
              emptyTitle="No services yet"
              emptyDescription="Add your first service to show it on the public portfolio."
              onEdit={openEdit}
              onDelete={requestDelete}
              getItemLabel={(item) => item.title}
            />
            <Pagination pagination={pagination} onPageChange={goToPage} />
          </>
        )}
      </Card>

      <Modal isOpen={isFormOpen} onClose={closeForm} title={editingItem ? "Edit Service" : "Add Service"}>
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
          <Input label="Title" value={form.title} onChange={handleChange("title")} disabled={isSaving} required maxLength={120} />
          <Textarea label="Description" value={form.description} onChange={handleChange("description")} disabled={isSaving} maxLength={1000} rows={3} />
          <Input label="Icon (URL or identifier)" value={form.icon} onChange={handleChange("icon")} disabled={isSaving} />
          <Input label="Features (comma-separated)" value={form.features} onChange={handleChange("features")} disabled={isSaving} placeholder="Responsive design, REST APIs" />
          <Input label="Order" type="number" value={form.order} onChange={handleChange("order")} disabled={isSaving} />
          <Switch id="service-visible" label="Visible" checked={form.isVisible} onChange={(value) => setForm((prev) => ({ ...prev, isVisible: value }))} disabled={isSaving} />
          <FormActions onCancel={closeForm} isSaving={isSaving} saveLabel={editingItem ? "Save Changes" : "Add Service"} />
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        isConfirming={isDeleting}
        title="Delete Service?"
        description={deleteTarget ? `Are you sure you want to delete "${deleteTarget.title}"? This action cannot be undone.` : ""}
      />
    </div>
  );
};

export default ServicesPage;
