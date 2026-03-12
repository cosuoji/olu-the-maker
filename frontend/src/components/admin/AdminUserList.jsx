import React, { useEffect, useState } from "react";
import API from "../../api/axios.js";
import { Search, ChevronDown, ChevronUp, MapPin, Package } from "lucide-react";

const AdminUserList = () => {
  const [users, setUsers] = useState([]);
  const [allOrders, setAllOrders] = useState([]); // We fetch orders to link them here
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedUser, setExpandedUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, orderData] = await Promise.all([
          API.get("/auth"),
          API.get("/orders"),
        ]);
        setUsers(userData.data);
        setAllOrders(orderData.data);
        setLoading(false);
      } catch (error) {
        console.error("Archive retrieval failed", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading)
    return (
      <div className="font-serif italic opacity-50 text-center py-12">
        Gathering client registry...
      </div>
    );

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 opacity-20"
          size={16}
        />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-atelier-ink/5 border-none py-4 pl-12 pr-4 text-[10px] tracking-widest uppercase focus:ring-1 focus:ring-atelier-ink/20 outline-none"
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredUsers.map((user) => {
          const userOrders = allOrders.filter((o) => o.user?._id === user._id);
          const isExpanded = expandedUser === user._id;

          return (
            <div
              key={user._id}
              className="border border-atelier-ink/10 transition-all overflow-hidden bg-white/50"
            >
              <button
                onClick={() => setExpandedUser(isExpanded ? null : user._id)}
                className="w-full p-6 flex justify-between items-center hover:bg-atelier-ink/[0.02]"
              >
                <div className="text-left">
                  <h3 className="font-serif italic text-lg">{user.name}</h3>
                  <p className="text-[9px] tracking-widest uppercase opacity-40">
                    {user.email}
                  </p>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-[9px] tracking-[0.2em] font-bold uppercase opacity-60">
                    {userOrders.length} Commissions
                  </span>
                  {isExpanded ? (
                    <ChevronUp size={14} />
                  ) : (
                    <ChevronDown size={14} />
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="p-6 border-t border-atelier-ink/5 bg-atelier-ink/[0.01] animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Address History */}
                    <div>
                      <h4 className="flex items-center gap-2 text-[9px] tracking-[0.3em] uppercase font-bold mb-4 opacity-50">
                        <MapPin size={12} /> Shipping Archives
                      </h4>
                      {userOrders.length > 0 ? (
                        <div className="space-y-3 font-sans text-xs">
                          {/* Get unique addresses from their orders */}
                          {[
                            ...new Set(
                              userOrders.map(
                                (o) =>
                                  `${o.shippingAddress.addressLine1}, ${o.shippingAddress.city}`,
                              ),
                            ),
                          ].map((addr, i) => (
                            <p key={i} className="opacity-70">
                              {addr}
                            </p>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs italic opacity-40">
                          No address on file
                        </p>
                      )}
                    </div>

                    {/* Order IDs */}
                    <div>
                      <h4 className="flex items-center gap-2 text-[9px] tracking-[0.3em] uppercase font-bold mb-4 opacity-50">
                        <Package size={12} /> Commissions
                      </h4>
                      <div className="space-y-2">
                        {userOrders.map((o) => (
                          <div
                            key={o._id}
                            className="flex justify-between items-center text-[10px] tracking-tighter"
                          >
                            <span className="font-mono opacity-60">
                              ID: {o._id}
                            </span>
                            <span
                              className={
                                o.isPaid ? "text-green-700" : "text-red-700"
                              }
                            >
                              {o.isPaid ? "PAID" : "PENDING"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminUserList;
