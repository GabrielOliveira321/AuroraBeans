import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { useAuth } from '../../Provider/AuthProvider';
import { getProfileApi, updateProfileApi, uploadPhotoApi } from '../../api/profileApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Camera, Save, ArrowLeft, Package } from 'lucide-react';
import config from '../../config';

const Profile = () => {
  const navigate = useNavigate();
  const { token, user, updateUser } = useAuth();
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    street: '',
    neighborhood: '',
    zip: '',
  });

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const loadProfile = async () => {
      const result = await getProfileApi(token);
      if (result.success) {
        setFormData({
          name: result.user.name || '',
          street: result.user.street || '',
          neighborhood: result.user.neighborhood || '',
          zip: result.user.zip || '',
        });
        updateUser(result.user);
      } else {
        toast.error('Erro ao carregar perfil.');
      }
      setLoading(false);
    };

    loadProfile();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    const result = await updateProfileApi(token, formData);
    setSaving(false);

    if (result.success) {
      updateUser(result.user);
      toast.success('Perfil atualizado com sucesso!');
    } else {
      toast.error(result.message || 'Erro ao salvar perfil.');
    }
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('A foto deve ter no máximo 5MB.');
      return;
    }

    const result = await uploadPhotoApi(token, file);
    if (result.success) {
      updateUser(result.user);
      toast.success('Foto atualizada!');
    } else {
      toast.error(result.message || 'Erro ao enviar foto.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#12100E] text-[#F4F1EA] flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center pt-32">
          <p className="text-gray-400">Carregando perfil...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#12100E] text-[#F4F1EA] flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-20 px-6 max-w-3xl mx-auto w-full">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#c5a47e] hover:text-[#a38665] transition mb-8 text-sm uppercase tracking-widest"
        >
          <ArrowLeft size={16} /> Voltar
        </button>

        <h1 className="text-4xl font-serif italic mb-10 border-b border-[#c5a47e]/30 pb-4">
          Meu Perfil
        </h1>

        {/* Foto de Perfil */}
        <div className="flex flex-col items-center mb-12">
          <div
            className="relative group cursor-pointer"
            onClick={handlePhotoClick}
          >
            {user?.photoUrl ? (
              <img
                src={`${config.API_URL}${user.photoUrl}`}
                alt="Foto de perfil"
                className="w-32 h-32 rounded-full object-cover border-4 border-[#c5a47e]"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-[#c5a47e] flex items-center justify-center text-black text-5xl font-serif font-bold">
                {user?.name?.charAt(0)?.toUpperCase() || '?'}
              </div>
            )}
            <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <Camera size={28} className="text-white" />
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
          />
          <p className="text-gray-400 text-sm mt-3">Clique na foto para alterar</p>
        </div>

        {/* Formulário */}
        <div className="bg-[#1a1714] p-8 rounded-xl border border-white/5 shadow-2xl space-y-6">
          <div className="space-y-2">
            <label className="text-sm text-gray-400 uppercase tracking-wider">Email</label>
            <input
              type="email"
              value={user?.email || ''}
              disabled
              className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-gray-500 cursor-not-allowed"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400 uppercase tracking-wider">Nome</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-[#c5a47e] outline-none transition"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400 uppercase tracking-wider">Rua / Endereço</label>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
              placeholder="Ex: Rua das Flores, 123"
              className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-[#c5a47e] outline-none transition placeholder:text-gray-600"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-400 uppercase tracking-wider">Bairro</label>
              <input
                type="text"
                name="neighborhood"
                value={formData.neighborhood}
                onChange={handleChange}
                placeholder="Ex: Centro"
                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-[#c5a47e] outline-none transition placeholder:text-gray-600"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400 uppercase tracking-wider">CEP</label>
              <input
                type="text"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                placeholder="00000-000"
                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-[#c5a47e] outline-none transition placeholder:text-gray-600"
              />
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-[#c5a47e] hover:bg-[#a38665] text-[#12100E] font-bold py-4 px-8 rounded-lg transition-all duration-300 uppercase tracking-widest text-sm disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Save size={18} />
            {saving ? 'Salvando...' : 'Salvar Alterações'}
          </button>

          {/* Link para Meus Pedidos */}
          <button
            onClick={() => navigate('/orders')}
            className="w-full border border-[#c5a47e]/30 text-[#c5a47e] hover:bg-[#c5a47e]/5 hover:border-[#c5a47e]/60 py-4 px-8 rounded-lg transition-all duration-300 uppercase tracking-widest text-sm flex items-center justify-center gap-2"
          >
            <Package size={18} />
            Ver Meus Pedidos
          </button>
        </div>
      </main>

      <Footer />
      <ToastContainer theme="dark" />
    </div>
  );
};

export default Profile;
