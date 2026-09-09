import { Plus, Trash2 } from "lucide-react";
import PageHeader from "../../components/ui/PageHeader.jsx";
import Card from "../../components/ui/Card.jsx";
import Input from "../../components/ui/Input.jsx";
import Switch from "../../components/ui/Switch.jsx";
import Button from "../../components/ui/Button.jsx";
import Skeleton from "../../components/ui/Skeleton.jsx";
import FormActions from "../../components/admin/FormActions.jsx";
import useSingletonForm from "../../hooks/useSingletonForm.js";
import { getHeader, updateHeader } from "../../services/cms/headerService.js";

const EMPTY_FORM = {
  logo: "",
  navigationItems: [],
  cta: { label: "", href: "", isVisible: false },
  isVisible: true,
};

const emptyNavItem = () => ({ label: "", href: "", order: 0, isVisible: true });

const HeaderPage = () => {
  const { form, setForm, isLoading, isSaving, loadError, formErrors, save } = useSingletonForm(
  getHeader,
  updateHeader,
  { resourceLabel: "Header", emptyForm: EMPTY_FORM }
);

  const updateNavItem = (index, key, value) => {
    setForm((prev) => {
      const items = [...prev.navigationItems];
      items[index] = { ...items[index], [key]: value };
      return { ...prev, navigationItems: items };
    });
  };

  const addNavItem = () => {
    setForm((prev) => ({ ...prev, navigationItems: [...prev.navigationItems, emptyNavItem()] }));
  };

  const removeNavItem = (index) => {
    setForm((prev) => ({
      ...prev,
      navigationItems: prev.navigationItems.filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  const updateCta = (key, value) => {
    setForm((prev) => ({ ...prev, cta: { ...prev.cta, [key]: value } }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await save(form);
  };

  if (isLoading) {
    return (
      <div>
        <PageHeader title="Header" description="Site navigation and call-to-action." />
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
        <PageHeader title="Header" description="Site navigation and call-to-action." />
        <Card className="border-red-900/50 bg-red-950/30 p-6 text-sm text-red-300">{loadError}</Card>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Header" description="Manage the logo, navigation links, and call-to-action button." />

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

          <Input
            id="logo"
            label="Logo URL"
            value={form.logo}
            onChange={(event) => setForm((prev) => ({ ...prev, logo: event.target.value }))}
            disabled={isSaving}
            placeholder="https://..."
          />

          <Switch
            id="header-visible"
            label="Header visible"
            hint="Show or hide the entire header on the public site."
            checked={form.isVisible}
            onChange={(value) => setForm((prev) => ({ ...prev, isVisible: value }))}
            disabled={isSaving}
          />

          <div>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-200">Navigation Items</h3>
              <Button type="button" variant="outline" size="sm" onClick={addNavItem} disabled={isSaving}>
                <Plus className="h-3.5 w-3.5" />
                Add link
              </Button>
            </div>

            {form.navigationItems.length === 0 ? (
              <p className="rounded-lg border border-dashed border-slate-800 p-4 text-sm text-slate-500">
                No navigation links yet.
              </p>
            ) : (
              <div className="space-y-3">
                {form.navigationItems.map((item, index) => (
                  <div key={item._id || index} className="rounded-lg border border-slate-800 p-4">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <Input
                        label="Label"
                        value={item.label}
                        onChange={(event) => updateNavItem(index, "label", event.target.value)}
                        disabled={isSaving}
                      />
                      <Input
                        label="Href"
                        value={item.href}
                        onChange={(event) => updateNavItem(index, "href", event.target.value)}
                        disabled={isSaving}
                        placeholder="#about"
                      />
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <Input
                        label="Order"
                        type="number"
                        value={item.order}
                        onChange={(event) => updateNavItem(index, "order", Number(event.target.value))}
                        disabled={isSaving}
                        className="w-24"
                      />
                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-2 text-sm text-slate-400">
                          <input
                            type="checkbox"
                            checked={item.isVisible}
                            onChange={(event) => updateNavItem(index, "isVisible", event.target.checked)}
                            disabled={isSaving}
                            className="h-4 w-4 rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-indigo-500"
                          />
                          Visible
                        </label>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeNavItem(index)}
                          disabled={isSaving}
                          className="text-red-400 hover:bg-red-950/40 hover:text-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-200">Call To Action</h3>
            <div className="grid grid-cols-1 gap-3 rounded-lg border border-slate-800 p-4 sm:grid-cols-2">
              <Input
                label="Label"
                value={form.cta.label}
                onChange={(event) => updateCta("label", event.target.value)}
                disabled={isSaving}
              />
              <Input
                label="Href"
                value={form.cta.href}
                onChange={(event) => updateCta("href", event.target.value)}
                disabled={isSaving}
                placeholder="#contact"
              />
              <label className="flex items-center gap-2 text-sm text-slate-400 sm:col-span-2">
                <input
                  type="checkbox"
                  checked={form.cta.isVisible}
                  onChange={(event) => updateCta("isVisible", event.target.checked)}
                  disabled={isSaving}
                  className="h-4 w-4 rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-indigo-500"
                />
                Show call-to-action button
              </label>
            </div>
          </div>

          <FormActions isSaving={isSaving} saveLabel="Save Header" />
        </Card>
      </form>
    </div>
  );
};

export default HeaderPage;
