// src/context/PublicationsContext.jsx

import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import apiClient from '../api/axios';

export const PublicationsContext = createContext(null);

export const PublicationsProvider = ({ children }) => {
  const [publications, setPublications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPublications = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get('/publikasi');
      setPublications(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal mengambil data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPublications();
  }, [fetchPublications]);

  const addPublication = async (formData) => {
    const response = await apiClient.post('/publikasi', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    setPublications((prev) => [response.data, ...prev]);
  };

  const updatePublication = async (id, data) => {
    let config = {};
    let payload = data;

    if (data instanceof FormData) {
      data.append('_method', 'PUT');
      config.headers = { 'Content-Type': 'multipart/form-data' };
    } else {
      config.headers = { 'Content-Type': 'application/json' };
      payload = JSON.stringify(data);
    }

    const response = await apiClient.post(`/publikasi/${id}`, payload, config);
    setPublications((prev) =>
      prev.map((pub) => (pub.id === id ? response.data : pub))
    );
  };

  const deletePublication = async (id) => {
    await apiClient.delete(`/publikasi/${id}`);
    setPublications((prev) => prev.filter((pub) => pub.id !== id));
  };

  const getPublicationById = async (id) => {
    const response = await apiClient.get(`/publikasi/${id}`);
    return response.data;
  };

  return (
    <PublicationsContext.Provider
      value={{
        publications,
        isLoading,
        error,
        fetchPublications,
        addPublication,
        updatePublication,
        deletePublication,
        getPublicationById,
      }}
    >
      {children}
    </PublicationsContext.Provider>
  );
};
