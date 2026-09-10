const createSingletonService = (Model) => {
  const getSingleton = async () => {
    let doc = await Model.findOne({});

    if (!doc) {
      doc = await Model.create({});
    }

    return doc;
  };

  const upsertSingleton = async (data) => {
    const doc = await Model.findOneAndUpdate({}, data, {
      new: true,
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true,
    });

    return doc;
  };

  // Public, read-only accessor for the visitor-facing portfolio.
  // Unlike getSingleton, this never auto-creates a document (a visitor
  // hitting an empty CMS resource should just see the section hidden),
  // and it respects isVisible when the schema defines it.
  const getPublic = async () => {
    const doc = await Model.findOne({});

    if (!doc || doc.isVisible === false) {
      return null;
    }

    return doc;
  };

  return { getSingleton, upsertSingleton, getPublic };
};

export default createSingletonService;