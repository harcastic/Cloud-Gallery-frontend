import axios from 'axios';

const API_BASE_URL = 'https://cloud-gallery-backend-5wla.onrender.com/api' || 'http://localhost:5000/api';

export const request = async (
  url,
  method = 'GET',
  body = null,
  isForm = false,
  token = null
) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  const options = {
    method,
    signal: controller.signal,
    headers: {
      Accept: 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };

  if (body) {
    if (isForm) {
      options.data = body;
    } else {
      options.headers['Content-Type'] = 'application/json';
      options.data = body;
    }
  }

  try {
    const response = await axios(`${API_BASE_URL}${url}`, options);
    clearTimeout(timeout);
    return response.data;
  } catch (err) {
    clearTimeout(timeout);
    if (err.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw new Error(err.response?.data?.msg || err.message || 'Request failed');
  }
};

export const requestWithToken = async (url, method = 'GET', body = null, isForm = false) => {
  if (typeof window === 'undefined') return;
  const token = localStorage.getItem('token');
  return request(url, method, body, isForm, token);
};
