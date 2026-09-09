import api from "../api.js";

const createCollectionService = (endpoint) => {
  const list = async (params = {}) => {
    const response = await api.get(endpoint, { params });
    return { items: response.data.data, pagination: response.data.pagination };
  };

  const getById = async (id) => {
    const response = await api.get(`${endpoint}/${id}`);
    return response.data.data;
  };

  const create = async (payload) => {
    const response = await api.post(endpoint, payload);
    return response.data.data;
  };

  const update = async (id, payload) => {
    const response = await api.put(`${endpoint}/${id}`, payload);
    return response.data.data;
  };

  const remove = async (id) => {
    await api.delete(`${endpoint}/${id}`);
  };

  return { list, getById, create, update, remove };
};

export default createCollectionService;
