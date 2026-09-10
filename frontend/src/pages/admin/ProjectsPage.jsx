import { useEffect, useState } from "react";
import { FolderKanban } from "lucide-react";
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
import ImageListEditor from "../../components/admin/ImageListEditor.jsx";
import useCollectionCrud from "../../hooks/useCollectionCrud.js";
import projectService from "../../services/cms/projectService.js";

const EMPTY_PROJECT = {
  title: "",
  slug: "",
  shortDescription: "",
  description: "",
  coverImage: "",
  images: [],
  technologies: "",
  githubUrl: "",
  liveUrl: "",
  featured: false,
  order: 0,
  isVisible: true,
};

const ProjectsPage = () => {
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
  } = useCollectionCrud(projectService, { resourceLabel: "Project" });

  const [form, setForm] = useState(EMPTY_PROJECT);

  useEffect(() => {
    if (editingItem) {
      setForm({
        ...EMPTY_PROJECT,
        ...editingItem,
        images: editingItem.images || [],
        technologies: (editingItem.technologies || []).join(", "),
      });
    } else {
      setForm(EMPTY_PROJECT);
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
      images: (form.images || []).map((url) => url.trim()).filter(Boolean),
      technologies: form.technologies.split(",").map((tech) => tech.trim()).filter(Boolean),
    };
    if (!payload.slug) delete payload.slug;
    await submitForm(payload);
  };

  const columns = [
    { key: "title", label: "Title" },
    { key: "slug", label: "Slug" },
    {
      key: "featured",
      label: "Featured",
      render: (item) => (item.featured ? <Badge variant="info">Featured</Badge> : "—"),
    },
    {
      key: "isVisible",
      label: "Status",
      render: (item) => <Badge variant={item.isVisible ? "success" : "neutral"}>{item.isVisible ? "Visible" : "Hidden"}</Badge>,
    },
  ];

  return (
    <div>
      <PageHeader title="Projects" description="Portfolio projects shown to visitors." />

      <Card className="p-5">
        <CrudToolbar onAddClick={openCreate} addLabel="Add Project" />

        {hasError ? (
          <p className="rounded-lg border border-red-900/50 bg-red-950/30 p-4 text-sm text-red-300">
            Unable to load projects right now.
          </p>
        ) : (
          <>
            <CrudTable
              columns={columns}
              items={items}
              isLoading={isLoading}
              emptyIcon={FolderKanban}
              emptyTitle="No projects yet"
              emptyDescription="Add your first project to show it on the public portfolio."
              onEdit={openEdit}
              onDelete={requestDelete}
              getItemLabel={(item) => item.title}
            />
            <Pagination pagination={pagination} onPageChange={goToPage} />
          </>
        )}
      </Card>

      <Modal isOpen={isFormOpen} onClose={closeForm} title={editingItem ? "Edit Project" : "Add Project"}>
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
          <Input label="Title" value={form.title} onChange={handleChange("title")} disabled={isSaving} required maxLength={150} />
          <Input
            label="Slug"
            value={form.slug}
            onChange={handleChange("slug")}
            disabled={isSaving}
            hint="Leave blank to auto-generate from the title."
            placeholder="my-project"
          />
          <Input label="Short Description" value={form.shortDescription} onChange={handleChange("shortDescription")} disabled={isSaving} required maxLength={300} />
          <Textarea label="Description" value={form.description} onChange={handleChange("description")} disabled={isSaving} required rows={4} />
          <Input label="Cover Image URL" value={form.coverImage} onChange={handleChange("coverImage")} disabled={isSaving} placeholder="https://..." />
          <ImageListEditor
            label="Gallery Images"
            images={form.images}
            onChange={(images) => setForm((prev) => ({ ...prev, images }))}
            disabled={isSaving}
          />
          <Input label="Technologies (comma-separated)" value={form.technologies} onChange={handleChange("technologies")} disabled={isSaving} placeholder="React, Node.js" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input label="GitHub URL" value={form.githubUrl} onChange={handleChange("githubUrl")} disabled={isSaving} placeholder="https://github.com/..." />
            <Input label="Live URL" value={form.liveUrl} onChange={handleChange("liveUrl")} disabled={isSaving} placeholder="https://..." />
          </div>
          <Input label="Order" type="number" value={form.order} onChange={handleChange("order")} disabled={isSaving} />
          <Switch id="project-featured" label="Featured" checked={form.featured} onChange={(value) => setForm((prev) => ({ ...prev, featured: value }))} disabled={isSaving} />
          <Switch id="project-visible" label="Visible" checked={form.isVisible} onChange={(value) => setForm((prev) => ({ ...prev, isVisible: value }))} disabled={isSaving} />
          <FormActions onCancel={closeForm} isSaving={isSaving} saveLabel={editingItem ? "Save Changes" : "Add Project"} />
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        isConfirming={isDeleting}
        title="Delete Project?"
        description={deleteTarget ? `Are you sure you want to delete "${deleteTarget.title}"? This action cannot be undone.` : ""}
      />
    </div>
  );
};

export default ProjectsPage;
