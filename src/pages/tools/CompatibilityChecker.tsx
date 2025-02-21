import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon, AlertTriangle, CheckCircle2, ArrowRight, Loader2, Beaker, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type Compatibility = {
  isCompatible: boolean;
  reason: string;
  recommendations?: string[];
  interactionLevel?: "none" | "mild" | "moderate" | "severe";
  scientificEvidence?: "limited" | "moderate" | "strong";
};

const MOCK_HERBS = [
  {
    name: "Ashwagandha",
    scientificName: "Withania somnifera",
    category: "Adaptogen"
  },
  {
    name: "Turmeric",
    scientificName: "Curcuma longa",
    category: "Anti-inflammatory"
  },
  {
    name: "Ginger",
    scientificName: "Zingiber officinale",
    category: "Digestive Aid"
  },
  {
    name: "Holy Basil",
    scientificName: "Ocimum sanctum",
    category: "Adaptogen"
  },
  {
    name: "Ginseng",
    scientificName: "Panax ginseng",
    category: "Adaptogen"
  },
  {
    name: "Rhodiola",
    scientificName: "Rhodiola rosea",
    category: "Adaptogen"
  },
  {
    name: "Echinacea",
    scientificName: "Echinacea purpurea",
    category: "Immune Support"
  },
  {
    name: "Valerian Root",
    scientificName: "Valeriana officinalis",
    category: "Sleep Aid"
  },
  {
    name: "Chamomile",
    scientificName: "Matricaria chamomilla",
    category: "Calming"
  },
  {
    name: "Green Tea Extract",
    scientificName: "Camellia sinensis",
    category: "Antioxidant"
  },
];

