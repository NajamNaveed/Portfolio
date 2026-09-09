import api from "../api.js";

const createSingletonService = (endpoint) => {
  const getOne = async () => {
    const response = await api.get(endpoint);
    return response.data.data;
  };

  const update = async (payload) => {
    const response = await api.put(endpoint, payload);
    return response.data.data;
  };

  return { getOne, update };
};

export default createSingletonService;
