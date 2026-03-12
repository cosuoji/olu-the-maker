import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { CheckCircle2, Package, ArrowRight } from "lucide-react";
import API from "../api/axios";
import useCartStore from "../store/useCartStore";

const OrderSuccess = () => {
  const { id } = useParams(); // The Order ID from the URL
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams(); // Access URL queries like ?transaction_id=...
  const [order, setOrder] = useState(null);
  const { clearCart } = useCartStore();

  useEffect(() => {
    const confirmPayment = async () => {
      // Get the transaction_id from the URL redirect
      const transaction_id = searchParams.get("transaction_id");

      try {
        // Send the transaction_id to the backend for verification
        const { data } = await API.put(`/orders/${id}/pay`, {
          transaction_id: transaction_id, // This is what the backend now expects
        });

        setOrder(data);
        clearCart();
        setLoading(false);
      } catch (error) {
        console.error("Verification failed", error);
        setLoading(false);
      }
    };

    if (id) confirmPayment();
  }, [id, searchParams, clearCart]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-atelier-paper flex flex-col items-center justify-center font-serif italic opacity-50">
        <div className="animate-pulse">Finalizing your commission...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-atelier-paper flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-serif italic text-2xl mb-4">Archives not found.</h2>
        <Link
          to="/store"
          className="text-[10px] tracking-[0.4em] uppercase underline"
        >
          Return to Store
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-atelier-paper pt-40 pb-20 px-6">
      <div className="max-w-2xl mx-auto border border-atelier-ink/10 p-8 md:p-16 bg-white/30 backdrop-blur-sm relative overflow-hidden">
        {/* Success Header */}
        <div className="text-center mb-16">
          <CheckCircle2
            className="mx-auto mb-6 text-atelier-ink opacity-20"
            size={48}
          />
          <h1 className="text-4xl md:text-5xl font-serif italic mb-4">
            Commission Confirmed
          </h1>
          <p className="text-[10px] tracking-[0.3em] uppercase opacity-60">
            Order Reference:{" "}
            <span className="font-sans font-bold">{order._id}</span>
          </p>
        </div>

        {/* Order Details */}
        <div className="space-y-8 mb-16">
          <h3 className="text-[10px] tracking-[0.4em] uppercase font-bold border-b border-atelier-ink/10 pb-4">
            Items Logged
          </h3>
          {order.orderItems.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-start text-sm"
            >
              <div>
                <p className="font-serif italic text-lg">{item.name}</p>
                <p className="text-[9px] tracking-widest uppercase opacity-50 mt-1">
                  Qty: {item.qty}{" "}
                  {item.configuration?.size &&
                    `| Size: ${item.configuration.size}`}
                </p>
              </div>
              <p className="font-sans">
                ${(item.price * item.qty).toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="border-t border-atelier-ink/10 pt-8 space-y-4 mb-16">
          <div className="flex justify-between text-[10px] tracking-widest uppercase opacity-60">
            <span>Total Value</span>
            <span className="font-sans text-sm">
              ${order.totalPrice.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-[10px] tracking-widest uppercase">
            <span className="font-bold">Payment Status</span>
            <span className="text-green-700 font-bold">Authenticated</span>
          </div>
        </div>

        {/* Next Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/store"
            className="flex items-center justify-center gap-3 border border-atelier-ink py-4 text-[10px] tracking-[0.3em] uppercase font-bold hover:bg-atelier-ink hover:text-white transition-all"
          >
            Back to Store <ArrowRight size={14} />
          </Link>
          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-3 bg-atelier-ink text-white py-4 text-[10px] tracking-[0.3em] uppercase font-bold hover:bg-atelier-tan transition-all"
          >
            Print Receipt
          </button>
        </div>

        {/* Subtle Brand Watermark */}
        <div className="absolute -bottom-4 -right-4 opacity-[0.03] pointer-events-none">
          <Package size={200} />
        </div>
      </div>
    </main>
  );
};

export default OrderSuccess;
