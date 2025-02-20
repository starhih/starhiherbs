export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  scientificName?: string;
  standardization?: string;
  description: string;
  benefits: string[];
  applications: string[];
  specifications: {
    form?: string;
    appearance?: string;
    standardization?: string;
    packaging?: string;
    shelfLife?: string;
    storage?: string;
  };
  certifications: string[];
  documents?: {
    title: string;
    type: string;
    size: string;
  }[];
}

export const PRODUCT_CATEGORIES = {
  STANDARDIZED: "Standardized Herbal Extract",
  ORGANIC: "Organic Herbal Extract",
  BRANDED: "Branded Ingredients",
  PROBIOTICS: "Probiotics"
} as const;

export const products: Product[] = [
  // Standardized Herbal Extracts
  {
    id: "amla-extract",
    name: "Amla Extract",
    category: PRODUCT_CATEGORIES.STANDARDIZED,
    scientificName: "Emblica officinalis",
    standardization: "40% Tannins",
    description: "Premium quality Amla extract standardized for tannins content, known for its powerful antioxidant properties.",
    benefits: [
      "Rich in Vitamin C",
      "Powerful antioxidant properties",
      "Supports immune system health",
      "Promotes healthy digestion"
    ],
    applications: [
      "Dietary supplements",
      "Functional foods",
      "Nutraceutical formulations",
      "Herbal products"
    ],
    specifications: {
      form: "Fine powder",
      appearance: "Light brown to brown powder",
      standardization: "40% Tannins by UV",
      packaging: "25kg drums with double food-grade liner",
      shelfLife: "24 months when stored properly",
      storage: "Store in a cool, dry place away from direct sunlight"
    },
    certifications: ["Kosher", "Halal", "GMP"]
  },
  {
    id: "andrographis-extract",
    name: "Andrographis Extract",
    category: PRODUCT_CATEGORIES.STANDARDIZED,
    scientificName: "Andrographis paniculata",
    standardization: "10% Andrographolides",
    description: "High-quality Andrographis extract standardized for andrographolides content, known for immune system support.",
    benefits: [
      "Supports immune system function",
      "Promotes respiratory health",
      "Natural bitter properties",
      "Traditional Ayurvedic herb"
    ],
    applications: [
      "Immune support supplements",
      "Respiratory health products",
      "Traditional medicine formulations",
      "Seasonal wellness products"
    ],
    specifications: {
      form: "Fine powder",
      appearance: "Light green to green powder",
      standardization: "10% Andrographolides by HPLC",
      packaging: "25kg drums with double food-grade liner",
      shelfLife: "24 months when stored properly",
      storage: "Store in a cool, dry place away from direct sunlight"
    },
    certifications: ["Kosher", "Halal", "GMP"]
  },
  {
    id: "ashwagandha-extract",
    name: "Ashwagandha Extract",
    category: PRODUCT_CATEGORIES.STANDARDIZED,
    scientificName: "Withania somnifera",
    standardization: "5% Withanolides",
    description: "Premium Ashwagandha root extract standardized to 5% withanolides, supporting stress management and overall wellness.",
    benefits: [
      "Supports stress management",
      "Promotes restful sleep",
      "Enhances mental clarity",
      "Supports physical performance"
    ],
    applications: [
      "Adaptogenic formulations",
      "Sleep support products",
      "Sports nutrition",
      "Stress management supplements"
    ],
    specifications: {
      form: "Fine powder",
      appearance: "Light brown powder",
      standardization: "5% Withanolides by HPLC",
      packaging: "25kg drums with double food-grade liner",
      shelfLife: "24 months when stored properly",
      storage: "Store in a cool, dry place away from direct sunlight"
    },
    certifications: ["Kosher", "Halal", "GMP"]
  },
  {
    id: "bacopa-extract",
    name: "Bacopa monnieri Extract",
    category: PRODUCT_CATEGORIES.STANDARDIZED,
    scientificName: "Bacopa monnieri",
    standardization: "20% Bacosides",
    description: "High-quality Bacopa extract standardized for bacosides, supporting cognitive function and memory.",
    benefits: [
      "Supports cognitive function",
      "Enhances memory",
      "Promotes mental clarity",
      "Traditional brain tonic"
    ],
    applications: [
      "Cognitive health supplements",
      "Memory support products",
      "Focus enhancement formulas",
      "Nootropic blends"
    ],
    specifications: {
      form: "Fine powder",
      appearance: "Brown powder",
      standardization: "20% Bacosides by UV",
      packaging: "25kg drums with double food-grade liner",
      shelfLife: "24 months when stored properly",
      storage: "Store in a cool, dry place away from direct sunlight"
    },
    certifications: ["Kosher", "Halal", "GMP"]
  },
  {
    id: "black-pepper-extract",
    name: "Black Pepper Extract",
    category: PRODUCT_CATEGORIES.STANDARDIZED,
    scientificName: "Piper nigrum",
    standardization: "95% Piperine",
    description: "Highly concentrated Black Pepper extract standardized to 95% piperine, known for enhancing nutrient absorption.",
    benefits: [
      "Enhances nutrient absorption",
      "Supports digestive function",
      "Thermogenic properties",
      "Natural bioavailability enhancer"
    ],
    applications: [
      "Bioavailability enhancement",
      "Thermogenic formulations",
      "Digestive health products",
      "Sports nutrition"
    ],
    specifications: {
      form: "Fine powder",
      appearance: "Off-white to light brown powder",
      standardization: "95% Piperine by HPLC",
      packaging: "25kg drums with double food-grade liner",
      shelfLife: "24 months when stored properly",
      storage: "Store in a cool, dry place away from direct sunlight"
    },
    certifications: ["Kosher", "Halal", "GMP"]
  },
  {
    id: "boswellia-extract",
    name: "Boswellia serrata Extract",
    category: PRODUCT_CATEGORIES.STANDARDIZED,
    scientificName: "Boswellia serrata",
    standardization: "65% Boswellic Acids",
    description: "Premium Boswellia extract standardized for boswellic acids, supporting joint health and mobility.",
    benefits: [
      "Supports joint health",
      "Promotes mobility",
      "Anti-inflammatory properties",
      "Traditional Ayurvedic herb"
    ],
    applications: [
      "Joint health supplements",
      "Sports nutrition",
      "Mobility support products",
      "Anti-inflammatory formulations"
    ],
    specifications: {
      form: "Fine powder",
      appearance: "Off-white to cream powder",
      standardization: "65% Boswellic Acids by HPLC",
      packaging: "25kg drums with double food-grade liner",
      shelfLife: "24 months when stored properly",
      storage: "Store in a cool, dry place away from direct sunlight"
    },
    certifications: ["Kosher", "Halal", "GMP"]
  },
  {
    id: "capsicum-extract",
    name: "Capsicum Annum Extract",
    category: PRODUCT_CATEGORIES.STANDARDIZED,
    scientificName: "Capsicum annum",
    standardization: "2% Capsaicin",
    description: "Standardized Capsicum extract rich in capsaicin, supporting thermogenic and metabolic functions.",
    benefits: [
      "Thermogenic properties",
      "Supports metabolism",
      "Promotes circulation",
      "Natural energizer"
    ],
    applications: [
      "Weight management formulas",
      "Sports nutrition",
      "Thermogenic supplements",
      "Energy products"
    ],
    specifications: {
      form: "Fine powder",
      appearance: "Red to dark red powder",
      standardization: "2% Capsaicin by HPLC",
      packaging: "25kg drums with double food-grade liner",
      shelfLife: "24 months when stored properly",
      storage: "Store in a cool, dry place away from direct sunlight"
    },
    certifications: ["Kosher", "Halal", "GMP"]
  },
  {
    id: "cissus-extract",
    name: "Cissus Extract",
    category: PRODUCT_CATEGORIES.STANDARDIZED,
    scientificName: "Cissus quadrangularis",
    standardization: "20% Ketosteroids",
    description: "Premium Cissus extract standardized for ketosteroids, supporting bone and joint health.",
    benefits: [
      "Supports bone health",
      "Promotes joint comfort",
      "Aids in recovery",
      "Traditional healing herb"
    ],
    applications: [
      "Joint health supplements",
      "Sports nutrition",
      "Recovery formulas",
      "Bone health products"
    ],
    specifications: {
      form: "Fine powder",
      appearance: "Light brown powder",
      standardization: "20% Ketosteroids by UV",
      packaging: "25kg drums with double food-grade liner",
      shelfLife: "24 months when stored properly",
      storage: "Store in a cool, dry place away from direct sunlight"
    },
    certifications: ["Kosher", "Halal", "GMP"]
  },
  {
    id: "coffee-bean-extract",
    name: "Coffee Bean Extract",
    category: PRODUCT_CATEGORIES.STANDARDIZED,
    scientificName: "Coffea arabica",
    standardization: "50% Chlorogenic Acid",
    description: "High-quality Green Coffee Bean extract standardized for chlorogenic acid content.",
    benefits: [
      "Supports weight management",
      "Antioxidant properties",
      "Promotes energy",
      "Metabolic support"
    ],
    applications: [
      "Weight management supplements",
      "Energy formulations",
      "Antioxidant blends",
      "Sports nutrition"
    ],
    specifications: {
      form: "Fine powder",
      appearance: "Light green to brown powder",
      standardization: "50% Chlorogenic Acid by HPLC",
      packaging: "25kg drums with double food-grade liner",
      shelfLife: "24 months when stored properly",
      storage: "Store in a cool, dry place away from direct sunlight"
    },
    certifications: ["Kosher", "Halal", "GMP"]
  },
  {
    id: "coleus-extract",
    name: "Coleus Forskohlii Extract",
    category: PRODUCT_CATEGORIES.STANDARDIZED,
    scientificName: "Coleus forskohlii",
    standardization: "10% Forskolin",
    description: "Premium Coleus forskohlii root extract standardized for forskolin content.",
    benefits: [
      "Supports metabolism",
      "Promotes lean body mass",
      "Aids in weight management",
      "Traditional Ayurvedic herb"
    ],
    applications: [
      "Weight management formulas",
      "Sports nutrition",
      "Metabolic support products",
      "Fitness supplements"
    ],
    specifications: {
      form: "Fine powder",
      appearance: "Light brown powder",
      standardization: "10% Forskolin by HPLC",
      packaging: "25kg drums with double food-grade liner",
      shelfLife: "24 months when stored properly",
      storage: "Store in a cool, dry place away from direct sunlight"
    },
    certifications: ["Kosher", "Halal", "GMP"]
  },
  {
    id: "commiphora-extract",
    name: "Commiphora Mukul Extract",
    category: PRODUCT_CATEGORIES.STANDARDIZED,
    scientificName: "Commiphora mukul",
    standardization: "2.5% Guggulsterones",
    description: "High-quality Guggul extract standardized for guggulsterones, supporting healthy lipid metabolism.",
    benefits: [
      "Supports lipid metabolism",
      "Promotes joint health",
      "Aids in weight management",
      "Traditional Ayurvedic herb"
    ],
    applications: [
      "Lipid health formulations",
      "Joint support products",
      "Weight management supplements",
      "Ayurvedic formulas"
    ],
    specifications: {
      form: "Fine powder",
      appearance: "Brown powder",
      standardization: "2.5% Guggulsterones by HPLC",
      packaging: "25kg drums with double food-grade liner",
      shelfLife: "24 months when stored properly",
      storage: "Store in a cool, dry place away from direct sunlight"
    },
    certifications: ["Kosher", "Halal", "GMP"]
  },
  {
    id: "curcumin-extract",
    name: "Curcumin Extract",
    category: PRODUCT_CATEGORIES.STANDARDIZED,
    scientificName: "Curcuma longa",
    standardization: "95% Curcuminoids",
    description: "High-potency Curcumin extract standardized for curcuminoids content, supporting joint health and inflammation response.",
    benefits: [
      "Supports joint health",
      "Anti-inflammatory properties",
      "Powerful antioxidant",
      "Promotes overall wellness"
    ],
    applications: [
      "Joint health supplements",
      "Anti-inflammatory formulas",
      "Sports nutrition",
      "Wellness products"
    ],
    specifications: {
      form: "Fine powder",
      appearance: "Yellow-orange powder",
      standardization: "95% Curcuminoids by HPLC",
      packaging: "25kg drums with double food-grade liner",
      shelfLife: "24 months when stored properly",
      storage: "Store in a cool, dry place away from direct sunlight"
    },
    certifications: ["Kosher", "Halal", "GMP"]
  },
  {
    id: "garcinia-extract",
    name: "Garcinia Cambogia Extract",
    category: PRODUCT_CATEGORIES.STANDARDIZED,
    scientificName: "Garcinia cambogia",
    standardization: "60% HCA",
    description: "Premium Garcinia cambogia extract standardized for Hydroxycitric Acid (HCA), supporting weight management.",
    benefits: [
      "Supports weight management",
      "Helps reduce appetite",
      "Promotes healthy metabolism",
      "Supports fat metabolism"
    ],
    applications: [
      "Weight management supplements",
      "Appetite control formulas",
      "Metabolic support products",
      "Fitness supplements"
    ],
    specifications: {
      form: "Fine powder",
      appearance: "White to off-white powder",
      standardization: "60% HCA by UV",
      packaging: "25kg drums with double food-grade liner",
      shelfLife: "24 months when stored properly",
      storage: "Store in a cool, dry place away from direct sunlight"
    },
    certifications: ["Kosher", "Halal", "GMP"]
  },
  {
    id: "ginger-extract",
    name: "Ginger Extract",
    category: PRODUCT_CATEGORIES.STANDARDIZED,
    scientificName: "Zingiber officinale",
    standardization: "5% Gingerols",
    description: "High-quality Ginger extract standardized for gingerols content, supporting digestive health and inflammation response.",
    benefits: [
      "Supports digestive health",
      "Anti-inflammatory properties",
      "Promotes joint comfort",
      "Natural warming effect"
    ],
    applications: [
      "Digestive health products",
      "Joint support formulas",
      "Sports nutrition",
      "Wellness supplements"
    ],
    specifications: {
      form: "Fine powder",
      appearance: "Light brown powder",
      standardization: "5% Gingerols by HPLC",
      packaging: "25kg drums with double food-grade liner",
      shelfLife: "24 months when stored properly",
      storage: "Store in a cool, dry place away from direct sunlight"
    },
    certifications: ["Kosher", "Halal", "GMP"]
  },
  {
    id: "green-tea-extract",
    name: "Green Tea Extract",
    category: PRODUCT_CATEGORIES.STANDARDIZED,
    scientificName: "Camellia sinensis",
    standardization: "98% Polyphenols, 80% Catechins, 50% EGCG",
    description: "Premium Green Tea extract standardized for polyphenols, catechins, and EGCG content.",
    benefits: [
      "Powerful antioxidant",
      "Supports metabolism",
      "Promotes energy",
      "Cognitive support"
    ],
    applications: [
      "Weight management formulas",
      "Energy supplements",
      "Antioxidant blends",
      "Sports nutrition"
    ],
    specifications: {
      form: "Fine powder",
      appearance: "Light brown to brown powder",
      standardization: "98% Polyphenols, 80% Catechins, 50% EGCG by HPLC",
      packaging: "25kg drums with double food-grade liner",
      shelfLife: "24 months when stored properly",
      storage: "Store in a cool, dry place away from direct sunlight"
    },
    certifications: ["Kosher", "Halal", "GMP"]
  },
  {
    id: "gymnema-extract",
    name: "Gymnema Sylvestre Extract",
    category: PRODUCT_CATEGORIES.STANDARDIZED,
    scientificName: "Gymnema sylvestre",
    standardization: "75% Gymnemic Acids",
    description: "High-quality Gymnema extract standardized for gymnemic acids, supporting healthy blood sugar levels.",
    benefits: [
      "Supports blood sugar balance",
      "Reduces sugar cravings",
      "Promotes metabolic health",
      "Traditional Ayurvedic herb"
    ],
    applications: [
      "Blood sugar support formulas",
      "Weight management products",
      "Metabolic health supplements",
      "Diabetes support products"
    ],
    specifications: {
      form: "Fine powder",
      appearance: "Light brown powder",
      standardization: "75% Gymnemic Acids by HPLC",
      packaging: "25kg drums with double food-grade liner",
      shelfLife: "24 months when stored properly",
      storage: "Store in a cool, dry place away from direct sunlight"
    },
    certifications: ["Kosher", "Halal", "GMP"]
  },
  {
    id: "holy-basil-extract",
    name: "Holy Basil Extract",
    category: PRODUCT_CATEGORIES.STANDARDIZED,
    scientificName: "Ocimum sanctum",
    standardization: "2.5% Ursolic Acid",
    description: "Premium Holy Basil (Tulsi) extract standardized for ursolic acid content, supporting stress management and immune health.",
    benefits: [
      "Adaptogenic properties",
      "Supports immune health",
      "Promotes stress relief",
      "Traditional Ayurvedic herb"
    ],
    applications: [
      "Adaptogenic formulas",
      "Immune support products",
      "Stress management supplements",
      "Wellness blends"
    ],
    specifications: {
      form: "Fine powder",
      appearance: "Green to brown powder",
      standardization: "2.5% Ursolic Acid by HPLC",
      packaging: "25kg drums with double food-grade liner",
      shelfLife: "24 months when stored properly",
      storage: "Store in a cool, dry place away from direct sunlight"
    },
    certifications: ["Kosher", "Halal", "GMP"]
  },
  {
    id: "milk-thistle-extract",
    name: "Milk Thistle Extract",
    category: PRODUCT_CATEGORIES.STANDARDIZED,
    scientificName: "Silybum marianum",
    standardization: "80% Silymarin",
    description: "High-quality Milk Thistle extract standardized for silymarin content, supporting liver health.",
    benefits: [
      "Supports liver health",
      "Antioxidant properties",
      "Promotes detoxification",
      "Hepatoprotective effects"
    ],
    applications: [
      "Liver support formulas",
      "Detox supplements",
      "Antioxidant blends",
      "Wellness products"
    ],
    specifications: {
      form: "Fine powder",
      appearance: "Light brown powder",
      standardization: "80% Silymarin by HPLC",
      packaging: "25kg drums with double food-grade liner",
      shelfLife: "24 months when stored properly",
      storage: "Store in a cool, dry place away from direct sunlight"
    },
    certifications: ["Kosher", "Halal", "GMP"]
  },
  {
    id: "rhodiola-extract",
    name: "Rhodiola Extract",
    category: PRODUCT_CATEGORIES.STANDARDIZED,
    scientificName: "Rhodiola rosea",
    standardization: "3% Rosavins, 1% Salidroside",
    description: "Premium Rhodiola root extract standardized for rosavins and salidroside content, supporting stress management and energy.",
    benefits: [
      "Adaptogenic properties",
      "Supports energy levels",
      "Promotes mental clarity",
      "Stress management"
    ],
    applications: [
      "Adaptogenic formulas",
      "Energy supplements",
      "Sports nutrition",
      "Cognitive support products"
    ],
    specifications: {
      form: "Fine powder",
      appearance: "Light yellow to brown powder",
      standardization: "3% Rosavins, 1% Salidroside by HPLC",
      packaging: "25kg drums with double food-grade liner",
      shelfLife: "24 months when stored properly",
      storage: "Store in a cool, dry place away from direct sunlight"
    },
    certifications: ["Kosher", "Halal", "GMP"]
  },
  {
    id: "tongkat-ali-extract",
    name: "Tongkat Ali Extract",
    category: PRODUCT_CATEGORIES.STANDARDIZED,
    scientificName: "Eurycoma longifolia",
    standardization: "2% Eurycomanone",
    description: "High-quality Tongkat Ali root extract standardized for eurycomanone content, supporting male vitality and sports performance.",
    benefits: [
      "Supports testosterone levels",
      "Promotes sports performance",
      "Enhances vitality",
      "Adaptogenic properties"
    ],
    applications: [
      "Sports nutrition",
      "Male health supplements",
      "Performance products",
      "Vitality formulas"
    ],
    specifications: {
      form: "Fine powder",
      appearance: "Light brown powder",
      standardization: "2% Eurycomanone by HPLC",
      packaging: "25kg drums with double food-grade liner",
      shelfLife: "24 months when stored properly",
      storage: "Store in a cool, dry place away from direct sunlight"
    },
    certifications: ["Kosher", "Halal", "GMP"]
  },
  {
    id: "turmeric-extract",
    name: "Turmeric Extract",
    category: PRODUCT_CATEGORIES.STANDARDIZED,
    scientificName: "Curcuma longa",
    standardization: "95% Curcuminoids",
    description: "Premium Turmeric extract standardized for curcuminoids content, supporting joint health and inflammation response.",
    benefits: [
      "Anti-inflammatory properties",
      "Supports joint health",
      "Antioxidant effects",
      "Promotes overall wellness"
    ],
    applications: [
      "Joint health formulas",
      "Anti-inflammatory products",
      "Sports nutrition",
      "Wellness supplements"
    ],
    specifications: {
      form: "Fine powder",
      appearance: "Yellow-orange powder",
      standardization: "95% Curcuminoids by HPLC",
      packaging: "25kg drums with double food-grade liner",
      shelfLife: "24 months when stored properly",
      storage: "Store in a cool, dry place away from direct sunlight"
    },
    certifications: ["Kosher", "Halal", "GMP"]
  },

  // Organic Herbal Extracts
  {
    id: "organic-amla-extract",
    name: "Organic Amla Extract",
    category: PRODUCT_CATEGORIES.ORGANIC,
    scientificName: "Emblica officinalis",
    description: "Certified organic Amla extract produced from sustainably sourced organic fruits.",
    benefits: [
      "100% Organic certified",
      "Natural Vitamin C content",
      "Sustainable sourcing",
      "Clean label ingredient"
    ],
    applications: [
      "Organic supplements",
      "Natural health products",
      "Clean label formulations",
      "Organic food products"
    ],
    specifications: {
      form: "Fine powder",
      appearance: "Light brown powder",
      packaging: "25kg drums with double food-grade liner",
      shelfLife: "24 months when stored properly",
      storage: "Store in a cool, dry place away from direct sunlight"
    },
    certifications: ["Organic", "Kosher", "GMP"]
  },
  {
    id: "organic-ashwagandha-extract",
    name: "Organic Ashwagandha Extract",
    category: PRODUCT_CATEGORIES.ORGANIC,
    scientificName: "Withania somnifera",
    description: "Certified organic Ashwagandha root extract, traditionally used for stress management and overall wellness.",
    benefits: [
      "100% Organic certified",
      "Adaptogenic properties",
      "Sustainable sourcing",
      "Traditional Ayurvedic herb"
    ],
    applications: [
      "Organic supplements",
      "Stress management products",
      "Sleep support formulas",
      "Adaptogenic blends"
    ],
    specifications: {
      form: "Fine powder",
      appearance: "Light brown powder",
      packaging: "25kg drums with double food-grade liner",
      shelfLife: "24 months when stored properly",
      storage: "Store in a cool, dry place away from direct sunlight"
    },
    certifications: ["Organic", "Kosher", "GMP"]
  },
  {
    id: "organic-turmeric-extract",
    name: "Organic Turmeric Extract",
    category: PRODUCT_CATEGORIES.ORGANIC,
    scientificName: "Curcuma longa",
    description: "Certified organic Turmeric extract, traditionally used for its anti-inflammatory and antioxidant properties.",
    benefits: [
      "100% Organic certified",
      "Natural curcuminoids",
      "Sustainable sourcing",
      "Traditional Ayurvedic herb"
    ],
    applications: [
      "Organic supplements",
      "Natural health products",
      "Joint health formulas",
      "Wellness blends"
    ],
    specifications: {
      form: "Fine powder",
      appearance: "Yellow-orange powder",
      packaging: "25kg drums with double food-grade liner",
      shelfLife: "24 months when stored properly",
      storage: "Store in a cool, dry place away from direct sunlight"
    },
    certifications: ["Organic", "Kosher", "GMP"]
  },
  {
    id: "organic-holy-basil-extract",
    name: "Organic Holy Basil Extract",
    category: PRODUCT_CATEGORIES.ORGANIC,
    scientificName: "Ocimum sanctum",
    description: "Certified organic Holy Basil (Tulsi) extract, traditionally used for stress management and immune support.",
    benefits: [
      "100% Organic certified",
      "Adaptogenic properties",
      "Sustainable sourcing",
      "Traditional Ayurvedic herb"
    ],
    applications: [
      "Organic supplements",
      "Stress management products",
      "Immune support formulas",
      "Adaptogenic blends"
    ],
    specifications: {
      form: "Fine powder",
      appearance: "Green to brown powder",
      packaging: "25kg drums with double food-grade liner",
      shelfLife: "24 months when stored properly",
      storage: "Store in a cool, dry place away from direct sunlight"
    },
    certifications: ["Organic", "Kosher", "GMP"]
  },
  {
    id: "organic-moringa-extract",
    name: "Organic Moringa Extract",
    category: PRODUCT_CATEGORIES.ORGANIC,
    scientificName: "Moringa oleifera",
    description: "Certified organic Moringa leaf extract, known for its rich nutritional profile and antioxidant properties.",
    benefits: [
      "100% Organic certified",
      "Rich in nutrients",
      "Sustainable sourcing",
      "Natural superfood"
    ],
    applications: [
      "Organic supplements",
      "Superfood products",
      "Nutritional blends",
      "Green food formulas"
    ],
    specifications: {
      form: "Fine powder",
      appearance: "Green powder",
      packaging: "25kg drums with double food-grade liner",
      shelfLife: "24 months when stored properly",
      storage: "Store in a cool, dry place away from direct sunlight"
    },
    certifications: ["Organic", "Kosher", "GMP"]
  },

  // Branded Ingredients
  {
    id: "forcslim",
    name: "Forcslim™",
    category: PRODUCT_CATEGORIES.BRANDED,
    description: "Proprietary weight management formula backed by clinical studies.",
    benefits: [
      "Clinically studied",
      "Patent-protected formula",
      "Standardized bioactives",
      "Proven efficacy"
    ],
    applications: [
      "Weight management supplements",
      "Sports nutrition",
      "Metabolic health products",
      "Fitness formulas"
    ],
    specifications: {
      form: "Fine powder",
      appearance: "Light brown powder",
      standardization: "Proprietary blend",
      packaging: "25kg drums with double food-grade liner",
      shelfLife: "24 months when stored properly",
      storage: "Store in a cool, dry place away from direct sunlight"
    },
    certifications: ["GMP", "Kosher", "Halal"],
    documents: [
      {
        title: "Clinical Study Report",
        type: "PDF",
        size: "2.4 MB"
      },
      {
        title: "Product Specification",
        type: "PDF",
        size: "1.8 MB"
      }
    ]
  },
  {
    id: "jointease",
    name: "JointEase™",
    category: PRODUCT_CATEGORIES.BRANDED,
    description: "Clinically-proven joint health formula combining multiple standardized herbal extracts.",
    benefits: [
      "Clinically studied",
      "Fast-acting formula",
      "Comprehensive joint support",
      "Enhanced bioavailability"
    ],
    applications: [
      "Joint health supplements",
      "Sports nutrition",
      "Active lifestyle products",
      "Senior health formulas"
    ],
    specifications: {
      form: "Fine powder",
      appearance: "Light yellow powder",
      standardization: "Proprietary blend",
      packaging: "25kg drums with double food-grade liner",
      shelfLife: "24 months when stored properly",
      storage: "Store in a cool, dry place away from direct sunlight"
    },
    certifications: ["GMP", "Kosher", "Halal"],
    documents: [
      {
        title: "Clinical Study Report",
        type: "PDF",
        size: "3.1 MB"
      },
      {
        title: "Product Specification",
        type: "PDF",
        size: "1.5 MB"
      }
    ]
  },
  {
    id: "memofocus",
    name: "MemoFocus™",
    category: PRODUCT_CATEGORIES.BRANDED,
    description: "Advanced cognitive support formula combining traditional herbs with modern nootropics.",
    benefits: [
      "Clinically studied",
      "Enhanced bioavailability",
      "Comprehensive brain support",
      "Fast-acting formula"
    ],
    applications: [
      "Cognitive health supplements",
      "Memory support products",
      "Focus enhancement formulas",
      "Student supplements"
    ],
    specifications: {
      form: "Fine powder",
      appearance: "Light brown powder",
      standardization: "Proprietary blend",
      packaging: "25kg drums with double food-grade liner",
      shelfLife: "24 months when stored properly",
      storage: "Store in a cool, dry place away from direct sunlight"
    },
    certifications: ["GMP", "Kosher", "Halal"],
    documents: [
      {
        title: "Clinical Study Report",
        type: "PDF",
        size: "2.8 MB"
      },
      {
        title: "Product Specification",
        type: "PDF",
        size: "1.6 MB"
      }
    ]
  },
  {
    id: "turmimax",
    name: "Turmimax™",
    category: PRODUCT_CATEGORIES.BRANDED,
    description: "Natural antioxidant and water soluble turmeric extract. 3x by bioavailability",
    benefits: [
      "Clinically studied",
      "Non-habit forming",
      "Fast-acting formula",
      "Natural ingredients"
    ],
    applications: [
      "Sleep support supplements",
      "Relaxation products",
      "Stress management formulas",
      "Wellness blends"
    ],
    specifications: {
      form: "Fine powder",
      appearance: "Off-white powder",
      standardization: "Proprietary blend",
      packaging: "25kg drums with double food-grade liner",
      shelfLife: "24 months when stored properly",
      storage: "Store in a cool, dry place away from direct sunlight"
    },
    certifications: ["GMP", "Kosher", "Halal", "Organic", "FDA", "FSSAI", "ISO 22000"],
    documents: [
      {
        title: "Clinical Study Report",
        type: "PDF",
        size: "2.5 MB"
      },
      {
        title: "Product Specification",
        type: "PDF",
        size: "1.7 MB"
      }
    ]
  },

  // Probiotics
  {
    id: "lactobacillus-acidophilus",
    name: "Lactobacillus acidophilus",
    category: PRODUCT_CATEGORIES.PROBIOTICS,
    description: "High-potency Lactobacillus acidophilus probiotic strain with guaranteed CFU count.",
    benefits: [
      "Supports digestive health",
      "Promotes immune function",
      "Helps maintain gut flora balance",
      "Acid and bile resistant"
    ],
    applications: [
      "Dietary supplements",
      "Functional foods",
      "Dairy products",
      "Nutritional formulations"
    ],
    specifications: {
      form: "Free-flowing powder",
      appearance: "White to off-white powder",
      standardization: "50 billion CFU/g",
      packaging: "1kg aluminum foil bags",
      shelfLife: "24 months when stored properly",
      storage: "Store at or below -18°C"
    },
    certifications: ["GMP", "Kosher", "Halal"],
    documents: [
      {
        title: "Strain Documentation",
        type: "PDF",
        size: "1.5 MB"
      },
      {
        title: "Stability Data",
        type: "PDF",
        size: "2.1 MB"
      }
    ]
  },
  {
    id: "bifidobacterium-longum",
    name: "Bifidobacterium longum",
    category: PRODUCT_CATEGORIES.PROBIOTICS,
    description: "Premium Bifidobacterium longum probiotic strain, supporting digestive and immune health.",
    benefits: [
      "Supports digestive health",
      "Enhances immune function",
      "Promotes gut barrier integrity",
      "Helps reduce inflammation"
    ],
    applications: [
      "Dietary supplements",
      "Functional foods",
      "Infant formulas",
      "Nutritional products"
    ],
    specifications: {
      form: "Free-flowing powder",
      appearance: "White to off-white powder",
      standardization: "100 billion CFU/g",
      packaging: "1kg aluminum foil bags",
      shelfLife: "24 months when stored properly",
      storage: "Store at or below -18°C"
    },
    certifications: ["GMP", "Kosher", "Halal"],
    documents: [
      {
        title: "Strain Documentation",
        type: "PDF",
        size: "1.8 MB"
      },
      {
        title: "Stability Data",
        type: "PDF",
        size: "2.3 MB"
      }
    ]
  },
  {
    id: "bacillus-coagulans",
    name: "Bacillus coagulans",
    category: PRODUCT_CATEGORIES.PROBIOTICS,
    description: "Highly stable Bacillus coagulans spore-forming probiotic strain, ideal for shelf-stable products.",
    benefits: [
      "Heat-stable spore form",
      "Supports digestive health",
      "Promotes immune function",
      "Long shelf life"
    ],
    applications: [
      "Shelf-stable supplements",
      "Functional foods",
      "Beverage products",
      "Sports nutrition"
    ],
    specifications: {
      form: "Free-flowing powder",
      appearance: "White to off-white powder",
      standardization: "15 billion CFU/g",
      packaging: "1kg aluminum foil bags",
      shelfLife: "36 months when stored properly",
      storage: "Store in a cool, dry place"
    },
    certifications: ["GMP", "Kosher", "Halal"],
    documents: [
      {
        title: "Strain Documentation",
        type: "PDF",
        size: "1.6 MB"
      },
      {
        title: "Stability Data",
        type: "PDF",
        size: "2.0 MB"
      }
    ]
  },
  {
    id: "lactobacillus-rhamnosus",
    name: "Lactobacillus rhamnosus",
    category: PRODUCT_CATEGORIES.PROBIOTICS,
    description: "Well-researched Lactobacillus rhamnosus probiotic strain, supporting digestive and immune health.",
    benefits: [
      "Clinically studied strain",
      "Supports digestive health",
      "Enhances immune function",
      "Acid and bile resistant"
    ],
    applications: [
      "Dietary supplements",
      "Women's health products",
      "Children's formulas",
      "Travel health products"
    ],
    specifications: {
      form: "Free-flowing powder",
      appearance: "White to off-white powder",
      standardization: "75 billion CFU/g",
      packaging: "1kg aluminum foil bags",
      shelfLife: "24 months when stored properly",
      storage: "Store at or below -18°C"
    },
    certifications: ["GMP", "Kosher", "Halal"],
    documents: [
      {
        title: "Strain Documentation",
        type: "PDF",
        size: "1.7 MB"
      },
      {
        title: "Stability Data",
        type: "PDF",
        size: "2.2 MB"
      }
    ]
  }
]; 