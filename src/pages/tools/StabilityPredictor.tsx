import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { 
  Clock, 
  Download,
  Star,
  ArrowRight,
  Loader2,
  ThermometerSun,
  Droplets,
  FileDown,
  AlertTriangle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type ExtractForm = "powder" | "liquid" | "capsule";
type StorageCondition = "ambient" | "refrigerated" | "controlled";

type StabilityResult = {
  shelfLife: number;
  confidenceLevel: "high" | "medium" | "low";
  recommendations: string[];
  storageConditions: {
    temperature: string;
    humidity: string;
    light: string;
  };
  stabilityFactors: {
    factor: string;
    impact: "high" | "medium" | "low";
    recommendation: string;
  }[];
};

const MOCK_EXTRACTS = [
  { name: "Turmeric Extract", scientificName: "Curcuma longa" },
  { name: "Green Tea Extract", scientificName: "Camellia sinensis" },
  { name: "Ginger Extract", scientificName: "Zingiber officinale" },
  { name: "Echinacea Extract", scientificName: "Echinacea purpurea" },
  { name: "Ashwagandha Extract", scientificName: "Withania somnifera" },
  { name: "Valerian Root Extract", scientificName: "Valeriana officinalis" },
  { name: "Milk Thistle Extract", scientificName: "Silybum marianum" },
  { name: "Ginkgo Extract", scientificName: "Ginkgo biloba" },
];

const StabilityPredictor = () => {
  const [selectedExtract, setSelectedExtract] = useState("");
  const [extractForm, setExtractForm] = useState<ExtractForm | "">("");
  const [temperature, setTemperature] = useState<number[]>([25]);
  const [humidity, setHumidity] = useState<number[]>([45]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<StabilityResult | null>(null);
  const { toast } = useToast();

  const analyzeStability = async () => {
    if (!selectedExtract || !extractForm) return;

    setIsAnalyzing(true);
    setResult(null);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    const mockResult: StabilityResult = {
      shelfLife: 24,
      confidenceLevel: "high",
      recommendations: [
        "Store in airtight containers",
        "Keep away from direct sunlight",
        "Maintain consistent temperature",
        "Use moisture-absorbing packets"
      ],
      storageConditions: {
        temperature: "20-25°C",
        humidity: "40-45% RH",
        light: "Protected from direct light"
      },
      stabilityFactors: [
        {
          factor: "Temperature Control",
          impact: "high",
          recommendation: "Maintain temperature below 25°C"
        },
        {
          factor: "Moisture Content",
          impact: "medium",
          recommendation: "Use desiccant packets in packaging"
        },
        {
          factor: "Oxidation Risk",
          impact: "low",
          recommendation: "Consider nitrogen flushing"
        }
      ]
    };

    setResult(mockResult);
    setIsAnalyzing(false);
  };

  const handleDownloadReport = () => {
    toast({
      title: "Report Generated",
      description: "Stability analysis report has been downloaded.",
      duration: 3000,
    });
  };

  const getImpactColor = (impact: "high" | "medium" | "low") => {
    switch (impact) {
      case "high": return "text-red-600 bg-red-50 border-red-100";
      case "medium": return "text-yellow-600 bg-yellow-50 border-yellow-100";
      case "low": return "text-green-600 bg-green-50 border-green-100";
      default: return "text-gray-600 bg-gray-50 border-gray-100";
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
              Herbal Extract Stability & Shelf Life Predictor
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Predict stability and determine optimal storage conditions for your herbal extracts.
            </p>
          </motion.div>

          <Card className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 mb-8">
            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between mb-8">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-500/10 text-blue-500">
                  <Clock className="h-6 w-6" />
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400" />
              </div>

              <div className="space-y-8">
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-900">Extract Selection</label>
                  <Select value={selectedExtract} onValueChange={setSelectedExtract}>
                    <SelectTrigger className="h-11 bg-white border-gray-200 hover:border-primary/50 transition-colors">
                      <SelectValue placeholder="Select an extract" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 shadow-lg">
                      {MOCK_EXTRACTS.map((extract) => (
                        <SelectItem 
                          key={extract.name} 
                          value={extract.name}
                          className="focus:bg-gray-50 hover:bg-gray-50"
                        >
                          <div>
                            <div className="font-medium text-gray-900">{extract.name}</div>
                            <div className="text-xs text-gray-500">{extract.scientificName}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-900">Extract Form</label>
                  <Select value={extractForm} onValueChange={(value) => setExtractForm(value as ExtractForm)}>
                    <SelectTrigger className="h-11 bg-white border-gray-200 hover:border-primary/50 transition-colors">
                      <SelectValue placeholder="Select extract form" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="powder">Powder</SelectItem>
                      <SelectItem value="liquid">Liquid</SelectItem>
                      <SelectItem value="capsule">Capsule</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-900">
                      Storage Temperature (°C)
                    </label>
                    <div className="flex items-center gap-4">
                      <ThermometerSun className="h-5 w-5 text-gray-400" />
                      <Slider
                        value={temperature}
                        onValueChange={setTemperature}
                        min={0}
                        max={40}
                        step={1}
                        className="flex-1"
                      />
                      <span className="text-sm font-medium text-gray-900 min-w-[3rem]">
                        {temperature}°C
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-900">
                      Relative Humidity (%)
                    </label>
                    <div className="flex items-center gap-4">
                      <Droplets className="h-5 w-5 text-gray-400" />
                      <Slider
                        value={humidity}
                        onValueChange={setHumidity}
                        min={0}
                        max={100}
                        step={1}
                        className="flex-1"
                      />
                      <span className="text-sm font-medium text-gray-900 min-w-[3rem]">
                        {humidity}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-8">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/60"></div>
                    <span>Shelf life prediction</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/60"></div>
                    <span>Storage optimization</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/60"></div>
                    <span>Stability analysis</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/60"></div>
                    <span>PDF report generation</span>
                  </div>
                </div>

                <Button
                  onClick={analyzeStability}
                  disabled={!selectedExtract || !extractForm || isAnalyzing}
                  className="w-full bg-primary hover:bg-primary/90 text-white shadow-sm"
                >
                  {isAnalyzing ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Analyzing Stability...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span>Analyze Stability</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  )}
                </Button>
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
                className="space-y-6"
              >
                <Card className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="p-6 md:p-8">
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                          Stability Analysis Results
                        </h2>
                        <p className="text-gray-600">
                          Based on the provided parameters and historical data
                        </p>
                      </div>
                      <Button
                        onClick={handleDownloadReport}
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <FileDown className="h-4 w-4" />
                        Download Report
                      </Button>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                      <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                        <h3 className="font-medium mb-2 text-gray-900">Estimated Shelf Life</h3>
                        <p className="text-blue-700 font-medium text-lg">
                          {result.shelfLife} months
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-green-50 border border-green-100">
                        <h3 className="font-medium mb-2 text-gray-900">Confidence Level</h3>
                        <p className="text-green-700 font-medium text-lg capitalize">
                          {result.confidenceLevel}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-purple-50 border border-purple-100">
                        <h3 className="font-medium mb-2 text-gray-900">Storage Type</h3>
                        <p className="text-purple-700 font-medium text-lg">
                          Controlled Environment
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium text-gray-900 mb-3">Recommended Storage Conditions</h3>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                            <div className="text-sm text-gray-600">Temperature</div>
                            <div className="font-medium text-gray-900">{result.storageConditions.temperature}</div>
                          </div>
                          <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                            <div className="text-sm text-gray-600">Humidity</div>
                            <div className="font-medium text-gray-900">{result.storageConditions.humidity}</div>
                          </div>
                          <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                            <div className="text-sm text-gray-600">Light Exposure</div>
                            <div className="font-medium text-gray-900">{result.storageConditions.light}</div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium text-gray-900 mb-3">Stability Factors</h3>
                        <div className="space-y-3">
                          {result.stabilityFactors.map((factor, index) => (
                            <div
                              key={index}
                              className={cn(
                                "p-4 rounded-lg border",
                                getImpactColor(factor.impact)
                              )}
                            >
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-medium">{factor.factor}</h4>
                                <span className="text-sm capitalize px-2 py-1 rounded-full bg-white/50">
                                  {factor.impact} impact
                                </span>
                              </div>
                              <p className="text-sm">{factor.recommendation}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium text-gray-900 mb-3">Key Recommendations</h3>
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
                    </div>
                  </div>
                </Card>

                <div className="mt-12 p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex gap-6">
                    <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="h-6 w-6 text-yellow-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Important Notice</h3>
                      <p className="text-gray-600 leading-relaxed">
                        This prediction is based on general stability data and theoretical models. 
                        Actual stability may vary based on specific formulation, processing methods, 
                        and packaging materials. We recommend conducting real-time stability studies 
                        for final verification.
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

export default StabilityPredictor; 