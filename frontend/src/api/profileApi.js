import config from '../config';

export const getProfileApi = async (token) => {
  try {
    const response = await fetch(`${config.API_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error("Erro ao carregar perfil");
    const data = await response.json();
    return { success: true, user: data };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const updateProfileApi = async (token, profileData) => {
  try {
    const response = await fetch(`${config.API_URL}/auth/profile`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });
    if (!response.ok) throw new Error("Erro ao atualizar perfil");
    const data = await response.json();
    return { success: true, user: data.user };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const uploadPhotoApi = async (token, file) => {
  try {
    const formData = new FormData();
    formData.append("photo", file);
    const response = await fetch(`${config.API_URL}/auth/profile/photo`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    if (!response.ok) throw new Error("Erro ao enviar foto");
    const data = await response.json();
    return { success: true, user: data.user };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
