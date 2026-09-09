import { useCallback, useEffect, useState } from "react";
import { useToast } from "../context/ToastContext.jsx";

/**
 * Shared list/create/edit/delete state machine for a single collection CMS
 * resource. Individual pages stay focused on schema-specific form fields and
 * table columns; this hook owns pagination, loading, and CRUD orchestration
 * against the service factories created in Phase 4A.
 */
const useCollectionCrud = (service, { resourceLabel, params = {} } = {}) => {
  const { showToast } = useToast();

  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [page, setPageState] = useState(1);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formErrors, setFormErrors] = useState([]);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const paramsKey = JSON.stringify(params);

  const load = useCallback(
    async (targetPage) => {
      setIsLoading(true);
      setHasError(false);
      try {
        const { items: fetchedItems, pagination: fetchedPagination } = await service.list({
          page: targetPage,
          limit: 10,
          ...JSON.parse(paramsKey),
        });
        setItems(fetchedItems);
        setPagination(fetchedPagination);
        setPageState(targetPage);
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    },
    [service, paramsKey]
  );

  useEffect(() => {
    load(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramsKey]);

  const goToPage = (targetPage) => load(targetPage);

  const openCreate = () => {
    setEditingItem(null);
    setFormErrors([]);
    setIsFormOpen(true);
  };

  const openEdit = (item) => {
    setEditingItem(item);
    setFormErrors([]);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    if (isSaving) return;
    setIsFormOpen(false);
    setEditingItem(null);
    setFormErrors([]);
  };

  const submitForm = async (payload) => {
    setIsSaving(true);
    setFormErrors([]);

    try {
      if (editingItem) {
        await service.update(editingItem._id, payload);
        showToast(`${resourceLabel} updated successfully.`, "success");
      } else {
        await service.create(payload);
        showToast(`${resourceLabel} created successfully.`, "success");
      }

      setIsFormOpen(false);
      setEditingItem(null);
      await load(editingItem ? page : 1);
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

  const requestDelete = (item) => setDeleteTarget(item);

  const cancelDelete = () => {
    if (!isDeleting) setDeleteTarget(null);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);

    try {
      await service.remove(deleteTarget._id);
      showToast(`${resourceLabel} deleted successfully.`, "success");
      const isLastItemOnPage = items.length === 1 && page > 1;
      setDeleteTarget(null);
      await load(isLastItemOnPage ? page - 1 : page);
    } catch (error) {
      const message = error?.response?.data?.message || `Unable to delete ${resourceLabel.toLowerCase()}.`;
      showToast(message, "error");
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    items,
    pagination,
    isLoading,
    hasError,
    page,
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
  };
};

export default useCollectionCrud;
