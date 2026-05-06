const API_URL = "http://localhost:8080";

export const loginApi = async (credentials) => {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Erro no login");
        }

        const data = await response.json();
        return { success: true, token: data.access_token, user: data.user || null };
    } catch (error) {
        console.error("Erro na API de login:", error);
        return { success: false, message: error.message };
    }
};

export const registerApi = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Erro no registro");
        }

        const data = await response.json();
        return { success: true, token: data.access_token, user: data.user || null };
    } catch (error) {
        console.error("Erro na API de registro:", error);
        return { success: false, message: error.message };
    }
};
