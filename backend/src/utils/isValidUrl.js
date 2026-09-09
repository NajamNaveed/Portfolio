const isValidUrl = (value) => {
  if (typeof value !== "string" || !value.trim()) {
    return false;
  }

  try {
    // eslint-disable-next-line no-new
    new URL(value);
    return true;
  } catch (error) {
    return false;
  }
};

export default isValidUrl;