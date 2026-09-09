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
import { getAbout, updateAbout } from "../../services/cms/aboutService.js";

const EMPTY_FORM = {
  title: "",
  subtitle: "",
  description: "",
  image: "",
  statistics: [],
  highlights: [],
  isVisible: true,
};

const AboutPage = () => {
  const { form, setForm, isLoading, isSaving, loadError, formErrors, save } = useSingletonForm(
    { getOne: getAbout, update: updateAbout },
    { resourceLabel: "About", emptyForm: EMPTY_FORM }
  );

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const updateStatistic = (index, key, value) => {
    setForm((prev) => {
      const statistics = [...prev.statistics];
      statistics[index] = { ...statistics[index], [key]: value };
      return { ...prev, statistics };
    });
  };

  const addStatistic = () => {
    setForm((prev) => ({ ...prev, statistics: [...prev.statistics, { label: "", value: "", order: 0 }] }));
  };

  const removeStatistic = (index) => {
    setForm((prev) => ({ ...prev, statistics: prev.statistics.filter((_, i) => i !== index) }));
  };

  const updateHighlight = (index, key, value) => {
    setForm((prev) => {
      const highlights = [...prev.highlights];
      highlights[index] = { ...highlights[index], [key]: value };
      return { ...prev, highlights };
    });
  };

  const addHighlight = () => {
    setForm((prev) => ({ ...prev, highlights: [...prev.highlights, { title: "", description: "", order: 0 }] }));
  };

  const removeHighlight = (index) => {
    setForm((prev) => ({ ...prev, highlights: prev.highlights.filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await save(form);
  };

  if (isLoading) {
    return (
      <div>
        <PageHeader title="About" description="Tell visitors about yourself." />
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
        <PageHeader title="About" description="Tell visitors about yourself." />
        <Card className="border-red-900/50 bg-red-950/30 p-6 text-sm text-red-300">{loadError}</Card>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="About" description="The about section, including statistics and highlights." />

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

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Input id="title" label="Title" value={form.title} onChange={handleChange("title")} disabled={isSaving} maxLength={150} />
            <Input id="subtitle" label="Subtitle" value={form.subtitle} onChange={handleChange("subtitle")} disabled={isSaving} maxLength={200} />
          </div>

          <Textarea id="description" label="Description" value={form.description} onChange={handleChange("description")} disabled={isSaving} maxLength={2000} rows={5} />

          <Input id="image" label="Image URL" value={form.image} onChange={handleChange("image")} disabled={isSaving} placeholder="https://..." />

          <div>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-200">Statistics</h3>
              <Button type="button" variant="outline" size="sm" onClick={addStatistic} disabled={isSaving}>
                <Plus className="h-3.5 w-3.5" />
                Add stat
              </Button>
            </div>
            {form.statistics.length === 0 ? (
              <p className="rounded-lg border border-dashed border-slate-800 p-4 text-sm text-slate-500">No statistics yet.</p>
            ) : (
              <div className="space-y-3">
                {form.statistics.map((stat, index) => (
                  <div key={stat._id || index} className="grid grid-cols-1 gap-3 rounded-lg border border-slate-800 p-4 sm:grid-cols-[1fr_1fr_100px_auto] sm:items-end">
                    <Input label="Label" value={stat.label} onChange={(e) => updateStatistic(index, "label", e.target.value)} disabled={isSaving} />
                    <Input label="Value" value={stat.value} onChange={(e) => updateStatistic(index, "value", e.target.value)} disabled={isSaving} placeholder="3+" />
                    <Input label="Order" type="number" value={stat.order} onChange={(e) => updateStatistic(index, "order", Number(e.target.value))} disabled={isSaving} />
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeStatistic(index)} disabled={isSaving} className="text-red-400 hover:bg-red-950/40 hover:text-red-300">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-200">Highlights</h3>
              <Button type="button" variant="outline" size="sm" onClick={addHighlight} disabled={isSaving}>
                <Plus className="h-3.5 w-3.5" />
                Add highlight
              </Button>
            </div>
            {form.highlights.length === 0 ? (
              <p className="rounded-lg border border-dashed border-slate-800 p-4 text-sm text-slate-500">No highlights yet.</p>
            ) : (
              <div className="space-y-3">
                {form.highlights.map((highlight, index) => (
                  <div key={highlight._id || index} className="rounded-lg border border-slate-800 p-4">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <Input label="Title" value={highlight.title} onChange={(e) => updateHighlight(index, "title", e.target.value)} disabled={isSaving} />
                      <Input label="Order" type="number" value={highlight.order} onChange={(e) => updateHighlight(index, "order", Number(e.target.value))} disabled={isSaving} />
                    </div>
                    <Textarea
                      label="Description"
                      value={highlight.description}
                      onChange={(e) => updateHighlight(index, "description", e.target.value)}
                      disabled={isSaving}
                      rows={2}
                      className="mt-3"
                    />
                    <div className="mt-3 flex justify-end">
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeHighlight(index)} disabled={isSaving} className="text-red-400 hover:bg-red-950/40 hover:text-red-300">
                        <Trash2 className="h-4 w-4" />
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Switch
            id="about-visible"
            label="About visible"
            hint="Show or hide the entire about section on the public site."
            checked={form.isVisible}
            onChange={(value) => setForm((prev) => ({ ...prev, isVisible: value }))}
            disabled={isSaving}
          />

          <FormActions isSaving={isSaving} saveLabel="Save About" />
        </Card>
      </form>
    </div>
  );
};

export default AboutPage;
