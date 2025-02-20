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
import { Slider } from "@/components/ui/slider";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon, Calculator, ArrowRight, Loader2, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type ExtractInfo = {
  name: string;
  scientificName: string;
  standardization: string;
  recommendedDosage: {
    min: number;
    max: number;
    unit: string;
  };
  frequency: string[];
  notes: string[];
};

const MOCK_EXTRACTS: ExtractInfo[] = [
  {
    name: "Ashwagandha",
    scientificName: "Withania somnifera",
    standardization: "2.5% Withanolides",
    recommendedDosage: {
      min: 300,
      max: 600,
      unit: "mg"
    },
    frequency: ["1-2 times daily", "With meals"],
    notes: [
      "Higher doses may be used under professional guidance",
      "Start with lower dose and adjust as needed",
      "Best taken consistently for optimal results"
    ]
  },
  {
    name: "Turmeric Extract",
    scientificName: "Curcuma longa",
    standardization: "95% Curcuminoids",
    recommendedDosage: {
      min: 500,
      max: 2000,
      unit: "mg"
    },
    frequency: ["1-3 times daily", "With fatty meals for better absorption"],
    notes: [
      "Consider adding black pepper extract for enhanced absorption",
      "May be split into multiple doses throughout the day",
      "Higher doses used in clinical studies for specific conditions"
    ]
  },
  {
    name: "Ginger Extract",
    scientificName: "Zingiber officinale",
    standardization: "5% Gingerols",
    recommendedDosage: {
      min: 250,
      max: 1000,
      unit: "mg"
    },
    frequency: ["2-3 times daily", "With or without food"],
    notes: [
      "May be taken before meals for digestive support",
      "Higher doses commonly used for specific purposes",
      "Consider timing based on intended use"
    ]
  }
];

type DosageResult = {
  recommendedDose: number;
  dailyFrequency: number;
  totalDailyDose: number;
  adjustedDose?: number;
  warnings?: string[];
  recommendations: string[];
};

