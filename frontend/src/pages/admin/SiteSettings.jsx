import PageHeader from "../../components/ui/PageHeader.jsx";
import Card from "../../components/ui/Card.jsx";
import Input from "../../components/ui/Input.jsx";
import Textarea from "../../components/ui/Textarea.jsx";
import Skeleton from "../../components/ui/Skeleton.jsx";
import FormActions from "../../components/admin/FormActions.jsx";
import useSingletonForm from "../../hooks/useSingletonForm.js";
import { getSiteSettings, updateSiteSettings } from "../../services/cms/siteSettingsService.js";

const EMPTY_FORM = {
  siteName: "",
  siteTitle: "",
  siteDescription: "",
  logo: "",
  favicon: "",
  email: "",
  phone: "",
  location: "",
  defaultSeoTitle: "",
  defaultSeoDescription: "",
};

const SiteSettings = () => {
  const { form, setForm, isLoading, isSaving, loadError, formErrors, save } = useSingletonForm(
  getSiteSettings,
  updateSiteSettings,
  { resourceLabel: "SiteSettings", emptyForm: EMPTY_FORM }
);

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await save(form);
  };

  if (isLoading) {
    return (
      <div>
        <PageHeader title="Site Settings" description="Global configuration for your portfolio." />
        <Card className="space-y-4 p-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-11 w-full" />
          ))}
        </Card>
      </div>
    );
  }

  if (loadError) {
    return (
      <div>
        <PageHeader title="Site Settings" description="Global configuration for your portfolio." />
        <Card className="border-red-900/50 bg-red-950/30 p-6 text-sm text-red-300">{loadError}</Card>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Site Settings" description="Global configuration used across your public portfolio." />

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
            <Input id="siteName" label="Site Name" value={form.siteName} onChange={handleChange("siteName")} disabled={isSaving} maxLength={120} />
            <Input id="siteTitle" label="Site Title" value={form.siteTitle} onChange={handleChange("siteTitle")} disabled={isSaving} maxLength={160} />
          </div>

          <Textarea
            id="siteDescription"
            label="Site Description"
            value={form.siteDescription}
            onChange={handleChange("siteDescription")}
            disabled={isSaving}
            maxLength={500}
            rows={3}
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Input id="logo" label="Logo URL" value={form.logo} onChange={handleChange("logo")} disabled={isSaving} placeholder="https://..." />
            <Input id="favicon" label="Favicon URL" value={form.favicon} onChange={handleChange("favicon")} disabled={isSaving} placeholder="https://..." />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <Input id="email" type="email" label="Contact Email" value={form.email} onChange={handleChange("email")} disabled={isSaving} />
            <Input id="phone" label="Phone" value={form.phone} onChange={handleChange("phone")} disabled={isSaving} />
            <Input id="location" label="Location" value={form.location} onChange={handleChange("location")} disabled={isSaving} />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Input
              id="defaultSeoTitle"
              label="Default SEO Title"
              value={form.defaultSeoTitle}
              onChange={handleChange("defaultSeoTitle")}
              disabled={isSaving}
              maxLength={160}
            />
            <Input
              id="defaultSeoDescription"
              label="Default SEO Description"
              value={form.defaultSeoDescription}
              onChange={handleChange("defaultSeoDescription")}
              disabled={isSaving}
              maxLength={300}
            />
          </div>

          <FormActions isSaving={isSaving} saveLabel="Save Changes" />
        </Card>
      </form>
    </div>
  );
};

export default SiteSettings;
