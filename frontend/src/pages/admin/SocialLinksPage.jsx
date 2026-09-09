import { useEffect, useState } from "react";
import { Share2 } from "lucide-react";
import PageHeader from "../../components/ui/PageHeader.jsx";
import Card from "../../components/ui/Card.jsx";
import Input from "../../components/ui/Input.jsx";
import Switch from "../../components/ui/Switch.jsx";
import Modal from "../../components/ui/Modal.jsx";
import Badge from "../../components/ui/Badge.jsx";
import CrudTable from "../../components/admin/CrudTable.jsx";
import CrudToolbar from "../../components/admin/CrudToolbar.jsx";
import Pagination from "../../components/admin/Pagination.jsx";
import ConfirmDialog from "../../components/admin/ConfirmDialog.jsx";
import FormActions from "../../components/admin/FormActions.jsx";
import useCollectionCrud from "../../hooks/useCollectionCrud.js";
import socialLinkService from "../../services/cms/socialLinkService.js";

const EMPTY_SOCIAL_LINK = { platform: "", label: "", url: "", icon: "", order: 0, isVisible: true };

const SocialLinksPage = () => {
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
  } = useCollectionCrud(socialLinkService, { resourceLabel: "Social link" });

  const [form, setForm] = useState(EMPTY_SOCIAL_LINK);

  useEffect(() => {
    setForm(editingItem ? { ...EMPTY_SOCIAL_LINK, ...editingItem } : EMPTY_SOCIAL_LINK);
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
    { key: "platform", label: "Platform" },
    { key: "url", label: "URL", render: (item) => <span className="truncate">{item.url}</span> },
    {
      key: "isVisible",
      label: "Status",
      render: (item) => <Badge variant={item.isVisible ? "success" : "neutral"}>{item.isVisible ? "Visible" : "Hidden"}</Badge>,
    },
  ];

  return (
    <div>
      <PageHeader title="Social Links" description="Links to your social profiles, shown in the header/footer." />

      <Card className="p-5">
        <CrudToolbar onAddClick={openCreate} addLabel="Add Social Link" />

        {hasError ? (
          <p className="rounded-lg border border-red-900/50 bg-red-950/30 p-4 text-sm text-red-300">
            Unable to load social links right now.
          </p>
        ) : (
          <>
            <CrudTable
              columns={columns}
              items={items}
              isLoading={isLoading}
              emptyIcon={Share2}
              emptyTitle="No social links yet"
              emptyDescription="Add a social profile link to show it on the public portfolio."
              onEdit={openEdit}
              onDelete={requestDelete}
              getItemLabel={(item) => item.platform}
            />
            <Pagination pagination={pagination} onPageChange={goToPage} />
          </>
        )}
      </Card>

      <Modal isOpen={isFormOpen} onClose={closeForm} title={editingItem ? "Edit Social Link" : "Add Social Link"}>
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
          <Input label="Platform" value={form.platform} onChange={handleChange("platform")} disabled={isSaving} required maxLength={60} placeholder="GitHub" />
          <Input label="Label" value={form.label} onChange={handleChange("label")} disabled={isSaving} maxLength={80} placeholder="Optional display label" />
          <Input label="URL" value={form.url} onChange={handleChange("url")} disabled={isSaving} required placeholder="https://github.com/username" />
          <Input label="Icon (URL or identifier)" value={form.icon} onChange={handleChange("icon")} disabled={isSaving} />
          <Input label="Order" type="number" value={form.order} onChange={handleChange("order")} disabled={isSaving} />
          <Switch id="social-link-visible" label="Visible" checked={form.isVisible} onChange={(value) => setForm((prev) => ({ ...prev, isVisible: value }))} disabled={isSaving} />
          <FormActions onCancel={closeForm} isSaving={isSaving} saveLabel={editingItem ? "Save Changes" : "Add Social Link"} />
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        isConfirming={isDeleting}
        title="Delete Social Link?"
        description={deleteTarget ? `Are you sure you want to delete "${deleteTarget.platform}"? This action cannot be undone.` : ""}
      />
    </div>
  );
};

export default SocialLinksPage;
