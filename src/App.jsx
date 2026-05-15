import { useState, useEffect, useRef } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────
const CONDITIONS = {
  MINT: { label: "Mint", color: "#10b981", bg: "#d1fae5", score: 10 },
  EXCELLENT: { label: "Excellent", color: "#3b82f6", bg: "#dbeafe", score: 8 },
  GOOD: { label: "Good", color: "#f59e0b", bg: "#fef3c7", score: 6 },
  FAIR: { label: "Fair", color: "#ef4444", bg: "#fee2e2", score: 4 },
};

const LISTINGS = [
  {
    id: 1, title: "Levi's 501 Straight Jeans", brand: "Levi's", size: "32W 30L",
    price: 1299, originalPrice: 4999, condition: "MINT",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80",
    seller: { name: "Arjun M.", rating: 4.9, sales: 84, verified: true, avatar: "AM" },
    tags: ["Y2K", "Denim"], city: "Mumbai", saved: false, category: "Bottoms",
    description: "Barely worn. Washed twice only. No fading, no distress. Perfect condition vintage 501.",
    drops: false,
  },
  {
    id: 2, title: "Zara Oversized Blazer", brand: "Zara", size: "S",
    price: 2199, originalPrice: 6999, condition: "EXCELLENT",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4b4f1c?w=400&q=80",
    seller: { name: "Priya S.", rating: 4.7, sales: 52, verified: true, avatar: "PS" },
    tags: ["Office", "Smart"], city: "Delhi", saved: true, category: "Tops",
    description: "One season old. Minor pilling on inner lining only. Smoke-free home.",
    drops: true,
  },
  {
    id: 3, title: "New Balance 550 White", brand: "New Balance", size: "UK 8",
    price: 3499, originalPrice: 9999, condition: "GOOD",
    image: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&q=80",
    seller: { name: "Rohan K.", rating: 4.5, sales: 31, verified: false, avatar: "RK" },
    tags: ["Sneakers", "Chunky"], city: "Bangalore", saved: false, category: "Footwear",
    description: "Worn ~10 times. Some creasing on toe box. Cleaned with sneaker cleaner.",
    drops: false,
  },
  {
    id: 4, title: "H&M Knit Cardigan Beige", brand: "H&M", size: "M",
    price: 699, originalPrice: 2499, condition: "EXCELLENT",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&q=80",
    seller: { name: "Meera T.", rating: 5.0, sales: 120, verified: true, avatar: "MT" },
    tags: ["Cozy", "Neutral"], city: "Pune", saved: false, category: "Tops",
    description: "Worn twice. No pilling. Perfect for layering.",
    drops: true,
  },
  {
    id: 5, title: "Mango Slip Midi Dress", brand: "Mango", size: "XS",
    price: 1499, originalPrice: 4499, condition: "MINT",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80",
    seller: { name: "Nisha R.", rating: 4.8, sales: 67, verified: true, avatar: "NR" },
    tags: ["Satin", "Evening"], city: "Hyderabad", saved: true, category: "Dresses",
    description: "Worn to one event. Dry cleaned after. Tags removed but otherwise new.",
    drops: false,
  },
  {
    id: 6, title: "Adidas Trefoil Hoodie Black", brand: "Adidas", size: "L",
    price: 1799, originalPrice: 5499, condition: "GOOD",
    image: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&q=80",
    seller: { name: "Vikram J.", rating: 4.3, sales: 18, verified: false, avatar: "VJ" },
    tags: ["Streetwear", "Classic"], city: "Chennai", saved: false, category: "Tops",
    description: "Regular wear, washed 8-10 times. Slight fade on logo but intact.",
    drops: false,
  },
];

const CATEGORIES = ["All", "Tops", "Bottoms", "Dresses", "Footwear", "Bags"];

