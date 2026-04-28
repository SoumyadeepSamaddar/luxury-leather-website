import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Crown,
  Heart,
  Lock,
  Menu,
  Minus,
  PackageCheck,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  X,
} from "lucide-react";
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
    material: "Full-grain leather",
    image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=1200&auto=format&fit=crop",
    desc: "Hand-finished full-grain leather tote with structured silhouette, brass hardware, and soft suede lining.",
  },
  {
    id: 2,
    name: "Velluto Italian Leather Belt",
    category: "Belts",
    price: 5990,
    rating: 4.8,
    tag: "New Arrival",
    color: "Black",
    material: "Vegetable-tanned leather",
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
    material: "Full-grain leather",
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
    material: "Hand-polished leather",
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
    material: "Pebbled leather",
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
    material: "Oil-pull leather",
    image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=1200&auto=format&fit=crop",
    desc: "Weekend duffel with antique brass zippers, detachable shoulder strap, and spacious inner pocket.",
  },
];

const categories = ["All", "Bags", "Belts", "Footwear", "Wallets"];

const stylingCatalogues = [
  {
    id: "classic-executive",
    title: "Classic Executive",
    category: "Office / Formal",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=900&auto=format&fit=crop",
    note: "Briefcases, structured totes, black and brown leather.",
  },
  {
    id: "travel-heritage",
    title: "Travel Heritage",
    category: "Travel",
    image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=900&auto=format&fit=crop",
    note: "Duffels, weekend bags, chestnut leather, vintage brass details.",
  },
  {
    id: "minimal-luxury",
    title: "Minimal Luxury",
    category: "Daily Carry",
    image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=900&auto=format&fit=crop",
    note: "Clean silhouettes, tote bags, wallets, subtle premium styling.",
  },
  {
    id: "evening-noir",
    title: "Evening Noir",
    category: "Premium Event",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=900&auto=format&fit=crop",
    note: "Dark leather, statement bags, party and luxury occasion styling.",
  },
  {
    id: "footwear-atelier",
    title: "Footwear Atelier",
    category: "Shoes / Loafers",
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=900&auto=format&fit=crop",
    note: "Loafers, formal shoes, hand-polished wine and black tones.",
  },
  {
    id: "gift-edit",
    title: "Gift Edit",
    category: "Wallets / Card Holders",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=900&auto=format&fit=crop",
    note: "Wallets, card holders, small leather goods, gifting choices.",
  },
];