const DosageCalculator = () => {
  const [selectedExtract, setSelectedExtract] = useState<string>("");
  const [bodyWeight, setBodyWeight] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [sensitivity, setSensitivity] = useState<number>(50); // 0-100 scale
  const [result, setResult] = useState<DosageResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateDosage = async () => {
    setIsCalculating(true);
    setResult(null);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const extract = MOCK_EXTRACTS.find(e => e.name === selectedExtract);
    if (!extract) return;

    const baseResult: DosageResult = {
      recommendedDose: 0,
      dailyFrequency: 2,
      totalDailyDose: 0,
      recommendations: [],
      warnings: []
    };

    // Basic calculation (this would be more sophisticated in a real application)
    const weightInKg = parseFloat(bodyWeight);
    const ageNum = parseInt(age);
    const sensitivityFactor = sensitivity / 100;

    // Calculate base dose
    const baseDose = (extract.recommendedDosage.min + extract.recommendedDosage.max) / 2;
    
    // Adjust for weight (simplified)
    const weightAdjustment = weightInKg > 70 ? 1.1 : weightInKg < 50 ? 0.9 : 1;
    
    // Adjust for age
    const ageAdjustment = ageNum > 65 ? 0.8 : ageNum < 18 ? 0.7 : 1;
    
    // Adjust for sensitivity
    const sensitivityAdjustment = 1 - ((1 - sensitivityFactor) * 0.3);

    // Calculate final dose
    const adjustedDose = Math.round(baseDose * weightAdjustment * ageAdjustment * sensitivityAdjustment);

    baseResult.recommendedDose = adjustedDose;
    baseResult.totalDailyDose = adjustedDose * baseResult.dailyFrequency;
    baseResult.recommendations = [
      ...extract.notes,
      `Take ${adjustedDose}${extract.recommendedDosage.unit} ${extract.frequency[0]}`,
      `Total daily dose: ${baseResult.totalDailyDose}${extract.recommendedDosage.unit}`
    ];

    // Add warnings if necessary
    if (ageNum > 65) {
      baseResult.warnings?.push("Adjusted dose for senior age group. Monitor response carefully.");
    }
    if (sensitivityFactor < 0.4) {
      baseResult.warnings?.push("Dose adjusted for high sensitivity. Start with lower dose and increase gradually if needed.");
    }

    setResult(baseResult);
    setIsCalculating(false);
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
              Botanical Extract Dosage Calculator
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Calculate personalized dosage recommendations for botanical extracts based on individual factors.
            </p>
          </motion.div>

          <Card className="p-8 mb-8 shadow-lg border-t-4 border-t-primary bg-white/50 backdrop-blur-sm">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium">Select Extract</label>
                    {selectedExtract && (
                      <span className="text-xs text-primary font-medium px-2 py-1 bg-primary/10 rounded-full">
                        {MOCK_EXTRACTS.find(e => e.name === selectedExtract)?.standardization}
                      </span>
                    )}
                  </div>
                  <Select
                    value={selectedExtract}
                    onValueChange={setSelectedExtract}
                  >
                    <SelectTrigger className="h-12 bg-white border-gray-200 hover:bg-gray-50 ring-offset-white">
                      <SelectValue placeholder="Choose botanical extract" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 shadow-lg">
                      {MOCK_EXTRACTS.map((extract) => (
                        <SelectItem 
                          key={extract.name} 
                          value={extract.name}
                          className="focus:bg-gray-50 hover:bg-gray-50"
                        >
                          <div>
                            <div className="font-medium">{extract.name}</div>
                            <div className="text-xs text-gray-500">
                              {extract.scientificName}
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedExtract && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="px-3 py-1.5 bg-gray-100 rounded-lg">
                        <span className="font-medium text-gray-900">Range:</span> {MOCK_EXTRACTS.find(e => e.name === selectedExtract)?.recommendedDosage.min} 
                        - {MOCK_EXTRACTS.find(e => e.name === selectedExtract)?.recommendedDosage.max}
                        {MOCK_EXTRACTS.find(e => e.name === selectedExtract)?.recommendedDosage.unit}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium">Body Weight</label>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="Enter weight"
                      value={bodyWeight}
                      onChange={(e) => setBodyWeight(e.target.value)}
                      className="h-12 bg-white border-gray-200 pl-4 pr-12"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">kg</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium">Age</label>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="Enter age"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="h-12 bg-white border-gray-200 pl-4 pr-12"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">years</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <label className="block text-sm font-medium">Sensitivity Level</label>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <Slider
                      value={[sensitivity]}
                      onValueChange={(values) => setSensitivity(values[0])}
                      max={100}
                      step={1}
                      className="py-4"
                    />
                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                      <div className="text-center space-y-1">
                        <span className="block text-xs font-medium">Very Sensitive</span>
                        <span className="block w-2 h-2 rounded-full bg-yellow-500 mx-auto"></span>
                      </div>
                      <div className="text-center space-y-1">
                        <span className="block text-xs font-medium">Average</span>
                        <span className="block w-2 h-2 rounded-full bg-green-500 mx-auto"></span>
                      </div>
                      <div className="text-center space-y-1">
                        <span className="block text-xs font-medium">Less Sensitive</span>
                        <span className="block w-2 h-2 rounded-full bg-blue-500 mx-auto"></span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 italic">
                    Adjust based on your known sensitivity to supplements and medications
                  </p>
                </div>

                <div className="h-[120px] flex items-end">
                  <Button 
                    onClick={calculateDosage}
                    disabled={!selectedExtract || !bodyWeight || !age || isCalculating}
                    className="w-full h-14 text-lg relative bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 transition-all duration-200"
                  >
                    {isCalculating ? (
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Calculating...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <Calculator className="h-5 w-5" />
                        <span>Calculate Dosage</span>
                      </div>
                    )}
                  </Button>
                </div>
              </div>
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
                <Card className="p-6 mb-8 bg-white shadow-lg">
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-6 bg-primary/5 rounded-lg border border-primary/10">
                        <h3 className="font-medium mb-3 text-gray-600">Recommended Single Dose</h3>
                        <div className="flex items-baseline gap-1">
                          <p className="text-3xl font-bold text-primary">
                            {result.recommendedDose}
                          </p>
                          <p className="text-lg text-primary/80">
                            {MOCK_EXTRACTS.find(e => e.name === selectedExtract)?.recommendedDosage.unit}
                          </p>
                        </div>
                        <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">
                          <span className="inline-block w-1 h-1 rounded-full bg-primary"></span>
                          Take {result.dailyFrequency}x daily
                        </p>
                      </div>
                      <div className="p-6 bg-primary/5 rounded-lg border border-primary/10">
                        <h3 className="font-medium mb-3 text-gray-600">Total Daily Dose</h3>
                        <div className="flex items-baseline gap-1">
                          <p className="text-3xl font-bold text-primary">
                            {result.totalDailyDose}
                          </p>
                          <p className="text-lg text-primary/80">
                            {MOCK_EXTRACTS.find(e => e.name === selectedExtract)?.recommendedDosage.unit}
                          </p>
                        </div>
                        <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">
                          <span className="inline-block w-1 h-1 rounded-full bg-primary"></span>
                          Split into {result.dailyFrequency} doses
                        </p>
                      </div>
                    </div>

                    {result.warnings && result.warnings.length > 0 && (
                      <Alert variant="destructive" className="bg-red-50 border-red-200">
                        <AlertTitle className="text-lg flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5" />
                          Important Considerations
                        </AlertTitle>
                        <AlertDescription>
                          <ul className="mt-2 space-y-2">
                            {result.warnings.map((warning, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="text-red-500 text-sm">•</span>
                                <span>{warning}</span>
                              </li>
                            ))}
                          </ul>
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="space-y-4">
                      <h3 className="font-medium text-lg flex items-center gap-2">
                        <InfoIcon className="h-5 w-5 text-primary" />
                        Recommendations
                      </h3>
                      <ul className="space-y-3 bg-gray-50 p-4 rounded-lg">
                        {result.recommendations.map((rec, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-3"
                          >
                            <div className="h-6 w-6 rounded-full bg-white border border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-primary text-sm font-medium">{index + 1}</span>
                            </div>
                            <span className="text-gray-600 leading-relaxed">{rec}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-blue-50/50 rounded-lg border border-blue-100"
          >
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <InfoIcon className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <h3 className="font-medium text-blue-800 mb-2">Important Information</h3>
                <p className="text-sm text-blue-700 leading-relaxed">
                  This calculator provides general dosage guidelines based on standard recommendations 
                  and individual factors. The suggested doses are estimates and should be adjusted based 
                  on individual response and healthcare provider guidance. Always start with a lower dose 
                  and adjust as needed.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default DosageCalculator; 