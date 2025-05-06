import axios from 'axios';

const api = axios.create({
  baseURL: 'https://suaapi.com/v1',
});

export const createOrder = async (orderData) => {
  try {
    const response = await api.post('/orders', orderData);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const trackDelivery = async (deliveryId) => {
  try {
    const response = await api.get(`/deliveries/${deliveryId}`);
    return response.data;
  } catch (error) {
    console.error('Error tracking delivery:', error);
    throw error;
  }
};

// Adicione outras chamadas de API conforme necessário