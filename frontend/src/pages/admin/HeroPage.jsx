import PageHeader from "../../components/ui/PageHeader.jsx";
import Card from "../../components/ui/Card.jsx";
import Input from "../../components/ui/Input.jsx";
import Textarea from "../../components/ui/Textarea.jsx";
import Switch from "../../components/ui/Switch.jsx";
import Skeleton from "../../components/ui/Skeleton.jsx";
import FormActions from "../../components/admin/FormActions.jsx";
import useSingletonForm from "../../hooks/useSingletonForm.js";
import { getHero, updateHero } from "../../services/cms/heroService.js";

const EMPTY_FORM = {
  badge: "",
  heading: "",
  subheading: "",
  description: "",
  primaryButton: { label: "", href: "", isVisible: false },
  secondaryButton: { label: "", href: "", isVisible: false },
  image: "",
  isVisible: true,
};

const HeroPage = () => {
  const { form, setForm, isLoading, isSaving, loadError, formErrors, save } = useSingletonForm(
    { getOne: getHero, update: updateHero },
    { resourceLabel: "Hero", emptyForm: EMPTY_FORM }
  );

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const updateButton = (buttonKey, field) => (event) => {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setForm((prev) => ({ ...prev, [buttonKey]: { ...prev[buttonKey], [field]: value } }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await save(form);
  };

  if (isLoading) {
    return (
      <div>
        <PageHeader title="Hero" description="The first thing visitors see." />
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
        <PageHeader title="Hero" description="The first thing visitors see." />
        <Card className="border-red-900/50 bg-red-950/30 p-6 text-sm text-red-300">{loadError}</Card>
      </div>
    );
  }

  const renderButtonFields = (buttonKey, title) => (
    <div>
      <h3 className="mb-3 text-sm font-semibold text-slate-200">{title}</h3>
      <div className="grid grid-cols-1 gap-3 rounded-lg border border-slate-800 p-4 sm:grid-cols-2">
        <Input label="Label" value={form[buttonKey].label} onChange={updateButton(buttonKey, "label")} disabled={isSaving} />
        <Input label="Href" value={form[buttonKey].href} onChange={updateButton(buttonKey, "href")} disabled={isSaving} placeholder="#projects" />
        <label className="flex items-center gap-2 text-sm text-slate-400 sm:col-span-2">
          <input
            type="checkbox"
            checked={form[buttonKey].isVisible}
            onChange={updateButton(buttonKey, "isVisible")}
            disabled={isSaving}
            className="h-4 w-4 rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-indigo-500"
          />
          Show this button
        </label>
      </div>
    </div>
  );

  return (
    <div>
      <PageHeader title="Hero" description="The headline section visitors see first on your portfolio." />

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

          <Input id="badge" label="Badge" value={form.badge} onChange={handleChange("badge")} disabled={isSaving} maxLength={80} placeholder="Available for work" />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Input id="heading" label="Heading" value={form.heading} onChange={handleChange("heading")} disabled={isSaving} maxLength={200} />
            <Input id="subheading" label="Subheading" value={form.subheading} onChange={handleChange("subheading")} disabled={isSaving} maxLength={200} />
          </div>

          <Textarea id="description" label="Description" value={form.description} onChange={handleChange("description")} disabled={isSaving} maxLength={500} rows={3} />

          <Input id="image" label="Image URL" value={form.image} onChange={handleChange("image")} disabled={isSaving} placeholder="https://..." />

          {renderButtonFields("primaryButton", "Primary Button")}
          {renderButtonFields("secondaryButton", "Secondary Button")}

          <Switch
            id="hero-visible"
            label="Hero visible"
            hint="Show or hide the entire hero section on the public site."
            checked={form.isVisible}
            onChange={(value) => setForm((prev) => ({ ...prev, isVisible: value }))}
            disabled={isSaving}
          />

          <FormActions isSaving={isSaving} saveLabel="Save Hero" />
        </Card>
      </form>
    </div>
  );
};

export default HeroPage;
