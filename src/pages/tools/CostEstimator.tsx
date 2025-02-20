import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Calculator,
  Plus,
  Trash2,
  DollarSign,
  Package,
  Factory,
  Percent,
  InfoIcon,
  Loader2,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

type Ingredient = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  costPerUnit: number;
  totalCost: number;
  description: string;
  category: string;
  baseCost: number;
};

type PackagingOption = {
  id: string;
  name: string;
  costPerUnit: number;
  moq: number;
};

type ManufacturingCost = {
  setupCost: number;
  laborCost: number;
  qualityTestingCost: number;
  certificationCost: number;
};

type CostBreakdown = {
  rawMaterialsCost: number;
  packagingCost: number;
  manufacturingCost: number;
  totalCost: number;
  costPerUnit: number;
  suggestedRetailPrice: number;
  profitMargin: number;
  roi: number;
};

const MOCK_INGREDIENTS = [
  { 
    name: "Ashwagandha Extract", 
    unit: "kg", 
    baseCost: 80,
    description: "Standardized to 2.5% Withanolides",
    category: "Adaptogen"
  },
  { 
    name: "Turmeric Extract", 
    unit: "kg", 
    baseCost: 65,
    description: "95% Curcuminoids",
    category: "Anti-inflammatory"
  },
  { 
    name: "Ginger Extract", 
    unit: "kg", 
    baseCost: 55,
    description: "5% Gingerols",
    category: "Digestive Aid"
  },
  { 
    name: "Black Pepper Extract", 
    unit: "kg", 
    baseCost: 90,
    description: "95% Piperine",
    category: "Bioavailability Enhancer"
  },
  { 
    name: "Green Tea Extract", 
    unit: "kg", 
    baseCost: 70,
    description: "50% EGCG",
    category: "Antioxidant"
  },
];

const MOCK_PACKAGING_OPTIONS: PackagingOption[] = [
  { id: "bottle-60", name: "60 Count Bottle", costPerUnit: 0.45, moq: 1000 },
  { id: "bottle-120", name: "120 Count Bottle", costPerUnit: 0.65, moq: 1000 },
  { id: "sachet-30", name: "30 Pack Sachets", costPerUnit: 0.35, moq: 2000 },
  { id: "jar-250", name: "250g Jar", costPerUnit: 0.75, moq: 500 },
];

