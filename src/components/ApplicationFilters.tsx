import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const APPLICATION_CATEGORIES = {
  BAKERY: "bakery",
  BARS: "bars",
  BEVERAGES: "beverages",
  CAPSULES: "capsules",
  CHEWS: "chews",
  CONFECTIONERY: "confectionery",
  EFFERVESCENTS: "effervescents",
  GUMMIES: "gummies",
  PLANT_BASED_MEAT: "plant-based-meat",
  POWDERS: "powders",
  RTDS_SHOTS: "rtds-shots",
  SNACKS: "snacks",
  SOFT_GELS: "soft-gels",
  STICK_PACKS: "stick-packs",
  TABLETS: "tablets",
} as const;

export const APPLICATION_INFO = {
  [APPLICATION_CATEGORIES.BAKERY]: {
    title: "Bakery",
    description: "Innovative ingredients for functional and enriched bakery products",
    features: [
      "Clean label solutions",
      "Natural preservatives",
      "Functional fortification",
      "Texture enhancement"
    ],
  },
  [APPLICATION_CATEGORIES.BARS]: {
    title: "Bars",
    description: "Specialized ingredients for nutritional and energy bars",
    features: [
      "Protein enrichment",
      "Natural sweeteners",
      "Functional benefits",
      "Extended shelf life"
    ],
  },
  [APPLICATION_CATEGORIES.BEVERAGES]: {
    title: "Beverages",
    description: "Premium ingredients for functional and fortified beverages",
    features: [
      "Water-soluble extracts",
      "Natural colors",
      "Flavor enhancement",
      "Stability solutions"
    ],
  },
  [APPLICATION_CATEGORIES.CAPSULES]: {
    title: "Capsules",
    description: "High-quality ingredients for supplement capsules",
    features: [
      "Standardized extracts",
      "Flow optimization",
      "Bioavailability enhancement",
      "Stability assurance"
    ],
  },
  [APPLICATION_CATEGORIES.CHEWS]: {
    title: "Chews",
    description: "Innovative solutions for chewable supplements",
    features: [
      "Taste masking",
      "Texture improvement",
      "Active stability",
      "Natural flavors"
    ],
  },
  [APPLICATION_CATEGORIES.CONFECTIONERY]: {
    title: "Confectionery",
    description: "Natural ingredients for functional confectionery products",
    features: [
      "Natural colorants",
      "Functional benefits",
      "Sugar reduction",
      "Texture solutions"
    ],
  },
  [APPLICATION_CATEGORIES.EFFERVESCENTS]: {
    title: "Effervescents",
    description: "Specialized ingredients for effervescent formulations",
    features: [
      "Quick dissolution",
      "Stability enhancement",
      "Taste optimization",
      "Active protection"
    ],
  },
  [APPLICATION_CATEGORIES.GUMMIES]: {
    title: "Gummies",
    description: "Premium ingredients for functional gummy supplements",
    features: [
      "Natural colors",
      "Flavor masking",
      "Stability solutions",
      "Texture improvement"
    ],
  },
  [APPLICATION_CATEGORIES.PLANT_BASED_MEAT]: {
    title: "Plant-based Meat",
    description: "Innovative ingredients for plant-based meat alternatives",
    features: [
      "Texture enhancement",
      "Flavor improvement",
      "Nutritional enrichment",
      "Clean label solutions"
    ],
  },
  [APPLICATION_CATEGORIES.POWDERS]: {
    title: "Powders",
    description: "High-quality ingredients for powder formulations",
    features: [
      "Flow properties",
      "Dissolution profile",
      "Stability assurance",
      "Bioavailability"
    ],
  },
  [APPLICATION_CATEGORIES.RTDS_SHOTS]: {
    title: "RTDs / Shots",
    description: "Specialized ingredients for ready-to-drink products",
    features: [
      "Liquid stability",
      "Clear solution",
      "Taste optimization",
      "Active protection"
    ],
  },
  [APPLICATION_CATEGORIES.SNACKS]: {
    title: "Snacks",
    description: "Functional ingredients for healthy snack applications",
    features: [
      "Nutritional enhancement",
      "Natural preservation",
      "Texture improvement",
      "Clean label"
    ],
  },
  [APPLICATION_CATEGORIES.SOFT_GELS]: {
    title: "Soft Gels",
    description: "Premium ingredients for soft gel applications",
    features: [
      "Oil solubility",
      "Stability assurance",
      "Bioavailability",
      "Active protection"
    ],
  },
  [APPLICATION_CATEGORIES.STICK_PACKS]: {
    title: "Stick Packs",
    description: "Specialized ingredients for convenient stick pack formats",
    features: [
      "Flow properties",
      "Quick dissolution",
      "Stability enhancement",
      "Taste masking"
    ],
  },
  [APPLICATION_CATEGORIES.TABLETS]: {
    title: "Tablets",
    description: "High-quality ingredients for tablet formulations",
    features: [
      "Compression properties",
      "Disintegration profile",
      "Stability assurance",
      "Active protection"
    ],
  },
};

const ApplicationFilters = () => {
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
            to="/applications"
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
              !currentPath || currentPath === "applications"
                ? "bg-primary hover:bg-primary/90 text-white shadow-sm"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900"
            )}
          >
            All Applications
          </Link>
          {Object.entries(APPLICATION_INFO).map(([key, { title }]) => (
            <Link
              key={key}
              to={`/applications/${key}`}
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

export default ApplicationFilters; 