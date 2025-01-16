import axios from 'axios';

// Tạo instance axios với cấu hình
const api = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,  // Lấy URL từ biến môi trường
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchBlocks = async () => {
  try {
    const response = await api.get('/api/btc-block');
    return response.data;
  } catch (error) {
    console.error('Error fetching blocks:', error);
    throw error;
  }
};

export default api;