const CostEstimator = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [batchSize, setBatchSize] = useState<string>("");
  const [servingSize, setServingSize] = useState<string>("");
  const [selectedPackaging, setSelectedPackaging] = useState<string>("");
  const [manufacturingCosts, setManufacturingCosts] = useState<ManufacturingCost>({
    setupCost: 0,
    laborCost: 0,
    qualityTestingCost: 0,
    certificationCost: 0,
  });
  const [costBreakdown, setCostBreakdown] = useState<CostBreakdown | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleAddIngredient = () => {
    const newIngredient: Ingredient = {
      id: crypto.randomUUID(),
      name: "",
      quantity: 0,
      unit: "kg",
      costPerUnit: 0,
      totalCost: 0,
      description: "",
      category: "",
      baseCost: 0,
    };
    setIngredients([...ingredients, newIngredient]);
  };

  const handleRemoveIngredient = (id: string) => {
    setIngredients(ingredients.filter((ing) => ing.id !== id));
  };

  const handleIngredientChange = (id: string, field: keyof Ingredient, value: string | number) => {
    setIngredients(ingredients.map((ing) => {
      if (ing.id === id) {
        const updatedIng = { ...ing, [field]: value };
        if (field === "name") {
          const mockIng = MOCK_INGREDIENTS.find(m => m.name === value);
          if (mockIng) {
            updatedIng.costPerUnit = mockIng.baseCost;
            updatedIng.unit = mockIng.unit;
          }
        }
        if (field === "quantity" || field === "costPerUnit") {
          updatedIng.totalCost = updatedIng.quantity * updatedIng.costPerUnit;
        }
        return updatedIng;
      }
      return ing;
    }));
  };

  const calculateCosts = async () => {
    setIsCalculating(true);
    setCostBreakdown(null);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const rawMaterialsCost = ingredients.reduce((sum, ing) => sum + ing.totalCost, 0);
    const packagingOption = MOCK_PACKAGING_OPTIONS.find(p => p.id === selectedPackaging);
    const packagingCost = (packagingOption?.costPerUnit || 0) * parseInt(batchSize);
    const totalManufacturingCost = Object.values(manufacturingCosts).reduce((sum, cost) => sum + cost, 0);

    const totalCost = rawMaterialsCost + packagingCost + totalManufacturingCost;
    const costPerUnit = totalCost / parseInt(batchSize);
    const suggestedRetailPrice = costPerUnit * 2.5; // 60% margin
    const profitMargin = ((suggestedRetailPrice - costPerUnit) / suggestedRetailPrice) * 100;
    const roi = ((suggestedRetailPrice * parseInt(batchSize)) - totalCost) / totalCost * 100;

    setCostBreakdown({
      rawMaterialsCost,
      packagingCost,
      manufacturingCost: totalManufacturingCost,
      totalCost,
      costPerUnit,
      suggestedRetailPrice,
      profitMargin,
      roi
    });

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
              Supplement Formulation Cost Estimator
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Calculate production costs, estimate retail pricing, and analyze ROI for your supplement formulations.
            </p>
          </motion.div>

          <Card className="p-8 mb-8 shadow-lg border-t-4 border-t-primary bg-white/50 backdrop-blur-sm">
            <div className="space-y-8">
              {/* Ingredients Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Raw Materials</h2>
                  <Button
                    onClick={handleAddIngredient}
                    variant="outline"
                    className="gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Ingredient
                  </Button>
                </div>

                <div className="space-y-4">
                  {ingredients.map((ingredient) => (
                    <motion.div
                      key={ingredient.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex gap-4 items-start"
                    >
                      <div className="flex-1">
                        <Select
                          value={ingredient.name}
                          onValueChange={(value) => handleIngredientChange(ingredient.id, "name", value)}
                        >
                          <SelectTrigger className="h-10 bg-white border-gray-200 hover:bg-gray-50 hover:border-primary/50 transition-colors">
                            <SelectValue placeholder="Select ingredient" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border border-gray-200 shadow-lg rounded-lg min-w-[300px]">
                            <div className="p-2">
                              <div className="text-sm font-medium text-gray-500 mb-2 px-2">
                                Select an ingredient
                              </div>
                              {MOCK_INGREDIENTS.map((ing) => (
                                <SelectItem 
                                  key={ing.name} 
                                  value={ing.name}
                                  className="relative flex flex-col items-start rounded-md p-2 cursor-pointer data-[highlighted]:bg-gray-50 data-[highlighted]:outline-none"
                                >
                                  <div className="font-medium">{ing.name}</div>
                                  <div className="text-xs text-gray-500 mt-0.5">{ing.description}</div>
                                  <div className="flex items-center gap-2 mt-1">
                                    <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                                      {ing.category}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                      ${ing.baseCost}/kg
                                    </span>
                                  </div>
                                </SelectItem>
                              ))}
                            </div>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="w-32">
                        <Input
                          type="number"
                          value={ingredient.quantity || ""}
                          onChange={(e) => handleIngredientChange(ingredient.id, "quantity", parseFloat(e.target.value))}
                          placeholder="Quantity"
                          className="h-10 bg-white border-gray-200 hover:border-primary/50 transition-colors"
                        />
                      </div>
                      <div className="w-24 pt-2 text-sm text-gray-600">
                        {ingredient.unit}
                      </div>
                      <div className="w-32">
                        <Input
                          type="number"
                          value={ingredient.costPerUnit || ""}
                          onChange={(e) => handleIngredientChange(ingredient.id, "costPerUnit", parseFloat(e.target.value))}
                          placeholder="Cost/Unit"
                          className="h-10 bg-white border-gray-200 hover:border-primary/50 transition-colors"
                        />
                      </div>
                      <div className="w-32 pt-2 font-medium">
                        ${ingredient.totalCost.toFixed(2)}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveIngredient(ingredient.id)}
                        className="h-10 w-10 text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  ))}

                  {ingredients.length === 0 && (
                    <div className="text-center py-8 px-4 border-2 border-dashed border-gray-200 rounded-lg">
                      <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center mx-auto mb-3">
                        <Plus className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-sm font-medium text-gray-900 mb-1">No ingredients added</h3>
                      <p className="text-sm text-gray-500 mb-3">
                        Start by adding ingredients to your formulation
                      </p>
                      <Button
                        onClick={handleAddIngredient}
                        variant="outline"
                        className="gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Add First Ingredient
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Batch and Serving Size */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Batch Size (Units)</Label>
                  <Input
                    type="number"
                    value={batchSize}
                    onChange={(e) => setBatchSize(e.target.value)}
                    placeholder="Enter batch size"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Serving Size (mg)</Label>
                  <Input
                    type="number"
                    value={servingSize}
                    onChange={(e) => setServingSize(e.target.value)}
                    placeholder="Enter serving size"
                  />
                </div>
              </div>

              {/* Packaging Selection */}
              <div className="space-y-2">
                <Label>Packaging Type</Label>
                <Select
                  value={selectedPackaging}
                  onValueChange={setSelectedPackaging}
                >
                  <SelectTrigger className="bg-white border-gray-200 hover:bg-gray-50 hover:border-primary/50 transition-colors">
                    <SelectValue placeholder="Select packaging option" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200 shadow-lg rounded-lg">
                    <div className="p-2">
                      <div className="text-sm font-medium text-gray-500 mb-2 px-2">
                        Select packaging type
                      </div>
                      {MOCK_PACKAGING_OPTIONS.map((option) => (
                        <SelectItem 
                          key={option.id} 
                          value={option.id}
                          className="relative flex flex-col items-start rounded-md p-2 cursor-pointer data-[highlighted]:bg-gray-50 data-[highlighted]:outline-none"
                        >
                          <div className="font-medium">{option.name}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-500">
                              ${option.costPerUnit}/unit
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-xs font-medium">
                              MOQ: {option.moq}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </div>
                  </SelectContent>
                </Select>
              </div>

              {/* Manufacturing Costs */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Manufacturing Costs</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Setup Cost ($)</Label>
                    <Input
                      type="number"
                      value={manufacturingCosts.setupCost || ""}
                      onChange={(e) => setManufacturingCosts({
                        ...manufacturingCosts,
                        setupCost: parseFloat(e.target.value) || 0
                      })}
                      placeholder="Enter setup cost"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Labor Cost ($)</Label>
                    <Input
                      type="number"
                      value={manufacturingCosts.laborCost || ""}
                      onChange={(e) => setManufacturingCosts({
                        ...manufacturingCosts,
                        laborCost: parseFloat(e.target.value) || 0
                      })}
                      placeholder="Enter labor cost"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Quality Testing ($)</Label>
                    <Input
                      type="number"
                      value={manufacturingCosts.qualityTestingCost || ""}
                      onChange={(e) => setManufacturingCosts({
                        ...manufacturingCosts,
                        qualityTestingCost: parseFloat(e.target.value) || 0
                      })}
                      placeholder="Enter testing cost"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Certification ($)</Label>
                    <Input
                      type="number"
                      value={manufacturingCosts.certificationCost || ""}
                      onChange={(e) => setManufacturingCosts({
                        ...manufacturingCosts,
                        certificationCost: parseFloat(e.target.value) || 0
                      })}
                      placeholder="Enter certification cost"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={calculateCosts}
                  disabled={!ingredients.length || !batchSize || !selectedPackaging || isCalculating}
                  className="w-full md:w-auto min-w-[200px] h-12 text-lg relative bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 transition-all duration-200"
                >
                  {isCalculating ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Calculating...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Calculator className="h-5 w-5" />
                      <span>Calculate Costs</span>
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </Card>

          <AnimatePresence mode="wait">
            {costBreakdown && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-6 mb-8 bg-white shadow-lg">
                  <div className="space-y-8">
                    {/* Cost Breakdown */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="font-medium text-lg flex items-center gap-2">
                          <DollarSign className="h-5 w-5 text-primary" />
                          Cost Breakdown
                        </h3>
                        <div className="space-y-2">
                          <div className="flex justify-between py-2 border-b">
                            <span className="text-gray-600">Raw Materials</span>
                            <span className="font-medium">${costBreakdown.rawMaterialsCost.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b">
                            <span className="text-gray-600">Packaging</span>
                            <span className="font-medium">${costBreakdown.packagingCost.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b">
                            <span className="text-gray-600">Manufacturing</span>
                            <span className="font-medium">${costBreakdown.manufacturingCost.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between py-2 font-medium text-lg">
                            <span>Total Cost</span>
                            <span className="text-primary">${costBreakdown.totalCost.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-medium text-lg flex items-center gap-2">
                          <Percent className="h-5 w-5 text-primary" />
                          Unit Economics
                        </h3>
                        <div className="space-y-2">
                          <div className="flex justify-between py-2 border-b">
                            <span className="text-gray-600">Cost per Unit</span>
                            <span className="font-medium">${costBreakdown.costPerUnit.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b">
                            <span className="text-gray-600">Suggested Retail Price</span>
                            <span className="font-medium">${costBreakdown.suggestedRetailPrice.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b">
                            <span className="text-gray-600">Profit Margin</span>
                            <span className="font-medium">{costBreakdown.profitMargin.toFixed(1)}%</span>
                          </div>
                          <div className="flex justify-between py-2 font-medium text-lg">
                            <span>ROI</span>
                            <span className="text-primary">{costBreakdown.roi.toFixed(1)}%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Recommendations */}
                    <div className="space-y-4">
                      <h3 className="font-medium text-lg flex items-center gap-2">
                        <InfoIcon className="h-5 w-5 text-primary" />
                        Recommendations
                      </h3>
                      <ul className="space-y-3 bg-gray-50 p-4 rounded-lg">
                        <motion.li
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-start gap-3"
                        >
                          <div className="h-6 w-6 rounded-full bg-white border border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-primary text-sm font-medium">1</span>
                          </div>
                          <span className="text-gray-600 leading-relaxed">
                            {costBreakdown.profitMargin < 40 
                              ? "Consider optimizing raw material costs or increasing retail price to improve profit margin."
                              : "Current profit margin is healthy. Focus on maintaining quality and market positioning."}
                          </span>
                        </motion.li>
                        <motion.li
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <div className="h-6 w-6 rounded-full bg-white border border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-primary text-sm font-medium">2</span>
                          </div>
                          <span className="text-gray-600 leading-relaxed">
                            {costBreakdown.roi < 100
                              ? "Consider increasing batch size to benefit from economies of scale."
                              : "ROI is strong. Consider reinvesting profits in marketing and distribution."}
                          </span>
                        </motion.li>
                        <motion.li
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                          className="flex items-start gap-3"
                        >
                          <div className="h-6 w-6 rounded-full bg-white border border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-primary text-sm font-medium">3</span>
                          </div>
                          <span className="text-gray-600 leading-relaxed">
                            Explore bulk purchasing options for raw materials to reduce costs.
                            Negotiate with suppliers for better pricing on larger orders.
                          </span>
                        </motion.li>
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
                <h3 className="font-medium text-blue-800 mb-2">About Cost Estimation</h3>
                <p className="text-sm text-blue-700 leading-relaxed">
                  This tool provides comprehensive cost analysis for supplement formulations, including raw materials, 
                  packaging, manufacturing, and certification costs. Use these estimates for initial planning and 
                  budgeting. Actual costs may vary based on supplier agreements, manufacturing partners, and market conditions.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default CostEstimator; 