function formatPrice(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

export default function LuxuryLeatherWebsite() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(products[0]);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [quickView, setQuickView] = useState(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [stylingOpen, setStylingOpen] = useState(false);
  const [stylingSuccess, setStylingSuccess] = useState(false);
  const [stylingForm, setStylingForm] = useState({
    name: "",
    phone: "",
    email: "",
    preference: "Bags",
    message: "",
    catalogue: "classic-executive",
  });
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
      const searchMatch =
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.color.toLowerCase().includes(query.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [activeCategory, query]);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setCartOpen(true);
  };

  const updateQty = (id, change) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: Math.max(0, item.qty + change) } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const handleCustomerChange = (field, value) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
  };

  const handleStylingChange = (field, value) => {
    setStylingForm((prev) => ({ ...prev, [field]: value }));
  };

  const submitStylingRequest = () => {
    if (!stylingForm.name || !stylingForm.phone || !stylingForm.email || !stylingForm.catalogue) {
      alert("Please enter your name, phone number, email, and choose one catalogue.");
      return;
    }
    setStylingSuccess(true);
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

  return (
    <div className="min-h-screen overflow-hidden bg-[#080604] text-[#f8efe2]">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_20%_10%,rgba(215,181,109,.16),transparent_28%),radial-gradient(circle_at_90%_20%,rgba(112,52,22,.22),transparent_24%),linear-gradient(180deg,#080604,#120d09_45%,#080604)]" />

      <header className="sticky top-0 z-40 border-b border-[#d7b56d]/15 bg-[#080604]/85 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
              <Menu />
            </button>
            <div>
              <h1 className="font-serif text-2xl tracking-[0.38em] text-[#d7b56d]">VELORA</h1>
              <p className="text-[10px] uppercase tracking-[0.38em] text-[#f8efe2]/45">Leather Maison</p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-xs uppercase tracking-[0.26em] text-[#f8efe2]/70 lg:flex">
            <a href="#collection" className="hover:text-[#d7b56d]">Collection</a>
            <a href="#craft" className="hover:text-[#d7b56d]">Craft</a>
            <a href="#atelier" className="hover:text-[#d7b56d]">Atelier</a>
            <a href="#purchase" className="hover:text-[#d7b56d]">Purchase</a>
          </nav>

          <button
            onClick={() => setCartOpen(true)}
            className="relative rounded-full border border-[#d7b56d]/35 bg-white/[0.03] p-3 transition hover:bg-[#d7b56d]/10"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-[#d7b56d] text-xs font-bold text-black">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {menuOpen && (
          <div className="grid gap-4 border-t border-[#d7b56d]/15 px-5 py-4 text-sm uppercase tracking-[0.22em] lg:hidden">
            <a href="#collection">Collection</a>
            <a href="#craft">Craft</a>
            <a href="#atelier">Atelier</a>
            <a href="#purchase">Purchase</a>
          </div>
        )}
      </header>

      <main className="relative z-10">
        <section className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-[1fr_.9fr] lg:py-24">
          <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.7 }}>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d7b56d]/25 bg-[#d7b56d]/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-[#d7b56d]">
              <Sparkles size={15} /> Luxury Leather Studio
            </div>
            <h2 className="font-serif text-5xl leading-[1.02] md:text-7xl lg:text-8xl">
              Quiet luxury, crafted in leather.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#f8efe2]/68">
              Premium bags, belts, footwear, and wallets with interactive previews, luxury checkout, refined motion, and portfolio-ready e-commerce structure.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                onClick={() => document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" })}
                className="rounded-full bg-[#d7b56d] px-8 py-6 text-black hover:bg-[#efd188]"
              >
                Explore Collection <ChevronRight size={18} />
              </Button>
              <Button
                onClick={() => {
                  setStylingOpen(true);
                  setStylingSuccess(false);
                }}
                variant="outline"
                className="rounded-full border-[#d7b56d]/50 bg-transparent px-8 py-6 text-[#f8efe2] hover:bg-[#d7b56d]/10"
              >
                Book Private Styling
              </Button>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
              {[
                ["4.9/5", "Client Rating"],
                ["24h", "Dispatch"],
                ["100%", "Leather Craft"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-3xl border border-[#d7b56d]/15 bg-white/[0.04] p-4 text-center">
                  <p className="font-serif text-2xl text-[#d7b56d]">{value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#f8efe2]/45">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92, rotate: -1 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-5 rounded-[3rem] bg-[#d7b56d]/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-[3rem] border border-[#d7b56d]/20 bg-[#17130f] p-3 shadow-2xl">
              <img src={selected.image} alt={selected.name} className="h-[520px] w-full rounded-[2.4rem] object-cover" />
              <div className="absolute inset-x-8 bottom-8 rounded-[2rem] border border-white/10 bg-black/50 p-5 backdrop-blur-xl">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-[#d7b56d]">Featured Piece</p>
                    <h3 className="mt-1 font-serif text-2xl">{selected.name}</h3>
                    <p className="mt-1 text-sm text-[#f8efe2]/60">{selected.material} • {selected.color}</p>
                  </div>
                  <p className="text-xl text-[#d7b56d]">{formatPrice(selected.price)}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="collection" className="mx-auto max-w-7xl px-5 py-20">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-[#d7b56d]">Interactive Display</p>
              <h2 className="mt-3 font-serif text-4xl md:text-6xl">Signature Collection</h2>
            </div>
            <div className="flex items-center gap-3 rounded-full border border-[#d7b56d]/25 bg-white/5 px-4 py-3">
              <Search size={18} className="text-[#d7b56d]" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, colors..."
                className="w-56 bg-transparent text-sm outline-none placeholder:text-[#f8efe2]/40"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full border px-5 py-2 text-sm transition ${
                  activeCategory === cat
                    ? "border-[#d7b56d] bg-[#d7b56d] text-black"
                    : "border-[#d7b56d]/30 text-[#f8efe2]/70 hover:bg-[#d7b56d]/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8 }}
              >
                <Card className="group overflow-hidden rounded-[2rem] border-[#d7b56d]/20 bg-[#17130f] text-[#f8efe2] shadow-xl">
                  <div className="relative h-80 overflow-hidden">
                    <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-80" />
                    <div className="absolute left-4 top-4 rounded-full bg-black/55 px-4 py-2 text-xs uppercase tracking-[0.2em] text-[#d7b56d] backdrop-blur">
                      {product.tag}
                    </div>
                    <button className="absolute right-4 top-4 rounded-full bg-black/45 p-3 backdrop-blur transition hover:bg-[#d7b56d] hover:text-black">
                      <Heart size={18} />
                    </button>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-serif text-2xl">{product.name}</h3>
                      <span className="whitespace-nowrap text-[#d7b56d]">{formatPrice(product.price)}</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-sm text-[#f8efe2]/60">
                      <span>{product.category} • {product.color}</span>
                      <span className="flex items-center gap-1">
                        <Star size={15} className="fill-current text-[#d7b56d]" /> {product.rating}
                      </span>
                    </div>
                    <p className="mt-4 min-h-16 text-sm leading-6 text-[#f8efe2]/65">{product.desc}</p>
                    <div className="mt-6 flex gap-3">
                      <Button
                        onClick={() => {
                          setSelected(product);
                          setQuickView(product);
                        }}
                        variant="outline"
                        className="flex-1 rounded-full border-[#d7b56d]/40 bg-transparent text-[#f8efe2] hover:bg-[#d7b56d]/10"
                      >
                        Quick View
                      </Button>
                      <Button onClick={() => addToCart(product)} className="flex-1 rounded-full bg-[#d7b56d] text-black hover:bg-[#efd188]">
                        Add Bag
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="craft" className="border-y border-[#d7b56d]/15 bg-[#17130f]/85 py-20 backdrop-blur">
          <div className="mx-auto max-w-7xl px-5">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.4em] text-[#d7b56d]">The Promise</p>
              <h2 className="mt-3 font-serif text-4xl md:text-5xl">Built like a luxury brand, structured like a real store.</h2>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-4">
              {[
                [ShieldCheck, "Authentic Craft", "Full-grain leather with premium stitching and careful finishing."],
                [Truck, "Luxury Delivery", "Tracked doorstep delivery with elegant packaging across India."],
                [PackageCheck, "Easy Returns", "A clear return-ready structure for real e-commerce expansion."],
                [Award, "Portfolio Grade", "Modern React, Tailwind, animation, cart, checkout, and deployment."],
              ].map(([Icon, title, text]) => (
                <div key={title} className="rounded-[2rem] border border-[#d7b56d]/20 bg-black/20 p-7">
                  <Icon className="text-[#d7b56d]" size={34} />
                  <h3 className="mt-5 font-serif text-2xl">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#f8efe2]/62">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="atelier" className="mx-auto grid max-w-7xl gap-8 px-5 py-20 lg:grid-cols-[.9fr_1.1fr]">
          <div className="rounded-[2.5rem] border border-[#d7b56d]/20 bg-white/[0.04] p-8">
            <Crown className="text-[#d7b56d]" size={42} />
            <h2 className="mt-5 font-serif text-4xl">Private Atelier Experience</h2>
            <p className="mt-4 leading-8 text-[#f8efe2]/65">
              Add personalization, monogramming, exclusive colors, concierge support, and custom product requests for a premium customer experience.
            </p>
            <Button
              onClick={() => {
                setStylingOpen(true);
                setStylingSuccess(false);
              }}
              className="mt-8 rounded-full bg-[#d7b56d] px-8 py-6 text-black hover:bg-[#efd188]"
            >
              Request Custom Order
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Monogram Ready", "Customer initials and custom embossing flow."],
              ["Razorpay Ready", "Checkout is structured for real payment gateway integration."],
              ["Admin Future", "Product data can move to database/API later."],
              ["Auto Deploy", "Connected with GitHub and Vercel production flow."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-[2rem] border border-[#d7b56d]/15 bg-[#17130f] p-6">
                <CheckCircle2 className="text-[#d7b56d]" />
                <h3 className="mt-4 font-serif text-2xl">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#f8efe2]/60">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="purchase" className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-[1fr_.8fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-[#d7b56d]">Product Preview</p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">{selected.name}</h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-[#f8efe2]/70">{selected.desc}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl bg-white/5 p-5"><p className="text-[#d7b56d]">Material</p><p>{selected.material}</p></div>
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
            <Button onClick={() => addToCart(selected)} className="mt-6 w-full rounded-full bg-[#d7b56d] py-6 text-black hover:bg-[#efd188]">
              Add Selected Product to Cart <ChevronRight size={18} />
            </Button>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-20">
          <div className="rounded-[2.5rem] border border-[#d7b56d]/20 bg-[#d7b56d]/10 p-8 text-center md:p-12">
            <p className="text-sm uppercase tracking-[0.4em] text-[#d7b56d]">Newsletter</p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">Receive private collection drops.</h2>
            <div className="mx-auto mt-8 flex max-w-xl flex-col gap-3 rounded-full border border-[#d7b56d]/20 bg-black/30 p-2 sm:flex-row">
              <input placeholder="Enter your email" className="flex-1 bg-transparent px-5 py-3 outline-none placeholder:text-[#f8efe2]/40" />
              <Button className="rounded-full bg-[#d7b56d] px-8 py-6 text-black hover:bg-[#efd188]">Subscribe</Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-[#d7b56d]/15 px-5 py-10 text-center text-sm text-[#f8efe2]/50">
        © 2026 Velora Leather Maison. Premium e-commerce concept built with React, Tailwind, Framer Motion, GitHub, and Vercel.
      </footer>

      <AnimatePresence>
        {stylingOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[65] grid place-items-center bg-black/70 p-4 backdrop-blur-sm">
            <motion.div initial={{ y: 35, scale: 0.96 }} animate={{ y: 0, scale: 1 }} exit={{ y: 35, scale: 0.96 }} className="w-full max-w-3xl rounded-[2rem] border border-[#d7b56d]/25 bg-[#0f0d0a] p-6 text-[#f8efe2] shadow-2xl">
              <div className="flex items-start justify-between gap-4 border-b border-[#d7b56d]/15 pb-5">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-[#d7b56d]">Private Styling</p>
                  <h3 className="mt-2 font-serif text-3xl">Book Your Leather Consultation</h3>
                </div>
                <button onClick={() => setStylingOpen(false)} className="rounded-full border border-[#d7b56d]/30 p-2 hover:bg-[#d7b56d]/10"><X /></button>
              </div>

              {stylingSuccess ? (
                <div className="grid place-items-center py-14 text-center">
                  <CheckCircle2 size={68} className="text-[#d7b56d]" />
                  <h4 className="mt-6 font-serif text-4xl">Request Received</h4>
                  <p className="mt-3 max-w-xl text-[#f8efe2]/65">Your private styling request has been submitted in demo mode. In a real project, connect this form to EmailJS, Firebase, Supabase, or your backend.</p>
                  <Button onClick={() => setStylingOpen(false)} className="mt-8 rounded-full bg-[#d7b56d] px-8 py-6 text-black hover:bg-[#efd188]">Back to Store</Button>
                </div>
              ) : (
                <>
                <div className="mt-6">
                  <p className="text-sm uppercase tracking-[0.3em] text-[#d7b56d]">Choose a Catalogue</p>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {stylingCatalogues.map((catalogue) => (
                      <button
                        key={catalogue.id}
                        onClick={() => handleStylingChange("catalogue", catalogue.id)}
                        className={`overflow-hidden rounded-[1.5rem] border text-left transition hover:-translate-y-1 ${
                          stylingForm.catalogue === catalogue.id
                            ? "border-[#d7b56d] bg-[#d7b56d]/15"
                            : "border-[#d7b56d]/15 bg-white/[0.04] hover:border-[#d7b56d]/45"
                        }`}
                      >
                        <img src={catalogue.image} alt={catalogue.title} className="h-32 w-full object-cover" />
                        <div className="p-4">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="font-serif text-xl">{catalogue.title}</h4>
                            <span className={`h-4 w-4 rounded-full border ${stylingForm.catalogue === catalogue.id ? "border-[#d7b56d] bg-[#d7b56d]" : "border-[#f8efe2]/30"}`} />
                          </div>
                          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#d7b56d]">{catalogue.category}</p>
                          <p className="mt-2 text-xs leading-5 text-[#f8efe2]/55">{catalogue.note}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <input value={stylingForm.name} onChange={(e) => handleStylingChange("name", e.target.value)} placeholder="Full Name" className="rounded-2xl border border-[#d7b56d]/20 bg-black/25 px-4 py-3 outline-none placeholder:text-[#f8efe2]/35 focus:border-[#d7b56d]" />
                  <input value={stylingForm.phone} onChange={(e) => handleStylingChange("phone", e.target.value)} placeholder="Phone Number" className="rounded-2xl border border-[#d7b56d]/20 bg-black/25 px-4 py-3 outline-none placeholder:text-[#f8efe2]/35 focus:border-[#d7b56d]" />
                  <input value={stylingForm.email} onChange={(e) => handleStylingChange("email", e.target.value)} placeholder="Email Address" className="rounded-2xl border border-[#d7b56d]/20 bg-black/25 px-4 py-3 outline-none placeholder:text-[#f8efe2]/35 focus:border-[#d7b56d] sm:col-span-2" />
                  <select value={stylingForm.preference} onChange={(e) => handleStylingChange("preference", e.target.value)} className="rounded-2xl border border-[#d7b56d]/20 bg-black/25 px-4 py-3 outline-none focus:border-[#d7b56d] sm:col-span-2">
                    <option className="bg-[#0f0d0a]">Bags</option>
                    <option className="bg-[#0f0d0a]">Belts</option>
                    <option className="bg-[#0f0d0a]">Footwear</option>
                    <option className="bg-[#0f0d0a]">Wallets</option>
                    <option className="bg-[#0f0d0a]">Custom Order</option>
                  </select>
                  <textarea value={stylingForm.message} onChange={(e) => handleStylingChange("message", e.target.value)} placeholder="Tell us your preferred style, color, budget, or custom requirement" rows={5} className="rounded-2xl border border-[#d7b56d]/20 bg-black/25 px-4 py-3 outline-none placeholder:text-[#f8efe2]/35 focus:border-[#d7b56d] sm:col-span-2" />
                  <p className="rounded-2xl border border-[#d7b56d]/15 bg-[#d7b56d]/10 px-4 py-3 text-sm text-[#f8efe2]/65 sm:col-span-2">
                    Selected catalogue: <span className="text-[#d7b56d]">{stylingCatalogues.find((item) => item.id === stylingForm.catalogue)?.title}</span>
                  </p>
                  <Button onClick={submitStylingRequest} className="mt-2 rounded-full bg-[#d7b56d] py-6 text-black hover:bg-[#efd188] sm:col-span-2">Submit Styling Request</Button>
                </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {quickView && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[55] grid place-items-center bg-black/70 p-4 backdrop-blur-sm">
            <motion.div initial={{ y: 30, scale: 0.96 }} animate={{ y: 0, scale: 1 }} exit={{ y: 30, scale: 0.96 }} className="grid w-full max-w-4xl overflow-hidden rounded-[2rem] border border-[#d7b56d]/25 bg-[#0f0d0a] text-[#f8efe2] shadow-2xl md:grid-cols-2">
              <img src={quickView.image} alt={quickView.name} className="h-full min-h-[420px] w-full object-cover" />
              <div className="p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-[#d7b56d]">{quickView.tag}</p>
                    <h3 className="mt-3 font-serif text-4xl">{quickView.name}</h3>
                  </div>
                  <button onClick={() => setQuickView(null)} className="rounded-full border border-[#d7b56d]/30 p-2"><X /></button>
                </div>
                <p className="mt-5 leading-8 text-[#f8efe2]/65">{quickView.desc}</p>
                <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-2xl bg-white/5 p-4"><span className="text-[#d7b56d]">Material</span><p>{quickView.material}</p></div>
                  <div className="rounded-2xl bg-white/5 p-4"><span className="text-[#d7b56d]">Color</span><p>{quickView.color}</p></div>
                  <div className="rounded-2xl bg-white/5 p-4"><span className="text-[#d7b56d]">Category</span><p>{quickView.category}</p></div>
                  <div className="rounded-2xl bg-white/5 p-4"><span className="text-[#d7b56d]">Rating</span><p>{quickView.rating}/5</p></div>
                </div>
                <div className="mt-8 flex items-center justify-between">
                  <p className="font-serif text-3xl text-[#d7b56d]">{formatPrice(quickView.price)}</p>
                  <Button onClick={() => addToCart(quickView)} className="rounded-full bg-[#d7b56d] px-8 py-6 text-black hover:bg-[#efd188]">Add to Bag</Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {cartOpen && (
          <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 220 }} className="fixed right-0 top-0 z-50 h-full w-full max-w-md border-l border-[#d7b56d]/20 bg-[#0f0d0a] p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-3xl">Shopping Bag</h3>
              <button onClick={() => setCartOpen(false)} className="rounded-full border border-[#d7b56d]/30 p-2"><X /></button>
            </div>
            <div className="mt-8 max-h-[62vh] space-y-5 overflow-y-auto pr-1">
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
