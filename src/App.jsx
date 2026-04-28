import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Search, Heart, Star, X, Minus, Plus, ShieldCheck, Truck, CreditCard, Menu, ChevronRight, Lock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const products = [
  {
    id: 1,
    name: "Aurelio Full-Grain Leather Tote",
    category: "Bags",
    price: 18990,
    rating: 4.9,
    tag: "Bestseller",
    color: "Cognac",
    image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=1200&auto=format&fit=crop",
    desc: "Hand-finished full-grain leather tote with structured silhouette, brass hardware, and soft suede lining.",
  },
  {
    id: 2,
    name: "Velluto Italian Leather Belt",
    category: "Belts",
    price: 5990,
    rating: 4.8,
    tag: "New",
    color: "Black",
    image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=1200&auto=format&fit=crop",
    desc: "Minimal luxury belt crafted from vegetable-tanned Italian leather with a polished metal buckle.",
  },
  {
    id: 3,
    name: "Noir Executive Briefcase",
    category: "Bags",
    price: 24990,
    rating: 5.0,
    tag: "Premium",
    color: "Midnight Black",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop",
    desc: "Professional briefcase with laptop compartment, hidden magnetic closure, and reinforced handle.",
  },
  {
    id: 4,
    name: "Roma Leather Loafers",
    category: "Footwear",
    price: 12990,
    rating: 4.7,
    tag: "Limited",
    color: "Wine Brown",
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1200&auto=format&fit=crop",
    desc: "Elegant hand-polished loafers with cushioned sole and signature metal accent.",
  },
  {
    id: 5,
    name: "Classic Card Holder",
    category: "Wallets",
    price: 3490,
    rating: 4.6,
    tag: "Gift Pick",
    color: "Tan",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1200&auto=format&fit=crop",
    desc: "Slim card holder with six slots, RFID protection, and embossed monogram option.",
  },
  {
    id: 6,
    name: "Heritage Travel Duffel",
    category: "Bags",
    price: 27990,
    rating: 4.9,
    tag: "Travel",
    color: "Chestnut",
    image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=1200&auto=format&fit=crop",
    desc: "Weekend duffel with antique brass zippers, detachable shoulder strap, and spacious inner pocket.",
  },
];

const categories = ["All", "Bags", "Belts", "Footwear", "Wallets"];

function formatPrice(value) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);
}

