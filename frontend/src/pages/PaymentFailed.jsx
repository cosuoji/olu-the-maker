import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlertCircle, RefreshCcw, ArrowLeft } from "lucide-react";

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-atelier-paper pt-40 pb-20 px-6">
      <div className="max-w-2xl mx-auto border border-red-900/10 p-8 md:p-16 bg-white/30 backdrop-blur-sm relative overflow-hidden">
        {/* Error Header */}
        <div className="text-center mb-16">
          <AlertCircle
            className="mx-auto mb-6 text-red-900 opacity-40"
            size={48}
          />
          <h1 className="text-4xl md:text-5xl font-serif italic mb-4 text-red-900">
            Payment Interrupted
          </h1>
          <p className="text-[10px] tracking-[0.3em] uppercase opacity-60">
            The transaction could not be verified by the bank.
          </p>
        </div>

        {/* Message */}
        <div className="text-center space-y-6 mb-16">
          <p className="font-serif italic text-lg opacity-80">
            Your commission details are still saved in our logs. You may attempt
            the transaction again or return to the archive.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-3 border border-atelier-ink py-4 text-[10px] tracking-[0.3em] uppercase font-bold hover:bg-atelier-ink hover:text-white transition-all"
          >
            <RefreshCcw size={14} /> Retry Payment
          </button>

          <Link
            to="/store"
            className="flex items-center justify-center gap-3 bg-atelier-ink text-white py-4 text-[10px] tracking-[0.3em] uppercase font-bold hover:bg-atelier-tan transition-all"
          >
            <ArrowLeft size={14} /> Return to Store
          </Link>
        </div>

        {/* Subtle Background Detail */}
        <div className="absolute -bottom-10 -left-10 opacity-[0.02] pointer-events-none text-[150px] font-serif italic">
          !
        </div>
      </div>
    </main>
  );
};

export default PaymentFailed;
