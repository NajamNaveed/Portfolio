const pick = (source = {}, allowedFields = []) => {
  const result = {};

  allowedFields.forEach((field) => {
    if (Object.prototype.hasOwnProperty.call(source, field)) {
      result[field] = source[field];
    }
  });

  return result;
};

export default pick;