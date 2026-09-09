import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import PageHeader from "../../components/ui/PageHeader.jsx";
import Card from "../../components/ui/Card.jsx";
import Input from "../../components/ui/Input.jsx";
import Textarea from "../../components/ui/Textarea.jsx";
import Switch from "../../components/ui/Switch.jsx";
import Button from "../../components/ui/Button.jsx";
import Skeleton from "../../components/ui/Skeleton.jsx";
import FormActions from "../../components/admin/FormActions.jsx";
import useSingletonForm from "../../hooks/useSingletonForm.js";
import { getFooter, updateFooter } from "../../services/cms/footerService.js";
import { listSocialLinks } from "../../services/cms/socialLinkService.js";

const EMPTY_FORM = {
  description: "",
  copyrightText: "",
  columns: [],
  socialLinks: [],
  isVisible: true,
};

const emptyColumn = () => ({ title: "", links: [], order: 0 });
const emptyLink = () => ({ label: "", href: "", order: 0 });

const FooterPage = () => {
  const { form, setForm, isLoading, isSaving, loadError, formErrors, save } = useSingletonForm(
    { getOne: getFooter, update: updateFooter },
    { resourceLabel: "Footer", emptyForm: EMPTY_FORM }
  );

  const [availableSocialLinks, setAvailableSocialLinks] = useState([]);

  useEffect(() => {
    listSocialLinks({ limit: 100 })
      .then(({ items }) => setAvailableSocialLinks(items))
      .catch(() => setAvailableSocialLinks([]));
  }, []);

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const updateColumn = (index, key, value) => {
    setForm((prev) => {
      const columns = [...prev.columns];
      columns[index] = { ...columns[index], [key]: value };
      return { ...prev, columns };
    });
  };

  const addColumn = () => {
    setForm((prev) => ({ ...prev, columns: [...prev.columns, emptyColumn()] }));
  };

  const removeColumn = (index) => {
    setForm((prev) => ({ ...prev, columns: prev.columns.filter((_, i) => i !== index) }));
  };

  const updateLink = (columnIndex, linkIndex, key, value) => {
    setForm((prev) => {
      const columns = [...prev.columns];
      const links = [...columns[columnIndex].links];
      links[linkIndex] = { ...links[linkIndex], [key]: value };
      columns[columnIndex] = { ...columns[columnIndex], links };
      return { ...prev, columns };
    });
  };

  const addLink = (columnIndex) => {
    setForm((prev) => {
      const columns = [...prev.columns];
      columns[columnIndex] = { ...columns[columnIndex], links: [...columns[columnIndex].links, emptyLink()] };
      return { ...prev, columns };
    });
  };

  const removeLink = (columnIndex, linkIndex) => {
    setForm((prev) => {
      const columns = [...prev.columns];
      columns[columnIndex] = {
        ...columns[columnIndex],
        links: columns[columnIndex].links.filter((_, i) => i !== linkIndex),
      };
      return { ...prev, columns };
    });
  };

  const toggleSocialLink = (id) => {
    setForm((prev) => {
      const exists = prev.socialLinks.includes(id);
      return {
        ...prev,
        socialLinks: exists ? prev.socialLinks.filter((linkId) => linkId !== id) : [...prev.socialLinks, id],
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await save(form);
  };

  if (isLoading) {
    return (
      <div>
        <PageHeader title="Footer" description="Footer content and links." />
        <Card className="space-y-4 p-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-11 w-full" />
          ))}
        </Card>
      </div>
    );
  }

  if (loadError) {
    return (
      <div>
        <PageHeader title="Footer" description="Footer content and links." />
        <Card className="border-red-900/50 bg-red-950/30 p-6 text-sm text-red-300">{loadError}</Card>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Footer" description="Manage the footer description, link columns, and social links." />

      <form onSubmit={handleSubmit}>
        <Card className="space-y-6 p-6">
          {formErrors.length > 0 && (
            <div className="rounded-lg border border-red-900/50 bg-red-950/30 p-3.5 text-sm text-red-300">
              <ul className="list-inside list-disc space-y-1">
                {formErrors.map((message) => (
                  <li key={message}>{message}</li>
                ))}
              </ul>
            </div>
          )}

          <Textarea id="description" label="Description" value={form.description} onChange={handleChange("description")} disabled={isSaving} maxLength={500} rows={3} />

          <Input id="copyrightText" label="Copyright Text" value={form.copyrightText} onChange={handleChange("copyrightText")} disabled={isSaving} maxLength={200} />

          <div>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-200">Columns</h3>
              <Button type="button" variant="outline" size="sm" onClick={addColumn} disabled={isSaving}>
                <Plus className="h-3.5 w-3.5" />
                Add column
              </Button>
            </div>

            {form.columns.length === 0 ? (
              <p className="rounded-lg border border-dashed border-slate-800 p-4 text-sm text-slate-500">No footer columns yet.</p>
            ) : (
              <div className="space-y-4">
                {form.columns.map((column, columnIndex) => (
                  <div key={column._id || columnIndex} className="rounded-lg border border-slate-800 p-4">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_100px_auto] sm:items-end">
                      <Input label="Column Title" value={column.title} onChange={(e) => updateColumn(columnIndex, "title", e.target.value)} disabled={isSaving} />
                      <Input label="Order" type="number" value={column.order} onChange={(e) => updateColumn(columnIndex, "order", Number(e.target.value))} disabled={isSaving} />
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeColumn(columnIndex)} disabled={isSaving} className="text-red-400 hover:bg-red-950/40 hover:text-red-300">
                        <Trash2 className="h-4 w-4" />
                        Remove column
                      </Button>
                    </div>

                    <div className="mt-4">
                      <div className="mb-2 flex items-center justify-between">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Links</p>
                        <Button type="button" variant="ghost" size="sm" onClick={() => addLink(columnIndex)} disabled={isSaving}>
                          <Plus className="h-3.5 w-3.5" />
                          Add link
                        </Button>
                      </div>
                      {column.links.length === 0 ? (
                        <p className="text-xs text-slate-600">No links in this column.</p>
                      ) : (
                        <div className="space-y-2">
                          {column.links.map((link, linkIndex) => (
                            <div key={link._id || linkIndex} className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_1fr_80px_auto] sm:items-end">
                              <Input label="Label" value={link.label} onChange={(e) => updateLink(columnIndex, linkIndex, "label", e.target.value)} disabled={isSaving} />
                              <Input label="Href" value={link.href} onChange={(e) => updateLink(columnIndex, linkIndex, "href", e.target.value)} disabled={isSaving} />
                              <Input label="Order" type="number" value={link.order} onChange={(e) => updateLink(columnIndex, linkIndex, "order", Number(e.target.value))} disabled={isSaving} />
                              <Button type="button" variant="ghost" size="sm" onClick={() => removeLink(columnIndex, linkIndex)} disabled={isSaving} className="text-red-400 hover:bg-red-950/40 hover:text-red-300">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-200">Social Links shown in footer</h3>
            {availableSocialLinks.length === 0 ? (
              <p className="rounded-lg border border-dashed border-slate-800 p-4 text-sm text-slate-500">
                No social links exist yet. Add some under Social Links first.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {availableSocialLinks.map((link) => (
                  <label key={link._id} className="flex items-center gap-2 rounded-lg border border-slate-800 px-3.5 py-2.5 text-sm text-slate-300">
                    <input
                      type="checkbox"
                      checked={form.socialLinks.includes(link._id)}
                      onChange={() => toggleSocialLink(link._id)}
                      disabled={isSaving}
                      className="h-4 w-4 rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-indigo-500"
                    />
                    {link.platform}
                  </label>
                ))}
              </div>
            )}
          </div>

          <Switch
            id="footer-visible"
            label="Footer visible"
            hint="Show or hide the entire footer on the public site."
            checked={form.isVisible}
            onChange={(value) => setForm((prev) => ({ ...prev, isVisible: value }))}
            disabled={isSaving}
          />

          <FormActions isSaving={isSaving} saveLabel="Save Footer" />
        </Card>
      </form>
    </div>
  );
};

export default FooterPage;
