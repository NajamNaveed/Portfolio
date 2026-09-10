const formatDate = (value, options = { year: "numeric", month: "short" }) => {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("en-US", options).format(date);
};

export default formatDate;
