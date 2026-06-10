import config from '../config';

export const apiProd = async (page = 1, limit = 12) => {
  try {
    const url = `${config.API_URL}/product?page=${page}&limit=${limit}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Erro na requisição");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro na API:", error);
    throw error;
  }
};