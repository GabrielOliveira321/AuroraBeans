import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, ArrowLeft, Clock, CreditCard, MapPin, CheckCircle, XCircle, Loader, ShoppingBag, Coffee, AlertCircle } from 'lucide-react';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { useAuth } from '../../Provider/AuthProvider';
import { getOrdersApi } from '../../api/checkoutApi';

const statusConfig = {
  pending: {
    label: 'Pendente',
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10',
    border: 'border-yellow-400/30',
    icon: Clock,
  },
  paid: {
    label: 'Pago',
    color: 'text-green-400',
    bg: 'bg-green-400/10',
    border: 'border-green-400/30',
    icon: CheckCircle,
  },
  cancelled: {
    label: 'Cancelado',
    color: 'text-red-400',
    bg: 'bg-red-400/10',
    border: 'border-red-400/30',
    icon: XCircle,
  },
};

const defaultStatus = {
  label: 'Desconhecido',
  color: 'text-gray-400',
  bg: 'bg-gray-400/10',
  border: 'border-gray-400/30',
  icon: AlertCircle,
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};

const formatTime = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

const formatPrice = (price) => {
  return price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

const OrderCard = ({ order }) => {
  const status = statusConfig[order.status] || defaultStatus;
  const StatusIcon = status.icon;

  return (
    <div className="group bg-[#1a1714] border border-white/5 rounded-sm hover:border-[#c4a484]/20 transition-all duration-300 overflow-hidden">
      {/* Header */}
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Package size={20} className="text-[#c4a484]" />
              <span className="text-sm text-gray-500 uppercase tracking-wider">
                Pedido #{order.id}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                {formatDate(order.createdAt)}
              </span>
              <span className="text-gray-600">•</span>
              <span>{formatTime(order.createdAt)}</span>
            </div>
          </div>

          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-sm border ${status.bg} ${status.border}`}>
            <StatusIcon size={16} className={status.color} />
            <span className={`text-sm font-semibold ${status.color}`}>
              {status.label}
            </span>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left - Plan Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <Coffee size={16} className="text-[#c4a484] shrink-0" />
              <span className="text-gray-300 font-medium">{order.plan}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CreditCard size={16} className="text-[#c4a484] shrink-0" />
              <span className="text-gray-400">
                {order.cardLast4 ? `**** ${order.cardLast4}` : 'Cartão não registrado'}
              </span>
            </div>
            <div className="text-2xl font-serif text-[#c4a484] mt-2">
              {formatPrice(order.price)}
            </div>
          </div>

          {/* Right - Address */}
          <div className="space-y-2 p-4 bg-[#0f0c0a] rounded-sm border border-white/5">
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
              <MapPin size={14} className="text-[#c4a484]" />
              <span className="uppercase tracking-wider text-xs">Endereço de entrega</span>
            </div>
            <p className="text-sm text-gray-300">
              {order.firstName} {order.lastName}
            </p>
            <p className="text-sm text-gray-400">
              {order.address}, {order.addressNumber}
            </p>
            <p className="text-sm text-gray-400">
              {order.city} — {order.zip}
            </p>
          </div>
        </div>
      </div>

      {/* Footer with stripe payment ID */}
      {order.stripePaymentId && (
        <div className="px-6 md:px-8 py-3 bg-black/20 border-t border-white/5 flex items-center gap-2">
          <span className="text-xs text-gray-600">Payment ID:</span>
          <span className="text-xs text-gray-500 font-mono truncate">
            {order.stripePaymentId}
          </span>
        </div>
      )}
    </div>
  );
};

const Orders = () => {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const loadOrders = async () => {
      setLoading(true);
      setError('');
      const result = await getOrdersApi(token);
      if (result.success) {
        setOrders(result.orders);
      } else {
        setError(result.message || 'Erro ao carregar pedidos.');
      }
      setLoading(false);
    };

    loadOrders();
  }, [token, navigate]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0c0a] text-[#fdfaf1] flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center pt-32">
          <div className="text-center">
            <Loader size={32} className="text-[#c4a484] animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Carregando seus pedidos...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0c0a] text-[#fdfaf1] flex flex-col">
      <Header />

      <main className="flex-1 pt-28 pb-20 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto w-full">
          {/* Breadcrumb */}
          <div className="mb-10">
            <button
              onClick={() => navigate('/profile')}
              className="inline-flex items-center gap-2 text-gray-500 hover:text-[#c4a484] transition-colors text-sm uppercase tracking-widest"
            >
              <ArrowLeft size={14} />
              Voltar ao Perfil
            </button>
          </div>

          {/* Page Header */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-[#c4a484]/10 rounded-sm">
                <Package size={28} className="text-[#c4a484]" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-serif">
                  Meus <span className="italic text-[#c4a484]">Pedidos</span>
                </h1>
                <p className="text-gray-400 text-sm mt-1">
                  Acompanhe o status dos seus pedidos
                </p>
              </div>
            </div>
            <div className="w-16 h-[1px] bg-[#c4a484]/40" />
          </div>

          {/* Error State */}
          {error && (
            <div className="mb-8 p-5 bg-red-900/20 border border-red-700/30 rounded-sm flex items-start gap-3 text-sm text-red-400">
              <AlertCircle size={20} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Empty State */}
          {!error && orders.length === 0 && (
            <div className="text-center py-20 px-6">
              <div className="w-20 h-20 mx-auto mb-6 bg-[#1a1714] rounded-full flex items-center justify-center border border-white/5">
                <ShoppingBag size={36} className="text-gray-600" />
              </div>
              <h2 className="text-2xl font-serif mb-3">
                Nenhum pedido ainda
              </h2>
              <p className="text-gray-400 max-w-md mx-auto mb-8 leading-relaxed">
                Você ainda não fez nenhum pedido. Que tal explorar nosso menu e escolher seu café favorito?
              </p>
              <button
                onClick={() => navigate('/Products')}
                className="inline-flex items-center gap-3 bg-[#c4a484] text-[#0f0c0a] px-8 py-4 rounded-sm font-bold uppercase tracking-widest text-sm hover:bg-[#a38665] transition-all duration-300 active:scale-95"
              >
                <Coffee size={18} />
                Ver Cafés
              </button>
            </div>
          )}

          {/* Orders List */}
          {orders.length > 0 && (
            <div className="space-y-6">
              {/* Summary bar */}
              <div className="flex flex-wrap items-center gap-4 mb-8 p-4 bg-[#1a1714] border border-white/5 rounded-sm text-sm">
                <span className="text-gray-400">
                  Total de pedidos:{' '}
                  <strong className="text-[#fdfaf1]">{orders.length}</strong>
                </span>
                <span className="text-gray-600 hidden md:inline">|</span>
                <span className="text-gray-400">
                  Último pedido:{' '}
                  <strong className="text-[#fdfaf1]">
                    {formatDate(orders[0].createdAt)}
                  </strong>
                </span>
              </div>

              {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Orders;
