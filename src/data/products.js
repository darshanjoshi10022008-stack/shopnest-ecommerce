export const products = [
  {
    id: "prod-1",
    name: "Classic Cotton T-Shirt",
    category: "Men's Fashion",
    categorySlug: "mens-fashion",
    price: 28.00,
    originalPrice: null,
    discount: null,
    rating: 4.8,
    reviewsCount: 124,
    isFeatured: true,
    isTrending: true,
    isBestSeller: true,
    badge: null,
    stock: 45,
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80"
    ],
    description: "A soft, mid-weight organic cotton t-shirt built for everyday wear. Pre-washed to maintain its shape and fit through regular wash cycles.",
    features: [
      "100% Combed organic cotton (180 GSM)",
      "Ribbed collar that holds its structure",
      "Regular fit through chest and body",
      "Machine wash warm with similar colors"
    ],
    specs: {
      "Material": "100% Organic Cotton",
      "Fit": "Regular Fit",
      "Care": "Machine wash cold, tumble dry low",
      "Origin": "Made in Portugal"
    },
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "White", class: "bg-white border border-neutral-300" },
      { name: "Black", class: "bg-neutral-900" },
      { name: "Heather Gray", class: "bg-neutral-400" }
    ]
  },
  {
    id: "prod-2",
    name: "Minimal Leather Sneakers",
    category: "Footwear",
    categorySlug: "footwear",
    price: 120.00,
    originalPrice: 145.00,
    discount: 17,
    rating: 4.9,
    reviewsCount: 218,
    isFeatured: true,
    isTrending: true,
    isBestSeller: true,
    badge: "Sale",
    stock: 18,
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Clean low-top sneakers constructed with durable smooth calfskin leather, cushioned insoles, and sturdy vulcanized rubber outsoles.",
    features: [
      "Full-grain leather upper with padded collar",
      "Removable cushioned memory foam insole",
      "Durable non-slip rubber cupsole",
      "Tonal cotton laces"
    ],
    specs: {
      "Upper": "100% Full-grain leather",
      "Lining": "Breathable soft leather & textile",
      "Sole": "Vulcanized rubber",
      "Origin": "Made in Spain"
    },
    sizes: ["US 8", "US 9", "US 10", "US 11", "US 12"],
    colors: [
      { name: "White / Off-White", class: "bg-neutral-100 border border-neutral-300" },
      { name: "Black / White Sole", class: "bg-neutral-900" }
    ]
  },
  {
    id: "prod-3",
    name: "Everyday Chronograph Watch",
    category: "Accessories",
    categorySlug: "accessories",
    price: 165.00,
    originalPrice: null,
    discount: null,
    rating: 4.7,
    reviewsCount: 89,
    isFeatured: true,
    isTrending: false,
    isBestSeller: true,
    badge: null,
    stock: 22,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80"
    ],
    description: "A clean 40mm stainless steel chronograph featuring a matte black dial, Japanese quartz movement, and interchangeable leather strap.",
    features: [
      "Japanese 3-subdial quartz movement",
      "Scratch-resistant mineral crystal glass",
      "5 ATM water resistance (splash and rain resistant)",
      "Genuine quick-release leather band"
    ],
    specs: {
      "Case Size": "40mm diameter, 9mm thickness",
      "Strap Width": "20mm",
      "Water Resistance": "50m (5 ATM)",
      "Warranty": "2-year manufacturer warranty"
    },
    sizes: ["40mm"],
    colors: [
      { name: "Silver & Black Leather", class: "bg-neutral-800" },
      { name: "Gold & Tan Leather", class: "bg-amber-700" }
    ]
  },
  {
    id: "prod-4",
    name: "Wireless Noise Cancelling Headphones",
    category: "Electronics",
    categorySlug: "electronics",
    price: 199.00,
    originalPrice: 249.00,
    discount: 20,
    rating: 4.8,
    reviewsCount: 310,
    isFeatured: true,
    isTrending: true,
    isBestSeller: true,
    badge: "Sale",
    stock: 14,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Over-ear headphones with active noise cancellation, balanced sound profile, 35-hour battery life, and comfortable memory foam earcups.",
    features: [
      "Active Noise Cancellation (ANC) with ambient mode",
      "35 hours playtime on single USB-C charge",
      "40mm balanced acoustic dynamic drivers",
      "Foldable design with travel pouch included"
    ],
    specs: {
      "Connectivity": "Bluetooth 5.2 / 3.5mm cable",
      "Battery Life": "35 hours (ANC on), 45 hours (ANC off)",
      "Weight": "240g",
      "Charging Time": "2 hours via USB-C"
    },
    sizes: ["Standard"],
    colors: [
      { name: "Matte Black", class: "bg-neutral-900" },
      { name: "Silver Gray", class: "bg-neutral-300" }
    ]
  },
  {
    id: "prod-5",
    name: "Leather Crossbody Bag",
    category: "Accessories",
    categorySlug: "accessories",
    price: 85.00,
    originalPrice: null,
    discount: null,
    rating: 4.9,
    reviewsCount: 76,
    isFeatured: true,
    isTrending: true,
    isBestSeller: false,
    badge: null,
    stock: 15,
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80"
    ],
    description: "A compact structured crossbody bag crafted in smooth leather. Features an adjustable shoulder strap and interior zip pocket for daily essentials.",
    features: [
      "Genuine smooth leather with fabric lining",
      "Adjustable strap with metal pin buckle",
      "Secure top zipper and internal slip pocket",
      "Compact size fits phone, wallet, keys, and lip balm"
    ],
    specs: {
      "Dimensions": "21cm x 15cm x 6cm",
      "Strap Drop": "48cm – 56cm",
      "Material": "100% Genuine Leather"
    },
    sizes: ["One Size"],
    colors: [
      { name: "Cognac Brown", class: "bg-amber-800" },
      { name: "Classic Black", class: "bg-neutral-900" }
    ]
  },
  {
    id: "prod-6",
    name: "Oversized Casual Hoodie",
    category: "Men's Fashion",
    categorySlug: "mens-fashion",
    price: 64.00,
    originalPrice: 80.00,
    discount: 20,
    rating: 4.7,
    reviewsCount: 165,
    isFeatured: true,
    isTrending: true,
    isBestSeller: true,
    badge: "Popular",
    stock: 28,
    images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Relaxed-fit heavyweight fleece hoodie with a double-layer hood, front pouch pocket, and ribbed cuffs. Soft brushed interior for warmth.",
    features: [
      "Heavyweight 380 GSM cotton-poly fleece",
      "Double-layered hood with clean neckline",
      "Kangaroo front pouch pocket",
      "Relaxed drop-shoulder silhouette"
    ],
    specs: {
      "Composition": "80% Cotton, 20% Polyester",
      "Fit": "Oversized / Relaxed",
      "Care": "Machine wash cold, tumble dry low"
    },
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Heather Gray", class: "bg-neutral-300" },
      { name: "Washed Black", class: "bg-neutral-800" },
      { name: "Olive", class: "bg-stone-600" }
    ]
  },
  {
    id: "prod-7",
    name: "Slim Fit Denim Jacket",
    category: "Men's Fashion",
    categorySlug: "mens-fashion",
    price: 95.00,
    originalPrice: null,
    discount: null,
    rating: 4.8,
    reviewsCount: 92,
    isFeatured: true,
    isTrending: false,
    isBestSeller: false,
    badge: null,
    stock: 20,
    images: [
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Classic trucker denim jacket made from 12.5 oz non-stretch durable cotton denim with buttoned chest pockets and adjustable waist tabs.",
    features: [
      "12.5 oz 100% durable cotton denim",
      "Dual button-flap chest pockets and side welt pockets",
      "Antique brass shank buttons",
      "Reinforced flat-felled seam construction"
    ],
    specs: {
      "Material": "100% Cotton",
      "Fit": "Classic Slim Fit",
      "Care": "Machine wash cold inside out"
    },
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Washed Medium Blue", class: "bg-blue-600" },
      { name: "Raw Indigo", class: "bg-blue-950" }
    ]
  },
  {
    id: "prod-8",
    name: "Everyday Running Shoes",
    category: "Footwear",
    categorySlug: "footwear",
    price: 110.00,
    originalPrice: 130.00,
    discount: 15,
    rating: 4.6,
    reviewsCount: 140,
    isFeatured: true,
    isTrending: true,
    isBestSeller: true,
    badge: null,
    stock: 30,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Lightweight cushioned runners with breathable engineered mesh uppers and responsive foam midsoles for daily training and walking.",
    features: [
      "Engineered breathable mesh upper",
      "Shock-absorbing EVA foam midsole",
      "Segmented rubber outsole for flexible grip",
      "Padded collar and tongue for ankle comfort"
    ],
    specs: {
      "Weight": "270g (Men's US 9)",
      "Heel Drop": "10mm",
      "Surface": "Road / Everyday Walk"
    },
    sizes: ["US 8", "US 9", "US 10", "US 11", "US 12"],
    colors: [
      { name: "Red / White", class: "bg-red-600" },
      { name: "All Black", class: "bg-neutral-900" }
    ]
  },
  {
    id: "prod-9",
    name: "Linen Blend Summer Dress",
    category: "Women's Fashion",
    categorySlug: "womens-fashion",
    price: 75.00,
    originalPrice: null,
    discount: null,
    rating: 4.8,
    reviewsCount: 88,
    isFeatured: false,
    isTrending: true,
    isBestSeller: true,
    badge: null,
    stock: 16,
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80"
    ],
    description: "A breathable, lightweight midi dress cut in a linen-viscose blend with an A-line skirt, side pockets, and gentle square neckline.",
    features: [
      "55% Linen, 45% Viscose blend for soft drape",
      "Functional deep side seam pockets",
      "Concealed back zip closure",
      "Breathable and naturally temperature-regulating"
    ],
    specs: {
      "Length": "Midi (115cm)",
      "Fit": "Regular A-line",
      "Care": "Gentle machine wash cold, line dry"
    },
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Natural Beige", class: "bg-amber-100" },
      { name: "Navy Blue", class: "bg-blue-950" }
    ]
  },
  {
    id: "prod-10",
    name: "Polarized Classic Sunglasses",
    category: "Accessories",
    categorySlug: "accessories",
    price: 45.00,
    originalPrice: null,
    discount: null,
    rating: 4.7,
    reviewsCount: 95,
    isFeatured: false,
    isTrending: true,
    isBestSeller: false,
    badge: null,
    stock: 25,
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Timeless wayfarer frame sunglasses with polarized UV400 lenses that cut glare and protect eyes in full sunlight.",
    features: [
      "UV400 100% UVA/UVB polarized protection",
      "Lightweight matte cellulose acetate frame",
      "Durable 5-barrel metal hinges",
      "Includes microfiber pouch and cleaning cloth"
    ],
    specs: {
      "Lens Width": "52mm",
      "Bridge": "20mm",
      "Temple Length": "145mm"
    },
    sizes: ["One Size"],
    colors: [
      { name: "Matte Black", class: "bg-neutral-900" },
      { name: "Tortoise Shell", class: "bg-amber-800" }
    ]
  },
  {
    id: "prod-11",
    name: "Hydrating Daily Facial Cleanser",
    category: "Beauty",
    categorySlug: "beauty",
    price: 22.00,
    originalPrice: null,
    discount: null,
    rating: 4.9,
    reviewsCount: 204,
    isFeatured: false,
    isTrending: true,
    isBestSeller: true,
    badge: null,
    stock: 50,
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80"
    ],
    description: "A gentle gel-to-foam daily cleanser formulated with ceramides, hyaluronic acid, and green tea extract. Cleans without stripping the skin's moisture barrier.",
    features: [
      "Dermatologist tested and fragrance-free",
      "Non-comedogenic and pH-balanced (5.5)",
      "Removes light makeup and daily impurities",
      "Suitable for dry, normal, and sensitive skin"
    ],
    specs: {
      "Volume": "200ml / 6.7 fl oz",
      "Skin Type": "All skin types",
      "Formula": "Sulfate-free gel"
    },
    sizes: ["200ml"],
    colors: [
      { name: "Standard", class: "bg-neutral-200" }
    ]
  },
  {
    id: "prod-12",
    name: "Minimalist Canvas Backpack",
    category: "Accessories",
    categorySlug: "accessories",
    price: 58.00,
    originalPrice: 72.00,
    discount: 19,
    rating: 4.8,
    reviewsCount: 112,
    isFeatured: false,
    isTrending: true,
    isBestSeller: false,
    badge: "Sale",
    stock: 19,
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Water-resistant cotton canvas daypack with a padded 15-inch laptop sleeve, front organizer pocket, and reinforced base.",
    features: [
      "Durable 16 oz coated cotton canvas",
      "Padded compartment fits up to 15.6\" laptop",
      "Padded mesh shoulder straps for airflow",
      "YKK metal zippers"
    ],
    specs: {
      "Capacity": "20 Liters",
      "Dimensions": "42cm x 29cm x 13cm",
      "Weight": "650g"
    },
    sizes: ["20L"],
    colors: [
      { name: "Charcoal Gray", class: "bg-neutral-700" },
      { name: "Khaki Tan", class: "bg-stone-400" }
    ]
  }
];
