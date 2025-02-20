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
import { InfoIcon, AlertTriangle, CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
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
          >
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              Herbal Ingredient Compatibility Checker
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Ensure safe and effective formulations by checking the compatibility between different herbal ingredients.
            </p>
          </motion.div>

          <Card className="p-8 mb-8 shadow-lg border-t-4 border-t-primary">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="block text-sm font-medium mb-2">Primary Herb</label>
                <Select
                  value={primaryHerb}
                  onValueChange={setPrimaryHerb}
                >
                  <SelectTrigger className="h-12 bg-white border-gray-200 hover:bg-gray-50">
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
                          <div className="font-medium">{herb.name}</div>
                          <div className="text-xs text-gray-500">{herb.scientificName}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {primaryHerb && (
                  <div className="text-sm text-gray-500 mt-2 flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-primary/20 mr-2"></span>
                    {MOCK_HERBS.find(h => h.name === primaryHerb)?.category}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium mb-2">Secondary Herb</label>
                <Select
                  value={secondaryHerb}
                  onValueChange={setSecondaryHerb}
                >
                  <SelectTrigger className="h-12 bg-white border-gray-200 hover:bg-gray-50">
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
                            <div className="font-medium">{herb.name}</div>
                            <div className="text-xs text-gray-500">{herb.scientificName}</div>
                          </div>
                        </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {secondaryHerb && (
                  <div className="text-sm text-gray-500 mt-2 flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-primary/20 mr-2"></span>
                    {MOCK_HERBS.find(h => h.name === secondaryHerb)?.category}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <Button 
                onClick={checkCompatibility}
                disabled={!primaryHerb || !secondaryHerb || isChecking}
                className="w-full md:w-auto min-w-[200px] h-12 text-lg relative"
              >
                {isChecking ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    Check Compatibility
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
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
              >
                <Card className="p-6 mb-8 overflow-hidden">
                  <div className="relative">
                    <div className={cn(
                      "absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 -mr-16 -mt-16",
                      result.isCompatible ? "bg-green-500" : "bg-red-500"
                    )} />
                    
                    <Alert variant={result.isCompatible ? "default" : "destructive"} className="mb-6">
                      {result.isCompatible ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                      )}
                      <AlertTitle className="text-lg">
                        {result.isCompatible ? "Compatible Ingredients" : "Caution Advised"}
                      </AlertTitle>
                      <AlertDescription>
                        <p className="mt-2 text-base">{result.reason}</p>
                      </AlertDescription>
                    </Alert>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-medium mb-2">Interaction Level</h3>
                        <p className={cn("capitalize", getInteractionColor(result.interactionLevel))}>
                          {result.interactionLevel || "None"}
                        </p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-medium mb-2">Scientific Evidence</h3>
                        <p className="text-gray-600">
                          {getEvidenceLabel(result.scientificEvidence)}
                        </p>
                      </div>
                    </div>

                    {result.recommendations && (
                      <div className="space-y-4">
                        <h3 className="font-medium text-lg">Recommendations</h3>
                        <ul className="space-y-3">
                          {result.recommendations.map((rec, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-start gap-2"
                            >
                              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-primary text-sm font-medium">{index + 1}</span>
                              </div>
                              <span className="text-gray-600">{rec}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-100"
          >
            <div className="flex gap-3">
              <InfoIcon className="h-6 w-6 text-blue-500 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-blue-800 mb-2">Important Information</h3>
                <p className="text-sm text-blue-700 leading-relaxed">
                  This tool provides general guidance based on known herb interactions and available research. 
                  The information should not be considered as medical advice. Always consult with a qualified 
                  healthcare practitioner before combining herbs, especially if you are taking medications 
                  or have underlying health conditions.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default CompatibilityChecker; 