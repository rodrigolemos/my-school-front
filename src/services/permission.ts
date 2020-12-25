import api from './api';

export const checkPermission = async (token: string, id: string): Promise<boolean> => {
  try {
    const response = await api.get(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.status !== 200) throw new Error('Not allowed');

    return true;
  } catch (error) {
    return false;
  }
};
