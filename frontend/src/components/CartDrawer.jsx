import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Added
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import useCartStore from "../store/useCartStore";

const CartDrawer = () => {
  const navigate = useNavigate(); // Initialize
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
  } = useCartStore();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );

  // Added handler
  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate("/checkout");
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-atelier-ink/40 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-atelier-paper shadow-2xl z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="p-8 border-b border-atelier-ink/10 flex justify-between items-center">
              <h2 className="text-[11px] tracking-[0.5em] uppercase font-sans font-bold">
                Your Selection
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="hover:rotate-90 transition-transform duration-300"
              >
                <X size={20} strokeWidth={1} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="flex gap-6 relative group"
                  >
                    <div className="w-24 aspect-[4/5] bg-atelier-ink/5 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div className="pr-6">
                        <h3 className="font-serif italic text-xl mb-2 leading-tight">
                          {item.name}
                        </h3>

                        {item.format ? (
                          <div className="space-y-1">
                            <p className="text-[9px] tracking-widest uppercase opacity-60">
                              Format: {item.format}
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <p className="text-[9px] tracking-widest uppercase opacity-60">
                              Size: {item.size} — Width: {item.width}
                            </p>
                            <p className="text-[9px] tracking-widest uppercase opacity-60">
                              Last: {item.last} — Sole: {item.sole}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex justify-between items-end mt-4">
                        <div className="flex items-center border border-atelier-ink/10">
                          <button
                            onClick={() =>
                              updateQuantity(item.cartItemId, item.qty - 1)
                            }
                            className="p-2 hover:bg-atelier-ink/5"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="px-3 text-xs font-sans">
                            {item.qty}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.cartItemId, item.qty + 1)
                            }
                            className="p-2 hover:bg-atelier-ink/5"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <span className="font-sans text-sm">
                          ${(item.price * item.qty).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="absolute top-1 right-0 opacity-40 hover:opacity-100 hover:text-red-800 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <p className="font-serif italic opacity-40 mb-4">
                    The atelier is currently empty.
                  </p>
                  <Link to="/store">
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="text-[10px] tracking-widest uppercase border-b border-atelier-ink pb-1"
                    >
                      Return to Store
                    </button>
                  </Link>
                </div>
              )}
            </div>

            {/* Footer Summary */}
            {cartItems.length > 0 && (
              <div className="p-8 bg-white border-t border-atelier-ink/10 space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] tracking-widest uppercase opacity-60">
                    <span>Subtotal</span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[10px] tracking-widest uppercase opacity-60">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between font-sans font-bold pt-4 border-t border-atelier-ink/5">
                    <span className="text-[11px] tracking-[0.3em] uppercase">
                      Subtotal Due
                    </span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout} // Wired
                  className="w-full bg-atelier-ink text-white py-5 text-[10px] tracking-[0.4em] uppercase font-bold hover:bg-atelier-tan transition-colors"
                >
                  Proceed to Checkout
                </button>
                <p className="text-[9px] text-center opacity-40 italic font-serif">
                  Duties, taxes, and shipping calculated at secure checkout.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
