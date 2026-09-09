const EmptyState = ({ icon: Icon, title, description, action }) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 px-6 py-14 text-center">
      {Icon && <Icon className="mb-3 h-8 w-8 text-slate-600" />}
      <h3 className="text-sm font-medium text-slate-200">{title}</h3>
      {description && <p className="mt-1 max-w-sm text-sm text-slate-500">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
};

export default EmptyState;