const CompatibilityChecker = () => {
  const [primaryHerb, setPrimaryHerb] = useState<string>("");
  const [secondaryHerb, setSecondaryHerb] = useState<string>("");
  const [result, setResult] = useState<Compatibility | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const checkCompatibility = async () => {
    setIsChecking(true);
    setResult(null);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const mockResults: Record<string, Record<string, Compatibility>> = {
      "Ashwagandha": {
        "Ginseng": {
          isCompatible: false,
          reason: "Both herbs have stimulating adaptogenic properties that may compound effects",
          recommendations: [
            "Use one adaptogenic herb at a time",
            "Consider spacing out usage if both are needed",
            "Start with lower doses if combining"
          ],
          interactionLevel: "moderate",
          scientificEvidence: "moderate"
        },
        "Turmeric": {
          isCompatible: true,
          reason: "Complementary anti-inflammatory and adaptogenic properties",
          recommendations: [
            "Can be safely combined",
            "May enhance overall benefits",
            "Consider time-staggered administration for optimal absorption"
          ],
          interactionLevel: "none",
          scientificEvidence: "strong"
        }
      }
    };

    if (primaryHerb && secondaryHerb) {
      const result = mockResults[primaryHerb]?.[secondaryHerb] || {
        isCompatible: true,
        reason: "No known significant interactions",
        recommendations: [
          "Monitor for individual responses",
          "Start with standard doses",
          "Follow general herbal supplementation guidelines"
        ],
        interactionLevel: "none",
        scientificEvidence: "limited"
      };
      setResult(result);
    }
    setIsChecking(false);
  };

  const getInteractionColor = (level?: string) => {
    switch (level) {
      case "severe": return "text-red-600";
      case "moderate": return "text-orange-600";
      case "mild": return "text-yellow-600";
      default: return "text-green-600";
    }
  };

  const getEvidenceLabel = (level?: string) => {
    switch (level) {
      case "strong": return "Strong scientific evidence";
      case "moderate": return "Moderate scientific evidence";
      default: return "Limited scientific evidence";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full mb-4">
              <Star className="w-4 h-4" />
              Professional Tool
            </span>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Herbal Ingredient Compatibility Checker
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ensure safe and effective formulations by checking the compatibility between different herbal ingredients.
            </p>
          </motion.div>

          <Card className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 mb-8">
            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between mb-8">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-green-500/10 text-green-500">
                  <Beaker className="h-6 w-6" />
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400" />
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-900 mb-2">Primary Herb</label>
                  <Select
                    value={primaryHerb}
                    onValueChange={setPrimaryHerb}
                  >
                    <SelectTrigger className="h-11 bg-white border-gray-200 hover:border-primary/50 transition-colors">
                      <SelectValue placeholder="Select primary herb" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 shadow-lg">
                      {MOCK_HERBS.map((herb) => (
                        <SelectItem 
                          key={herb.name} 
                          value={herb.name}
                          className="focus:bg-gray-50 hover:bg-gray-50"
                        >
                          <div>
                            <div className="font-medium text-gray-900">{herb.name}</div>
                            <div className="text-xs text-gray-500">{herb.scientificName}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {primaryHerb && (
                    <div className="text-sm text-gray-600 mt-2 flex items-center">
                      <span className="inline-block w-2 h-2 rounded-full bg-primary/20 mr-2"></span>
                      {MOCK_HERBS.find(h => h.name === primaryHerb)?.category}
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-900 mb-2">Secondary Herb</label>
                  <Select
                    value={secondaryHerb}
                    onValueChange={setSecondaryHerb}
                  >
                    <SelectTrigger className="h-11 bg-white border-gray-200 hover:border-primary/50 transition-colors">
                      <SelectValue placeholder="Select secondary herb" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 shadow-lg">
                      {MOCK_HERBS
                        .filter(herb => herb.name !== primaryHerb)
                        .map((herb) => (
                          <SelectItem 
                            key={herb.name} 
                            value={herb.name}
                            className="focus:bg-gray-50 hover:bg-gray-50"
                          >
                            <div>
                              <div className="font-medium text-gray-900">{herb.name}</div>
                              <div className="text-xs text-gray-500">{herb.scientificName}</div>
                            </div>
                          </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {secondaryHerb && (
                    <div className="text-sm text-gray-600 mt-2 flex items-center">
                      <span className="inline-block w-2 h-2 rounded-full bg-primary/20 mr-2"></span>
                      {MOCK_HERBS.find(h => h.name === secondaryHerb)?.category}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-8 mb-8">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/60"></div>
                  <span>Interactive herb selection</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/60"></div>
                  <span>Compatibility analysis</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/60"></div>
                  <span>Safety recommendations</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/60"></div>
                  <span>Scientific evidence levels</span>
                </div>
              </div>

              <Button 
                onClick={checkCompatibility}
                disabled={!primaryHerb || !secondaryHerb || isChecking}
                className="w-full bg-primary hover:bg-primary/90 text-white shadow-sm"
              >
                {isChecking ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Checking...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>Check Compatibility</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </Button>
            </div>
          </Card>

          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <Card className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="p-6 md:p-8">
                    <Alert 
                      variant={result.isCompatible ? "default" : "destructive"} 
                      className={cn(
                        "mb-6",
                        result.isCompatible ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                      )}
                    >
                      {result.isCompatible ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                      )}
                      <AlertTitle className={cn(
                        "text-lg font-semibold",
                        result.isCompatible ? "text-green-800" : "text-red-800"
                      )}>
                        {result.isCompatible ? "Compatible Ingredients" : "Caution Advised"}
                      </AlertTitle>
                      <AlertDescription className={cn(
                        "mt-2 text-base",
                        result.isCompatible ? "text-green-700" : "text-red-700"
                      )}>
                        {result.reason}
                      </AlertDescription>
                    </Alert>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div className={cn(
                        "p-4 rounded-xl",
                        result.interactionLevel === "none" ? "bg-green-50 border border-green-100" :
                        result.interactionLevel === "mild" ? "bg-yellow-50 border border-yellow-100" :
                        result.interactionLevel === "moderate" ? "bg-orange-50 border border-orange-100" :
                        "bg-red-50 border border-red-100"
                      )}>
                        <h3 className="font-medium mb-2 text-gray-900">Interaction Level</h3>
                        <p className={cn(
                          "capitalize font-medium",
                          result.interactionLevel === "none" ? "text-green-700" :
                          result.interactionLevel === "mild" ? "text-yellow-700" :
                          result.interactionLevel === "moderate" ? "text-orange-700" :
                          "text-red-700"
                        )}>
                          {result.interactionLevel || "None"}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                        <h3 className="font-medium mb-2 text-gray-900">Scientific Evidence</h3>
                        <p className="text-blue-700 font-medium">
                          {getEvidenceLabel(result.scientificEvidence)}
                        </p>
                      </div>
                    </div>

                    {result.recommendations && (
                      <div className="space-y-3">
                        <h3 className="font-medium text-gray-900">Recommendations</h3>
                        <ul className="space-y-2">
                          {result.recommendations.map((rec, index) => (
                            <li 
                              key={index}
                              className="flex items-start gap-2 text-gray-700"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2"></span>
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </Card>

                <div className="mt-12 p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex gap-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <InfoIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Important Information</h3>
                      <p className="text-gray-600 leading-relaxed">
                        This tool provides general guidance based on known herb interactions and available research. 
                        The information should not be considered as medical advice. Always consult with a qualified 
                        healthcare practitioner before combining herbs, especially if you are taking medications 
                        or have underlying health conditions.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default CompatibilityChecker; 