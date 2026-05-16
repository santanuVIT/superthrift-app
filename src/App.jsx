import { useState, useEffect } from "react";

// ─── THEME ────────────────────────────────────────────────────────────────────
// Primary:    #FF6B2B  warm tangerine
// Primary-lt: #FFF0E8  soft orange tint
// Primary-md: #FFD9C4  medium tint / borders
// Ink:        #1A1208  warm near-black
// Body:       #5C4A3A  warm brown
// Muted:      #A08878  secondary text
// Surface:    #FFFAF7  warm off-white page bg

// ─── DATA ─────────────────────────────────────────────────────────────────────
const CONDITIONS = {
  MINT:      { label: "Mint",      color: "#059669", bg: "#DCFCE7", score: 10 },
  EXCELLENT: { label: "Excellent", color: "#2563EB", bg: "#DBEAFE", score: 8  },
  GOOD:      { label: "Good",      color: "#D97706", bg: "#FEF3C7", score: 6  },
  FAIR:      { label: "Fair",      color: "#DC2626", bg: "#FEE2E2", score: 4  },
};

const LISTINGS = [
  {
    id: 1, title: "Levi's 501 Straight Jeans", brand: "Levi's", size: "32W 30L",
    price: 1299, originalPrice: 4999, condition: "MINT",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=85",
    seller: { name: "Arjun M.", rating: 4.9, sales: 84, verified: true, avatar: "AM" },
    tags: ["Y2K", "Denim"], city: "Mumbai", saved: false, category: "Bottoms",
    description: "Barely worn — washed twice only. Zero fading, no distress. Classic vintage 501 in perfect shape.",
    drops: false,
  },
  {
    id: 2, title: "Zara Oversized Blazer", brand: "Zara", size: "S",
    price: 2199, originalPrice: 6999, condition: "EXCELLENT",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=85",
    seller: { name: "Priya S.", rating: 4.7, sales: 52, verified: true, avatar: "PS" },
    tags: ["Office", "Smart"], city: "Delhi", saved: true, category: "Tops",
    description: "One season old. Minor pilling on inner lining only. Smoke-free home.",
    drops: true,
  },
  {
    id: 3, title: "New Balance 550 White", brand: "New Balance", size: "UK 8",
    price: 3499, originalPrice: 9999, condition: "GOOD",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=85",
    seller: { name: "Rohan K.", rating: 4.5, sales: 31, verified: false, avatar: "RK" },
    tags: ["Sneakers", "Chunky"], city: "Bangalore", saved: false, category: "Footwear",
    description: "Worn ~10 times. Some creasing on toe box. Cleaned with sneaker cleaner before listing.",
    drops: false,
  },
  {
    id: 4, title: "H&M Knit Cardigan Beige", brand: "H&M", size: "M",
    price: 699, originalPrice: 2499, condition: "EXCELLENT",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=85",
    seller: { name: "Meera T.", rating: 5.0, sales: 120, verified: true, avatar: "MT" },
    tags: ["Cozy", "Neutral"], city: "Pune", saved: false, category: "Tops",
    description: "Worn twice. Zero pilling. Great for layering over anything.",
    drops: true,
  },
  {
    id: 5, title: "Mango Slip Midi Dress", brand: "Mango", size: "XS",
    price: 1499, originalPrice: 4499, condition: "MINT",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=85",
    seller: { name: "Nisha R.", rating: 4.8, sales: 67, verified: true, avatar: "NR" },
    tags: ["Satin", "Evening"], city: "Hyderabad", saved: true, category: "Dresses",
    description: "Worn to one event. Dry cleaned after. Tags removed but otherwise brand new.",
    drops: false,
  },
  {
    id: 6, title: "Adidas Trefoil Hoodie", brand: "Adidas", size: "L",
    price: 1799, originalPrice: 5499, condition: "GOOD",
    image: "https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=600&q=85",
    seller: { name: "Vikram J.", rating: 4.3, sales: 18, verified: false, avatar: "VJ" },
    tags: ["Streetwear", "Classic"], city: "Chennai", saved: false, category: "Tops",
    description: "Regular wear, washed 8–10 times. Slight logo fade but structure is solid.",
    drops: false,
  },
  {
    id: 7, title: "Tommy Hilfiger Polo Tee", brand: "Tommy Hilfiger", size: "M",
    price: 899, originalPrice: 3499, condition: "EXCELLENT",
    image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=600&q=85",
    seller: { name: "Anika V.", rating: 4.6, sales: 39, verified: true, avatar: "AV" },
    tags: ["Preppy", "Classic"], city: "Kolkata", saved: false, category: "Tops",
    description: "Worn three times for casual outings. No stains, no shrinkage, colour is vivid.",
    drops: true,
  },
  {
    id: 8, title: "Nike Air Force 1 Low", brand: "Nike", size: "UK 9",
    price: 4299, originalPrice: 8995, condition: "GOOD",
    image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=600&q=85",
    seller: { name: "Dev P.", rating: 4.4, sales: 27, verified: false, avatar: "DP" },
    tags: ["Sneakers", "Iconic"], city: "Mumbai", saved: false, category: "Footwear",
    description: "Regular use ~4 months. Soles clean, uppers have light crease. Shipped with box.",
    drops: false,
  },
];

const CATEGORIES = ["All", "Tops", "Bottoms", "Dresses", "Footwear", "Bags"];

// ─── ICONS ────────────────────────────────────────────────────────────────────
const Icon = ({ path, size = 20, className = "", style: st = {}, fill = "none" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}
    stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"
    className={className} style={st}>
    <path d={path} />
  </svg>
);

const Icons = {
  home:          "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  search:        "M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z",
  bell:          "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0",
  heart:         "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z",
  user:          "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z",
  shield:        "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  star:          "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  clock:         "M12 22a10 10 0 100-20 10 10 0 000 20z M12 6v6l4 2",
  check:         "M20 6L9 17l-5-5",
  checkCircle:   "M22 11.08V12a10 10 0 11-5.93-9.14 M22 4L12 14.01l-3-3",
  chevronLeft:   "M15 18l-6-6 6-6",
  lock:          "M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2z M17 11V7a5 5 0 00-10 0v4",
  truck:         "M1 3h15v13H1z M16 8h4l3 3v5h-7V8z M5.5 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3z M18.5 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3z",
  alertTriangle: "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01",
  camera:        "M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z M12 17a4 4 0 100-8 4 4 0 000 8z",
  fire:          "M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 01-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z",
  arrowRight:    "M5 12h14M12 5l7 7-7 7",
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const rupee = (n) => `₹${n.toLocaleString("en-IN")}`;
const pctOff = (o, c) => Math.round((1 - c / o) * 100);

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────
function ConditionBadge({ condition, size = "sm" }) {
  const c   = CONDITIONS[condition];
  const cls = size === "lg" ? "px-3 py-1.5 text-xs gap-1.5" : "px-2 py-0.5 text-[10px] gap-1";
  return (
    <span className={`inline-flex items-center rounded-full font-bold tracking-wide ${cls}`}
      style={{ color: c.color, background: c.bg }}>
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: c.color }} />
      {c.label} · {c.score}/10
    </span>
  );
}

function Avatar({ initials, size = 36 }) {
  const pal = ["#F97316","#3B82F6","#10B981","#8B5CF6","#EC4899"];
  const bg  = pal[(initials.charCodeAt(0) + (initials.charCodeAt(1) || 0)) % pal.length];
  return (
    <div className="rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
      style={{ width: size, height: size, background: bg, fontSize: size * 0.34,
               boxShadow: "0 0 0 2px #FFFAF7" }}>
      {initials}
    </div>
  );
}

