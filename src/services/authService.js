import apiClient from '../api/axios';

export const authService = {
  async login(email, password) {
    try {
      const response = await apiClient.post('/login', { email, password });

      const token = response.data.token;

      // Simpan token di localStorage (gunakan key konsisten: 'auth_token')
      localStorage.setItem('token', token);

      // Set token ke header default axios
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      return response.data.user;
    } catch (error) {
      throw new Error(
        'Gagal login: ' +
        (error.response?.data?.message || 'Terjadi kesalahan pada server')
      );
    }
  },

  async logout() {
    try {
      const response = await apiClient.post('/logout');

      // Hapus token dari localStorage dan header axios
      localStorage.removeItem('token');
      delete apiClient.defaults.headers.common['Authorization'];

      return response.data;
    } catch (error) {
      throw new Error(
        'Gagal logout: ' +
        (error.response?.data?.message || 'Terjadi kesalahan pada server')
      );
    }
  },

  initializeToken() {
    const token = localStorage.getItem('token');
    if (token) {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete apiClient.defaults.headers.common['Authorization'];
    }
  }
};