export default function LuxuryLeatherWebsite() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(products[0]);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: "Razorpay",
  });

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch = activeCategory === "All" || product.category === activeCategory;
      const searchMatch = product.name.toLowerCase().includes(query.toLowerCase()) || product.category.toLowerCase().includes(query.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [activeCategory, query]);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleCustomerChange = (field, value) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
  };

  const openCheckout = () => {
    if (cart.length === 0) return;
    setCartOpen(false);
    setCheckoutOpen(true);
    setPaymentSuccess(false);
  };

  const placeDemoOrder = () => {
    if (!customer.name || !customer.email || !customer.phone || !customer.address) {
      alert("Please fill all customer details before payment.");
      return;
    }

    setPaymentSuccess(true);
    setCart([]);
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) return prev.map((item) => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      return [...prev, { ...product, qty: 1 }];
    });
    setCartOpen(true);
  };

  const updateQty = (id, change) => {
    setCart((prev) =>
      prev
        .map((item) => item.id === id ? { ...item, qty: Math.max(0, item.qty + change) } : item)
        .filter((item) => item.qty > 0)
    );
  };

  return (
    <div className="min-h-screen bg-[#0f0d0a] text-[#f8efe2]">
      <header className="sticky top-0 z-40 border-b border-[#d7b56d]/20 bg-[#0f0d0a]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}><Menu /></button>
            <div>
              <h1 className="font-serif text-2xl tracking-[0.35em] text-[#d7b56d]">VELORA</h1>
              <p className="text-xs uppercase tracking-[0.35em] text-[#f8efe2]/50">Leather Maison</p>
            </div>
          </div>
          <nav className="hidden items-center gap-8 text-sm uppercase tracking-[0.22em] text-[#f8efe2]/75 lg:flex">
            <a href="#collection" className="hover:text-[#d7b56d]">Collection</a>
            <a href="#craft" className="hover:text-[#d7b56d]">Craft</a>
            <a href="#purchase" className="hover:text-[#d7b56d]">Purchase</a>
          </nav>
          <button onClick={() => setCartOpen(true)} className="relative rounded-full border border-[#d7b56d]/40 p-3 hover:bg-[#d7b56d]/10">
            <ShoppingBag size={20} />
            {cart.length > 0 && <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-[#d7b56d] text-xs text-black">{cart.length}</span>}
          </button>
        </div>
        {menuOpen && (
          <div className="grid gap-4 border-t border-[#d7b56d]/20 px-5 py-4 text-sm uppercase tracking-[0.22em] lg:hidden">
            <a href="#collection">Collection</a><a href="#craft">Craft</a><a href="#purchase">Purchase</a>
          </div>
        )}
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(215,181,109,.28),transparent_32%),linear-gradient(120deg,#0f0d0a_35%,rgba(70,38,20,.7))]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 lg:grid-cols-2 lg:py-28">
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="mb-4 text-sm uppercase tracking-[0.45em] text-[#d7b56d]">Luxury Leather Studio</p>
            <h2 className="font-serif text-5xl leading-tight md:text-7xl">Crafted for those who notice every detail.</h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#f8efe2]/70">Premium leather bags, belts, footwear, and wallets with immersive product previews, elegant filtering, cart management, and a smooth purchase journey.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button onClick={() => document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" })} className="rounded-full bg-[#d7b56d] px-8 py-6 text-black hover:bg-[#efd188]">Explore Collection</Button>
              <Button variant="outline" className="rounded-full border-[#d7b56d]/50 bg-transparent px-8 py-6 text-[#f8efe2] hover:bg-[#d7b56d]/10">Book Custom Order</Button>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="relative">
            <div className="absolute -inset-4 rounded-[3rem] bg-[#d7b56d]/20 blur-2xl" />
            <img src={selected.image} alt={selected.name} className="relative h-[520px] w-full rounded-[3rem] object-cover shadow-2xl" />
            <div className="absolute bottom-6 left-6 right-6 rounded-3xl border border-white/10 bg-black/45 p-5 backdrop-blur-xl">
              <p className="text-sm text-[#d7b56d]">Featured Piece</p>
              <h3 className="font-serif text-2xl">{selected.name}</h3>
              <p className="mt-1 text-[#f8efe2]/70">{formatPrice(selected.price)}</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="collection" className="mx-auto max-w-7xl px-5 py-20">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-[#d7b56d]">Interactive Display</p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">Signature Collection</h2>
          </div>
          <div className="flex items-center gap-3 rounded-full border border-[#d7b56d]/25 bg-white/5 px-4 py-3">
            <Search size={18} className="text-[#d7b56d]" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search leather products" className="bg-transparent text-sm outline-none placeholder:text-[#f8efe2]/40" />
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`rounded-full border px-5 py-2 text-sm transition ${activeCategory === cat ? "border-[#d7b56d] bg-[#d7b56d] text-black" : "border-[#d7b56d]/30 text-[#f8efe2]/70 hover:bg-[#d7b56d]/10"}`}>{cat}</button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <motion.div key={product.id} layout whileHover={{ y: -8 }}>
              <Card className="overflow-hidden rounded-[2rem] border-[#d7b56d]/20 bg-[#17130f] text-[#f8efe2] shadow-xl">
                <div className="group relative h-80 overflow-hidden">
                  <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                  <div className="absolute left-4 top-4 rounded-full bg-black/55 px-4 py-2 text-xs uppercase tracking-[0.2em] text-[#d7b56d] backdrop-blur">{product.tag}</div>
                  <button className="absolute right-4 top-4 rounded-full bg-black/45 p-3 backdrop-blur hover:bg-[#d7b56d] hover:text-black"><Heart size={18} /></button>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-serif text-2xl">{product.name}</h3>
                    <span className="text-[#d7b56d]">{formatPrice(product.price)}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm text-[#f8efe2]/60">
                    <span>{product.category} • {product.color}</span>
                    <span className="flex items-center gap-1"><Star size={15} className="fill-current text-[#d7b56d]" /> {product.rating}</span>
                  </div>
                  <p className="mt-4 min-h-16 text-sm leading-6 text-[#f8efe2]/65">{product.desc}</p>
                  <div className="mt-6 flex gap-3">
                    <Button onClick={() => setSelected(product)} variant="outline" className="flex-1 rounded-full border-[#d7b56d]/40 bg-transparent text-[#f8efe2] hover:bg-[#d7b56d]/10">Preview</Button>
                    <Button onClick={() => addToCart(product)} className="flex-1 rounded-full bg-[#d7b56d] text-black hover:bg-[#efd188]">Add Bag</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="craft" className="border-y border-[#d7b56d]/15 bg-[#17130f] py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 md:grid-cols-3">
          {[
            [ShieldCheck, "Authentic Craft", "Full-grain leather, premium stitching, quality-checked finishing."],
            [Truck, "Luxury Delivery", "Elegant packaging with tracked doorstep delivery across India."],
            [CreditCard, "Secure Purchase", "Checkout-ready UI section with card, UPI, and COD style options."],
          ].map(([Icon, title, text]) => (
            <div key={title} className="rounded-[2rem] border border-[#d7b56d]/20 bg-black/20 p-8">
              <Icon className="text-[#d7b56d]" size={34} />
              <h3 className="mt-5 font-serif text-2xl">{title}</h3>
              <p className="mt-3 text-[#f8efe2]/65">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="purchase" className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-[1fr_.8fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.4em] text-[#d7b56d]">Product Preview</p>
          <h2 className="mt-3 font-serif text-4xl">{selected.name}</h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-[#f8efe2]/70">{selected.desc}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl bg-white/5 p-5"><p className="text-[#d7b56d]">Material</p><p>Full-grain leather</p></div>
            <div className="rounded-3xl bg-white/5 p-5"><p className="text-[#d7b56d]">Color</p><p>{selected.color}</p></div>
            <div className="rounded-3xl bg-white/5 p-5"><p className="text-[#d7b56d]">Rating</p><p>{selected.rating}/5</p></div>
          </div>
        </div>
        <div className="rounded-[2rem] border border-[#d7b56d]/20 bg-[#17130f] p-6">
          <h3 className="font-serif text-3xl">Purchase Panel</h3>
          <p className="mt-2 text-[#f8efe2]/60">Select your product and proceed to checkout.</p>
          <div className="mt-6 flex items-center justify-between rounded-3xl bg-black/25 p-5">
            <div>
              <p className="text-sm text-[#f8efe2]/50">Selected item</p>
              <p className="font-medium">{selected.name}</p>
            </div>
            <p className="text-xl text-[#d7b56d]">{formatPrice(selected.price)}</p>
          </div>
          <Button onClick={() => addToCart(selected)} className="mt-6 w-full rounded-full bg-[#d7b56d] py-6 text-black hover:bg-[#efd188]">Add Selected Product to Cart <ChevronRight size={18} /></Button>
        </div>
      </section>

      <footer className="border-t border-[#d7b56d]/15 px-5 py-10 text-center text-sm text-[#f8efe2]/50">
        © 2026 Velora Leather Maison. Luxury-inspired custom e-commerce concept.
      </footer>

      <AnimatePresence>
        {cartOpen && (
          <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 220 }} className="fixed right-0 top-0 z-50 h-full w-full max-w-md border-l border-[#d7b56d]/20 bg-[#0f0d0a] p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-3xl">Shopping Bag</h3>
              <button onClick={() => setCartOpen(false)} className="rounded-full border border-[#d7b56d]/30 p-2"><X /></button>
            </div>
            <div className="mt-8 space-y-5">
              {cart.length === 0 ? <p className="text-[#f8efe2]/55">Your luxury bag is empty.</p> : cart.map((item) => (
                <div key={item.id} className="flex gap-4 rounded-3xl bg-white/5 p-4">
                  <img src={item.image} alt={item.name} className="h-24 w-24 rounded-2xl object-cover" />
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="mt-1 text-[#d7b56d]">{formatPrice(item.price)}</p>
                    <div className="mt-3 flex items-center gap-3">
                      <button onClick={() => updateQty(item.id, -1)} className="rounded-full bg-black/30 p-1"><Minus size={15} /></button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} className="rounded-full bg-black/30 p-1"><Plus size={15} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute bottom-0 left-0 right-0 border-t border-[#d7b56d]/15 bg-[#0f0d0a] p-6">
              <div className="flex items-center justify-between text-lg">
                <span>Subtotal</span><span className="text-[#d7b56d]">{formatPrice(subtotal)}</span>
              </div>
              <Button onClick={openCheckout} disabled={cart.length === 0} className="mt-5 w-full rounded-full bg-[#d7b56d] py-6 text-black hover:bg-[#efd188] disabled:opacity-40">Proceed to Secure Checkout</Button>
              <p className="mt-3 text-center text-xs text-[#f8efe2]/40">Demo checkout UI. Connect backend/payment gateway for real orders.</p>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {checkoutOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] grid place-items-center bg-black/70 p-4 backdrop-blur-sm">
            <motion.div initial={{ y: 35, scale: 0.96 }} animate={{ y: 0, scale: 1 }} exit={{ y: 35, scale: 0.96 }} className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] border border-[#d7b56d]/25 bg-[#0f0d0a] p-6 text-[#f8efe2] shadow-2xl">
              <div className="flex items-center justify-between gap-4 border-b border-[#d7b56d]/15 pb-5">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-[#d7b56d]">Secure Checkout</p>
                  <h3 className="mt-2 font-serif text-3xl">Complete Your Purchase</h3>
                </div>
                <button onClick={() => setCheckoutOpen(false)} className="rounded-full border border-[#d7b56d]/30 p-2 hover:bg-[#d7b56d]/10"><X /></button>
              </div>

              {paymentSuccess ? (
                <div className="grid place-items-center py-16 text-center">
                  <CheckCircle2 size={72} className="text-[#d7b56d]" />
                  <h4 className="mt-6 font-serif text-4xl">Payment Successful</h4>
                  <p className="mt-3 max-w-xl text-[#f8efe2]/65">Your demo order has been placed. Connect Razorpay backend APIs to make this a real transaction system.</p>
                  <Button onClick={() => setCheckoutOpen(false)} className="mt-8 rounded-full bg-[#d7b56d] px-8 py-6 text-black hover:bg-[#efd188]">Back to Store</Button>
                </div>
              ) : (
                <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
                  <div className="space-y-5">
                    <div className="rounded-[1.5rem] border border-[#d7b56d]/15 bg-white/5 p-5">
                      <h4 className="font-serif text-2xl">Customer Details</h4>
                      <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        <input value={customer.name} onChange={(e) => handleCustomerChange("name", e.target.value)} placeholder="Full Name" className="rounded-2xl border border-[#d7b56d]/20 bg-black/25 px-4 py-3 outline-none placeholder:text-[#f8efe2]/35 focus:border-[#d7b56d]" />
                        <input value={customer.phone} onChange={(e) => handleCustomerChange("phone", e.target.value)} placeholder="Phone Number" className="rounded-2xl border border-[#d7b56d]/20 bg-black/25 px-4 py-3 outline-none placeholder:text-[#f8efe2]/35 focus:border-[#d7b56d]" />
                        <input value={customer.email} onChange={(e) => handleCustomerChange("email", e.target.value)} placeholder="Email Address" className="rounded-2xl border border-[#d7b56d]/20 bg-black/25 px-4 py-3 outline-none placeholder:text-[#f8efe2]/35 focus:border-[#d7b56d] sm:col-span-2" />
                        <textarea value={customer.address} onChange={(e) => handleCustomerChange("address", e.target.value)} placeholder="Delivery Address" rows={4} className="rounded-2xl border border-[#d7b56d]/20 bg-black/25 px-4 py-3 outline-none placeholder:text-[#f8efe2]/35 focus:border-[#d7b56d] sm:col-span-2" />
                      </div>
                    </div>

                    <div className="rounded-[1.5rem] border border-[#d7b56d]/15 bg-white/5 p-5">
                      <h4 className="font-serif text-2xl">Payment Options</h4>
                      <div className="mt-5 grid gap-3">
                        {["Razorpay", "UPI", "Credit / Debit Card", "Cash on Delivery"].map((method) => (
                          <button key={method} onClick={() => handleCustomerChange("paymentMethod", method)} className={`flex items-center justify-between rounded-2xl border px-4 py-4 text-left transition ${customer.paymentMethod === method ? "border-[#d7b56d] bg-[#d7b56d]/15" : "border-[#d7b56d]/15 bg-black/20 hover:bg-white/5"}`}>
                            <span className="flex items-center gap-3"><CreditCard size={18} className="text-[#d7b56d]" /> {method}</span>
                            <span className={`h-4 w-4 rounded-full border ${customer.paymentMethod === method ? "border-[#d7b56d] bg-[#d7b56d]" : "border-[#f8efe2]/30"}`} />
                          </button>
                        ))}
                      </div>
                      <p className="mt-4 flex items-center gap-2 text-sm text-[#f8efe2]/50"><Lock size={15} /> Demo checkout UI. Real payment needs backend verification.</p>
                    </div>
                  </div>

                  <div className="rounded-[1.5rem] border border-[#d7b56d]/15 bg-[#17130f] p-5">
                    <h4 className="font-serif text-2xl">Order Summary</h4>
                    <div className="mt-5 space-y-4">
                      {cart.map((item) => (
                        <div key={item.id} className="flex gap-3 rounded-2xl bg-black/25 p-3">
                          <img src={item.image} alt={item.name} className="h-16 w-16 rounded-xl object-cover" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{item.name}</p>
                            <p className="text-xs text-[#f8efe2]/50">Qty: {item.qty}</p>
                          </div>
                          <p className="text-sm text-[#d7b56d]">{formatPrice(item.price * item.qty)}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 space-y-3 border-t border-[#d7b56d]/15 pt-5 text-sm">
                      <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
                      <div className="flex justify-between"><span>Luxury Delivery</span><span>Free</span></div>
                      <div className="flex justify-between"><span>GST / Tax</span><span>Included</span></div>
                      <div className="flex justify-between border-t border-[#d7b56d]/15 pt-4 text-lg"><span>Total</span><span className="text-[#d7b56d]">{formatPrice(subtotal)}</span></div>
                    </div>
                    <Button onClick={placeDemoOrder} className="mt-6 w-full rounded-full bg-[#d7b56d] py-6 text-black hover:bg-[#efd188]">Pay {formatPrice(subtotal)} Securely</Button>
                    <p className="mt-3 text-center text-xs text-[#f8efe2]/40">For real Razorpay: create backend order, open checkout, verify signature, save order.</p>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
