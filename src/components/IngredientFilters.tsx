import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const INGREDIENT_CATEGORIES = {
  ANIMAL_HEALTH: "animal-health-wellness",
  BEAUTY_FROM_WITHIN: "beauty-from-within",
  JOINT_BONE: "joint-bone",
  CARDIOVASCULAR: "cardiovascular",
  COGNITIVE_PERFORMANCE: "cognitive-performance",
  ENERGY: "energy",
  FUNCTIONAL_FOODS: "functional-foods-beverages",
  HEALTHY_AGING: "healthy-aging-longevity",
  HYDRATION: "hydration-plus",
  IMMUNE_HEALTH: "immune-respiratory-health",
  MENS_HEALTH: "mens-health",
  MUSCLE_HEALTH: "muscle-health",
  PAIN_MOBILITY: "pain-mobility",
  PLANT_BASED: "plant-based-nutrition",
  SEXUAL_HEALTH: "sexual-health",
  SLEEP: "sleep",
  SPORTS_NUTRITION: "sports-active-nutrition",
  STRESS_MOOD: "stress-mood",
  WEIGHT_MANAGEMENT: "weight-management",
  WOMENS_HEALTH: "womens-health",
} as const;

export const CATEGORY_INFO = {
  [INGREDIENT_CATEGORIES.ANIMAL_HEALTH]: {
    title: "Animal Health & Wellness",
    description: "Natural ingredients supporting pet and animal health",
    benefits: ["Joint support", "Digestive health", "Immune function", "Overall wellness"],
  },
  [INGREDIENT_CATEGORIES.BEAUTY_FROM_WITHIN]: {
    title: "Beauty From Within",
    description: "Nutrients for skin, hair, and nail health",
    benefits: ["Skin elasticity", "Hair strength", "Nail health", "Anti-aging support"],
  },
  [INGREDIENT_CATEGORIES.JOINT_BONE]: {
    title: "Joint & Bone",
    description: "Solutions for skeletal and joint health support",
    benefits: ["Joint flexibility", "Bone density", "Cartilage health", "Anti-inflammatory"],
  },
  [INGREDIENT_CATEGORIES.CARDIOVASCULAR]: {
    title: "Cardiovascular",
    description: "Ingredients supporting heart and circulatory health",
    benefits: ["Heart health", "Circulation support", "Blood pressure", "Cholesterol management"],
  },
  [INGREDIENT_CATEGORIES.COGNITIVE_PERFORMANCE]: {
    title: "Cognitive Performance",
    description: "Enhancing mental clarity and brain function",
    benefits: ["Memory support", "Focus enhancement", "Mental clarity", "Neuroprotection"],
  },
  [INGREDIENT_CATEGORIES.ENERGY]: {
    title: "Energy",
    description: "Natural solutions for sustained energy and vitality",
    benefits: ["Sustained energy", "Mental alertness", "Physical stamina", "Fatigue reduction"],
  },
  [INGREDIENT_CATEGORIES.FUNCTIONAL_FOODS]: {
    title: "Functional Foods & Beverages",
    description: "Innovative ingredients for fortified products",
    benefits: ["Nutrient enrichment", "Functional benefits", "Clean label", "Enhanced bioavailability"],
  },
  [INGREDIENT_CATEGORIES.HEALTHY_AGING]: {
    title: "Healthy Aging & Longevity",
    description: "Supporting vitality and wellness through aging",
    benefits: ["Cell protection", "Oxidative stress", "Tissue health", "Cellular regeneration"],
  },
  [INGREDIENT_CATEGORIES.HYDRATION]: {
    title: "Hydration+",
    description: "Advanced hydration and electrolyte solutions",
    benefits: ["Electrolyte balance", "Mineral absorption", "Cellular hydration", "Performance support"],
  },
  [INGREDIENT_CATEGORIES.IMMUNE_HEALTH]: {
    title: "Immune & Respiratory Health",
    description: "Supporting immune system and respiratory function",
    benefits: ["Immune support", "Respiratory health", "Antioxidant protection", "Seasonal wellness"],
  },
  [INGREDIENT_CATEGORIES.MENS_HEALTH]: {
    title: "Men's Health",
    description: "Targeted solutions for men's wellness needs",
    benefits: ["Prostate health", "Testosterone support", "Vitality", "Muscle maintenance"],
  },
  [INGREDIENT_CATEGORIES.MUSCLE_HEALTH]: {
    title: "Muscle Health",
    description: "Supporting muscle growth and maintenance",
    benefits: ["Muscle recovery", "Protein synthesis", "Strength support", "Lean mass maintenance"],
  },
  [INGREDIENT_CATEGORIES.PAIN_MOBILITY]: {
    title: "Pain & Mobility",
    description: "Natural solutions for comfort and movement",
    benefits: ["Pain management", "Flexibility", "Joint comfort", "Muscle relaxation"],
  },
  [INGREDIENT_CATEGORIES.PLANT_BASED]: {
    title: "Plant-based Nutrition",
    description: "Complete plant-based nutritional solutions",
    benefits: ["Protein alternatives", "Essential nutrients", "Sustainable sourcing", "Clean label"],
  },
  [INGREDIENT_CATEGORIES.SEXUAL_HEALTH]: {
    title: "Sexual Health",
    description: "Natural support for sexual wellness",
    benefits: ["Libido support", "Hormonal balance", "Energy", "Reproductive health"],
  },
  [INGREDIENT_CATEGORIES.SLEEP]: {
    title: "Sleep",
    description: "Natural ingredients for quality sleep support",
    benefits: ["Sleep quality", "Relaxation", "Stress reduction", "Circadian rhythm"],
  },
  [INGREDIENT_CATEGORIES.SPORTS_NUTRITION]: {
    title: "Sports & Active Nutrition",
    description: "Performance and recovery solutions for athletes",
    benefits: ["Performance enhancement", "Recovery support", "Endurance", "Strength"],
  },
  [INGREDIENT_CATEGORIES.STRESS_MOOD]: {
    title: "Stress & Mood",
    description: "Natural support for emotional wellbeing",
    benefits: ["Stress management", "Mood balance", "Mental clarity", "Relaxation"],
  },
  [INGREDIENT_CATEGORIES.WEIGHT_MANAGEMENT]: {
    title: "Weight Management",
    description: "Solutions for healthy weight management",
    benefits: ["Metabolism support", "Appetite control", "Fat metabolism", "Energy balance"],
  },
  [INGREDIENT_CATEGORIES.WOMENS_HEALTH]: {
    title: "Women's Health",
    description: "Targeted solutions for women's wellness needs",
    benefits: ["Hormonal balance", "Reproductive health", "Bone health", "Energy support"],
  },
};

const IngredientFilters = () => {
  const location = useLocation();
  const currentPath = location.pathname.split("/").pop();

  return (
    <div className="w-full bg-white border-b sticky top-16 z-30">
      <div className="container mx-auto px-4 py-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-nowrap overflow-x-auto gap-2 pb-2 -mx-2 px-2"
        >
          <Link
            to="/ingredients"
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
              !currentPath || currentPath === "ingredients"
                ? "bg-primary hover:bg-primary/90 text-white shadow-sm"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900"
            )}
          >
            All Solutions
          </Link>
          {Object.entries(CATEGORY_INFO).map(([key, { title }]) => (
            <Link
              key={key}
              to={`/ingredients/${key}`}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                currentPath === key
                  ? "bg-primary hover:bg-primary/90 text-white shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900"
              )}
            >
              {title}
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default IngredientFilters; 