// ─── ICONS ───────────────────────────────────────────────────────────────────
const Icon = ({ path, size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d={path} />
  </svg>
);

const Icons = {
  home: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  search: "M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z",
  bell: "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0",
  heart: "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z",
  heartFill: "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z",
  user: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  clock: "M12 22a10 10 0 100-20 10 10 0 000 20z M12 6v6l4 2",
  check: "M20 6L9 17l-5-5",
  checkCircle: "M22 11.08V12a10 10 0 11-5.93-9.14 M22 4L12 14.01l-3-3",
  x: "M18 6L6 18M6 6l12 12",
  chevronLeft: "M15 18l-6-6 6-6",
  chevronRight: "M9 18l6-6-6-6",
  lock: "M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2z M17 11V7a5 5 0 00-10 0v4",
  truck: "M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11a2 2 0 012 2v3 M9 17h6M16 3h5l3 3-1.5 9H16 M5.5 17a2.5 2.5 0 100 5 2.5 2.5 0 000-5z M20.5 17a2.5 2.5 0 100 5 2.5 2.5 0 000-5z",
  alertTriangle: "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01",
  camera: "M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z M12 17a4 4 0 100-8 4 4 0 000 8z",
  tag: "M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z M7 7h.01",
  fire: "M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 01-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z",
  arrowRight: "M5 12h14M12 5l7 7-7 7",
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const rupee = (n) => `₹${n.toLocaleString("en-IN")}`;
const discount = (orig, cur) => Math.round((1 - cur / orig) * 100);

function ConditionBadge({ condition, size = "sm" }) {
  const c = CONDITIONS[condition];
  const pad = size === "lg" ? "px-3 py-1.5 text-sm" : "px-2 py-0.5 text-xs";
  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-semibold ${pad}`}
      style={{ color: c.color, background: c.bg }}>
      <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: c.color }} />
      {c.label} · {c.score}/10
    </span>
  );
}

function Avatar({ initials, size = 36 }) {
  const colors = ["#f87171", "#60a5fa", "#34d399", "#a78bfa", "#fb923c"];
  const bg = colors[initials.charCodeAt(0) % colors.length];
  return (
    <div className="rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
      style={{ width: size, height: size, background: bg, fontSize: size * 0.35 }}>
      {initials}
    </div>
  );
}

function SellerBadge({ seller, compact = false }) {
  return (
    <div className="flex items-center gap-2">
      <Avatar initials={seller.avatar} size={compact ? 28 : 36} />
      <div>
        <div className="flex items-center gap-1">
          <span className={`font-semibold text-gray-800 ${compact ? "text-xs" : "text-sm"}`}>{seller.name}</span>
          {seller.verified && (
            <span title="Verified Seller">
              <Icon path={Icons.shield} size={12} className="text-blue-500" />
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Icon path={Icons.star} size={10} className="text-amber-400" />
          <span className="text-xs text-gray-500">{seller.rating} · {seller.sales} sold</span>
        </div>
      </div>
    </div>
  );
}

function TrustBadges() {
  const badges = [
    { icon: Icons.shield, label: "Escrow Protected", color: "text-blue-500" },
    { icon: Icons.checkCircle, label: "Condition Verified", color: "text-green-500" },
    { icon: Icons.truck, label: "Delivery Tracked", color: "text-purple-500" },
  ];
  return (
    <div className="flex gap-2 flex-wrap">
      {badges.map(b => (
        <div key={b.label} className="flex items-center gap-1 bg-gray-50 rounded-full px-2.5 py-1">
          <Icon path={b.icon} size={12} className={b.color} />
          <span className="text-xs text-gray-600 font-medium">{b.label}</span>
        </div>
      ))}
    </div>
  );
}

// ─── RESERVE TIMER ───────────────────────────────────────────────────────────
function ReserveTimer({ onExpire, onCancel }) {
  const [secs, setSecs] = useState(120);
  useEffect(() => {
    const t = setInterval(() => setSecs(s => {
      if (s <= 1) { clearInterval(t); onExpire(); return 0; }
      return s - 1;
    }), 1000);
    return () => clearInterval(t);
  }, []);
  const pct = (secs / 120) * 100;
  const m = Math.floor(secs / 60), s = secs % 60;
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon path={Icons.clock} size={16} className="text-amber-600" />
          <span className="text-sm font-semibold text-amber-800">Item Reserved For You</span>
        </div>
        <span className="text-lg font-bold text-amber-700 font-mono">{m}:{String(s).padStart(2, "0")}</span>
      </div>
      <div className="w-full bg-amber-100 rounded-full h-1.5 mb-3">
        <div className="h-1.5 rounded-full bg-amber-500 transition-all duration-1000"
          style={{ width: `${pct}%` }} />
      </div>
      <p className="text-xs text-amber-700">Complete checkout before the timer ends or your item will be released.</p>
      <button onClick={onCancel} className="text-xs text-amber-600 underline mt-1">Cancel reservation</button>
    </div>
  );
}

// ─── PAGES ───────────────────────────────────────────────────────────────────

// HOME FEED
function HomeFeed({ onProduct, listings, setListings }) {
  const [cat, setCat] = useState("All");
  const [search, setSearch] = useState("");
  const [notif, setNotif] = useState(false);

  const filtered = listings.filter(l =>
    (cat === "All" || l.category === cat) &&
    (l.title.toLowerCase().includes(search.toLowerCase()) ||
      l.brand.toLowerCase().includes(search.toLowerCase()))
  );

  const toggleSave = (id) => {
    setListings(ls => ls.map(l => l.id === id ? { ...l, saved: !l.saved } : l));
  };

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-4 pt-12 pb-3">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-xs text-gray-400 font-medium tracking-widest uppercase">Mumbai</span>
            <h1 className="text-2xl font-black text-gray-900 leading-none tracking-tight">SuperThrift</h1>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setNotif(true)}
              className="relative w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center">
              <Icon path={Icons.bell} size={18} className="text-gray-700" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
            </button>
          </div>
        </div>
        {/* Search */}
        <div className="relative mb-3">
          <Icon path={Icons.search} size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search brands, styles…"
            className="w-full pl-9 pr-4 py-2.5 bg-gray-50 rounded-xl text-sm outline-none border border-transparent focus:border-gray-200 transition-colors" />
        </div>
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${cat === c ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600"}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Drop Banner */}
      <div className="mx-4 mt-4 mb-4 bg-gradient-to-r from-gray-900 to-gray-700 rounded-2xl p-4 text-white overflow-hidden relative">
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full" />
        <div className="absolute -right-1 bottom-0 w-16 h-16 bg-white/5 rounded-full" />
        <div className="flex items-center gap-1 mb-1">
          <Icon path={Icons.fire} size={14} className="text-orange-400" />
          <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">New Drop</span>
        </div>
        <p className="text-base font-bold leading-snug mb-2">12 vintage pieces just listed from Delhi</p>
        <button className="flex items-center gap-1 text-xs font-semibold text-gray-300">
          View Drop <Icon path={Icons.arrowRight} size={12} />
        </button>
      </div>

      {/* Grid */}
      <div className="px-4 grid grid-cols-2 gap-3">
        {filtered.map((item, i) => (
          <ProductCard key={item.id} item={item} onTap={() => onProduct(item)}
            onSave={() => toggleSave(item.id)} delay={i * 50} />
        ))}
      </div>

      {/* Drop Notification Modal */}
      {notif && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end" onClick={() => setNotif(false)}>
          <div className="bg-white w-full rounded-t-3xl p-6" onClick={e => e.stopPropagation()}>
            <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-6" />
            <h3 className="text-lg font-bold mb-1">Drop Notifications</h3>
            <p className="text-sm text-gray-500 mb-4">Get notified when items from your watchlist drop</p>
            {listings.filter(l => l.drops).map(l => (
              <div key={l.id} className="flex items-center gap-3 py-3 border-b border-gray-50">
                <img src={l.image} alt={l.title} className="w-12 h-12 rounded-xl object-cover" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">{l.title}</p>
                  <p className="text-xs text-gray-500">{rupee(l.price)}</p>
                </div>
                <div className="w-2 h-2 bg-red-500 rounded-full" />
              </div>
            ))}
            <button onClick={() => setNotif(false)}
              className="mt-4 w-full bg-gray-900 text-white py-3 rounded-xl font-semibold text-sm">
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ProductCard({ item, onTap, onSave, delay }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), delay); return () => clearTimeout(t); }, []);
  const disc = discount(item.originalPrice, item.price);
  return (
    <div onClick={onTap}
      className={`bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      style={{ transitionDelay: `${delay}ms` }}>
      <div className="relative">
        <img src={item.image} alt={item.title} className="w-full aspect-[3/4] object-cover" />
        <button onClick={e => { e.stopPropagation(); onSave(); }}
          className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm">
          <Icon path={item.saved ? Icons.heartFill : Icons.heart} size={16}
            className={item.saved ? "text-red-500 fill-red-500" : "text-gray-500"} />
        </button>
        <span className="absolute top-2 left-2 bg-black/80 text-white text-xs font-bold px-2 py-0.5 rounded-full">
          -{disc}%
        </span>
        {item.drops && (
          <span className="absolute bottom-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <Icon path={Icons.bell} size={10} /> Drop
          </span>
        )}
      </div>
      <div className="p-2.5">
        <p className="text-xs text-gray-400 font-medium">{item.brand}</p>
        <p className="text-sm font-bold text-gray-900 leading-tight truncate">{item.title}</p>
        <div className="flex items-center justify-between mt-1.5">
          <div>
            <span className="text-base font-black text-gray-900">{rupee(item.price)}</span>
          </div>
          <ConditionBadge condition={item.condition} />
        </div>
        <div className="mt-2 flex items-center gap-1">
          <Icon path={Icons.star} size={10} className="text-amber-400 fill-amber-400" />
          <span className="text-xs text-gray-500">{item.seller.rating} · {item.city}</span>
          {item.seller.verified && <Icon path={Icons.shield} size={10} className="text-blue-400" />}
        </div>
      </div>
    </div>
  );
}

// PRODUCT DETAIL
function ProductDetail({ item, onBack, onCheckout, onReserve, reserved, listings, setListings }) {
  const [tab, setTab] = useState("info");
  const [showReserveMsg, setShowReserveMsg] = useState(false);

  const handleReserve = () => {
    onReserve(item);
    setShowReserveMsg(true);
    setTimeout(() => { setShowReserveMsg(false); onCheckout(item); }, 1200);
  };

  const toggleSave = () => {
    setListings(ls => ls.map(l => l.id === item.id ? { ...l, saved: !l.saved } : l));
  };

  const currentItem = listings.find(l => l.id === item.id) || item;

  return (
    <div className="pb-28">
      {/* Image */}
      <div className="relative">
        <img src={item.image} alt={item.title} className="w-full aspect-[4/5] object-cover" />
        <button onClick={onBack}
          className="absolute top-12 left-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-sm">
          <Icon path={Icons.chevronLeft} size={20} className="text-gray-800" />
        </button>
        <button onClick={toggleSave}
          className="absolute top-12 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-sm">
          <Icon path={currentItem.saved ? Icons.heartFill : Icons.heart} size={20}
            className={currentItem.saved ? "text-red-500 fill-red-500" : "text-gray-700"} />
        </button>
        <div className="absolute bottom-4 left-4">
          <ConditionBadge condition={item.condition} size="lg" />
        </div>
      </div>

      <div className="px-4 pt-4">
        {/* Title & Price */}
        <div className="flex items-start justify-between mb-1">
          <div className="flex-1">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">{item.brand} · {item.size}</p>
            <h2 className="text-xl font-black text-gray-900 leading-tight">{item.title}</h2>
          </div>
          <div className="text-right">
            <div className="text-2xl font-black text-gray-900">{rupee(item.price)}</div>
            <div className="text-xs text-gray-400 line-through">{rupee(item.originalPrice)}</div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex gap-2 mb-4">
          {item.tags.map(t => (
            <span key={t} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-medium">
              #{t}
            </span>
          ))}
        </div>

        {/* Trust Badges */}
        <TrustBadges />

        {/* Tabs */}
        <div className="flex gap-0 border-b border-gray-100 mt-4 mb-4">
          {["info", "seller", "policy"].map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 py-2 text-xs font-semibold capitalize transition-colors ${tab === t ? "text-gray-900 border-b-2 border-gray-900" : "text-gray-400"}`}>
              {t === "info" ? "Details" : t === "seller" ? "Seller" : "Buyer Policy"}
            </button>
          ))}
        </div>

        {tab === "info" && (
          <div>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">{item.description}</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                ["Brand", item.brand], ["Size", item.size],
                ["City", item.city], ["Category", item.category],
              ].map(([k, v]) => (
                <div key={k} className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-400">{k}</p>
                  <p className="text-sm font-semibold text-gray-800">{v}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "seller" && (
          <div>
            <div className="bg-gray-50 rounded-2xl p-4 mb-3">
              <SellerBadge seller={item.seller} />
              {item.seller.verified && (
                <div className="mt-3 flex items-start gap-2 bg-blue-50 rounded-xl p-3">
                  <Icon path={Icons.shield} size={14} className="text-blue-500 mt-0.5" />
                  <p className="text-xs text-blue-700 font-medium">Government ID verified seller. Identity confirmed by SuperThrift.</p>
                </div>
              )}
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              {[
                [item.seller.sales, "Items Sold"],
                [item.seller.rating, "Avg Rating"],
                ["98%", "Ship Rate"],
              ].map(([v, l]) => (
                <div key={l} className="bg-gray-50 rounded-xl p-3">
                  <p className="text-lg font-black text-gray-900">{v}</p>
                  <p className="text-xs text-gray-500">{l}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "policy" && (
          <div className="space-y-3">
            {[
              { icon: Icons.lock, title: "Escrow Payment", desc: "Your money is held securely until you confirm delivery." },
              { icon: Icons.camera, title: "Condition Guarantee", desc: "Item must match listed condition. File a dispute within 48 hours." },
              { icon: Icons.truck, title: "Tracked Shipping", desc: "Seller must ship within 48 hours with tracking." },
              { icon: Icons.alertTriangle, title: "Dispute Protection", desc: "Our team reviews disputes within 24 hours." },
            ].map(p => (
              <div key={p.title} className="flex gap-3 p-3 bg-gray-50 rounded-xl">
                <Icon path={p.icon} size={16} className="text-gray-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-gray-800">{p.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      {showReserveMsg ? (
        <div className="fixed bottom-0 left-0 right-0 bg-green-500 px-4 py-5 flex items-center justify-center gap-2">
          <Icon path={Icons.checkCircle} size={20} className="text-white" />
          <span className="text-white font-bold">Reserved! Taking you to checkout…</span>
        </div>
      ) : (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-4 flex gap-3">
          <button onClick={onBack}
            className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
            <Icon path={Icons.heart} size={20} className={currentItem.saved ? "text-red-500 fill-red-500" : "text-gray-600"} />
          </button>
          <button onClick={handleReserve}
            className="flex-1 bg-gray-900 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2">
            <Icon path={Icons.clock} size={16} />
            Reserve for 2 min & Buy
          </button>
        </div>
      )}
    </div>
  );
}

// CHECKOUT
function Checkout({ item, onBack, onPay, reserved }) {
  const [timerExpired, setTimerExpired] = useState(false);
  const shipping = 99;
  const platformFee = 49;
  const total = item.price + shipping + platformFee;

  if (timerExpired) return (
    <div className="flex flex-col items-center justify-center h-screen px-6 text-center">
      <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
        <Icon path={Icons.clock} size={28} className="text-red-500" />
      </div>
      <h2 className="text-xl font-black text-gray-900 mb-2">Reservation Expired</h2>
      <p className="text-sm text-gray-500 mb-6">Someone else may have grabbed it. Go back and reserve again.</p>
      <button onClick={onBack} className="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold text-sm">
        Back to Item
      </button>
    </div>
  );

  return (
    <div className="pb-28">
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 pt-12 pb-4 flex items-center gap-3">
        <button onClick={onBack} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
          <Icon path={Icons.chevronLeft} size={18} className="text-gray-800" />
        </button>
        <h2 className="text-lg font-black text-gray-900">Checkout</h2>
      </div>

      <div className="px-4 pt-4">
        {reserved && <ReserveTimer onExpire={() => setTimerExpired(true)} onCancel={onBack} />}

        {/* Item Summary */}
        <div className="flex gap-3 bg-gray-50 rounded-2xl p-3 mb-4">
          <img src={item.image} alt={item.title} className="w-20 h-24 rounded-xl object-cover" />
          <div className="flex-1">
            <p className="text-xs text-gray-400">{item.brand}</p>
            <p className="text-sm font-bold text-gray-900 leading-tight">{item.title}</p>
            <p className="text-xs text-gray-500 mt-1">Size: {item.size}</p>
            <ConditionBadge condition={item.condition} />
          </div>
        </div>

        {/* Delivery Address */}
        <div className="mb-4">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Deliver To</p>
          <div className="bg-gray-50 rounded-2xl p-4 flex justify-between items-start">
            <div>
              <p className="text-sm font-bold text-gray-800">Aarav Sharma</p>
              <p className="text-xs text-gray-500 mt-0.5">12B Bandra West, Mumbai 400050</p>
              <p className="text-xs text-gray-500">+91 98765 43210</p>
            </div>
            <button className="text-xs text-blue-600 font-semibold">Change</button>
          </div>
        </div>

        {/* Escrow Banner */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-4 flex gap-3">
          <Icon path={Icons.lock} size={18} className="text-blue-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-blue-800">Escrow Payment Protection</p>
            <p className="text-xs text-blue-600 mt-0.5">Your payment is held securely by SuperThrift. Seller gets paid only after you confirm delivery.</p>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="bg-gray-50 rounded-2xl p-4 mb-4">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Price Breakdown</p>
          {[
            ["Item Price", rupee(item.price)],
            ["Shipping", rupee(shipping)],
            ["Platform Fee", rupee(platformFee)],
          ].map(([l, v]) => (
            <div key={l} className="flex justify-between py-1.5">
              <span className="text-sm text-gray-600">{l}</span>
              <span className="text-sm font-semibold text-gray-800">{v}</span>
            </div>
          ))}
          <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between">
            <span className="text-sm font-bold text-gray-900">Total</span>
            <span className="text-base font-black text-gray-900">{rupee(total)}</span>
          </div>
        </div>

        {/* Payment Method */}
        <div className="mb-4">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Payment</p>
          <div className="space-y-2">
            {[
              { id: "upi", label: "UPI (GPay / PhonePe)", icon: "⚡" },
              { id: "card", label: "Credit / Debit Card", icon: "💳" },
              { id: "netbanking", label: "Net Banking", icon: "🏦" },
            ].map(m => (
              <label key={m.id} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 cursor-pointer">
                <input type="radio" name="pay" defaultChecked={m.id === "upi"} className="accent-gray-900" />
                <span className="text-lg">{m.icon}</span>
                <span className="text-sm font-medium text-gray-800">{m.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-4">
        <button onClick={() => onPay(total)}
          className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2">
          <Icon path={Icons.lock} size={18} />
          Pay {rupee(total)} Securely
        </button>
        <p className="text-center text-xs text-gray-400 mt-2">Held in escrow · Released after delivery</p>
      </div>
    </div>
  );
}

// ESCROW FLOW
function EscrowFlow({ item, total, onContinue }) {
  const [step, setStep] = useState(0);
  const steps = [
    { icon: Icons.lock, title: "Payment Received", desc: `${rupee(total)} held in SuperThrift Escrow`, color: "bg-blue-100 text-blue-600" },
    { icon: Icons.truck, title: "Seller Notified", desc: "Seller must ship within 48 hours", color: "bg-purple-100 text-purple-600" },
    { icon: Icons.checkCircle, title: "You Confirm Receipt", desc: "After delivery, you release payment to seller", color: "bg-green-100 text-green-600" },
  ];

  useEffect(() => {
    if (step < 3) {
      const t = setTimeout(() => setStep(s => s + 1), 900);
      return () => clearTimeout(t);
    }
  }, [step]);

  return (
    <div className="flex flex-col min-h-screen bg-white px-6 pb-10">
      <div className="pt-16 mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <Icon path={Icons.checkCircle} size={30} className="text-green-500" />
        </div>
        <h2 className="text-2xl font-black text-gray-900">Payment Protected!</h2>
        <p className="text-sm text-gray-500 mt-1">Your {rupee(total)} is now in escrow</p>
      </div>

      <div className="space-y-4 flex-1">
        {steps.map((s, i) => (
          <div key={s.title}
            className={`flex gap-4 p-4 rounded-2xl border transition-all duration-500 ${step > i ? "bg-white border-gray-200 opacity-100" : "border-transparent opacity-30"}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${s.color}`}>
              {step > i
                ? <Icon path={Icons.check} size={18} />
                : <Icon path={s.icon} size={18} />}
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">{s.title}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-gray-50 rounded-2xl p-4 mb-6">
        <p className="text-xs text-gray-500 font-medium text-center">Order ID: <span className="font-bold text-gray-800">ST-{Date.now().toString().slice(-8)}</span></p>
      </div>

      {step >= 3 && (
        <button onClick={onContinue}
          className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold animate-fade-in">
          Track My Order →
        </button>
      )}
    </div>
  );
}

// DELIVERY CONFIRMATION
function DeliveryConfirm({ item, onConfirm, onDispute }) {
  const [confirmed, setConfirmed] = useState(false);
  const [rating, setRating] = useState(0);

  if (confirmed) return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center bg-white">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 animate-bounce">
        <Icon path={Icons.checkCircle} size={36} className="text-green-500" />
      </div>
      <h2 className="text-2xl font-black text-gray-900 mb-2">Payment Released!</h2>
      <p className="text-sm text-gray-500 mb-1">Seller has been paid</p>
      <p className="text-xs text-gray-400">Thanks for shopping on SuperThrift 🎉</p>
      <div className="mt-8 w-full bg-green-50 rounded-2xl p-4">
        <p className="text-sm font-semibold text-green-800">You rated this {rating}/5 stars</p>
      </div>
      <button onClick={onConfirm} className="mt-6 bg-gray-900 text-white px-8 py-3 rounded-xl font-bold text-sm">
        Continue Shopping
      </button>
    </div>
  );

  return (
    <div className="pb-28">
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 pt-12 pb-4">
        <h2 className="text-lg font-black text-gray-900">Confirm Delivery</h2>
        <p className="text-xs text-gray-500 mt-0.5">Release payment to seller</p>
      </div>

      <div className="px-4 pt-4">
        {/* Item */}
        <div className="flex gap-3 bg-gray-50 rounded-2xl p-3 mb-6">
          <img src={item.image} alt={item.title} className="w-20 h-24 rounded-xl object-cover" />
          <div>
            <p className="text-xs text-gray-400">{item.brand}</p>
            <p className="text-sm font-bold text-gray-900">{item.title}</p>
            <ConditionBadge condition={item.condition} />
          </div>
        </div>

        {/* Checklist */}
        <p className="text-sm font-bold text-gray-800 mb-3">Before confirming, please check:</p>
        <div className="space-y-2 mb-6">
          {[
            "Item received in described condition",
            "No missing parts or damage",
            "Matches photos on listing",
          ].map((t) => (
            <label key={t} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 cursor-pointer">
              <input type="checkbox" className="accent-gray-900 w-4 h-4" />
              <span className="text-sm text-gray-700">{t}</span>
            </label>
          ))}
        </div>

        {/* Rate Seller */}
        <div className="bg-gray-50 rounded-2xl p-4 mb-6">
          <p className="text-sm font-bold text-gray-800 mb-3">Rate Your Seller</p>
          <SellerBadge seller={item.seller} />
          <div className="flex gap-2 mt-3 justify-center">
            {[1, 2, 3, 4, 5].map(s => (
              <button key={s} onClick={() => setRating(s)}>
                <Icon path={Icons.star} size={28} className={s <= rating ? "text-amber-400 fill-amber-400" : "text-gray-300"} />
              </button>
            ))}
          </div>
        </div>

        {/* Problem link */}
        <button onClick={onDispute}
          className="w-full flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-xl text-sm text-gray-600 font-medium mb-4">
          <Icon path={Icons.alertTriangle} size={16} className="text-orange-500" />
          Item has an issue — Open Dispute
        </button>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-4">
        <button onClick={() => setConfirmed(true)}
          className="w-full bg-green-500 text-white py-4 rounded-xl font-bold text-base">
          ✓ Confirm Receipt & Release Payment
        </button>
        <p className="text-center text-xs text-gray-400 mt-2">Seller receives {rupee(item.price)} after confirmation</p>
      </div>
    </div>
  );
}

// DISPUTE FLOW
function DisputeFlow({ item, onBack, onSubmit }) {
  const [step, setStep] = useState(0);
  const [reason, setReason] = useState("");
  const [desc, setDesc] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const reasons = [
    "Item condition doesn't match listing",
    "Item not received",
    "Wrong item sent",
    "Item is damaged",
    "Significant undisclosed defects",
  ];

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center bg-white">
      <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-4">
        <Icon path={Icons.alertTriangle} size={32} className="text-orange-500" />
      </div>
      <h2 className="text-2xl font-black text-gray-900 mb-2">Dispute Filed</h2>
      <p className="text-sm text-gray-500 mb-1">Our team will review within 24 hours</p>
      <p className="text-xs text-gray-400 mb-6">Payment is held in escrow until resolved</p>
      <div className="w-full bg-orange-50 rounded-2xl p-4 text-left space-y-2">
        <div><p className="text-xs text-gray-400">Dispute ID</p><p className="text-sm font-bold">DIS-{Date.now().toString().slice(-6)}</p></div>
        <div><p className="text-xs text-gray-400">Reason</p><p className="text-sm font-semibold">{reason}</p></div>
        <div><p className="text-xs text-gray-400">Expected Resolution</p><p className="text-sm font-semibold">Within 24–48 hours</p></div>
      </div>
      <button onClick={onSubmit} className="mt-8 bg-gray-900 text-white px-8 py-3 rounded-xl font-bold text-sm">
        Go Home
      </button>
    </div>
  );

  return (
    <div className="pb-28">
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 pt-12 pb-4 flex items-center gap-3">
        <button onClick={onBack} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
          <Icon path={Icons.chevronLeft} size={18} />
        </button>
        <div>
          <h2 className="text-lg font-black text-gray-900">Open Dispute</h2>
          <p className="text-xs text-gray-500">Step {step + 1} of 2</p>
        </div>
      </div>

      <div className="px-4 pt-4">
        <div className="flex gap-3 bg-gray-50 rounded-2xl p-3 mb-6">
          <img src={item.image} alt={item.title} className="w-16 h-20 rounded-xl object-cover" />
          <div>
            <p className="text-xs text-gray-400">{item.brand}</p>
            <p className="text-sm font-bold text-gray-900">{item.title}</p>
            <p className="text-xs text-gray-500 mt-1">{rupee(item.price)} held in escrow</p>
          </div>
        </div>

        {step === 0 && (
          <div>
            <p className="text-sm font-bold text-gray-800 mb-3">What's the issue?</p>
            <div className="space-y-2">
              {reasons.map(r => (
                <button key={r} onClick={() => setReason(r)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium border transition-colors ${reason === r ? "border-gray-900 bg-gray-900 text-white" : "border-gray-200 text-gray-700 bg-gray-50"}`}>
                  {r}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <p className="text-sm font-bold text-gray-800 mb-3">Describe the issue</p>
            <textarea value={desc} onChange={e => setDesc(e.target.value)}
              placeholder="Please describe the problem in detail…"
              rows={5}
              className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-gray-400 resize-none mb-4" />
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs font-bold text-gray-600 mb-2">Upload Photos (optional)</p>
              <div className="flex gap-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-20 h-20 bg-gray-200 rounded-xl flex items-center justify-center">
                    <Icon path={Icons.camera} size={20} className="text-gray-400" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-4">
        {step === 0 ? (
          <button onClick={() => setStep(1)} disabled={!reason}
            className={`w-full py-4 rounded-xl font-bold text-base transition-all ${reason ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-400"}`}>
            Next →
          </button>
        ) : (
          <button onClick={handleSubmit}
            className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold text-base">
            Submit Dispute
          </button>
        )}
      </div>
    </div>
  );
}

// PROFILE / SAVED
function Profile({ listings, onProduct }) {
  const saved = listings.filter(l => l.saved);
  return (
    <div className="pb-24">
      <div className="px-4 pt-14 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-800 to-gray-600 flex items-center justify-center text-white text-xl font-black">A</div>
          <div>
            <h2 className="text-lg font-black text-gray-900">Aarav Sharma</h2>
            <p className="text-xs text-gray-500">Mumbai · Member since 2024</p>
            <div className="flex items-center gap-1 mt-1">
              <Icon path={Icons.shield} size={12} className="text-blue-500" />
              <span className="text-xs text-blue-600 font-medium">Verified Buyer</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 mt-4">
        <h3 className="text-sm font-bold text-gray-800 mb-3">Saved Items ({saved.length})</h3>
        {saved.length === 0
          ? <p className="text-sm text-gray-400 text-center py-8">No saved items yet</p>
          : (
            <div className="grid grid-cols-2 gap-3">
              {saved.map(item => (
                <ProductCard key={item.id} item={item} onTap={() => onProduct(item)} onSave={() => { }} delay={0} />
              ))}
            </div>
          )}
      </div>
    </div>
  );
}

// ─── NAV ─────────────────────────────────────────────────────────────────────
function BottomNav({ page, setPage }) {
  const tabs = [
    { id: "home", icon: Icons.home, label: "Home" },
    { id: "search", icon: Icons.search, label: "Search" },
    { id: "profile", icon: Icons.user, label: "Profile" },
  ];
  if (!["home", "search", "profile"].includes(page)) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-100 flex justify-around items-center px-4 py-2 z-30 safe-b">
      {tabs.map(t => (
        <button key={t.id} onClick={() => setPage(t.id)}
          className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl transition-all ${page === t.id ? "text-gray-900" : "text-gray-400"}`}>
          <Icon path={t.icon} size={20} className={page === t.id ? "stroke-2" : ""} />
          <span className="text-xs font-medium">{t.label}</span>
          {page === t.id && <span className="w-1 h-1 bg-gray-900 rounded-full" />}
        </button>
      ))}
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [listings, setListings] = useState(LISTINGS);
  const [selectedItem, setSelectedItem] = useState(null);
  const [reserved, setReserved] = useState(false);
  const [orderTotal, setOrderTotal] = useState(0);

  const goHome = () => { setPage("home"); setSelectedItem(null); setReserved(false); };

  return (
    <div className="min-h-screen bg-white max-w-sm mx-auto relative overflow-x-hidden"
      style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .fill-amber-400 { fill: #fbbf24; }
        .fill-red-500 { fill: #ef4444; }
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        .animate-fade-in { animation: fade-in 0.4s ease forwards; }
        .safe-b { padding-bottom: env(safe-area-inset-bottom, 8px); }
      `}</style>

      {page === "home" && (
        <HomeFeed
          listings={listings}
          setListings={setListings}
          onProduct={(item) => { setSelectedItem(item); setPage("product"); }}
        />
      )}

      {page === "product" && selectedItem && (
        <ProductDetail
          item={selectedItem}
          listings={listings}
          setListings={setListings}
          onBack={() => setPage("home")}
          onCheckout={(item) => { setSelectedItem(item); setPage("checkout"); }}
          onReserve={() => setReserved(true)}
          reserved={reserved}
        />
      )}

      {page === "checkout" && selectedItem && (
        <Checkout
          item={selectedItem}
          reserved={reserved}
          onBack={() => setPage("product")}
          onPay={(total) => { setOrderTotal(total); setPage("escrow"); }}
        />
      )}

      {page === "escrow" && selectedItem && (
        <EscrowFlow
          item={selectedItem}
          total={orderTotal}
          onContinue={() => setPage("delivery")}
        />
      )}

      {page === "delivery" && selectedItem && (
        <DeliveryConfirm
          item={selectedItem}
          onConfirm={goHome}
          onDispute={() => setPage("dispute")}
        />
      )}

      {page === "dispute" && selectedItem && (
        <DisputeFlow
          item={selectedItem}
          onBack={() => setPage("delivery")}
          onSubmit={goHome}
        />
      )}

      {page === "profile" && (
        <Profile
          listings={listings}
          onProduct={(item) => { setSelectedItem(item); setPage("product"); }}
        />
      )}

      {page === "search" && (
        <div className="pt-14 px-4 text-center text-gray-400">
          <Icon path={Icons.search} size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">Advanced search coming soon</p>
          <button onClick={() => setPage("home")} className="mt-4 text-sm text-gray-800 font-semibold underline">
            Browse Feed Instead
          </button>
        </div>
      )}

      <BottomNav page={page} setPage={setPage} />
    </div>
  );
}