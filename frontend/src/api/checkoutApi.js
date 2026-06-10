import config from '../config';

export const checkoutApi = async (checkoutData) => {
  try {
    const response = await fetch(`${config.API_URL}/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(checkoutData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao enviar checkout');
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Erro na API de checkout:', error);
    return { success: false, message: error.message };
  }
};

export const createPaymentIntentApi = async (token, amount) => {
  try {
    const response = await fetch(`${config.API_URL}/checkout/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ amount }),
    });
    if (!response.ok) throw new Error('Erro ao criar pagamento');
    const data = await response.json();
    return { success: true, clientSecret: data.clientSecret };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const confirmOrderApi = async (token, orderData) => {
  try {
    const response = await fetch(`${config.API_URL}/checkout/confirm`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });
    if (!response.ok) throw new Error('Erro ao confirmar pedido');
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const getOrdersApi = async (token) => {
  try {
    const response = await fetch(`${config.API_URL}/checkout/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao carregar pedidos');
    }

    const data = await response.json();
    return { success: true, orders: data };
  } catch (error) {
    console.error('Erro na API de pedidos:', error);
    return { success: false, message: error.message };
  }
};
