// src/hooks/usePublications.js

import { useContext } from 'react';
import { PublicationsContext } from '../context/PublicationsContext';

export const usePublications = () => {
  const context = useContext(PublicationsContext);
  if (!context) {
    throw new Error('usePublications harus digunakan di dalam PublicationsProvider');
  }
  return context; // Ini akan mengandung fetchPublications, etc.
};
