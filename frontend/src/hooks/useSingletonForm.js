import { useCallback, useEffect, useState } from "react";
import { useToast } from "../context/ToastContext.jsx";

/**
 * Shared load/edit/save state machine for singleton CMS resources
 * (Site Settings, Header, Hero, About, Footer). The page supplies the
 * default shape and the singleton service (getOne/update); this hook owns
 * loading, saving, and validation-error/toast plumbing.
 */
const useSingletonForm = (getOne, update, { resourceLabel, emptyForm }) => {
  const { showToast } = useToast();
  const [form, setForm] = useState(emptyForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [formErrors, setFormErrors] = useState([]);

  const load = useCallback(async () => {
    setIsLoading(true);
    setLoadError("");

    try {
      const data = await getOne();
      setForm({ ...emptyForm, ...data });
    } catch (error) {
      setLoadError(`Unable to load ${resourceLabel.toLowerCase()}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getOne, resourceLabel]);

  useEffect(() => {
    load();
  }, [load]);

  const save = async (payload) => {
    setIsSaving(true);
    setFormErrors([]);

    try {
      const updated = await update(payload);
      setForm({ ...emptyForm, ...updated });
      showToast(`${resourceLabel} saved successfully.`, "success");
      return true;
    } catch (error) {
      const responseErrors = error?.response?.data?.errors;
      const message = error?.response?.data?.message || `Unable to save ${resourceLabel.toLowerCase()}.`;
      setFormErrors(Array.isArray(responseErrors) && responseErrors.length > 0 ? responseErrors : [message]);
      showToast(message, "error");
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  return { form, setForm, isLoading, isSaving, loadError, formErrors, save };
};

export default useSingletonForm;