function SellerRow({ seller }) {
  return (
    <div className="flex items-center gap-2.5">
      <Avatar initials={seller.avatar} size={34} />
      <div>
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-bold" style={{ color: "#1A1208" }}>{seller.name}</span>
          {seller.verified && (
            <span className="inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[9px] font-black"
              style={{ background: "#DBEAFE", color: "#2563EB" }}>
              <Icon path={Icons.shield} size={8} /> VERIFIED
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 mt-0.5">
          <Icon path={Icons.star} size={10} fill="#FBBF24" style={{ color: "#FBBF24" }} />
          <span className="text-xs" style={{ color: "#A08878" }}>{seller.rating} · {seller.sales} sold</span>
        </div>
      </div>
    </div>
  );
}

function TrustRow() {
  return (
    <div className="flex gap-2 flex-wrap">
      {[
        { label: "Escrow Safe",        col: "#FF6B2B", bg: "#FFF0E8", icon: Icons.lock        },
        { label: "Condition Verified", col: "#059669", bg: "#DCFCE7", icon: Icons.checkCircle },
        { label: "Tracked Delivery",   col: "#7C3AED", bg: "#EDE9FE", icon: Icons.truck       },
      ].map(b => (
        <div key={b.label} className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
          style={{ background: b.bg }}>
          <Icon path={b.icon} size={11} style={{ color: b.col }} />
          <span className="text-[11px] font-bold" style={{ color: b.col }}>{b.label}</span>
        </div>
      ))}
    </div>
  );
}

// ─── RESERVE TIMER ────────────────────────────────────────────────────────────
function ReserveTimer({ onExpire, onCancel }) {
  const [secs, setSecs] = useState(120);
  useEffect(() => {
    const t = setInterval(() => setSecs(s => {
      if (s <= 1) { clearInterval(t); onExpire(); return 0; }
      return s - 1;
    }), 1000);
    return () => clearInterval(t);
  }, []);
  const pct    = (secs / 120) * 100;
  const m      = Math.floor(secs / 60);
  const s      = secs % 60;
  const urgent = secs < 30;
  return (
    <div className="rounded-2xl p-4 mb-4 border"
      style={{ background: urgent ? "#FEF2F2" : "#FFF7ED",
               borderColor: urgent ? "#FECACA" : "#FFD9C4" }}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon path={Icons.clock} size={14} style={{ color: urgent ? "#DC2626" : "#FF6B2B" }} />
          <span className="text-sm font-black" style={{ color: "#1A1208" }}>Item Reserved For You</span>
        </div>
        <span className="text-xl font-black tabular-nums"
          style={{ color: urgent ? "#DC2626" : "#FF6B2B" }}>
          {m}:{String(s).padStart(2,"0")}
        </span>
      </div>
      <div className="w-full h-1.5 rounded-full mb-2"
        style={{ background: urgent ? "#FECACA" : "#FFD9C4" }}>
        <div className="h-1.5 rounded-full transition-all duration-1000"
          style={{ width: `${pct}%`, background: urgent ? "#DC2626" : "#FF6B2B" }} />
      </div>
      <div className="flex justify-between">
        <p className="text-xs" style={{ color: "#A08878" }}>Complete checkout before time ends.</p>
        <button onClick={onCancel} className="text-xs font-bold underline" style={{ color: "#A08878" }}>
          Cancel
        </button>
      </div>
    </div>
  );
}

// ─── HOME FEED ────────────────────────────────────────────────────────────────
function HomeFeed({ onProduct, listings, setListings }) {
  const [cat, setCat]       = useState("All");
  const [query, setQuery]   = useState("");
  const [notif, setNotif]   = useState(false);

  const filtered = listings.filter(l =>
    (cat === "All" || l.category === cat) &&
    (l.title.toLowerCase().includes(query.toLowerCase()) ||
     l.brand.toLowerCase().includes(query.toLowerCase()))
  );

  const toggleSave = id =>
    setListings(ls => ls.map(l => l.id === id ? { ...l, saved: !l.saved } : l));

  return (
    <div style={{ background: "#FFFAF7", minHeight: "100vh", paddingBottom: 96 }}>
      {/* ── Sticky Header ── */}
      <div className="sticky top-0 z-20 px-4 pt-12 pb-3"
        style={{ background: "rgba(255,250,247,0.97)", backdropFilter: "blur(12px)",
                 borderBottom: "1px solid #FFD9C4" }}>

        <div className="flex items-center justify-between mb-3">
          <div>
            <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.14em",
                        textTransform: "uppercase", color: "#A08878" }}>Mumbai · India</p>
            <h1 style={{ fontSize: 26, fontWeight: 900, lineHeight: 1, color: "#1A1208",
                         letterSpacing: "-0.02em" }}>
              Super<span style={{ color: "#FF6B2B" }}>Thrift</span>
            </h1>
          </div>
          <button onClick={() => setNotif(true)}
            className="relative w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: "#FFF0E8", border: "1.5px solid #FFD9C4" }}>
            <Icon path={Icons.bell} size={17} style={{ color: "#FF6B2B" }} />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full"
              style={{ background: "#FF6B2B", border: "2px solid #FFFAF7" }} />
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Icon path={Icons.search} size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2"
            style={{ color: "#C4A898" }} />
          <input value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search brands, styles, sizes…"
            style={{ width: "100%", paddingLeft: 38, paddingRight: 16, paddingTop: 10,
                     paddingBottom: 10, borderRadius: 12, fontSize: 13, outline: "none",
                     background: "#FFF0E8", border: `1.5px solid ${query ? "#FF6B2B" : "#FFD9C4"}`,
                     color: "#1A1208", fontFamily: "inherit", transition: "border-color 0.2s" }} />
        </div>

        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto pb-0.5 scrollbar-hide">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCat(c)}
              style={{
                flexShrink: 0, padding: "6px 14px", borderRadius: 999,
                fontSize: 12, fontWeight: 700, transition: "all 0.15s",
                background: cat === c ? "#FF6B2B" : "#FFF0E8",
                color:      cat === c ? "#fff"    : "#A08878",
                border:     cat === c ? "1.5px solid #FF6B2B" : "1.5px solid #FFD9C4",
              }}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* ── Drop Banner ── */}
      <div className="mx-4 mt-4 mb-4 rounded-2xl p-4 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #FF6B2B 0%, #FF9A5C 100%)" }}>
        <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full"
          style={{ background: "rgba(255,255,255,0.07)" }} />
        <div className="absolute right-2 bottom-0 w-16 h-16 rounded-full"
          style={{ background: "rgba(255,255,255,0.05)" }} />
        <div className="flex items-center gap-1.5 mb-1">
          <Icon path={Icons.fire} size={12} style={{ color: "#FEF08A" }} />
          <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.14em",
                         textTransform: "uppercase", color: "#FEF08A" }}>New Drop</span>
        </div>
        <p style={{ fontSize: 15, fontWeight: 800, color: "#fff", lineHeight: 1.35, marginBottom: 12 }}>
          12 vintage pieces just listed<br />from Delhi sellers
        </p>
        <button style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12,
                         fontWeight: 700, color: "#fff", background: "rgba(255,255,255,0.2)",
                         padding: "6px 14px", borderRadius: 999, border: "none" }}>
          View Drop <Icon path={Icons.arrowRight} size={12} />
        </button>
      </div>

      {/* ── Section label ── */}
      <div className="px-4 mb-3 flex items-center justify-between">
        <p style={{ fontSize: 13, fontWeight: 800, color: "#1A1208" }}>
          {cat === "All" ? "All Listings" : cat}
          <span style={{ marginLeft: 8, fontSize: 12, fontWeight: 600, color: "#A08878" }}>
            ({filtered.length})
          </span>
        </p>
        <button style={{ fontSize: 12, fontWeight: 700, color: "#FF6B2B" }}>Sort ↕</button>
      </div>

      {/* ── Grid ── */}
      <div className="px-4 grid grid-cols-2 gap-3">
        {filtered.map((item, i) => (
          <ProductCard key={item.id} item={item}
            onTap={() => onProduct(item)}
            onSave={() => toggleSave(item.id)}
            delay={i * 40} />
        ))}
      </div>

      {/* ── Notification Drawer ── */}
      {notif && (
        <div className="fixed inset-0 z-50 flex items-end"
          style={{ background: "rgba(26,18,8,0.5)" }}
          onClick={() => setNotif(false)}>
          <div className="bg-white w-full rounded-t-3xl p-6"
            onClick={e => e.stopPropagation()}>
            <div className="w-10 h-1 rounded-full mx-auto mb-5"
              style={{ background: "#FFD9C4" }} />
            <p style={{ fontSize: 17, fontWeight: 900, color: "#1A1208", marginBottom: 2 }}>Drop Alerts</p>
            <p style={{ fontSize: 12, color: "#A08878", marginBottom: 16 }}>Items on your watchlist that just dropped</p>
            {listings.filter(l => l.drops).map(l => (
              <div key={l.id} className="flex items-center gap-3 py-3"
                style={{ borderBottom: "1px solid #FFF0E8" }}>
                <img src={l.image} alt={l.title}
                  className="w-12 h-14 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="truncate" style={{ fontSize: 13, fontWeight: 700, color: "#1A1208" }}>{l.title}</p>
                  <p style={{ fontSize: 12, color: "#A08878" }}>{rupee(l.price)}</p>
                </div>
                <span className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: "#FF6B2B" }} />
              </div>
            ))}
            <button onClick={() => setNotif(false)}
              className="mt-4 w-full py-3 rounded-xl font-black text-sm text-white"
              style={{ background: "#FF6B2B" }}>
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────
function ProductCard({ item, onTap, onSave, delay }) {
  const [visible, setVisible] = useState(false);
  const [imgErr,  setImgErr]  = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), delay); return () => clearTimeout(t); }, []);

  const pct = pctOff(item.originalPrice, item.price);

  return (
    <div onClick={onTap}
      style={{
        background: "#fff", borderRadius: 18, overflow: "hidden", cursor: "pointer",
        border: "1px solid #FFD9C4", boxShadow: "0 2px 14px rgba(255,107,43,0.07)",
        opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(14px)",
        transition: `opacity 0.3s ease ${delay}ms, transform 0.3s ease ${delay}ms`,
      }}>
      {/* Image */}
      <div style={{ position: "relative" }}>
        <img
          src={imgErr
            ? `https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=85`
            : item.image}
          alt={item.title}
          onError={() => setImgErr(true)}
          style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", display: "block" }}
        />
        {/* Save btn */}
        <button onClick={e => { e.stopPropagation(); onSave(); }}
          style={{ position: "absolute", top: 8, right: 8, width: 32, height: 32,
                   borderRadius: "50%", display: "flex", alignItems: "center",
                   justifyContent: "center", background: "rgba(255,250,247,0.92)",
                   border: "none", cursor: "pointer" }}>
          <Icon path={Icons.heart} size={16}
            fill={item.saved ? "#FF6B2B" : "none"}
            style={{ color: item.saved ? "#FF6B2B" : "#A08878" }} />
        </button>
        {/* Discount pill */}
        <span style={{ position: "absolute", top: 8, left: 8, background: "#FF6B2B",
                       color: "#fff", fontSize: 10, fontWeight: 800,
                       padding: "2px 8px", borderRadius: 999 }}>
          -{pct}%
        </span>
        {/* Drop badge */}
        {item.drops && (
          <span style={{ position: "absolute", bottom: 8, left: 8, display: "flex",
                         alignItems: "center", gap: 4, fontSize: 10, fontWeight: 800,
                         color: "#fff", background: "rgba(26,18,8,0.72)",
                         backdropFilter: "blur(4px)", padding: "3px 8px", borderRadius: 999 }}>
            <Icon path={Icons.bell} size={9} /> Drop
          </span>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: "10px 10px 12px" }}>
        <p style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase",
                    letterSpacing: "0.1em", color: "#A08878", marginBottom: 2 }}>
          {item.brand}
        </p>
        <p style={{ fontSize: 13, fontWeight: 700, color: "#1A1208", lineHeight: 1.3,
                    marginBottom: 6, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {item.title}
        </p>
        <div className="flex items-center justify-between mb-2">
          <span style={{ fontSize: 15, fontWeight: 900, color: "#FF6B2B" }}>{rupee(item.price)}</span>
          <span style={{ fontSize: 11, color: "#C4A898", textDecoration: "line-through" }}>
            {rupee(item.originalPrice)}
          </span>
        </div>
        <ConditionBadge condition={item.condition} />
        <div className="flex items-center gap-1 mt-2">
          <Icon path={Icons.star} size={9} fill="#FBBF24" style={{ color: "#FBBF24" }} />
          <span style={{ fontSize: 10, color: "#A08878" }}>
            {item.seller.rating} · {item.city}
            {item.seller.verified ? " ✓" : ""}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── PRODUCT DETAIL ────────────────────────────────────────────────────────────
function ProductDetail({ item, onBack, onCheckout, onReserve, listings, setListings }) {
  const [tab,       setTab]       = useState("info");
  const [reserving, setReserving] = useState(false);
  const current = listings.find(l => l.id === item.id) || item;

  const handleReserve = () => {
    setReserving(true);
    onReserve(item);
    setTimeout(() => { setReserving(false); onCheckout(item); }, 900);
  };
  const toggleSave = () =>
    setListings(ls => ls.map(l => l.id === item.id ? { ...l, saved: !l.saved } : l));

  const pct = pctOff(item.originalPrice, item.price);

  return (
    <div style={{ background: "#FFFAF7", minHeight: "100vh", paddingBottom: 96 }}>
      {/* Image Hero */}
      <div style={{ position: "relative" }}>
        <img src={item.image} alt={item.title}
          style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", display: "block" }} />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
                      background: "linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, transparent 40%, transparent 60%, rgba(26,18,8,0.52) 100%)" }} />

        <button onClick={onBack}
          style={{ position: "absolute", top: 48, left: 16, width: 40, height: 40,
                   borderRadius: "50%", display: "flex", alignItems: "center",
                   justifyContent: "center", background: "rgba(255,250,247,0.92)", border: "none",
                   cursor: "pointer" }}>
          <Icon path={Icons.chevronLeft} size={20} style={{ color: "#1A1208" }} />
        </button>
        <button onClick={toggleSave}
          style={{ position: "absolute", top: 48, right: 16, width: 40, height: 40,
                   borderRadius: "50%", display: "flex", alignItems: "center",
                   justifyContent: "center", background: "rgba(255,250,247,0.92)", border: "none",
                   cursor: "pointer" }}>
          <Icon path={Icons.heart} size={20}
            fill={current.saved ? "#FF6B2B" : "none"}
            style={{ color: current.saved ? "#FF6B2B" : "#1A1208" }} />
        </button>

        <div style={{ position: "absolute", bottom: 16, left: 16, right: 16,
                      display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <ConditionBadge condition={item.condition} size="lg" />
          <span style={{ fontSize: 11, fontWeight: 800, color: "#fff", background: "#FF6B2B",
                         padding: "4px 10px", borderRadius: 999 }}>-{pct}% off</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "16px 16px 0" }}>
        {/* Title + Price */}
        <div className="flex items-start justify-between mb-3">
          <div style={{ flex: 1, paddingRight: 12 }}>
            <p style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase",
                        letterSpacing: "0.14em", color: "#A08878", marginBottom: 2 }}>
              {item.brand} · Size {item.size}
            </p>
            <h2 style={{ fontSize: 20, fontWeight: 900, lineHeight: 1.2, color: "#1A1208",
                         letterSpacing: "-0.02em" }}>
              {item.title}
            </h2>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: "#FF6B2B" }}>{rupee(item.price)}</div>
            <div style={{ fontSize: 12, color: "#C4A898", textDecoration: "line-through" }}>
              {rupee(item.originalPrice)}
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {item.tags.map(t => (
            <span key={t} style={{ fontSize: 12, fontWeight: 600, color: "#FF6B2B",
                                   background: "#FFF0E8", padding: "4px 10px", borderRadius: 999 }}>
              #{t}
            </span>
          ))}
          <span style={{ fontSize: 12, fontWeight: 600, color: "#A08878",
                         background: "#FFF0E8", padding: "4px 10px", borderRadius: 999 }}>
            {item.city}
          </span>
        </div>

        <div style={{ marginBottom: 16 }}><TrustRow /></div>

        {/* Tabs */}
        <div className="flex mb-4 p-1 rounded-xl" style={{ background: "#FFF0E8" }}>
          {[["info","Details"],["seller","Seller"],["policy","Policy"]].map(([id,label]) => (
            <button key={id} onClick={() => setTab(id)}
              style={{
                flex: 1, padding: "8px 0", fontSize: 12, fontWeight: 700,
                borderRadius: 10, border: "none", cursor: "pointer", transition: "all 0.15s",
                background: tab === id ? "#FF6B2B" : "transparent",
                color:      tab === id ? "#fff"    : "#A08878",
              }}>
              {label}
            </button>
          ))}
        </div>

        {tab === "info" && (
          <div>
            <p style={{ fontSize: 14, color: "#5C4A3A", lineHeight: 1.6, marginBottom: 16 }}>
              {item.description}
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              {[["Brand",item.brand],["Size",item.size],["City",item.city],["Category",item.category]].map(([k,v]) => (
                <div key={k} style={{ background: "#FFF0E8", borderRadius: 12, padding: "10px 12px" }}>
                  <p style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase",
                               letterSpacing: "0.1em", color: "#A08878", marginBottom: 2 }}>{k}</p>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#1A1208" }}>{v}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "seller" && (
          <div>
            <div style={{ background: "#FFF0E8", borderRadius: 16, padding: 16, marginBottom: 12 }}>
              <SellerRow seller={item.seller} />
              {item.seller.verified && (
                <div style={{ marginTop: 12, background: "#EFF6FF", borderRadius: 10,
                               padding: "10px 12px", borderLeft: "3px solid #3B82F6",
                               display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <Icon path={Icons.shield} size={13} style={{ color: "#2563EB", marginTop: 1, flexShrink: 0 }} />
                  <p style={{ fontSize: 12, fontWeight: 600, color: "#1D4ED8" }}>
                    Government ID verified by SuperThrift. Identity confirmed.
                  </p>
                </div>
              )}
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              {[[item.seller.sales,"Items Sold"],[item.seller.rating,"Avg Rating"],["98%","Ships On Time"]].map(([v,l]) => (
                <div key={l} style={{ background: "#FFF0E8", borderRadius: 12, padding: 12 }}>
                  <p style={{ fontSize: 18, fontWeight: 900, color: "#FF6B2B" }}>{v}</p>
                  <p style={{ fontSize: 10, fontWeight: 600, color: "#A08878", marginTop: 2 }}>{l}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "policy" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { i: Icons.lock,          c: "#FF6B2B", bg: "#FFF0E8", t: "Escrow Payment",       d: "Money held until you confirm delivery." },
              { i: Icons.camera,        c: "#059669", bg: "#DCFCE7", t: "Condition Guarantee",   d: "File dispute within 48 hrs if item doesn't match." },
              { i: Icons.truck,         c: "#7C3AED", bg: "#EDE9FE", t: "Tracked Shipping",      d: "Seller ships within 48 hrs with tracking number." },
              { i: Icons.alertTriangle, c: "#D97706", bg: "#FEF3C7", t: "Dispute Protection",    d: "Our team reviews all disputes within 24 hours." },
            ].map(p => (
              <div key={p.t} className="flex gap-3" style={{ background: p.bg, borderRadius: 14, padding: 14 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.6)",
                               display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon path={p.i} size={14} style={{ color: p.c }} />
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 800, color: "#1A1208", marginBottom: 2 }}>{p.t}</p>
                  <p style={{ fontSize: 12, color: "#5C4A3A", lineHeight: 1.5 }}>{p.d}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, padding: "16px 16px",
        background: "rgba(255,250,247,0.97)", backdropFilter: "blur(12px)",
        borderTop: "1px solid #FFD9C4",
      }}>
        <div className="flex gap-3">
          <button onClick={toggleSave}
            style={{ width: 48, height: 48, borderRadius: 12, border: "1.5px solid #FFD9C4",
                     background: "#FFF0E8", display: "flex", alignItems: "center",
                     justifyContent: "center", flexShrink: 0, cursor: "pointer" }}>
            <Icon path={Icons.heart} size={20}
              fill={current.saved ? "#FF6B2B" : "none"}
              style={{ color: current.saved ? "#FF6B2B" : "#A08878" }} />
          </button>
          <button onClick={handleReserve}
            style={{
              flex: 1, padding: "14px 0", borderRadius: 12, border: "none",
              fontWeight: 900, fontSize: 14, color: "#fff", cursor: "pointer",
              background: reserving ? "#FF9A5C" : "#FF6B2B",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              transition: "background 0.2s",
            }}>
            {reserving
              ? <><Icon path={Icons.check} size={16} /> Reserved!</>
              : <><Icon path={Icons.clock} size={16} /> Reserve 2 min & Buy</>}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── CHECKOUT ─────────────────────────────────────────────────────────────────
function Checkout({ item, onBack, onPay, reserved }) {
  const [expired, setExpired] = useState(false);
  const [payMode, setPayMode] = useState("upi");
  const shipping = 99, fee = 49;
  const total = item.price + shipping + fee;

  if (expired) return (
    <div style={{ background: "#FFFAF7", minHeight: "100vh", display: "flex",
                  flexDirection: "column", alignItems: "center", justifyContent: "center",
                  padding: "0 24px", textAlign: "center" }}>
      <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#FEE2E2",
                    display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
        <Icon path={Icons.clock} size={28} style={{ color: "#DC2626" }} />
      </div>
      <h2 style={{ fontSize: 20, fontWeight: 900, color: "#1A1208", marginBottom: 8 }}>Reservation Expired</h2>
      <p style={{ fontSize: 14, color: "#A08878", marginBottom: 24 }}>Go back and reserve again quickly.</p>
      <button onClick={onBack}
        style={{ padding: "12px 24px", borderRadius: 12, fontWeight: 800, fontSize: 14,
                 color: "#fff", background: "#FF6B2B", border: "none", cursor: "pointer" }}>
        Back to Item
      </button>
    </div>
  );

  return (
    <div style={{ background: "#FFFAF7", minHeight: "100vh", paddingBottom: 96 }}>
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center gap-3 px-4 pt-12 pb-4"
        style={{ background: "rgba(255,250,247,0.97)", backdropFilter: "blur(12px)",
                 borderBottom: "1px solid #FFD9C4" }}>
        <button onClick={onBack}
          style={{ width: 36, height: 36, borderRadius: "50%", border: "1.5px solid #FFD9C4",
                   background: "#FFF0E8", display: "flex", alignItems: "center",
                   justifyContent: "center", cursor: "pointer" }}>
          <Icon path={Icons.chevronLeft} size={17} style={{ color: "#1A1208" }} />
        </button>
        <div>
          <p style={{ fontSize: 17, fontWeight: 900, color: "#1A1208", lineHeight: 1 }}>Checkout</p>
          <p style={{ fontSize: 11, color: "#A08878", marginTop: 2 }}>Review & pay securely</p>
        </div>
      </div>

      <div style={{ padding: "16px 16px 0" }}>
        {reserved && <ReserveTimer onExpire={() => setExpired(true)} onCancel={onBack} />}

        {/* Item summary */}
        <div className="flex gap-3 mb-4" style={{ background: "#FFF0E8", border: "1px solid #FFD9C4",
                                                   borderRadius: 16, padding: 12 }}>
          <img src={item.image} alt={item.title}
            style={{ width: 76, height: 92, borderRadius: 12, objectFit: "cover", flexShrink: 0 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase",
                        letterSpacing: "0.1em", color: "#A08878" }}>{item.brand}</p>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#1A1208", lineHeight: 1.3,
                        marginTop: 2, marginBottom: 6 }}>{item.title}</p>
            <p style={{ fontSize: 11, color: "#A08878", marginBottom: 6 }}>Size: {item.size}</p>
            <ConditionBadge condition={item.condition} />
          </div>
        </div>

        {/* Delivery */}
        <p style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em",
                    color: "#A08878", marginBottom: 8 }}>Deliver To</p>
        <div className="flex justify-between items-start mb-4"
          style={{ background: "#fff", border: "1px solid #FFD9C4", borderRadius: 16, padding: 14 }}>
          <div>
            <p style={{ fontSize: 14, fontWeight: 700, color: "#1A1208" }}>Santanu Guha</p>
            <p style={{ fontSize: 12, color: "#5C4A3A", marginTop: 2 }}>12B Ballygunge, Kolkata 700019</p>
            <p style={{ fontSize: 12, color: "#A08878" }}>+91 98765 43210</p>
          </div>
          <button style={{ fontSize: 12, fontWeight: 700, color: "#FF6B2B", background: "none",
                           border: "none", cursor: "pointer" }}>Change</button>
        </div>

        {/* Escrow banner */}
        <div className="flex gap-3 mb-4"
          style={{ background: "#FFF0E8", border: "1px solid #FFD9C4", borderRadius: 16, padding: 14 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "#FF6B2B",
                        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Icon path={Icons.lock} size={15} style={{ color: "#fff" }} />
          </div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 800, color: "#1A1208", marginBottom: 3 }}>
              Escrow Payment Protection
            </p>
            <p style={{ fontSize: 12, color: "#5C4A3A", lineHeight: 1.5 }}>
              Payment held by SuperThrift. Seller paid only after you confirm delivery.
            </p>
          </div>
        </div>

        {/* Price breakdown */}
        <p style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em",
                    color: "#A08878", marginBottom: 8 }}>Price Breakdown</p>
        <div style={{ background: "#fff", border: "1px solid #FFD9C4", borderRadius: 16, padding: 14, marginBottom: 16 }}>
          {[["Item Price", rupee(item.price)],["Shipping", rupee(shipping)],["Platform Fee", rupee(fee)]].map(([l,v]) => (
            <div key={l} className="flex justify-between py-1.5"
              style={{ borderBottom: "1px solid #FFF0E8" }}>
              <span style={{ fontSize: 13, color: "#5C4A3A" }}>{l}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#1A1208" }}>{v}</span>
            </div>
          ))}
          <div className="flex justify-between pt-3">
            <span style={{ fontSize: 14, fontWeight: 800, color: "#1A1208" }}>Total</span>
            <span style={{ fontSize: 18, fontWeight: 900, color: "#FF6B2B" }}>{rupee(total)}</span>
          </div>
        </div>

        {/* Payment */}
        <p style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em",
                    color: "#A08878", marginBottom: 8 }}>Payment Method</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
          {[{ id:"upi", emoji:"⚡", label:"UPI (GPay / PhonePe / Paytm)" },
            { id:"card", emoji:"💳", label:"Credit / Debit Card" },
            { id:"net", emoji:"🏦", label:"Net Banking" }].map(m => (
            <label key={m.id} onClick={() => setPayMode(m.id)}
              style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "12px 14px", borderRadius: 14, cursor: "pointer",
                background: payMode === m.id ? "#FFF0E8" : "#fff",
                border: `1.5px solid ${payMode === m.id ? "#FF6B2B" : "#FFD9C4"}`,
                transition: "all 0.15s",
              }}>
              <span style={{ fontSize: 18 }}>{m.emoji}</span>
              <span style={{ fontSize: 13, fontWeight: 600, flex: 1, color: "#1A1208" }}>{m.label}</span>
              <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${payMode === m.id ? "#FF6B2B" : "#C4A898"}`,
                             display: "flex", alignItems: "center", justifyContent: "center" }}>
                {payMode === m.id && (
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#FF6B2B" }} />
                )}
              </div>
            </label>
          ))}
        </div>
      </div>

      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, padding: "16px 16px",
                    background: "rgba(255,250,247,0.97)", backdropFilter: "blur(12px)",
                    borderTop: "1px solid #FFD9C4" }}>
        <button onClick={() => onPay(total)}
          style={{ width: "100%", padding: "15px 0", borderRadius: 14, border: "none",
                   fontWeight: 900, fontSize: 15, color: "#fff", background: "#FF6B2B",
                   display: "flex", alignItems: "center", justifyContent: "center",
                   gap: 8, cursor: "pointer" }}>
          <Icon path={Icons.lock} size={16} />
          Pay {rupee(total)} · Escrow Protected
        </button>
        <p style={{ textAlign: "center", fontSize: 11, color: "#A08878", marginTop: 8, fontWeight: 500 }}>
          Held safely · Released only on your confirmation
        </p>
      </div>
    </div>
  );
}

// ─── ESCROW FLOW ──────────────────────────────────────────────────────────────
function EscrowFlow({ item, total, onContinue }) {
  const [step, setStep] = useState(0);
  const steps = [
    { i: Icons.lock,        t: "Payment Secured",     d: `${rupee(total)} locked in SuperThrift Escrow`,    c: "#FF6B2B", bg: "#FFF0E8" },
    { i: Icons.truck,       t: "Seller Notified",     d: "Seller must ship within 48 hrs with tracking",    c: "#7C3AED", bg: "#EDE9FE" },
    { i: Icons.checkCircle, t: "You Confirm Receipt", d: "Review delivery, then release payment to seller",  c: "#059669", bg: "#DCFCE7" },
  ];
  useEffect(() => {
    if (step < 3) { const t = setTimeout(() => setStep(s => s+1), 800); return () => clearTimeout(t); }
  }, [step]);

  return (
    <div style={{ background: "#FFFAF7", minHeight: "100vh", padding: "64px 24px 40px",
                  display: "flex", flexDirection: "column" }}>
      <div style={{ marginBottom: 32 }}>
        <div style={{ width: 64, height: 64, borderRadius: 16, background: "#FFF0E8",
                      display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
          <Icon path={Icons.checkCircle} size={30} style={{ color: "#FF6B2B" }} />
        </div>
        <h2 style={{ fontSize: 24, fontWeight: 900, color: "#1A1208", marginBottom: 4 }}>Payment Protected!</h2>
        <p style={{ fontSize: 14, color: "#A08878" }}>{rupee(total)} is now in escrow — you're safe.</p>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
        {steps.map((s, i) => (
          <div key={s.t} style={{
            display: "flex", gap: 16, padding: 16, borderRadius: 16,
            background: step > i ? s.bg : "#F5F0EB",
            border: `1px solid ${step > i ? s.c + "33" : "#E8DDD5"}`,
            opacity: step > i ? 1 : 0.3,
            transition: "all 0.4s ease",
          }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                           display: "flex", alignItems: "center", justifyContent: "center",
                           background: step > i ? s.c : "#C4A898" }}>
              <Icon path={step > i ? Icons.check : s.i} size={16} style={{ color: "#fff" }} />
            </div>
            <div>
              <p style={{ fontSize: 14, fontWeight: 800, color: "#1A1208" }}>{s.t}</p>
              <p style={{ fontSize: 12, color: "#5C4A3A", marginTop: 2 }}>{s.d}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ margin: "24px 0", background: "#FFF0E8", border: "1px solid #FFD9C4",
                    borderRadius: 14, padding: 14, textAlign: "center" }}>
        <p style={{ fontSize: 12, color: "#A08878" }}>
          Order ID: <strong style={{ color: "#1A1208" }}>ST-{Date.now().toString().slice(-8)}</strong>
        </p>
      </div>

      {step >= 3 && (
        <button onClick={onContinue}
          style={{ width: "100%", padding: "16px 0", borderRadius: 14, border: "none",
                   fontWeight: 900, fontSize: 15, color: "#fff", background: "#FF6B2B",
                   cursor: "pointer" }}>
          Track My Order →
        </button>
      )}
    </div>
  );
}

// ─── DELIVERY CONFIRM ─────────────────────────────────────────────────────────
function DeliveryConfirm({ item, onConfirm, onDispute }) {
  const [checks, setChecks] = useState([false, false, false]);
  const [rating, setRating] = useState(0);
  const [done,   setDone]   = useState(false);
  const allOk = checks.every(Boolean);

  if (done) return (
    <div style={{ background: "#FFFAF7", minHeight: "100vh", display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center", padding: "0 24px", textAlign: "center" }}>
      <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#DCFCE7",
                    display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
        <Icon path={Icons.checkCircle} size={36} style={{ color: "#059669" }} />
      </div>
      <h2 style={{ fontSize: 24, fontWeight: 900, color: "#1A1208", marginBottom: 6 }}>Payment Released!</h2>
      <p style={{ fontSize: 14, color: "#5C4A3A", marginBottom: 4 }}>Seller has been paid. Thanks for confirming!</p>
      <p style={{ fontSize: 12, color: "#A08878", marginBottom: 32 }}>You rated {rating}/5 ⭐</p>
      <button onClick={onConfirm}
        style={{ padding: "12px 32px", borderRadius: 14, fontWeight: 900, fontSize: 14,
                 color: "#fff", background: "#FF6B2B", border: "none", cursor: "pointer" }}>
        Continue Shopping
      </button>
    </div>
  );

  const checkLabels = [
    "Item received in the described condition",
    "No missing parts or unexpected damage",
    "Photos on listing match what I received",
  ];

  return (
    <div style={{ background: "#FFFAF7", minHeight: "100vh", paddingBottom: 96 }}>
      <div className="sticky top-0 z-10 px-4 pt-12 pb-4"
        style={{ background: "rgba(255,250,247,0.97)", backdropFilter: "blur(12px)",
                 borderBottom: "1px solid #FFD9C4" }}>
        <p style={{ fontSize: 17, fontWeight: 900, color: "#1A1208" }}>Confirm Delivery</p>
        <p style={{ fontSize: 12, color: "#A08878", marginTop: 2 }}>Release payment after checking your item</p>
      </div>

      <div style={{ padding: "16px 16px 0" }}>
        {/* Item */}
        <div className="flex gap-3 mb-5"
          style={{ background: "#FFF0E8", border: "1px solid #FFD9C4", borderRadius: 16, padding: 12 }}>
          <img src={item.image} alt={item.title}
            style={{ width: 76, height: 92, borderRadius: 12, objectFit: "cover", flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#A08878" }}>{item.brand}</p>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#1A1208", marginTop: 2, marginBottom: 6 }}>{item.title}</p>
            <ConditionBadge condition={item.condition} />
            <p style={{ fontSize: 12, fontWeight: 700, color: "#FF6B2B", marginTop: 6 }}>{rupee(item.price)} in escrow</p>
          </div>
        </div>

        {/* Checklist */}
        <p style={{ fontSize: 13, fontWeight: 800, color: "#1A1208", marginBottom: 10 }}>
          Please confirm before releasing:
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
          {checkLabels.map((t, i) => (
            <div key={t} onClick={() => setChecks(c => c.map((v, j) => j === i ? !v : v))}
              style={{
                display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 14px",
                borderRadius: 14, cursor: "pointer", transition: "all 0.15s",
                background: checks[i] ? "#DCFCE7" : "#fff",
                border: `1.5px solid ${checks[i] ? "#059669" : "#FFD9C4"}`,
              }}>
              <div style={{
                width: 20, height: 20, borderRadius: 6, border: `2px solid ${checks[i] ? "#059669" : "#C4A898"}`,
                background: checks[i] ? "#059669" : "#fff", flexShrink: 0, marginTop: 1,
                display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s",
              }}>
                {checks[i] && <Icon path={Icons.check} size={11} style={{ color: "#fff" }} />}
              </div>
              <span style={{ fontSize: 13, fontWeight: 500, color: "#1A1208" }}>{t}</span>
            </div>
          ))}
        </div>

        {/* Rate seller */}
        <div style={{ background: "#fff", border: "1px solid #FFD9C4", borderRadius: 16, padding: 16, marginBottom: 12 }}>
          <p style={{ fontSize: 13, fontWeight: 800, color: "#1A1208", marginBottom: 12 }}>Rate Your Seller</p>
          <SellerRow seller={item.seller} />
          <div style={{ display: "flex", gap: 8, marginTop: 14, justifyContent: "center" }}>
            {[1,2,3,4,5].map(s => (
              <button key={s} onClick={() => setRating(s)}
                style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}>
                <Icon path={Icons.star} size={30}
                  fill={s <= rating ? "#FBBF24" : "none"}
                  style={{ color: s <= rating ? "#FBBF24" : "#D1C4BC" }} />
              </button>
            ))}
          </div>
        </div>

        {/* Dispute */}
        <button onClick={onDispute}
          style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center",
                   gap: 8, padding: "12px 0", borderRadius: 14, border: "1.5px solid #FDE68A",
                   background: "#FEF3C7", fontSize: 13, fontWeight: 700, color: "#D97706",
                   cursor: "pointer" }}>
          <Icon path={Icons.alertTriangle} size={14} style={{ color: "#D97706" }} />
          Item has a problem — Open Dispute
        </button>
      </div>

      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, padding: "16px 16px",
                    background: "rgba(255,250,247,0.97)", backdropFilter: "blur(12px)",
                    borderTop: "1px solid #FFD9C4" }}>
        <button onClick={() => setDone(true)} disabled={!allOk}
          style={{
            width: "100%", padding: "15px 0", borderRadius: 14, border: "none",
            fontWeight: 900, fontSize: 14, color: "#fff", cursor: allOk ? "pointer" : "default",
            background: allOk ? "#059669" : "#C4A898", transition: "background 0.2s",
          }}>
          {allOk ? "✓ Confirm & Release Payment" : "Check all boxes to continue"}
        </button>
        <p style={{ textAlign: "center", fontSize: 11, color: "#A08878", marginTop: 8, fontWeight: 500 }}>
          Seller receives {rupee(item.price)} after confirmation
        </p>
      </div>
    </div>
  );
}

// ─── DISPUTE FLOW ─────────────────────────────────────────────────────────────
function DisputeFlow({ item, onBack, onSubmit }) {
  const [step, setStep]   = useState(0);
  const [reason, setR]    = useState("");
  const [desc, setDesc]   = useState("");
  const [done, setDone]   = useState(false);

  const reasons = [
    "Item condition doesn't match listing",
    "Item not received",
    "Wrong item sent",
    "Item is damaged",
    "Significant undisclosed defects",
  ];

  if (done) return (
    <div style={{ background: "#FFFAF7", minHeight: "100vh", display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center", padding: "0 24px", textAlign: "center" }}>
      <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#FEF3C7",
                    display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
        <Icon path={Icons.alertTriangle} size={32} style={{ color: "#D97706" }} />
      </div>
      <h2 style={{ fontSize: 24, fontWeight: 900, color: "#1A1208", marginBottom: 6 }}>Dispute Filed</h2>
      <p style={{ fontSize: 14, color: "#5C4A3A", marginBottom: 4 }}>Our team reviews within 24 hours.</p>
      <p style={{ fontSize: 12, color: "#A08878", marginBottom: 24 }}>Payment stays in escrow until resolved.</p>
      <div style={{ width: "100%", background: "#FEF3C7", border: "1px solid #FDE68A",
                    borderRadius: 16, padding: 16, textAlign: "left", marginBottom: 24 }}>
        {[["Dispute ID", `DIS-${Date.now().toString().slice(-6)}`],
          ["Reason", reason],
          ["Expected Resolution", "24–48 hours"]].map(([k,v]) => (
          <div key={k} style={{ marginBottom: 10 }}>
            <p style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#A08878" }}>{k}</p>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#1A1208", marginTop: 2 }}>{v}</p>
          </div>
        ))}
      </div>
      <button onClick={onSubmit}
        style={{ padding: "12px 32px", borderRadius: 14, fontWeight: 900, fontSize: 14,
                 color: "#fff", background: "#FF6B2B", border: "none", cursor: "pointer" }}>
        Back to Home
      </button>
    </div>
  );

  return (
    <div style={{ background: "#FFFAF7", minHeight: "100vh", paddingBottom: 96 }}>
      <div className="sticky top-0 z-10 flex items-center gap-3 px-4 pt-12 pb-4"
        style={{ background: "rgba(255,250,247,0.97)", backdropFilter: "blur(12px)",
                 borderBottom: "1px solid #FFD9C4" }}>
        <button onClick={onBack}
          style={{ width: 36, height: 36, borderRadius: "50%", border: "1.5px solid #FFD9C4",
                   background: "#FFF0E8", display: "flex", alignItems: "center",
                   justifyContent: "center", cursor: "pointer" }}>
          <Icon path={Icons.chevronLeft} size={17} style={{ color: "#1A1208" }} />
        </button>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 17, fontWeight: 900, color: "#1A1208" }}>Open Dispute</p>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
            {[0,1].map(i => (
              <div key={i} style={{ height: 4, borderRadius: 9,
                                     width: step >= i ? 28 : 14,
                                     background: step >= i ? "#FF6B2B" : "#FFD9C4",
                                     transition: "all 0.2s" }} />
            ))}
            <span style={{ fontSize: 10, fontWeight: 700, color: "#A08878" }}>Step {step+1}/2</span>
          </div>
        </div>
      </div>

      <div style={{ padding: "16px 16px 0" }}>
        <div className="flex gap-3 mb-5"
          style={{ background: "#FFF0E8", border: "1px solid #FFD9C4", borderRadius: 16, padding: 12 }}>
          <img src={item.image} alt={item.title}
            style={{ width: 56, height: 68, borderRadius: 10, objectFit: "cover", flexShrink: 0 }} />
          <div>
            <p style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#A08878" }}>{item.brand}</p>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#1A1208", marginTop: 2 }}>{item.title}</p>
            <p style={{ fontSize: 12, fontWeight: 700, color: "#FF6B2B", marginTop: 4 }}>{rupee(item.price)} held in escrow</p>
          </div>
        </div>

        {step === 0 && (
          <div>
            <p style={{ fontSize: 13, fontWeight: 800, color: "#1A1208", marginBottom: 10 }}>What's the issue?</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {reasons.map(r => (
                <button key={r} onClick={() => setR(r)}
                  style={{
                    textAlign: "left", padding: "12px 16px", borderRadius: 14, fontSize: 13,
                    fontWeight: 600, cursor: "pointer", transition: "all 0.15s",
                    background: reason === r ? "#FF6B2B" : "#fff",
                    color:      reason === r ? "#fff"    : "#1A1208",
                    border:     `1.5px solid ${reason === r ? "#FF6B2B" : "#FFD9C4"}`,
                  }}>
                  {r}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <p style={{ fontSize: 13, fontWeight: 800, color: "#1A1208", marginBottom: 10 }}>Describe the problem</p>
            <textarea value={desc} onChange={e => setDesc(e.target.value)}
              placeholder="Describe clearly — include measurements, colours, what's different…"
              rows={5}
              style={{ width: "100%", padding: "12px 14px", borderRadius: 14, fontSize: 13,
                       border: `1.5px solid ${desc ? "#FF6B2B" : "#FFD9C4"}`,
                       background: "#fff", color: "#1A1208", fontFamily: "inherit",
                       outline: "none", resize: "none", transition: "border 0.2s" }} />
            <div style={{ background: "#FFF0E8", border: "1px solid #FFD9C4", borderRadius: 14,
                           padding: 14, marginTop: 12 }}>
              <p style={{ fontSize: 12, fontWeight: 800, color: "#1A1208", marginBottom: 8 }}>
                Attach Photos (optional)
              </p>
              <div style={{ display: "flex", gap: 8 }}>
                {[1,2,3].map(i => (
                  <div key={i} style={{ width: 72, height: 72, borderRadius: 12,
                                         border: "2px dashed #FFD9C4",
                                         display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon path={Icons.camera} size={18} style={{ color: "#C4A898" }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, padding: "16px 16px",
                    background: "rgba(255,250,247,0.97)", backdropFilter: "blur(12px)",
                    borderTop: "1px solid #FFD9C4" }}>
        {step === 0 ? (
          <button onClick={() => setStep(1)} disabled={!reason}
            style={{ width: "100%", padding: "15px 0", borderRadius: 14, border: "none",
                     fontWeight: 900, fontSize: 15, color: "#fff", cursor: reason ? "pointer" : "default",
                     background: reason ? "#FF6B2B" : "#C4A898", transition: "background 0.2s" }}>
            Continue →
          </button>
        ) : (
          <button onClick={() => setDone(true)}
            style={{ width: "100%", padding: "15px 0", borderRadius: 14, border: "none",
                     fontWeight: 900, fontSize: 15, color: "#fff", background: "#D97706",
                     cursor: "pointer" }}>
            Submit Dispute
          </button>
        )}
      </div>
    </div>
  );
}

// ─── PROFILE ──────────────────────────────────────────────────────────────────
function Profile({ listings, onProduct }) {
  const saved = listings.filter(l => l.saved);
  return (
    <div style={{ background: "#FFFAF7", minHeight: "100vh", paddingBottom: 96 }}>
      <div style={{ padding: "56px 16px 20px", borderBottom: "1px solid #FFD9C4" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, flexShrink: 0,
                        background: "linear-gradient(135deg, #FF6B2B, #FF9A5C)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 24, fontWeight: 900, color: "#fff" }}>S</div>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 900, color: "#1A1208", marginBottom: 2 }}>Santanu Guha</h2>
            <p style={{ fontSize: 12, color: "#A08878" }}>Kolkata · Member since 2024</p>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 4, marginTop: 6,
                           background: "#DBEAFE", borderRadius: 999, padding: "4px 10px" }}>
              <Icon path={Icons.shield} size={10} style={{ color: "#2563EB" }} />
              <span style={{ fontSize: 10, fontWeight: 800, color: "#2563EB" }}>Verified Buyer</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 16 }}>
          {[["12","Purchases"],[saved.length,"Saved"],["₹0","In Escrow"]].map(([v,l]) => (
            <div key={l} style={{ background: "#FFF0E8", borderRadius: 12, padding: "10px 12px", textAlign: "center" }}>
              <p style={{ fontSize: 18, fontWeight: 900, color: "#FF6B2B" }}>{v}</p>
              <p style={{ fontSize: 10, fontWeight: 600, color: "#A08878", marginTop: 2 }}>{l}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "16px 16px 0" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <p style={{ fontSize: 14, fontWeight: 800, color: "#1A1208" }}>
            Saved Items
            <span style={{ marginLeft: 8, fontSize: 13, fontWeight: 600, color: "#A08878" }}>
              ({saved.length})
            </span>
          </p>
        </div>
        {saved.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px 0" }}>
            <Icon path={Icons.heart} size={36} style={{ color: "#FFD9C4" }} className="mx-auto mb-3" />
            <p style={{ fontSize: 14, fontWeight: 600, color: "#A08878" }}>No saved items yet</p>
            <p style={{ fontSize: 12, color: "#C4A898", marginTop: 4 }}>Tap the ♥ on any listing to save it</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {saved.map(item => (
              <ProductCard key={item.id} item={item}
                onTap={() => onProduct(item)} onSave={() => {}} delay={0} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── BOTTOM NAV ───────────────────────────────────────────────────────────────
function BottomNav({ page, setPage }) {
  const tabs = [
    { id: "home",    icon: Icons.home,   label: "Home"    },
    { id: "search",  icon: Icons.search, label: "Explore" },
    { id: "profile", icon: Icons.user,   label: "Profile" },
  ];
  if (!["home","search","profile"].includes(page)) return null;
  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 30,
      display: "flex", justifyContent: "space-around", alignItems: "center",
      padding: "10px 0 calc(10px + env(safe-area-inset-bottom, 0px))",
      background: "rgba(255,250,247,0.97)", backdropFilter: "blur(16px)",
      borderTop: "1px solid #FFD9C4",
    }}>
      {tabs.map(t => {
        const active = page === t.id;
        return (
          <button key={t.id} onClick={() => setPage(t.id)}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
                     padding: "4px 20px", background: "none", border: "none", cursor: "pointer" }}>
            <Icon path={t.icon} size={21} style={{ color: active ? "#FF6B2B" : "#C4A898" }} />
            <span style={{ fontSize: 10, fontWeight: 700,
                           color: active ? "#FF6B2B" : "#C4A898" }}>
              {t.label}
            </span>
            {active && (
              <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#FF6B2B" }} />
            )}
          </button>
        );
      })}
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [page,    setPage]    = useState("home");
  const [listings, setListings] = useState(LISTINGS);
  const [item,    setItem]    = useState(null);
  const [reserved, setReserved] = useState(false);
  const [total,   setTotal]   = useState(0);

  const goHome = () => { setPage("home"); setItem(null); setReserved(false); };

  return (
    <div style={{ minHeight: "100vh", maxWidth: 390, margin: "0 auto",
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  background: "#FFFAF7", position: "relative", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800;9..40,900&display=swap');
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input, textarea, button, select { font-family: inherit; }
      `}</style>

      {page === "home" && (
        <HomeFeed listings={listings} setListings={setListings}
          onProduct={i => { setItem(i); setPage("product"); }} />
      )}
      {page === "product" && item && (
        <ProductDetail item={item} listings={listings} setListings={setListings}
          onBack={() => setPage("home")}
          onCheckout={i => { setItem(i); setPage("checkout"); }}
          onReserve={() => setReserved(true)} />
      )}
      {page === "checkout" && item && (
        <Checkout item={item} reserved={reserved}
          onBack={() => setPage("product")}
          onPay={t => { setTotal(t); setPage("escrow"); }} />
      )}
      {page === "escrow" && item && (
        <EscrowFlow item={item} total={total}
          onContinue={() => setPage("delivery")} />
      )}
      {page === "delivery" && item && (
        <DeliveryConfirm item={item}
          onConfirm={goHome}
          onDispute={() => setPage("dispute")} />
      )}
      {page === "dispute" && item && (
        <DisputeFlow item={item}
          onBack={() => setPage("delivery")}
          onSubmit={goHome} />
      )}
      {page === "profile" && (
        <Profile listings={listings}
          onProduct={i => { setItem(i); setPage("product"); }} />
      )}
      {page === "search" && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center",
                      justifyContent: "center", paddingTop: 120, paddingLeft: 24, paddingRight: 24,
                      textAlign: "center" }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, background: "#FFF0E8",
                        display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
            <Icon path={Icons.search} size={28} style={{ color: "#FF6B2B" }} />
          </div>
          <p style={{ fontSize: 15, fontWeight: 900, color: "#1A1208", marginBottom: 6 }}>Advanced Search</p>
          <p style={{ fontSize: 13, color: "#A08878", marginBottom: 20 }}>
            Filters, size range & brand search — coming soon
          </p>
          <button onClick={() => setPage("home")}
            style={{ padding: "10px 24px", borderRadius: 14, fontWeight: 800, fontSize: 13,
                     color: "#fff", background: "#FF6B2B", border: "none", cursor: "pointer" }}>
            Browse Feed Instead
          </button>
        </div>
      )}

      <BottomNav page={page} setPage={setPage} />
    </div>
  );
}