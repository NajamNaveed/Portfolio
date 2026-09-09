import { useEffect, useState } from "react";
import { Newspaper } from "lucide-react";
import PageHeader from "../../components/ui/PageHeader.jsx";
import Card from "../../components/ui/Card.jsx";
import Input from "../../components/ui/Input.jsx";
import Textarea from "../../components/ui/Textarea.jsx";
import Select from "../../components/ui/Select.jsx";
import Switch from "../../components/ui/Switch.jsx";
import Modal from "../../components/ui/Modal.jsx";
import Badge from "../../components/ui/Badge.jsx";
import CrudTable from "../../components/admin/CrudTable.jsx";
import CrudToolbar from "../../components/admin/CrudToolbar.jsx";
import Pagination from "../../components/admin/Pagination.jsx";
import ConfirmDialog from "../../components/admin/ConfirmDialog.jsx";
import FormActions from "../../components/admin/FormActions.jsx";
import useCollectionCrud from "../../hooks/useCollectionCrud.js";
import blogService from "../../services/cms/blogService.js";

const STATUS_OPTIONS = [
  { value: "", label: "All statuses" },
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
];

const FORM_STATUS_OPTIONS = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
];

const EMPTY_BLOG = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  coverImage: "",
  category: "",
  tags: "",
  status: "draft",
  featured: false,
  author: "Admin",
  seoTitle: "",
  seoDescription: "",
  isVisible: true,
};

const BlogsPage = () => {
  const [statusFilter, setStatusFilter] = useState("");

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
  } = useCollectionCrud(blogService, {
    resourceLabel: "Blog post",
    params: statusFilter ? { status: statusFilter } : {},
  });

  const [form, setForm] = useState(EMPTY_BLOG);

  useEffect(() => {
    if (editingItem) {
      setForm({ ...EMPTY_BLOG, ...editingItem, tags: (editingItem.tags || []).join(", ") });
    } else {
      setForm(EMPTY_BLOG);
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
      tags: form.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
    };
    if (!payload.slug) delete payload.slug;
    await submitForm(payload);
  };

  const columns = [
    { key: "title", label: "Title" },
    {
      key: "status",
      label: "Status",
      render: (item) => <Badge variant={item.status === "published" ? "success" : "warning"}>{item.status}</Badge>,
    },
    {
      key: "publishedAt",
      label: "Published",
      render: (item) => (item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : "—"),
    },
    {
      key: "featured",
      label: "Featured",
      render: (item) => (item.featured ? <Badge variant="info">Featured</Badge> : "—"),
    },
  ];

  return (
    <div>
      <PageHeader title="Blog" description="Blog posts for your public portfolio." />

      <Card className="p-5">
        <CrudToolbar
          onAddClick={openCreate}
          addLabel="Write Post"
          filters={[{ id: "status", value: statusFilter, onChange: setStatusFilter, options: STATUS_OPTIONS }]}
        />

        {hasError ? (
          <p className="rounded-lg border border-red-900/50 bg-red-950/30 p-4 text-sm text-red-300">
            Unable to load blog posts right now.
          </p>
        ) : (
          <>
            <CrudTable
              columns={columns}
              items={items}
              isLoading={isLoading}
              emptyIcon={Newspaper}
              emptyTitle="No blog posts yet"
              emptyDescription="Write your first post to show it on the public portfolio."
              onEdit={openEdit}
              onDelete={requestDelete}
              getItemLabel={(item) => item.title}
            />
            <Pagination pagination={pagination} onPageChange={goToPage} />
          </>
        )}
      </Card>

      <Modal isOpen={isFormOpen} onClose={closeForm} title={editingItem ? "Edit Blog Post" : "Write Blog Post"}>
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
          <Input label="Title" value={form.title} onChange={handleChange("title")} disabled={isSaving} required maxLength={200} />
          <Input label="Slug" value={form.slug} onChange={handleChange("slug")} disabled={isSaving} hint="Leave blank to auto-generate from the title." />
          <Textarea label="Excerpt" value={form.excerpt} onChange={handleChange("excerpt")} disabled={isSaving} maxLength={300} rows={2} />
          <Textarea label="Content" value={form.content} onChange={handleChange("content")} disabled={isSaving} required rows={8} />
          <Input label="Cover Image URL" value={form.coverImage} onChange={handleChange("coverImage")} disabled={isSaving} placeholder="https://..." />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input label="Category" value={form.category} onChange={handleChange("category")} disabled={isSaving} maxLength={80} />
            <Input label="Author" value={form.author} onChange={handleChange("author")} disabled={isSaving} maxLength={120} />
          </div>
          <Input label="Tags (comma-separated)" value={form.tags} onChange={handleChange("tags")} disabled={isSaving} placeholder="react, tutorial" />
          <Select
            label="Status"
            value={form.status}
            onChange={(event) => setForm((prev) => ({ ...prev, status: event.target.value }))}
            options={FORM_STATUS_OPTIONS}
            disabled={isSaving}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input label="SEO Title" value={form.seoTitle} onChange={handleChange("seoTitle")} disabled={isSaving} maxLength={160} />
            <Input label="SEO Description" value={form.seoDescription} onChange={handleChange("seoDescription")} disabled={isSaving} maxLength={300} />
          </div>
          <Switch id="blog-featured" label="Featured" checked={form.featured} onChange={(value) => setForm((prev) => ({ ...prev, featured: value }))} disabled={isSaving} />
          <Switch id="blog-visible" label="Visible" checked={form.isVisible} onChange={(value) => setForm((prev) => ({ ...prev, isVisible: value }))} disabled={isSaving} />
          <FormActions onCancel={closeForm} isSaving={isSaving} saveLabel={editingItem ? "Save Changes" : "Publish Draft"} />
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        isConfirming={isDeleting}
        title="Delete Blog Post?"
        description={deleteTarget ? `Are you sure you want to delete "${deleteTarget.title}"? This action cannot be undone.` : ""}
      />
    </div>
  );
};

export default BlogsPage;
