import config from '../config';

export const sendContact = async (data) => {
  try {
    const response = await fetch(`${config.API_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      const message = result.message?.[0] 
        ? (typeof result.message === 'string' ? result.message : result.message.join(', '))
        : result.message || 'Erro ao enviar mensagem';
      throw new Error(message);
    }

    return result;
  } catch (error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('Servidor indisponível. Tente novamente mais tarde.');
    }
    throw error;
  }
};

export const subscribeNewsletter = async (data) => {
  try {
    const response = await fetch(`${config.API_URL}/contact/newsletter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      const message = result.message?.[0]
        ? (typeof result.message === 'string' ? result.message : result.message.join(', '))
        : result.message || 'Erro ao se inscrever na newsletter';
      throw new Error(message);
    }

    return result;
  } catch (error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('Servidor indisponível. Tente novamente mais tarde.');
    }
    throw error;
  }
};
