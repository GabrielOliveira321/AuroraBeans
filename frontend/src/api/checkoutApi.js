const API_URL = 'http://localhost:8080';

export const checkoutApi = async (checkoutData) => {
  try {
    const response = await fetch(`${API_URL}/checkout`, {
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
