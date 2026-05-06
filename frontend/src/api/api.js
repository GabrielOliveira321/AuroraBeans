export const apiProd = async () => {
  try {
    const response = await fetch("http://localhost:8080/product");

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