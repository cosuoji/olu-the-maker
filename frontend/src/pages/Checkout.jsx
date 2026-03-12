import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useOrderStore from "../store/useOrderStore";
import useCartStore from "../store/useCartStore";

const Checkout = () => {
  const navigate = useNavigate();
  const { shippingAddress, saveShippingAddress } = useOrderStore();
  const { cartItems } = useCartStore();

  const [address, setAddress] = useState(shippingAddress.addressLine1 || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [state, setState] = useState(shippingAddress.state || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || "",
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save to Zustand
    saveShippingAddress({
      addressLine1: address,
      city,
      state,
      postalCode,
      country,
    });
    // Navigate to the final payment review step
    navigate("/payment");
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-40 text-center font-serif italic bg-atelier-paper">
        Your selection is empty.
      </div>
    );
  }

  return (
    <main className="bg-atelier-paper text-atelier-ink min-h-screen pt-32 pb-32">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-serif italic tracking-tighter mb-12 text-center">
          Shipping Details
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <div>
              <label className="text-[10px] tracking-[0.4em] uppercase font-bold mb-2 block">
                Address
              </label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-transparent border-b border-atelier-ink/20 py-3 focus:outline-none focus:border-atelier-ink transition-colors font-serif italic text-lg"
                placeholder="123 Maker Street"
              />
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className="text-[10px] tracking-[0.4em] uppercase font-bold mb-2 block">
                  City
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-transparent border-b border-atelier-ink/20 py-3 focus:outline-none focus:border-atelier-ink transition-colors font-serif italic text-lg"
                  placeholder="Lekki"
                />
              </div>
              <div>
                <label className="text-[10px] tracking-[0.4em] uppercase font-bold mb-2 block">
                  State
                </label>
                <input
                  type="text"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full bg-transparent border-b border-atelier-ink/20 py-3 focus:outline-none focus:border-atelier-ink transition-colors font-serif italic text-lg"
                  placeholder="Lagos"
                />
              </div>
              <div>
                <label className="text-[10px] tracking-[0.4em] uppercase font-bold mb-2 block">
                  Postal Code
                </label>
                <input
                  type="text"
                  required
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="w-full bg-transparent border-b border-atelier-ink/20 py-3 focus:outline-none focus:border-atelier-ink transition-colors font-serif italic text-lg"
                  placeholder="100001"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] tracking-[0.4em] uppercase font-bold mb-2 block">
                Country
              </label>
              <input
                type="text"
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full bg-transparent border-b border-atelier-ink/20 py-3 focus:outline-none focus:border-atelier-ink transition-colors font-serif italic text-lg"
                placeholder="Nigeria"
              />
            </div>
          </div>

          <div className="pt-8 border-t border-atelier-ink/10 flex justify-between items-center">
            <span className="font-sans text-xl">
              ${subtotal.toLocaleString()}
            </span>
            <button
              type="submit"
              className="bg-atelier-ink text-white px-8 py-4 text-[10px] tracking-[0.4em] uppercase font-bold hover:bg-atelier-tan transition-colors"
            >
              Continue to Payment
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Checkout;
