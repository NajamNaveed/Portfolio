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

  return { getSingleton, upsertSingleton };
};

export default createSingletonService;