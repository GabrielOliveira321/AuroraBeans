import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Provider/AuthProvider";

const Auth = () => {
    const [error, setError] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);

    const [formInput, setFormInput] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormInput((prev) => ({ ...prev, [name]: value }));
    }

    const { login, register, token, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        if (isRegistering) {
            const result = await register({
                name: formInput.name,
                email: formInput.email,
                password: formInput.password
            });

            if (!result.success) {
                setError(result.message);
                return;
            }

            navigate("/");
        } else {
            const result = await login({
                email: formInput.email,
                password: formInput.password
            });

            if (!result.success) {
                setError(result.message);
                return;
            }

            navigate("/");
        }
    };

    if (token && user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
                <div className="max-w-md w-full rounded-3xl bg-white/10 border border-white/10 p-8 shadow-xl backdrop-blur-xl text-center">
                    <div className="w-20 h-20 mx-auto bg-[#c4a484] rounded-full flex items-center justify-center mb-4 text-3xl text-black font-bold uppercase">
                        {user.name.charAt(0)}
                    </div>
                    <h1 className="text-3xl font-semibold mb-2">Olá, {user.name}</h1>
                    <p className="text-sm text-gray-300 mb-6">{user.email}</p>
                    
                    <div className="flex flex-col gap-3">
                        <Link to="/" className="w-full rounded-xl bg-[#c4a484] px-5 py-3 text-black font-bold hover:bg-[#a68a6d] transition">
                            Ir para a Loja
                        </Link>
                        <button onClick={logout} className="w-full rounded-xl border border-[#c4a484] text-[#c4a484] px-5 py-3 font-bold hover:bg-[#c4a484] hover:text-black transition">
                            Sair da conta
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
            <div className="max-w-md w-full rounded-3xl bg-white/10 border border-white/10 p-8 shadow-xl backdrop-blur-xl">
                <h1 className="text-3xl font-semibold mb-2">
                    {isRegistering ? "Criar Conta" : "Login"}
                </h1>
                <p className="mb-6 text-sm text-gray-300">
                    {isRegistering
                        ? "Crie sua conta para acessar o carrinho e as assinaturas."
                        : "Faça login para acessar o carrinho e as assinaturas."
                    }
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {isRegistering && (
                        <div>
                            <label className="block text-sm uppercase tracking-wider mb-2" htmlFor="name">Nome</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={formInput.name}
                                onChange={handleInputChange}
                                className="w-full rounded-xl border border-white/20 bg-black/60 p-3 text-white outline-none focus:border-[#c4a484]"
                                placeholder="Seu nome completo"
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm uppercase tracking-wider mb-2" htmlFor="email">E-mail</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formInput.email}
                            onChange={handleInputChange}
                            className="w-full rounded-xl border border-white/20 bg-black/60 p-3 text-white outline-none focus:border-[#c4a484]"
                            placeholder="seu@email.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm uppercase tracking-wider mb-2" htmlFor="password">Senha</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={formInput.password}
                            onChange={handleInputChange}
                            className="w-full rounded-xl border border-white/20 bg-black/60 p-3 text-white outline-none focus:border-[#c4a484]"
                            placeholder="********"
                        />
                    </div>

                    {error && <p className="text-sm text-red-400">{error}</p>}

                    <button
                        type="submit"
                        className="w-full rounded-xl bg-[#c4a484] px-5 py-3 text-black font-bold hover:bg-[#a68a6d] transition"
                    >
                        {isRegistering ? "Criar Conta" : "Entrar"}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-300">
                    <p>
                        {isRegistering
                            ? "Já tem uma conta?"
                            : "Não tem conta?"
                        }
                        <button
                            type="button"
                            onClick={() => {
                                setIsRegistering(!isRegistering);
                                setError("");
                                setFormInput({ name: '', email: '', password: '' });
                            }}
                            className="ml-1 text-[#c4a484] hover:text-[#a68a6d] underline"
                        >
                            {isRegistering ? "Fazer login" : "Criar conta"}
                        </button>
                    </p>
                    <Link to="/" className="inline-block mt-4 text-[#c4a484] hover:text-[#a68a6d]">Voltar para o início</Link>
                </div>
            </div>
        </div>
    );
};

export default Auth;
